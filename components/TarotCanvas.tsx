
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GestureState, Particle } from '../types';
import { TAROT_DECK, TOTAL_CARDS, CARD_RATIO, getCardImageUrl } from '../constants';
import { getTarotReading } from '../services/geminiService';

interface CardEntity {
  id: number;
  x: number;
  y: number;
  z: number; // Scale/Order
  rotX: number;
  rotY: number; // 0 = back, 180 (PI) = front
  rotZ: number;
  width: number;
  height: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  targetRotX: number;
  targetRotY: number;
  targetRotZ: number;
  isRevealed: boolean;
  textureId: number; 
  vx: number;
  vy: number;
  phaseX: number; // For organic movement
  phaseY: number;
  speed: number;
}

interface TarotCanvasProps {
  onExit: () => void;
}

export const TarotCanvas: React.FC<TarotCanvasProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debugCanvasRef = useRef<HTMLCanvasElement>(null); 
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number>(0);
  const gestureRecognizerRef = useRef<any>(null);
  
  // State
  const [gestureState, setGestureState] = useState<GestureState>(GestureState.STACKED);
  const [detectedGesture, setDetectedGesture] = useState<string>("Initializing...");
  const [reading, setReading] = useState<string | null>(null);
  const [loadingReading, setLoadingReading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, setForceUpdate] = useState(0);
  
  // Physics Refs
  const cardsRef = useRef<CardEntity[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastVideoTime = useRef(-1);
  const selectedIndexRef = useRef<number>(-1);
  const fingerXHistory = useRef<number[]>([]);
  const lastShakeCheckTime = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  // Hand Motion Tracking
  const handPosRef = useRef<{x: number, y: number} | null>(null);
  const handVelocityRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  
  // Image Loading Ref
  const loadedCardImageRef = useRef<HTMLImageElement | null>(null);
  const currentImageSrcRef = useRef<string | null>(null);
  const imageLoadErrorRef = useRef<boolean>(false);

  // Fullscreen Tracking
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    handleFullscreenChange();
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  }, []);

  // Initialize Cards
  useEffect(() => {
    const cards: CardEntity[] = [];
    const w = 100; // Base width
    const h = w * CARD_RATIO;
    
    for (let i = 0; i < TOTAL_CARDS; i++) {
      cards.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        z: 1,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        width: w,
        height: h,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight / 2,
        targetZ: 1,
        targetRotX: 0,
        targetRotY: 0,
        targetRotZ: 0,
        isRevealed: false,
        textureId: i,
        vx: 0,
        vy: 0,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speed: 0.0001 + Math.random() * 0.0002
      });
    }
    cardsRef.current = cards;
    selectedIndexRef.current = Math.floor(Math.random() * TOTAL_CARDS);
  }, []);

  // Image Loading Effect
  useEffect(() => {
    if (selectedIndexRef.current === -1) return;
    
    const cardName = TAROT_DECK[selectedIndexRef.current];
    const url = getCardImageUrl(cardName);
    
    // Check if we need to load a new image
    if (currentImageSrcRef.current !== url) {
        currentImageSrcRef.current = url;
        imageLoadErrorRef.current = false;
        loadedCardImageRef.current = null;
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            if (currentImageSrcRef.current === url) { // Race condition check
                loadedCardImageRef.current = img;
                imageLoadErrorRef.current = false;
                setForceUpdate(n => n + 1);
            }
        };
        img.onerror = () => {
            if (currentImageSrcRef.current === url) {
                console.warn(`Failed to load image: ${url}. Will render procedural card.`);
                imageLoadErrorRef.current = true;
                setForceUpdate(n => n + 1);
            }
        };
        img.src = url;
    }
  }, [selectedIndexRef.current, gestureState]); // Re-run if gestureState changes (shuffle might pick new card)


  // Setup MediaPipe
  useEffect(() => {
    const setupVision = async () => {
      try {
        setDetectedGesture("Loading Vision...");
        // @ts-ignore
        const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");
        const { FilesetResolver, GestureRecognizer } = vision;

        const wasm = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        
        gestureRecognizerRef.current = await GestureRecognizer.createFromOptions(wasm, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
             // Removing explicit delegate request to allow auto-selection (resolves XNNPACK INFO logs being perceived as errors)
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setDetectedGesture("Camera Ready. Show Hand.");
          }
        }
      } catch (e) {
        console.error("Failed to load MediaPipe", e);
        setDetectedGesture("Vision Error. Check Camera.");
      }
    };
    
    setupVision();
    
    return () => {
       if (gestureRecognizerRef.current) {
         try { gestureRecognizerRef.current.close(); } catch(e) {}
       }
    };
  }, []);

  // Gesture Logic
  const predictWebcam = useCallback(() => {
    if (!videoRef.current || !gestureRecognizerRef.current) return;
    if (videoRef.current.readyState < 2) return;

    // --- DEBUG DRAWING START ---
    const debugCtx = debugCanvasRef.current?.getContext('2d');
    if (debugCtx && debugCanvasRef.current) {
        const w = debugCanvasRef.current.width;
        const h = debugCanvasRef.current.height;

        debugCtx.setTransform(1, 0, 0, 1, 0, 0);
        debugCtx.clearRect(0, 0, w, h);
        
        // Mirror Logic
        debugCtx.translate(w, 0);
        debugCtx.scale(-1, 1);
        
        debugCtx.drawImage(videoRef.current, 0, 0, w, h);
    }

    if (videoRef.current.currentTime !== lastVideoTime.current) {
      lastVideoTime.current = videoRef.current.currentTime;
      
      try {
        const results = gestureRecognizerRef.current.recognizeForVideo(videoRef.current, performance.now());

        // --- DRAW LANDMARKS ---
        if (debugCtx && debugCanvasRef.current && results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];
            const w = debugCanvasRef.current.width;
            const h = debugCanvasRef.current.height;

            const palm = landmarks[9]; 
            if (handPosRef.current) {
                const dx = (palm.x - handPosRef.current.x);
                const dy = (palm.y - handPosRef.current.y);
                handVelocityRef.current = { x: -dx, y: dy };
            }
            handPosRef.current = { x: palm.x, y: palm.y };

            // Draw Skeleton
            const connections = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17], [5, 9], [9, 13], [13, 17]];

            debugCtx.lineWidth = 2;
            debugCtx.strokeStyle = "rgba(212, 175, 55, 0.8)"; // Gold
            debugCtx.fillStyle = "rgba(212, 175, 55, 1)";

            debugCtx.beginPath();
            for (const [start, end] of connections) {
                const s = landmarks[start];
                const e = landmarks[end];
                debugCtx.moveTo(s.x * w, s.y * h);
                debugCtx.lineTo(e.x * w, e.y * h);
            }
            debugCtx.stroke();

            for (const lm of landmarks) {
                debugCtx.beginPath();
                debugCtx.arc(lm.x * w, lm.y * h, 3, 0, 2 * Math.PI);
                debugCtx.fill();
            }
        } else {
            handVelocityRef.current.x *= 0.9;
            handVelocityRef.current.y *= 0.9;
        }
        
        if (debugCtx) debugCtx.setTransform(1, 0, 0, 1, 0, 0);

        if (results.gestures.length > 0) {
            const gestureName = results.gestures[0][0].categoryName;
            setDetectedGesture(gestureName);

            if (gestureName === "Closed_Fist") {
                setGestureState(GestureState.STACKED);
            } 
            else if (gestureName === "Open_Palm") {
                if (gestureState !== GestureState.SHUFFLING) {
                    // New Random Pick on Start Shuffle
                    selectedIndexRef.current = Math.floor(Math.random() * TOTAL_CARDS);
                    // Reset Image Load
                    currentImageSrcRef.current = null;
                }
                setGestureState(GestureState.SHUFFLING);
            } 
            else if (gestureName === "Pointing_Up") {
                if (gestureState === GestureState.SHUFFLING || gestureState === GestureState.STACKED) {
                    setGestureState(GestureState.SELECTED);
                }
                
                const landmarks = results.landmarks[0];
                if (landmarks && landmarks[8]) {
                    const x = landmarks[8].x;
                    fingerXHistory.current.push(x);
                    if (fingerXHistory.current.length > 15) fingerXHistory.current.shift();
                    
                    const now = Date.now();
                    if (now - lastShakeCheckTime.current > 150 && fingerXHistory.current.length > 5) {
                        const max = Math.max(...fingerXHistory.current);
                        const min = Math.min(...fingerXHistory.current);
                        if (max - min > 0.12 && gestureState === GestureState.SELECTED) { 
                            setGestureState(GestureState.REVEALED);
                        }
                        lastShakeCheckTime.current = now;
                    }
                }
            }
        }
      } catch (err) {
        // Suppress noise
      }
    }
  }, [gestureState]);


  // AI Trigger
  useEffect(() => {
    if (gestureState === GestureState.REVEALED && !reading && !loadingReading) {
      const fetchReading = async () => {
        setLoadingReading(true);
        const cardName = TAROT_DECK[selectedIndexRef.current % TAROT_DECK.length];
        const isReversed = Math.random() > 0.8;
        const text = await getTarotReading(cardName, isReversed);
        setReading(text);
        setLoadingReading(false);
      };
      fetchReading();
    } else if (gestureState !== GestureState.REVEALED) {
      setReading(null); 
    }
  }, [gestureState, reading, loadingReading]);


  // Animation Loop
  const animate = useCallback((time: number) => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
    timeRef.current = time;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const revealedCardLift = gestureState === GestureState.REVEALED 
      ? -window.innerHeight * 0.12 
      : 0; // lift revealed card to avoid overlapping reading panel
    
    const currentEase = (gestureState === GestureState.SELECTED || gestureState === GestureState.REVEALED) ? 0.02 : 0.08;
    
    cardsRef.current.forEach((card, i) => {
      const isSelected = i === selectedIndexRef.current;
      
      if (!isSelected || gestureState !== GestureState.REVEALED) {
          card.targetRotY = 0;
      }

      if (gestureState === GestureState.STACKED) {
        card.targetX = cx;
        card.targetY = cy + i * 0.15; 
        card.targetZ = 1 - (i * 0.001);
        card.targetRotZ = 0;
        card.targetRotY = 0;
      } 
      else if (gestureState === GestureState.SHUFFLING) {
        const t = time;
        const handVx = handVelocityRef.current.x * 2000;
        const handVy = handVelocityRef.current.y * 2000;

        const spreadX = window.innerWidth * 1.1; 
        const spreadY = window.innerHeight * 1.1;

        const freqX = card.speed * 1.5;
        const freqY = card.speed;
        
        const nx = Math.sin(t * freqX + card.phaseX);
        const ny = Math.cos(t * freqY + card.phaseY);
        
        const nx2 = Math.sin(t * freqX * 2.3 + i);
        const ny2 = Math.cos(t * freqY * 2.3 + i);

        card.targetX = cx + (nx * 0.7 + nx2 * 0.3) * (spreadX / 2) + handVx;
        card.targetY = cy + (ny * 0.7 + ny2 * 0.3) * (spreadY / 2) + handVy;
        card.targetZ = 0.5 + Math.sin(t * 0.001 + i) * 0.4;
        card.targetRotZ = (t * 0.0005 + i * 0.2); 
        card.targetRotY = 0;
      } 
      else if (gestureState === GestureState.SELECTED || gestureState === GestureState.REVEALED) {
        if (isSelected) {
          card.targetX = cx;
          card.targetY = cy + revealedCardLift;
          card.targetZ = 3.0; 
          card.targetRotZ = 0;
          if (gestureState === GestureState.REVEALED) {
             card.targetRotY = Math.PI;
          }
        } else {
          const angle = (i / TOTAL_CARDS) * Math.PI * 8 + time * 0.0001;
          const dist = Math.max(window.innerWidth, window.innerHeight) * 1.2; 
          card.targetX = cx + Math.cos(angle) * dist;
          card.targetY = cy + Math.sin(angle) * dist;
          card.targetZ = 0.1;
        }
      }

      card.x += (card.targetX - card.x) * currentEase;
      card.y += (card.targetY - card.y) * currentEase;
      card.z += (card.targetZ - card.z) * currentEase;
      
      let diffRotZ = card.targetRotZ - card.rotZ;
      while (diffRotZ > Math.PI) diffRotZ -= Math.PI * 2;
      while (diffRotZ < -Math.PI) diffRotZ += Math.PI * 2;
      card.rotZ += diffRotZ * currentEase;

      card.rotX += (card.targetRotX - card.rotX) * currentEase;
      card.rotY += (card.targetRotY - card.rotY) * 0.05;
    });

    const sortedCards = [...cardsRef.current].sort((a, b) => a.z - b.z);

    sortedCards.forEach((card) => {
        if (card.z < 0.1) return;

        ctx.save();
        ctx.translate(card.x, card.y);
        ctx.scale(card.z, card.z);
        ctx.rotate(card.rotZ);

        const flipScale = Math.cos(card.rotY);
        const isBack = flipScale > 0;
        
        ctx.scale(Math.abs(flipScale), 1);

        const w = card.width;
        const h = card.height;

        ctx.shadowBlur = 15 * card.z;
        ctx.shadowColor = "rgba(0,0,0,0.5)";

        if (isBack) {
            // BACK DESIGN
            ctx.fillStyle = "#0a0a0a";
            ctx.strokeStyle = "#8a6d3b";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(-w/2, -h/2, w, h, 6);
            ctx.fill();
            ctx.stroke();
            
            ctx.strokeStyle = "rgba(138, 109, 59, 0.3)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, w/3, 0, Math.PI * 2);
            ctx.moveTo(0, -h/2 + 10);
            ctx.lineTo(0, h/2 - 10);
            ctx.moveTo(-w/2 + 10, 0);
            ctx.lineTo(w/2 - 10, 0);
            ctx.stroke();
        } else {
            // FRONT DESIGN
            const isSelectedCard = card.id === selectedIndexRef.current;
            
            if (isSelectedCard && loadedCardImageRef.current && !imageLoadErrorRef.current) {
                // RENDER IMAGE
                try {
                  ctx.fillStyle = "#fff";
                  ctx.fillRect(-w/2, -h/2, w, h);
                  ctx.drawImage(loadedCardImageRef.current, -w/2, -h/2, w, h);
                } catch (e) {
                   ctx.fillStyle = "#fff";
                   ctx.fillRect(-w/2, -h/2, w, h);
                }
            } else if (isSelectedCard && imageLoadErrorRef.current) {
                // RENDER PROCEDURAL FALLBACK
                ctx.fillStyle = "#f3e5ab"; // Parchment color
                ctx.fillRect(-w/2, -h/2, w, h);
                
                // Border
                ctx.strokeStyle = "#d4af37";
                ctx.lineWidth = 3;
                ctx.strokeRect(-w/2 + 4, -h/2 + 4, w - 8, h - 8);

                // Text
                ctx.fillStyle = "#2c2c2c";
                ctx.textAlign = "center";
                ctx.font = "bold 8px serif";
                
                const cardName = TAROT_DECK[card.id % TAROT_DECK.length];
                const parts = cardName.split(' ');
                
                // Draw card name
                let yOff = 0;
                parts.forEach((p, idx) => {
                     ctx.fillText(p.toUpperCase(), 0, -h/4 + idx * 10 + yOff);
                });
                
                // Draw simple symbol
                ctx.font = "24px serif";
                let symbol = "✦"; // Default Major Arcana
                if (cardName.includes("Cups")) symbol = "🏆";
                if (cardName.includes("Wands")) symbol = "🌿";
                if (cardName.includes("Swords")) symbol = "⚔️";
                if (cardName.includes("Pentacles")) symbol = "🪙";
                
                ctx.fillText(symbol, 0, 10);
                
            } else {
                // Other (Background) cards front face (shouldn't be seen often)
                ctx.fillStyle = "#1a1a1a";
                ctx.fillRect(-w/2, -h/2, w, h);
            }
            
            // Common Front Border
            ctx.strokeStyle = "#d4af37";
            ctx.lineWidth = 1;
            ctx.strokeRect(-w/2, -h/2, w, h);
        }
        ctx.restore();
    });

    // Particles - Loop Backwards to safely remove
    if (gestureState === GestureState.SELECTED || gestureState === GestureState.REVEALED) {
       const mainCard = cardsRef.current[selectedIndexRef.current];
       const w = mainCard.width * mainCard.z;
       const h = mainCard.height * mainCard.z;
       
       for(let k=0; k<4; k++) {
           const perimeter = (w + h) * 2;
           const pos = Math.random() * perimeter;
           let px=0, py=0;
           
           if (pos < w) { px = pos - w/2; py = -h/2; }
           else if (pos < w + h) { px = w/2; py = (pos - w) - h/2; }
           else if (pos < w*2 + h) { px = (pos - w - h) - w/2; py = h/2; }
           else { px = -w/2; py = (pos - w*2 - h) - h/2; }

           const cos = Math.cos(mainCard.rotZ);
           const sin = Math.sin(mainCard.rotZ);
           const rpx = px * cos - py * sin;
           const rpy = px * sin + py * cos;

           particlesRef.current.push({
               x: mainCard.x + rpx,
               y: mainCard.y + rpy,
               vx: (Math.random() - 0.5) * 2,
               vy: (Math.random() - 0.5) * 2 - 1.0,
               life: 1.0,
               maxLife: 1.0,
               size: Math.random() * 3 + 1,
               color: `rgba(212, 175, 55, ${Math.random() * 0.8 + 0.2})`
           });
       }
    }

    ctx.globalCompositeOperation = 'lighter';
    
    // Reverse loop for safe removal
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.02;
       
        if (p.life <= 0) {
           particlesRef.current.splice(i, 1);
        } else {
           ctx.fillStyle = p.color.replace(')', `, ${p.life})`);
           ctx.beginPath();
           ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
           ctx.fill();
        }
    }
    
    ctx.globalCompositeOperation = 'source-over';

  }, [gestureState, predictWebcam]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden cursor-none">
      <video ref={videoRef} className="absolute opacity-0 pointer-events-none" playsInline autoPlay muted width="320" height="240" />
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      <canvas 
        ref={debugCanvasRef} 
        width={320} 
        height={240} 
        className="absolute top-20 right-6 w-48 h-36 border border-amber-900/50 rounded-lg z-40 bg-black/80 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      />
      
      <div className="absolute top-6 left-6 z-50 text-amber-600/50 font-mono text-xs tracking-widest pointer-events-none">
        <div>SIGNAL: {detectedGesture.toUpperCase()}</div>
        <div>STATE: {gestureState}</div>
      </div>
      
      <div className="absolute top-6 right-6 z-50 flex flex-col gap-3 pointer-events-auto">
        {/* <button 
          onClick={onExit}
          className="px-6 py-2 border border-gray-800 text-gray-500 hover:text-amber-500 hover:border-amber-500 transition-colors uppercase text-xs tracking-widest bg-black/50 backdrop-blur-sm"
        >
          Sever Connection
        </button> */}
        <button
          onClick={toggleFullscreen}
          className="px-6 py-2 border border-gray-800 text-gray-500 hover:text-amber-500 hover:border-amber-500 transition-colors uppercase text-xs tracking-widest bg-black/50 backdrop-blur-sm"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      </div>

      <div className="absolute bottom-12 left-0 w-full text-center pointer-events-none transition-opacity duration-500">
        {gestureState === GestureState.STACKED && (
          <p className="text-gray-400 font-serif italic tracking-widest opacity-60">Open your hand to scatter the fates.</p>
        )}
        {gestureState === GestureState.SHUFFLING && (
          <p className="text-amber-500/80 font-serif italic tracking-widest animate-pulse">Raise one finger to choose a path.</p>
        )}
        {gestureState === GestureState.SELECTED && (
          <p className="text-white font-serif tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Shake your finger to reveal the truth.</p>
        )}
      </div>

      {gestureState === GestureState.REVEALED && (
        <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-6 text-center transition-all duration-1000 ${reading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black/80 backdrop-blur-md p-8 border border-amber-900/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm pointer-events-auto">
            <h3 className="text-amber-500 text-3xl font-serif mb-4 uppercase tracking-[0.2em] border-b border-amber-900/50 pb-4 inline-block">
              {TAROT_DECK[selectedIndexRef.current % TAROT_DECK.length]}
            </h3>
            <div className="text-gray-300 leading-loose font-serif text-lg">
               {loadingReading ? (
                   <span className="animate-pulse">Consulting the void...</span>
               ) : reading}
            </div>
            <div className="mt-6 text-xs text-gray-600 uppercase tracking-widest">
                Close your hand to stack the deck
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
