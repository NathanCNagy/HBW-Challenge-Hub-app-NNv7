import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck, Heart, Sparkles, Zap, Users, Info, Flame, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EcosystemVisualizationProps {
  category: 'Environment' | 'Well-Being' | 'Compassion' | 'Responsible AI';
  streak: number;
  individualEnergy: number;
  setIndividualEnergy: React.Dispatch<React.SetStateAction<number>>;
  hasLoggedToday: boolean;
  onLogToday: () => void;
  goalTitle: string;
  bubbles: { id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }[];
  setBubbles: React.Dispatch<React.SetStateAction<{ id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }[]>>;
  theme?: 'dark' | 'light';
}

export default function EcosystemVisualization({
  category,
  streak,
  individualEnergy,
  setIndividualEnergy,
  hasLoggedToday,
  onLogToday,
  goalTitle,
  bubbles,
  setBubbles,
  theme = 'light'
}: EcosystemVisualizationProps) {
  const [raindrops, setRaindrops] = useState<{ id: string; startX: number; startY: number; targetX: number; delay: number; size: number }[]>([]);
  const [isHydrating, setIsHydrating] = useState<boolean>(false);
  const [hydrationMessage, setHydrationMessage] = useState<string>('');

  const handlePopBubble = (id: number, value: number, cx: number, cy: number) => {
    setIndividualEnergy(prev => prev + value);
    setBubbles(prev => prev.filter(b => b.id !== id));

    // Generate cheerful hydration rainfall drops originating from cloud position down to the tree
    const newRaindrops = Array.from({ length: 16 }).map((_, i) => ({
      id: `rain-${Date.now()}-${i}-${Math.random()}`,
      startX: cx + (Math.random() * 10 - 5), // slight horizontal variance
      startY: cy + 3, // starting below the cloud
      targetX: 50 + (Math.random() * 18 - 9), // lands near tree base (x: 50%)
      delay: i * 0.035,
      size: 8 + Math.random() * 7
    }));

    setRaindrops(prev => [...prev, ...newRaindrops]);
    setIsHydrating(true);
    setHydrationMessage(`+${value}g Hydrated! 💧`);

    // Clear drops after animation
    setTimeout(() => {
      setRaindrops(prev => prev.filter(r => !newRaindrops.some(nr => nr.id === r.id)));
    }, 1100);

    setTimeout(() => {
      setIsHydrating(false);
    }, 1400);
  };

  // Group stats mapped to categories
  const groupStats = {
    'Environment': {
      groupName: 'The Plant-Forward Kitchen & Active Travelers',
      subgroup: 'Environmental Challenge Group',
      activeMembers: '24,198',
      collectiveScore: 762340 + streak * 140,
      resourceLabel: 'CO2 emissions offset',
      resourceValue: `${(125480 + (individualEnergy * 2.3)).toLocaleString(undefined, { maximumFractionDigits: 0 })} kg`,
      visualColor: 'from-[#0285ff]/30 to-emerald-500/20'
    },
    'Well-Being': {
      groupName: 'Universal Vitality & Digital Mindfulness',
      subgroup: 'Well-Being Challenge Group',
      activeMembers: '18,402',
      collectiveScore: 341200 + streak * 98,
      resourceLabel: 'Focused hours reclaimed',
      resourceValue: `${(48910 + (individualEnergy * 0.4)).toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs`,
      visualColor: 'from-[#0285ff]/30 to-indigo-500/20'
    },
    'Compassion': {
      groupName: 'Everyday Kindness & Food Security allies',
      subgroup: 'Kindness Challenge Group',
      activeMembers: '15,221',
      collectiveScore: 182340 + streak * 74,
      resourceLabel: 'Stranger interactions & support logs',
      resourceValue: `${(54290 + individualEnergy).toLocaleString()} acts`,
      visualColor: 'from-[#0285ff]/30 to-pink-500/20'
    },
    'Responsible AI': {
      groupName: 'Cognitive Integrity & AI Fact-Checkers',
      subgroup: 'Mindful AI Challenge Group',
      activeMembers: '9,812',
      collectiveScore: 98420 + streak * 52,
      resourceLabel: 'Server compute cycles saved',
      resourceValue: `${(5400000 + (individualEnergy * 150)).toLocaleString()} units`,
      visualColor: 'from-[#0285ff]/30 to-teal-500/20'
    }
  }[category];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Mini Interactive Onboarding Tip */}
      <div className={`p-3.5 border rounded-[16px] flex items-start gap-2.5 shadow-xs transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
      }`}>
        <Info className="w-4 h-4 text-[#0080FF] shrink-0 mt-0.5" />
        <div className="space-y-0.5 flex-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0080FF] block">How it works</span>
          <p className={`text-xs leading-normal font-sans ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>
            Completing your daily habit fills the sky with rain clouds. Tap floating clouds to release rainfall, hydrating your plant with Habit Energy (<Zap className="inline w-3 h-3 text-[#0080FF] fill-[#0080FF]" />) and helping your shared ecosystem thrive!
          </p>
        </div>
      </div>

      {/* Interactive Alipay-Style Ant Forest Stage */}
      <div className={`relative w-full h-[320px] rounded-[20px] overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 border ${
        theme === 'dark' 
          ? 'bg-[#0A0A0C] border-[#1F1F24] shadow-md text-white' 
          : 'bg-gradient-to-b from-[#EBF5FF] via-[#E2F0FE] to-[#D5E8FC] border-[#BDE0FE] shadow-sm text-[#1C1C1E]'
      }`}>
        {/* Dynamic visual overlay corresponding to category */}
        <div className={`absolute inset-0 bg-gradient-to-b ${groupStats.visualColor} ${theme === 'dark' ? 'opacity-25' : 'opacity-40'} pointer-events-none`} />

        {/* Top Header stats overlay */}
        <div className="flex justify-between items-start z-10">
          <div className={`space-y-0.5 p-2 px-3 rounded-full border backdrop-blur-md ${
            theme === 'dark' ? 'bg-[#121214]/80 border-[#1F1F24]' : 'bg-white/90 border-[#BDE0FE] shadow-2xs'
          }`}>
            <span className={`text-[9px] font-mono uppercase tracking-widest font-bold block ${
              theme === 'dark' ? 'text-[#98989D]' : 'text-[#5C6C7E]'
            }`}>HABIT ENERGY</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#0080FF] fill-[#0080FF]" />
              <span className={`text-sm font-serif font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'
              }`}>{individualEnergy} g</span>
            </div>
          </div>

          <div className={`text-right space-y-0.5 p-2 px-3 rounded-full border backdrop-blur-md ${
            theme === 'dark' ? 'bg-[#121214]/80 border-[#1F1F24]' : 'bg-white/90 border-[#BDE0FE] shadow-2xs'
          }`}>
            <span className={`text-[9px] font-mono uppercase tracking-widest font-bold block ${
              theme === 'dark' ? 'text-[#98989D]' : 'text-[#5C6C7E]'
            }`}>GROUP PROGRESS</span>
            <div className="flex items-center gap-1 justify-end">
              <Users className="w-3.5 h-3.5 text-[#0080FF]" />
              <span className={`text-xs font-sans font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'
              }`}>Level {Math.floor(groupStats.collectiveScore / 100000)}</span>
            </div>
          </div>
        </div>

        {/* Floating Monochromatic Cloud Outlines */}
        <div className="absolute inset-x-0 top-16 bottom-20 z-20 overflow-visible pointer-events-none">
          <AnimatePresence>
            {bubbles.map((bubble) => (
              <div
                key={bubble.id}
                style={{ left: `${bubble.cx}%`, top: `${bubble.cy}%`, transform: 'translate(-50%, -50%)' }}
                className="absolute z-20 pointer-events-auto"
              >
                <motion.button
                  initial={{ scale: 0, y: 15, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    y: [0, -6, 0], 
                    opacity: 0.98,
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 3 + (bubble.id % 3) * 0.7,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  exit={{ scale: 1.25, opacity: 0, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handlePopBubble(bubble.id, bubble.value, bubble.cx, bubble.cy)}
                  className="relative flex flex-col items-center justify-center cursor-pointer select-none group pointer-events-auto focus:outline-hidden"
                >
                  {/* Monochromatic Vector Cloud Outline */}
                  <div className="relative flex items-center justify-center">
                    <svg width="68" height="44" viewBox="0 0 68 44" className="overflow-visible filter drop-shadow-xs">
                      <path
                        d="M 14 36 
                           C 7 36, 2 30, 3 23 
                           C 4 16, 11 11, 18 12 
                           C 21 5, 29 1, 37 3 
                           C 45 4, 50 10, 51 16 
                           C 58 16, 64 21, 63 28 
                           C 62 35, 56 36, 50 36 
                           Z"
                        fill={
                          bubble.isNew
                            ? theme === 'dark' ? 'rgba(0, 128, 255, 0.25)' : 'rgba(0, 128, 255, 0.12)'
                            : theme === 'dark' ? 'rgba(18, 18, 20, 0.85)' : 'rgba(255, 255, 255, 0.92)'
                        }
                        stroke={
                          bubble.isNew
                            ? '#0080FF'
                            : theme === 'dark' ? '#38BDF8' : '#0080FF'
                        }
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Centered Energy Amount (+10g) & Type Tag */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5 pointer-events-none">
                      <span className={`text-[11px] font-mono font-bold tracking-tight leading-none ${
                        bubble.isNew
                          ? 'text-[#0080FF] font-extrabold'
                          : theme === 'dark' ? 'text-white' : 'text-[#0080FF]'
                      }`}>
                        +{bubble.value}g
                      </span>
                      <span className={`text-[7px] font-sans font-bold uppercase tracking-wider leading-none mt-1 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                      }`}>
                        {bubble.type}
                      </span>
                    </div>

                    {bubble.isNew && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[7px] font-mono font-bold uppercase tracking-wide bg-[#0080FF] text-white rounded-full shadow-xs">
                        NEW
                      </span>
                    )}
                  </div>
                </motion.button>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Rainfall Particles Container */}
        <AnimatePresence>
          {raindrops.map((drop) => (
            <motion.div
              key={drop.id}
              initial={{ 
                left: `${drop.startX}%`, 
                top: `${drop.startY}%`, 
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                left: `${drop.targetX}%`, 
                top: '78%', // Hits the plant level
                opacity: [0, 1, 1, 0.8, 0],
                scale: [0.5, 1, 0.9, 0.3]
              }}
              transition={{ 
                duration: 0.75, 
                delay: drop.delay, 
                ease: "easeIn" 
              }}
              className="absolute z-30 pointer-events-none transform -translate-x-1/2"
            >
              {/* Hydration Rain Drop SVG */}
              <svg width={drop.size} height={drop.size * 1.4} viewBox="0 0 16 22" className="drop-shadow-xs">
                <path 
                  d="M 8 1 C 8 1 1 10 1 15 A 7 7 0 0 0 15 15 C 15 10 8 1 8 1 Z" 
                  fill="#38BDF8" 
                  opacity="0.9"
                />
                <circle cx="6" cy="13" r="1.8" fill="#FFFFFF" opacity="0.8" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hydration Ripple FX & Banner */}
        <AnimatePresence>
          {isHydrating && (
            <>
              <motion.div
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, repeat: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full border-2 border-sky-400 bg-sky-400/20 pointer-events-none z-10"
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none font-bold font-mono text-xs text-[#0080FF] bg-white/95 dark:bg-[#121214]/95 border border-[#38BDF8] px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce"
              >
                <span className="text-sm">💧</span>
                <span>{hydrationMessage}</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* The Growth Visual Tree / Plant with Hydration Bounce */}
        <motion.div 
          animate={isHydrating ? { 
            scale: [1, 1.1, 0.96, 1.05, 1],
            rotate: [0, -2, 2, -1, 0]
          } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none z-10"
        >
          <svg width="220" height="150" viewBox="0 0 220 150" className={theme === 'dark' ? "drop-shadow-[0_0_15px_rgba(0,128,255,0.25)]" : "drop-shadow-[0_4px_10px_rgba(0,128,255,0.2)]"}>
            {/* Ground */}
            <path 
              d="M 20 140 Q 110 120 200 140 Q 110 155 20 140" 
              fill={theme === 'dark' ? "#00152e" : "#BDE0FE"} 
              stroke={theme === 'dark' ? "#002d5c" : "#90C8FF"} 
              strokeWidth="1.5" 
            />
            
            {/* Trunk / Base stem */}
            <path 
              d={`M 110 140 Q ${110 + Math.sin(streak) * 5} ${120 - streak * 1} 110 ${140 - Math.min(20 + streak * 4, 90)}`} 
              stroke={theme === 'dark' ? "#0080FF" : "#0066CC"} 
              strokeWidth={Math.min(3 + streak * 0.4, 10)} 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Left Branch */}
            {streak >= 3 && (
              <path 
                d={`M 110 ${140 - Math.min(10 + streak * 2, 45)} Q 90 ${130 - streak * 2.5} 80 ${120 - Math.min(10 + streak * 1.5, 40)}`} 
                stroke={theme === 'dark' ? "#0080FF" : "#0066CC"} 
                strokeWidth={Math.min(2 + streak * 0.2, 5)} 
                strokeLinecap="round" 
                fill="none" 
              />
            )}

            {/* Right Branch */}
            {streak >= 5 && (
              <path 
                d={`M 110 ${140 - Math.min(20 + streak * 2, 55)} Q 130 ${125 - streak * 2} 140 ${115 - Math.min(15 + streak * 1.2, 45)}`} 
                stroke={theme === 'dark' ? "#0080FF" : "#0066CC"} 
                strokeWidth={Math.min(1.5 + streak * 0.2, 4.5)} 
                strokeLinecap="round" 
                fill="none" 
              />
            )}

            {/* Foliage / Leaves */}
            <path 
              d={`M 110 ${140 - Math.min(20 + streak * 4, 90)} C 100 ${115 - streak * 4} 100 ${100 - streak * 4} 110 ${90 - Math.min(streak * 2.2, 40)} C 120 ${100 - streak * 4} 120 ${115 - streak * 4} 110 ${140 - Math.min(20 + streak * 4, 90)}`} 
              fill={streak >= 7 ? (theme === 'dark' ? "#0080FF" : "#0080FF") : (theme === 'dark' ? "#0055B3" : "#3399FF")} 
              opacity="0.9" 
            />

            {streak >= 4 && (
              <circle cx="80" cy={120 - Math.min(10 + streak * 1.5, 40)} r={Math.min(4 + streak * 0.6, 12)} fill={theme === 'dark' ? "#0066CC" : "#34C759"} opacity="0.85" />
            )}
            {streak >= 6 && (
              <circle cx="140" cy={115 - Math.min(15 + streak * 1.2, 45)} r={Math.min(3 + streak * 0.6, 11)} fill={theme === 'dark' ? "#3399FF" : "#00A86B"} opacity="0.85" />
            )}
            {streak >= 10 && (
              <circle cx="95" cy="85" r="9" fill={theme === 'dark' ? "#80BFFF" : "#60A5FA"} opacity="0.9" />
            )}
            {streak >= 14 && (
              <circle cx="125" cy="75" r="10" fill="#ffffff" opacity="0.95" className="animate-pulse" />
            )}

            <circle cx="110" cy="45" r="1.5" fill="#fff" className="animate-ping" />
            <circle cx="70" cy="75" r="1" fill="#0080FF" />
            <circle cx="150" cy="80" r="1" fill="#80BFFF" />

            {/* Sparkling water dots on foliage during rainfall hydration */}
            {isHydrating && (
              <>
                <circle cx="105" cy="80" r="2.5" fill="#38BDF8" className="animate-ping" />
                <circle cx="118" cy="70" r="2" fill="#7DD3FC" className="animate-pulse" />
                <circle cx="92" cy="95" r="2" fill="#38BDF8" className="animate-ping" />
                <circle cx="130" cy="100" r="2" fill="#7DD3FC" className="animate-pulse" />
              </>
            )}
          </svg>
        </motion.div>

        {/* Bottom banner warning and hints */}
        <div className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center z-10 px-4 text-center">
          <p className={`text-[10px] font-sans font-semibold tracking-wide flex flex-col sm:flex-row items-center gap-1 p-1 px-3.5 rounded-full border backdrop-blur-md ${
            theme === 'dark' ? 'bg-[#121214]/90 border-[#1F1F24] text-white' : 'bg-white/90 border-[#BDE0FE] text-[#1C1C1E] shadow-2xs'
          }`}>
            <span className={hasLoggedToday ? "text-[#0080FF]" : "text-[#FF9500]"}>
              {hasLoggedToday ? "💧 Ecosystem hydrated!" : "🌱 Nurture your tree today!"}
            </span>
            <span className="text-[#98989D] sm:before:content-['•'] sm:before:mx-1">
              Tap floating clouds to send rainfall & hydrate your tree!
            </span>
          </p>
        </div>
      </div>

      {/* Gamified Impact Progress Indicators */}
      <div className={`p-4 border rounded-[16px] shadow-xs flex flex-col gap-3 ${
        theme === 'dark' ? 'bg-[#121214] border-[#1F1F24] text-white' : 'bg-white border-[#E5E5EA] text-[#1C1C1E]'
      }`}>
        <div className={`flex justify-between items-center border-b pb-2.5 ${
          theme === 'dark' ? 'border-[#1F1F24]' : 'border-[#E5E5EA]'
        }`}>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#0080FF]" />
            <h4 className={`text-xs font-sans font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'}`}>
              Community Challenge
            </h4>
          </div>
          <span className={`text-[10px] font-mono uppercase font-semibold ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>90-Day Campaign</span>
        </div>

        <div className="space-y-1">
          <p className={`text-xs font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'}`}>
            {groupStats.groupName}
          </p>
          <p className={`text-xs font-sans leading-normal ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>
            Your daily {goalTitle} habit supports this group. The combined effort creates systemic change.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className={`p-3 border rounded-[14px] text-center space-y-0.5 ${
            theme === 'dark' ? 'bg-[#0A0A0C] border-[#1F1F24]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
          }`}>
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>GROUP SCORE</span>
            <span className="text-sm font-serif text-[#0080FF] font-semibold block">
              {groupStats.collectiveScore.toLocaleString()} pts
            </span>
          </div>

          <div className={`p-3 border rounded-[14px] text-center space-y-0.5 ${
            theme === 'dark' ? 'bg-[#0A0A0C] border-[#1F1F24]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
          }`}>
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>{groupStats.resourceLabel.toUpperCase()}</span>
            <span className={`text-sm font-serif font-semibold block ${theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'}`}>
              {groupStats.resourceValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
