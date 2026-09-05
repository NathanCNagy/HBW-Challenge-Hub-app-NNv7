/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Bell, 
  Check, 
  X 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Goal } from '../../types';

interface HomeTabProps {
  activeGoal: Goal;
  checklist: {
    habitDone: boolean;
    anchorDone: boolean;
    reflectDone: boolean;
  };
  onCheckItem: (item: 'habitDone' | 'anchorDone' | 'reflectDone') => void;
  hasLoggedToday: boolean;
  onLogSuccess: () => void;
  bubbles: Array<{ id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }>;
  dismissedBubbleAlert: boolean;
  setDismissedBubbleAlert: (dismissed: boolean) => void;
  motivationalQuote: string;
  hasConfiguredNotifications: boolean;
  anchorHabit: string;
  setAnchorHabit: (anchor: string) => void;
  onQuickEnableReminders: () => void;
  onNavigateToTab: (tab: 'progress' | 'profile') => void;
  theme: 'dark' | 'light';
}

export default function HomeTab({
  activeGoal,
  checklist,
  onCheckItem,
  hasLoggedToday,
  onLogSuccess,
  bubbles,
  dismissedBubbleAlert,
  setDismissedBubbleAlert,
  motivationalQuote,
  hasConfiguredNotifications,
  anchorHabit,
  setAnchorHabit,
  onQuickEnableReminders,
  onNavigateToTab,
  theme
}: HomeTabProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Active Focus Header Details */}
      <div className={`p-4 border rounded-[16px] shadow-xs flex flex-col gap-1.5 relative overflow-hidden transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
      }`}>
        <div className="flex items-center gap-1.5 z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0080FF]">
            Today's Focus
          </span>
        </div>
        <h3 className="text-base font-serif font-normal leading-tight z-10 truncate">
          {activeGoal.title}
        </h3>
        <p className={`text-xs leading-normal font-sans z-10 ${
          theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'
        }`}>
          {activeGoal.action}
        </p>
      </div>

      {/* Daily Checklist Card */}
      <div className={`p-4 border rounded-[16px] shadow-xs flex flex-col gap-3.5 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
      }`}>
        <div className={`flex items-center justify-between border-b pb-2.5 ${
          theme === 'dark' ? 'border-[#1F1F24]' : 'border-[#E5E5EA]'
        }`}>
          <h4 className="text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#0080FF]" />
            Daily Checklist
          </h4>
          <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#8E8E93]'}`}>Tap to check</span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Checklist Item 1 */}
          <button
            onClick={() => onCheckItem('habitDone')}
            className={`flex items-start gap-3 text-left transition-colors p-1.5 rounded-xl cursor-pointer ${
              theme === 'dark' ? 'hover:bg-[#1A1A1E]' : 'hover:bg-[#F5F5F7]'
            }`}
          >
            <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checklist.habitDone 
                ? 'bg-[#0080FF] border-[#0080FF] text-white' 
                : theme === 'dark' ? 'border-[#3A3A3C] text-transparent' : 'border-[#D1D1D6] text-transparent'
            }`}>
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="space-y-0.5">
              <span className={`font-semibold text-xs leading-tight block ${
                checklist.habitDone 
                  ? 'line-through text-[#8E8E93]' 
                  : theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'
              }`}>
                Complete habit
              </span>
              <span className={`text-[11px] block leading-normal ${
                theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'
              }`}>{activeGoal.action}</span>
            </div>
          </button>

          {/* Checklist Item 2 */}
          <button
            onClick={() => onCheckItem('anchorDone')}
            className={`flex items-start gap-3 text-left transition-colors p-1.5 rounded-xl cursor-pointer ${
              theme === 'dark' ? 'hover:bg-[#1A1A1E]' : 'hover:bg-[#F5F5F7]'
            }`}
          >
            <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checklist.anchorDone 
                ? 'bg-[#0080FF] border-[#0080FF] text-white' 
                : theme === 'dark' ? 'border-[#3A3A3C] text-transparent' : 'border-[#D1D1D6] text-transparent'
            }`}>
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="space-y-0.5">
              <span className={`font-semibold text-xs leading-tight block ${
                checklist.anchorDone 
                  ? 'line-through text-[#8E8E93]' 
                  : theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'
              }`}>
                Pair with daily cue
              </span>
              <span className={`text-[11px] block leading-normal ${
                theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'
              }`}>Done right after {anchorHabit || 'your daily routine'}.</span>
            </div>
          </button>

          {/* Checklist Item 3 */}
          <button
            onClick={() => onCheckItem('reflectDone')}
            className={`flex items-start gap-3 text-left transition-colors p-1.5 rounded-xl cursor-pointer ${
              theme === 'dark' ? 'hover:bg-[#1A1A1E]' : 'hover:bg-[#F5F5F7]'
            }`}
          >
            <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checklist.reflectDone 
                ? 'bg-[#0080FF] border-[#0080FF] text-white' 
                : theme === 'dark' ? 'border-[#3A3A3C] text-transparent' : 'border-[#D1D1D6] text-transparent'
            }`}>
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="space-y-0.5">
              <span className={`font-semibold text-xs leading-tight block ${
                checklist.reflectDone 
                  ? 'line-through text-[#8E8E93]' 
                  : theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'
              }`}>
                Pause and reflect
              </span>
              <span className={`text-[11px] block leading-normal ${
                theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'
              }`}>Take 10 seconds to acknowledge your win.</span>
            </div>
          </button>
        </div>

        {/* Log Button */}
        <button
          onClick={onLogSuccess}
          disabled={hasLoggedToday}
          className={`h-[52px] w-full rounded-full font-sans font-semibold text-[15px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
            hasLoggedToday
              ? theme === 'dark' ? 'bg-[#1F1F24] text-[#8E8E93] cursor-not-allowed' : 'bg-[#E5E5EA] text-[#8E8E93] cursor-not-allowed'
              : 'bg-[#0080FF] hover:bg-[#0066CC] text-white active:scale-[0.99]'
          }`}
        >
          {hasLoggedToday ? (
            <>
              <CheckCircle className="w-4 h-4 text-[#8E8E93]" />
              <span>Logged for Today</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Log Today's Habit</span>
            </>
          )}
        </button>

        {/* Callout button to navigate directly to Progress Tab */}
        <button
          onClick={() => onNavigateToTab('progress')}
          className={`w-full p-3 border rounded-[14px] transition-all flex items-center justify-between group cursor-pointer ${
            theme === 'dark' 
              ? 'bg-[#0080FF]/10 border-[#0080FF]/30 hover:bg-[#0080FF]/20' 
              : 'bg-[#0080FF]/5 border-[#0080FF]/25 hover:bg-[#0080FF]/10'
          }`}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0080FF]/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-[#0080FF]" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#0080FF] leading-snug">Harvest Tree Energy</span>
                {bubbles.length > 0 && (
                  <span className="bg-[#FF9500] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold animate-pulse whitespace-nowrap inline-flex items-center justify-center shrink-0">
                    {bubbles.length} ready!
                  </span>
                )}
              </div>
              <p className={`text-[11px] leading-tight mt-0.5 ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>
                Grow your tree & collect energy bubbles
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#0080FF] group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </button>

        {hasLoggedToday && bubbles.some(b => b.isNew) && !dismissedBubbleAlert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 p-3 bg-[#0080FF]/10 border border-[#0080FF]/30 rounded-[14px] text-center space-y-1 relative"
          >
            <button 
              onClick={() => setDismissedBubbleAlert(true)}
              className="absolute top-1 right-2 text-[#6C6C70] hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-xs font-sans font-semibold text-[#0080FF] pr-4">
              ✨ A new Energy Bubble (+15g) sprouted on your Ecosystem Tree!
            </p>
            <button
              onClick={() => onNavigateToTab('progress')}
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0080FF] hover:underline cursor-pointer"
            >
              Go to Progress Tab to Pop It &rarr;
            </button>
          </motion.div>
        )}
      </div>

      {/* Motivational Psychology Card */}
      <div className={`p-4 border rounded-[16px] shadow-xs flex flex-col gap-2 relative overflow-hidden transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
      }`}>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#0080FF]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0080FF]">
            Daily Motivation
          </span>
        </div>
        <p className={`text-xs leading-relaxed font-sans italic ${
          theme === 'dark' ? 'text-white' : 'text-[#1C1C1E]'
        }`}>
          "{motivationalQuote}"
        </p>
      </div>

      {/* Smart Reminders Section */}
      {!hasConfiguredNotifications ? (
        <div className={`p-4 border rounded-[16px] shadow-xs flex flex-col gap-3 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
        }`}>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-7 h-7 rounded-full bg-[#0080FF]/15 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#0080FF]" />
              </div>
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider truncate">
                Smart Habit Reminders
              </h4>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#FF9500]/15 text-[#FF9500] shrink-0">
              Not Set Up
            </span>
          </div>

          <p className={`text-xs leading-relaxed font-sans ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>
            Pair your habit with a daily routine (like morning coffee) to make consistency automatic.
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={anchorHabit}
                onChange={(e) => setAnchorHabit(e.target.value)}
                placeholder="e.g. pouring morning coffee"
                className={`w-full px-3 py-2.5 text-xs border rounded-xl outline-none focus:border-[#0080FF] ${
                  theme === 'dark' ? 'bg-[#0A0A0C] border-[#1F1F24] text-white' : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#1C1C1E]'
                }`}
              />
              <button
                onClick={onQuickEnableReminders}
                className="w-full py-2.5 bg-[#0080FF] hover:bg-[#0066CC] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs text-center flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Enable Reminders</span>
              </button>
            </div>

            <button
              onClick={() => onNavigateToTab('profile')}
              className={`text-[11px] font-medium underline transition-colors cursor-pointer text-left pt-0.5 ${
                theme === 'dark' ? 'text-[#0080FF] hover:text-[#3399FF]' : 'text-[#0080FF] hover:text-[#0066CC]'
              }`}
            >
              Customize schedule & cues in Profile &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className={`p-3 border rounded-[14px] flex items-center justify-between shadow-xs transition-colors duration-200 ${
          theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#34C759]/15 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-[#34C759]" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Reminders Active</span>
                <span className="text-[9px] font-mono font-bold text-[#34C759] bg-[#34C759]/15 px-1.5 py-0.2 rounded-full">
                  ON
                </span>
              </p>
              <p className={`text-[11px] ${theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'}`}>
                Paired with "{anchorHabit}"
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('profile')}
            className="text-xs font-semibold text-[#0080FF] hover:underline cursor-pointer shrink-0"
          >
            Settings &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
