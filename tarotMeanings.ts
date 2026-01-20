// 塔罗牌牌义数据 - 78张牌的正位/逆位解释
export interface TarotMeaning {
  upright: string;
  reversed: string;
  general: string;
}

export const TAROT_MEANINGS: Record<string, TarotMeaning> = {
  // ============ 大阿卡纳 (Major Arcana) ============
  "The Fool": {
    upright: "A new journey begins. Trust the unknown, embrace spontaneity, and leap into the void with innocent wonder. The universe catches those who dare.",
    reversed: "Recklessness clouds judgment. Pause before the precipice - not all leaps lead to flight. Fear may be wisdom in disguise.",
    general: "The Fool represents infinite potential and the spirit of adventure. Zero contains all numbers; the beginning holds all endings."
  },
  "The Magician": {
    upright: "You hold all elements in your hands. Will, focus, and skill align - manifestation awaits. Channel the above into the below.",
    reversed: "Power misdirected or untapped. Illusions may deceive you, or you may deceive others. Reconnect intention with action.",
    general: "The Magician bridges heaven and earth, transforming thought into reality. As above, so below - your consciousness shapes your world."
  },
  "The High Priestess": {
    upright: "Secrets whisper from the shadows. Trust your intuition; the veil thins. Knowledge comes through stillness, not seeking.",
    reversed: "Ignored intuition or hidden truths surfacing. The unconscious demands attention. What have you refused to see?",
    general: "The High Priestess guards the threshold between worlds. She knows without knowing how. In her silence, all mysteries dwell."
  },
  "The Empress": {
    upright: "Abundance flows through you. Create, nurture, and bloom. The earth responds to your touch with fertility and grace.",
    reversed: "Creative blocks or neglected self-care. The garden withers without tending. Return to what nourishes your soul.",
    general: "The Empress embodies creative force and sensual wisdom. She is nature herself - patient, generous, and endlessly generative."
  },
  "The Emperor": {
    upright: "Structure serves your vision. Authority earned through wisdom brings order from chaos. Build foundations that endure.",
    reversed: "Tyranny or weakness in leadership. Rigid control crumbles; absent structure breeds chaos. Find balance between order and freedom.",
    general: "The Emperor represents mastery over the material world. His throne is carved from experience, his crown forged in responsibility."
  },
  "The Hierophant": {
    upright: "Tradition holds hidden wisdom. Seek guidance from established paths; the teacher appears when ready.",
    reversed: "Question inherited beliefs. Dogma may imprison rather than liberate. Your own experience becomes the teacher.",
    general: "The Hierophant bridges the divine and mundane through ritual and teaching. He preserves what must not be forgotten."
  },
  "The Lovers": {
    upright: "Sacred union calls - with another or within yourself. Choose from the heart; alignment creates wholeness.",
    reversed: "Disharmony in relationships or values. Choices avoided return as crises. Heal the split between desire and duty.",
    general: "The Lovers represent the divine marriage of opposites. In choosing, we become. Every love is a doorway to self-knowledge."
  },
  "The Chariot": {
    upright: "Victory through willpower. Opposing forces serve your direction. Move forward with confidence; the destination is certain.",
    reversed: "Inner conflict stalls progress. The horses pull apart. Realign your will before proceeding.",
    general: "The Chariot conquers through integration of opposing forces. The warrior knows that true victory is mastery of self."
  },
  "Strength": {
    upright: "Gentle power tames the beast. Courage flows from compassion; patience outlasts force. Your inner lion becomes your ally.",
    reversed: "Self-doubt or suppressed instincts. The wild nature demands acknowledgment. Find strength in vulnerability.",
    general: "Strength reveals that true power is soft, not hard. The infinite woman calms the infinite beast through love alone."
  },
  "The Hermit": {
    upright: "Withdraw to find wisdom. The lamp illuminates only the next step. Solitude brings clarity that crowds obscure.",
    reversed: "Isolation becomes prison. The search turns to avoidance. Return to the world with what you have found.",
    general: "The Hermit seeks truth in darkness, finding light within. His journey is inward; his wisdom, universal."
  },
  "Wheel of Fortune": {
    upright: "Fate turns in your favor. Cycles complete and begin. Embrace change as the only constant.",
    reversed: "Resistance to natural cycles. The wheel turns regardless - flow or be broken. Bad luck may be blessing in disguise.",
    general: "The Wheel reminds us that all conditions are temporary. Rise and fall are one movement; the center remains still."
  },
  "Justice": {
    upright: "Truth prevails; balance restores. Actions meet their consequences. Fair judgment comes from clear seeing.",
    reversed: "Injustice or self-deception. The scales tip through bias. Examine what you refuse to weigh equally.",
    general: "Justice cuts through illusion with her sword of truth. The scales measure not guilt, but alignment with cosmic law."
  },
  "The Hanged Man": {
    upright: "Surrender transforms perspective. Sacrifice of the old self births the new. In stillness, revelation comes.",
    reversed: "Stalling or martyrdom without purpose. The suspension continues past its teaching. What are you afraid to release?",
    general: "The Hanged Man sees the world inverted and finds it true. His sacrifice is willing; his wisdom, earned through letting go."
  },
  "Death": {
    upright: "Transformation demands release. What dies feeds what lives. The old form dissolves; the essence continues.",
    reversed: "Resistance to necessary endings. The corpse clings to life. Accept the invitation to be reborn.",
    general: "Death is the great transformer, not the destroyer. Every ending is a door; every loss, a liberation."
  },
  "Temperance": {
    upright: "Divine alchemy works through you. Patience blends opposites into gold. The middle path reveals itself.",
    reversed: "Imbalance or extremes dominate. The mixture fails; excess poisons. Return to moderation and flow.",
    general: "Temperance creates through combination what neither element alone could achieve. The angel knows that time serves transformation."
  },
  "The Devil": {
    upright: "Shadow aspects demand recognition. Bondage may be chosen; chains often unlock from within. Face what you fear to free yourself.",
    reversed: "Breaking free from addiction or illusion. The chains fall; light enters darkness. Liberation comes through awareness.",
    general: "The Devil shows us our self-imposed prisons. His laugh echoes with the truth that we hold our own keys."
  },
  "The Tower": {
    upright: "Lightning strikes false structures. Crisis clears the ground for truth. What cannot stand, falls - liberation follows.",
    reversed: "Avoiding necessary destruction or prolonged upheaval. The tower crumbles slowly. Face the storm or be buried in ruins.",
    general: "The Tower destroys only what was built on lies. In the flash of lightning, illusions vanish and truth stands naked."
  },
  "The Star": {
    upright: "Hope returns after darkness. Healing waters flow; the soul replenishes. Trust guides you toward your destiny.",
    reversed: "Despair or disconnection from hope. The stars seem distant. Remember: night is darkest before dawn.",
    general: "The Star pours forth the waters of life and consciousness. She is the promise that light follows darkness, always."
  },
  "The Moon": {
    upright: "Navigate by intuition through uncertain terrain. Fears and dreams blur; the path winds through shadow.",
    reversed: "Confusion lifts; illusions dispel. The moon wanes, revealing what was hidden. Face the fears that howled in darkness.",
    general: "The Moon illuminates the unconscious realm where logic fails. Her light is reflected, her truth, indirect and deep."
  },
  "The Sun": {
    upright: "Joy radiates without reservation. Success, vitality, and clarity bless your path. The inner child dances in light.",
    reversed: "Dimmed enthusiasm or delayed success. Clouds pass before the sun. The light remains; wait for clarity to return.",
    general: "The Sun represents consciousness in its fullness - pure, warm, and life-giving. Under its rays, all shadows flee."
  },
  "Judgement": {
    upright: "Awakening calls from beyond. The past resolves; a new chapter opens. Answer the call to your highest self.",
    reversed: "Self-judgment blocks rebirth. The call goes unheard or unanswered. Forgive yourself to rise again.",
    general: "Judgement is the resurrection of the soul into its true purpose. The trumpet sounds for those ready to answer."
  },
  "The World": {
    upright: "Completion and integration achieved. The dance of mastery begins; all elements unified. A cycle ends in wholeness.",
    reversed: "Incomplete closure or fear of success. The final step remains untaken. Embrace the ending to begin anew.",
    general: "The World represents the soul completion of its journey. The dancer moves in perfect freedom, at one with all."
  },
  // ============ 权杖牌组 (Wands) ============
  "Ace of Wands": {
    upright: "Creative spark ignites. New inspiration, passion, and potential burst forth. Seize this primal energy.",
    reversed: "Blocked creativity or false starts. The flame sputters. Clear obstacles before lighting the fire.",
    general: "The Ace of Wands is pure creative fire - the seed of passion, enterprise, and spiritual force."
  },
  "Two of Wands": {
    upright: "The world awaits your vision. Plan boldly; personal power expands beyond current horizons.",
    reversed: "Fear of the unknown or poor planning. The vision remains unlaunched. Commit or release.",
    general: "Two of Wands represents the moment between conception and action - holding the world in your hands."
  },
  "Three of Wands": {
    upright: "Ships return with fortune. Expansion succeeds; foresight rewards. Your ventures reach distant shores.",
    reversed: "Delays in progress or unrealistic expectations. The ships are late. Patience and adjustment needed.",
    general: "Three of Wands shows the entrepreneur watching investments grow. Vision becomes tangible progress."
  },
  "Four of Wands": {
    upright: "Celebration and homecoming. Foundations secure, community gathers. Rejoice in what has been built.",
    reversed: "Unstable foundations or delayed celebrations. The home needs attention. Strengthen before celebrating.",
    general: "Four of Wands marks harvest time - the joy of completion and the warmth of belonging."
  },
  "Five of Wands": {
    upright: "Creative conflict sparks growth. Competition challenges you to excel. Channel discord into determination.",
    reversed: "Avoiding conflict or exhausting battles. The fight drains rather than energizes. Seek resolution.",
    general: "Five of Wands represents the struggle that strengthens - creative tension that forges excellence."
  },
  "Six of Wands": {
    upright: "Victory parade begins. Recognition earned, leadership acknowledged. Accept praise with grace.",
    reversed: "Delayed recognition or hollow victory. The crown sits uneasy. True success is internal.",
    general: "Six of Wands celebrates public triumph - the moment when effort meets acknowledgment."
  },
  "Seven of Wands": {
    upright: "Hold your ground against opposition. Defense of beliefs requires courage. Your position is worth fighting for.",
    reversed: "Overwhelmed by challenges or giving up too easily. The hill may not be worth defending. Choose your battles.",
    general: "Seven of Wands shows the lone defender - conviction tested by adversity, strengthened by standing firm."
  },
  "Eight of Wands": {
    upright: "Swift movement accelerates events. Messages fly; action brings rapid results. Ride the momentum.",
    reversed: "Delays or misdirected energy. The arrows scatter. Align intention before releasing force.",
    general: "Eight of Wands is pure velocity - when obstacles clear and energy flows toward its target."
  },
  "Nine of Wands": {
    upright: "Resilience despite weariness. One more challenge remains; you have strength to endure. Guard what you have won.",
    reversed: "Exhaustion or paranoia. The walls protect nothing. Rest before the final push or release the battle.",
    general: "Nine of Wands honors the wounded warrior - scarred by experience, yet still standing."
  },
  "Ten of Wands": {
    upright: "Burden of success weighs heavy. Responsibility demands everything. The load can be shared or released.",
    reversed: "Refusing to delegate or collapse under pressure. The burden breaks the bearer. Redistribute or surrender.",
    general: "Ten of Wands shows the price of achievement - when passion becomes obligation, fire becomes weight."
  },
  "Page of Wands": {
    upright: "Enthusiastic messenger brings news of adventure. Creative potential awakens. Explore with youthful fire.",
    reversed: "Scattered energy or disappointing news. The spark lacks direction. Focus enthusiasm before acting.",
    general: "Page of Wands embodies the spirit of exploration - curious, passionate, ready to discover."
  },
  "Knight of Wands": {
    upright: "Charge forward with passionate confidence. Adventure calls; boldness conquers. Let nothing slow your quest.",
    reversed: "Reckless action or scattered energy. The horse bolts without direction. Harness passion with purpose.",
    general: "Knight of Wands rides the flame itself - daring, charismatic, consumed by the journey."
  },
  "Queen of Wands": {
    upright: "Radiant confidence attracts success. Creative power flows through warmth and determination. Lead with passionate grace.",
    reversed: "Jealousy or diminished confidence. The flame turns inward. Reclaim your warmth and generous spirit.",
    general: "Queen of Wands commands through attraction - her fire warms rather than burns, inspires rather than demands."
  },
  "King of Wands": {
    upright: "Visionary leadership inspires action. Bold enterprise succeeds through passionate direction. Command the flame.",
    reversed: "Tyrannical or impotent leadership. The fire consumes or dies. Balance passion with wisdom.",
    general: "King of Wands masters creative force - channeling raw passion into enduring achievement."
  },
  // ============ 圣杯牌组 (Cups) ============
  "Ace of Cups": {
    upright: "Emotional wellspring overflows. New love, compassion, or spiritual awakening begins. Open your heart.",
    reversed: "Emotional blockage or repressed feelings. The cup empties. Heal before you can receive.",
    general: "Ace of Cups is the gift of emotional and spiritual abundance - the heart ready to love and be loved."
  },
  "Two of Cups": {
    upright: "Souls recognize each other. Partnership forms through mutual attraction. Union balances two into one.",
    reversed: "Disharmony in relationship or self-love lacking. The cups no longer touch. Restore balance within.",
    general: "Two of Cups celebrates connection - the magic when two souls choose each other."
  },
  "Three of Cups": {
    upright: "Friendship celebrates abundance. Community rejoices together. Share joy with those who matter.",
    reversed: "Isolation or superficial connections. The party feels empty. Seek depth over distraction.",
    general: "Three of Cups honors the pleasure of belonging - hearts lifted together in celebration."
  },
  "Four of Cups": {
    upright: "Contemplation reveals missed opportunities. Dissatisfaction blinds to gifts offered. Look up from brooding.",
    reversed: "Renewed interest or accepting opportunity. The cup is finally seen. Gratitude replaces apathy.",
    general: "Four of Cups warns against emotional withdrawal - when we refuse the very thing we seek."
  },
  "Five of Cups": {
    upright: "Grief demands acknowledgment. Loss cannot be denied, but two cups still stand. Mourn, then turn around.",
    reversed: "Recovery begins or grief prolonged. The remaining cups await. Accept loss to find what remains.",
    general: "Five of Cups honors necessary sorrow - the cups spilled cannot be refilled, but not all is lost."
  },
  "Six of Cups": {
    upright: "Innocence returns through memory. Childhood gifts resurface; nostalgia heals. Simple joy remembers itself.",
    reversed: "Living in the past or stolen innocence. Nostalgia becomes escape. Honor the past, live in present.",
    general: "Six of Cups returns us to innocence - the pure exchange of gifts between trusting hearts."
  },
  "Seven of Cups": {
    upright: "Fantasy offers many visions. Imagination flourishes but choices paralyze. Discern dream from delusion.",
    reversed: "Clarity emerges from confusion. Illusions dispel; choices crystallize. Reality becomes workable.",
    general: "Seven of Cups shows the danger of endless dreaming - when possibility becomes paralysis."
  },
  "Eight of Cups": {
    upright: "The heart seeks deeper meaning. What once satisfied no longer serves. Walk away toward truth.",
    reversed: "Fear of abandonment or aimless wandering. The departure is delayed or directionless. Know why you leave.",
    general: "Eight of Cups honors the courage to leave - when the soul outgrows what the ego accumulated."
  },
  "Nine of Cups": {
    upright: "Wishes manifest in satisfaction. Emotional fulfillment achieved. The heart has what it wanted.",
    reversed: "Superficial satisfaction or greed. The wish granted disappoints. Examine what truly fulfills.",
    general: "Nine of Cups grants the wish - emotional abundance that comes from alignment with true desire."
  },
  "Ten of Cups": {
    upright: "Emotional paradise achieved. Family harmony, lasting happiness, dreams fulfilled. The rainbow promises kept.",
    reversed: "Broken home or unrealistic expectations. The rainbow fades. Rebuild foundations of true connection.",
    general: "Ten of Cups is the heart complete home - love radiating through generations, blessing all it touches."
  },
  "Page of Cups": {
    upright: "Sensitive messenger brings emotional news. Intuition awakens; creative inspiration surfaces. Listen to the fish.",
    reversed: "Emotional immaturity or blocked creativity. The message confused. Ground sensitivity in reality.",
    general: "Page of Cups embodies innocent wonder - the heart open to magic, surprised by its own depths."
  },
  "Knight of Cups": {
    upright: "Romantic quest advances with grace. Follow the heart path; beauty guides. The lover approaches.",
    reversed: "Moodiness or unrealistic romance. The knight dreams but does not arrive. Balance feeling with action.",
    general: "Knight of Cups pursues the beautiful - guided by heart rather than logic, feeling rather than thinking."
  },
  "Queen of Cups": {
    upright: "Emotional wisdom flows through intuition. Nurturing presence heals; compassion understands without words.",
    reversed: "Emotional manipulation or codependency. The waters become possessive. Maintain boundaries with love.",
    general: "Queen of Cups knows the language of feeling - her throne rises from the sea of collective emotion."
  },
  "King of Cups": {
    upright: "Emotional mastery governs with compassion. Calm waters run deep; wisdom balances feeling and form.",
    reversed: "Emotional volatility or coldness. The king drowns or freezes. Integrate feeling with responsibility.",
    general: "King of Cups commands the realm of feeling - power that serves through understanding, not control."
  },
  // ============ 宝剑牌组 (Swords) ============
  "Ace of Swords": {
    upright: "Mental breakthrough cuts through confusion. Truth reveals itself; clarity empowers. Wield the mind sword.",
    reversed: "Confusion or misused intellect. The sword cuts the wielder. Sharpen discernment before striking.",
    general: "Ace of Swords is pure mental force - the moment when thought pierces illusion and truth stands clear."
  },
  "Two of Swords": {
    upright: "Stalemate demands decision. Blindfolded balance cannot last; choose despite uncertainty.",
    reversed: "Information reveals or confusion deepens. The blindfold lifts or binds tighter. Face what you avoid.",
    general: "Two of Swords shows the paralysis of the balanced mind - when logic alone cannot resolve the heart dilemma."
  },
  "Three of Swords": {
    upright: "Heartbreak demands feeling. Sorrow pierces but also releases. Let the rain wash the wound clean.",
    reversed: "Recovery from heartache or prolonged grief. The swords withdraw slowly. Healing requires time and intention.",
    general: "Three of Swords honors necessary pain - the piercing that opens the heart to deeper truth."
  },
  "Four of Swords": {
    upright: "Rest restores the warrior. Retreat heals; meditation prepares. The battle pauses for recovery.",
    reversed: "Restlessness or forced activity. The tomb offers no peace. True rest requires surrender.",
    general: "Four of Swords grants sanctuary - the still point where the mind recovers its strength."
  },
  "Five of Swords": {
    upright: "Hollow victory through conflict. Winning costs more than losing. Count what the battle truly gained.",
    reversed: "Reconciliation possible or defeat accepted. The swords are lowered. Pride released allows healing.",
    general: "Five of Swords reveals the pyrrhic victory - when winning destroys what was worth fighting for."
  },
  "Six of Swords": {
    upright: "Transition to calmer waters. Leaving difficulty behind; gradual healing through movement. The worst is over.",
    reversed: "Stuck in troubled waters or resisting transition. The boat does not move. Release what anchors you.",
    general: "Six of Swords carries us from storm to shore - the quiet journey from turbulence to peace."
  },
  "Seven of Swords": {
    upright: "Strategy requires stealth. Not all battles are won directly; cunning has its place. Act with care.",
    reversed: "Deception exposed or conscience awakens. The thief is caught. Honesty may cost less than trickery.",
    general: "Seven of Swords walks the shadow line - where strategy becomes deception, cleverness becomes betrayal."
  },
  "Eight of Swords": {
    upright: "Self-imprisonment through thought. The bonds are mental; freedom requires new perception. Open your eyes.",
    reversed: "Liberation from limiting beliefs. The blindfold falls; movement becomes possible. You were never truly trapped.",
    general: "Eight of Swords shows the prison of the mind - surrounded by fears that only thought created."
  },
  "Nine of Swords": {
    upright: "Anxiety haunts the night. Worry magnifies in darkness. These swords exist only in the mind.",
    reversed: "Hope returns or anxiety peaks before release. Dawn approaches. The nightmare ends with waking.",
    general: "Nine of Swords is the dark night of the soul - when fear multiplies in the absence of light."
  },
  "Ten of Swords": {
    upright: "Complete ending arrives. The worst has happened; only dawn remains. From total defeat, rise anew.",
    reversed: "Refusing to accept ending or recovery beginning. The swords release slowly. The bottom was reached.",
    general: "Ten of Swords marks absolute conclusion - the death that precedes rebirth, the end that enables beginning."
  },
  "Page of Swords": {
    upright: "Curious mind investigates eagerly. New ideas spark; communication quickens. Think before speaking.",
    reversed: "Gossip or scattered thinking. The sword plays dangerously. Discipline the mind before it cuts carelessly.",
    general: "Page of Swords embodies mental agility - quick, curious, sometimes cutting without knowing."
  },
  "Knight of Swords": {
    upright: "Charge forward with intellectual force. Ideas demand action; debate becomes battle. Strike swiftly and true.",
    reversed: "Reckless thinking or harsh words. The knight attacks without cause. Pause before the mind sword strikes.",
    general: "Knight of Swords rides the storm of thought - brilliant, fierce, sometimes destructive in certainty."
  },
  "Queen of Swords": {
    upright: "Clear perception cuts through deception. Independent mind judges fairly. Truth spoken with precision.",
    reversed: "Coldness or cruel judgment. The sword wounds those who approach. Warm the mind with heart.",
    general: "Queen of Swords sees without illusion - her clarity earned through loss, her judgment tempered by experience."
  },
  "King of Swords": {
    upright: "Intellectual authority commands respect. Clear thinking creates order. Justice requires impartial truth.",
    reversed: "Tyranny of logic or mental cruelty. The king rules without heart. Power needs wisdom and compassion.",
    general: "King of Swords masters the realm of mind - authority through clarity, power through understanding."
  },
  // ============ 星币牌组 (Pentacles) ============
  "Ace of Pentacles": {
    upright: "Material opportunity manifests. New prosperity, health, or practical venture begins. Plant the golden seed.",
    reversed: "Missed opportunity or poor investment. The coin slips through fingers. Ground yourself before grasping.",
    general: "Ace of Pentacles is the seed of abundance - material potential waiting to be cultivated into wealth."
  },
  "Two of Pentacles": {
    upright: "Balance multiple demands with grace. Adaptation keeps you afloat; flexibility maintains harmony.",
    reversed: "Overwhelm or dropped responsibilities. The juggling fails. Simplify before you drop everything.",
    general: "Two of Pentacles dances with change - finding rhythm in flux, stability in motion."
  },
  "Three of Pentacles": {
    upright: "Collaboration builds excellence. Skilled work earns recognition; teamwork elevates craft. Master your contribution.",
    reversed: "Poor teamwork or mediocre effort. The work suffers from neglect. Commit fully or step aside.",
    general: "Three of Pentacles honors craftsmanship - when skill, collaboration, and dedication create lasting value."
  },
  "Four of Pentacles": {
    upright: "Security through conservation. What you hold, holds you. Protection may become prison.",
    reversed: "Releasing control or financial loss. The grip loosens. Freedom requires letting go of certainty.",
    general: "Four of Pentacles shows the paradox of possession - the more tightly we hold, the more we lose."
  },
  "Five of Pentacles": {
    upright: "Material or spiritual poverty weighs heavy. Help exists but seems unreachable. Look up from lack.",
    reversed: "Recovery from hardship begins. The church door opens. Accepting help enables healing.",
    general: "Five of Pentacles walks the cold night - testing faith when resources fail, finding light in darkness."
  },
  "Six of Pentacles": {
    upright: "Generosity flows in balance. Give and receive with grace; charity creates circulation. Share your abundance.",
    reversed: "Strings attached to gifts or unequal exchange. The scales tip unfairly. Examine the true cost of giving.",
    general: "Six of Pentacles weighs the exchange - reminding us that all prosperity is borrowed from the whole."
  },
  "Seven of Pentacles": {
    upright: "Patience awaits harvest. Investment grows slowly; evaluation guides next steps. Trust the process.",
    reversed: "Impatience or poor returns. The crop disappoints. Reassess before investing more time.",
    general: "Seven of Pentacles pauses at the garden gate - contemplating whether the harvest will justify the labor."
  },
  "Eight of Pentacles": {
    upright: "Dedicated practice perfects skill. Apprenticeship rewards diligence. Master through repetition.",
    reversed: "Shortcuts undermine quality or work becomes drudgery. The craft suffers from neglect. Renew commitment.",
    general: "Eight of Pentacles honors the discipline of mastery - each coin carved brings greater skill."
  },
  "Nine of Pentacles": {
    upright: "Refined abundance earned through effort. Self-sufficiency blooms; enjoy what you have cultivated.",
    reversed: "Over-reliance on material success or loneliness in luxury. The garden isolates. Share your harvest.",
    general: "Nine of Pentacles celebrates earned independence - the fruits of discipline enjoyed in gracious solitude."
  },
  "Ten of Pentacles": {
    upright: "Generational wealth established. Legacy secure; family prospers. What you build outlasts you.",
    reversed: "Family conflict over resources or unstable foundations. The legacy crumbles. Invest in relationships first.",
    general: "Ten of Pentacles completes the material journey - abundance that flows through time, blessing generations."
  },
  "Page of Pentacles": {
    upright: "Studious messenger brings practical opportunity. New skills develop; diligence promises reward. Begin with care.",
    reversed: "Lack of focus or wasted opportunity. The student does not study. Ground dreams in practical action.",
    general: "Page of Pentacles embodies the eager apprentice - learning the material world with wonder and determination."
  },
  "Knight of Pentacles": {
    upright: "Steady progress builds lasting results. Reliability conquers through persistence. The tortoise wins.",
    reversed: "Stubbornness or stagnation. The knight will not move. Adaptability serves better than rigidity.",
    general: "Knight of Pentacles advances through endurance - slow, certain, unstoppable in purpose."
  },
  "Queen of Pentacles": {
    upright: "Nurturing abundance supports all. Practical wisdom creates comfort; generosity grows naturally. Tend your garden.",
    reversed: "Neglecting self or others materially. The garden withers from inattention. Balance giving with receiving.",
    general: "Queen of Pentacles nurtures the material world - her touch makes things grow, her presence creates home."
  },
  "King of Pentacles": {
    upright: "Material mastery achieved through wisdom. Abundant success supports many; prosperity serves purpose.",
    reversed: "Greed or material obsession. The king hoards without joy. Remember what wealth is truly for.",
    general: "King of Pentacles commands the realm of matter - wealth that serves wisdom, abundance that builds rather than corrupts."
  }
};

// 获取牌义的辅助函数
export const getTarotMeaning = (cardName: string): TarotMeaning | undefined => {
  return TAROT_MEANINGS[cardName];
};

// 获取占卜解读（正位或逆位）
export const getReading = (cardName: string, isReversed: boolean): string => {
  const meaning = TAROT_MEANINGS[cardName];
  if (!meaning) {
    return "The mists are too thick to see the future clearly right now. Meditate on the card itself.";
  }
  return isReversed ? meaning.reversed : meaning.upright;
};

// 获取通用牌义
export const getGeneralMeaning = (cardName: string): string => {
  const meaning = TAROT_MEANINGS[cardName];
  if (!meaning) {
    return "Knowledge is hidden.";
  }
  return meaning.general;
};
