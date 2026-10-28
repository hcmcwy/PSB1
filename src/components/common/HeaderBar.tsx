import React from 'react';
import { GameMode, StudentProfile } from '../../types/game';
import { soundFx } from '../../utils/audio';
import { Volume2, VolumeX, Sparkles, Award } from 'lucide-react';

interface HeaderBarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  starsCount: number;
  student: StudentProfile;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenCertificate: () => void;
  onOpenProfileModal?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentMode,
  onSelectMode,
  starsCount,
  student,
  isMuted,
  onToggleMute,
  onOpenCertificate,
  onOpenProfileModal,
}) => {
  const navItems: { mode: GameMode; label: string }[] = [
    { mode: 'RADAR', label: '強項探索' },
    { mode: 'SORTING', label: '分類派對' },
    { mode: 'EMOTION', label: '情緒放大鏡' },
    { mode: 'STAGE', label: '自信大舞台' },
    { mode: 'PARENT_GUIDE', label: '家中延伸' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand title & Student Name */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('MENU');
            }}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              ★
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight block leading-tight">
                我的強項大冒險
              </span>
              <span className="text-xs text-slate-500 block leading-none">
                {student.name} · {student.classGrade}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  soundFx.playClick();
                  onSelectMode(item.mode);
                }}
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility items */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Star counter with tabular-nums */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-lg text-amber-800 text-xs sm:text-sm font-bold border border-amber-200/70">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="tabular-nums">{starsCount}</span>
            <span className="text-amber-700 font-normal hidden sm:inline">星</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={isMuted ? '開啟音效' : '靜音'}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          </button>

          {/* Student Profile Switcher (optional click) */}
          {onOpenProfileModal && (
            <button
              onClick={onOpenProfileModal}
              className="hidden sm:inline-flex px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
            >
              學生檔案
            </button>
          )}

          {/* Primary Action CTA: View Certificate */}
          <button
            onClick={() => {
              soundFx.playFanfare();
              onOpenCertificate();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>我的強項獎狀</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around px-2 py-1.5 bg-slate-50 border-t border-slate-200 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = currentMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => {
                soundFx.playClick();
                onSelectMode(item.mode);
              }}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
