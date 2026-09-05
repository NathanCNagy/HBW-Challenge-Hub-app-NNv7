/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import EcosystemVisualization from '../EcosystemVisualization';
import { Goal } from '../../types';

interface ProgressTabProps {
  activeGoal: Goal;
  streak: number;
  individualEnergy: number;
  setIndividualEnergy: React.Dispatch<React.SetStateAction<number>>;
  hasLoggedToday: boolean;
  onLogSuccess: () => void;
  bubbles: Array<{ id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }>;
  setBubbles: React.Dispatch<React.SetStateAction<Array<{ id: number; cx: number; cy: number; value: number; type: string; label: string; isNew?: boolean }>>>;
  metrics: {
    primaryBadge?: string;
    primaryValue: string;
    primaryLabel: string;
    secondaryBadge?: string;
    secondaryValue: string;
    secondaryLabel: string;
    targetTip: string;
  };
  theme: 'dark' | 'light';
}

export default function ProgressTab({
  activeGoal,
  streak,
  individualEnergy,
  setIndividualEnergy,
  hasLoggedToday,
  onLogSuccess,
  bubbles,
  setBubbles,
  metrics,
  theme
}: ProgressTabProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <EcosystemVisualization
        category={activeGoal.category}
        streak={streak}
        individualEnergy={individualEnergy}
        setIndividualEnergy={setIndividualEnergy}
        hasLoggedToday={hasLoggedToday}
        onLogToday={onLogSuccess}
        goalTitle={activeGoal.title}
        bubbles={bubbles}
        setBubbles={setBubbles}
        theme={theme}
      />

      {/* Projected Impact Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`py-4 px-3 sm:py-4.5 sm:px-4 border rounded-[16px] text-center shadow-xs transition-colors duration-200 min-w-0 flex flex-col justify-center items-center ${
          theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
        }`}>
          <div className="w-full space-y-1">
            <span className="text-lg sm:text-xl font-mono font-bold text-[#0080FF] block w-full whitespace-nowrap tracking-tight overflow-hidden text-ellipsis">
              {metrics.primaryValue}
            </span>
            <span className={`text-[11px] sm:text-xs font-sans block leading-tight text-center ${
              theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'
            }`}>{metrics.primaryLabel}</span>
          </div>
        </div>

        <div className={`py-4 px-3 sm:py-4.5 sm:px-4 border rounded-[16px] text-center shadow-xs transition-colors duration-200 min-w-0 flex flex-col justify-center items-center ${
          theme === 'dark' ? 'bg-[#121214] border-[#1F1F24]' : 'bg-white border-[#E5E5EA]'
        }`}>
          <div className="w-full space-y-1">
            <span className={`text-lg sm:text-xl font-mono font-bold block w-full whitespace-nowrap tracking-tight overflow-hidden text-ellipsis ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              {metrics.secondaryValue}
            </span>
            <span className={`text-[11px] sm:text-xs font-sans block leading-tight text-center ${
              theme === 'dark' ? 'text-[#98989D]' : 'text-[#6C6C70]'
            }`}>{metrics.secondaryLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
