import React, { useState, useEffect } from 'react';
import { GameMode, StudentProfile, StrengthItem } from './types/game';
import { DEFAULT_STUDENT, STRENGTH_ITEMS } from './data/gameData';
import { soundFx } from './utils/audio';
import { HeaderBar } from './components/common/HeaderBar';
import { TitleMenu } from './components/modes/TitleMenu';
import { RadarExplorer } from './components/modes/RadarExplorer';
import { SortingAdventure } from './components/modes/SortingAdventure';
import { EmotionMagnifier } from './components/modes/EmotionMagnifier';
import { ConfidenceStage } from './components/modes/ConfidenceStage';
import { CertificateModal } from './components/modes/CertificateModal';
import { ParentGuideModal } from './components/modes/ParentGuideModal';
import { StudentProfileModal } from './components/modals/StudentProfileModal';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('MENU');
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);
  const [starsCount, setStarsCount] = useState<number>(10);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>(['music_instrument']);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCertificateOpen) setIsCertificateOpen(false);
        else if (isProfileModalOpen) setIsProfileModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCertificateOpen, isProfileModalOpen]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
  };

  const handleAddStars = (count: number) => {
    setStarsCount((prev) => prev + count);
  };

  const handleToggleStrength = (id: string) => {
    if (selectedStrengths.includes(id)) {
      if (selectedStrengths.length > 1) {
        setSelectedStrengths(selectedStrengths.filter((s) => s !== id));
      }
    } else {
      setSelectedStrengths([...selectedStrengths, id]);
    }
  };

  const handleAddCustomStrength = (title: string, category: StrengthItem['category']) => {
    const newId = `custom_${Date.now()}`;
    const newItem: StrengthItem = {
      id: newId,
      title,
      category,
      categoryLabel: category === 'art' ? '藝術' : category === 'sports' ? '運動' : '學業',
      iconName: 'Sparkles',
      description: `能專心發揮${title}的才能，表現突出。`,
      reasons: [`平時練習認真專注`, `在${title}方面掌握得很快`],
      awards: [`獲得蔡老師與同學肯定`, `展現獨特才能`],
      scenario: `你在日常中專注進行${title}，展現出自信的風采！`,
      color: 'text-amber-600',
      badgeBg: 'bg-amber-100 text-amber-700',
    };
    STRENGTH_ITEMS.push(newItem);
    setSelectedStrengths((prev) => [...prev, newId]);
  };

  const primaryStrengthTitle =
    STRENGTH_ITEMS.find((s) => s.id === selectedStrengths[0])?.title || '音樂演奏';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-200 selection:text-amber-900">
      {/* Top Header Navigation (Follows Top Bar Contract) */}
      <HeaderBar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        starsCount={starsCount}
        student={student}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentMode === 'MENU' && (
          <TitleMenu
            student={student}
            starsCount={starsCount}
            onStartMode={(mode) => setCurrentMode(mode)}
            onOpenParentGuide={() => setCurrentMode('PARENT_GUIDE')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentMode === 'RADAR' && (
          <RadarExplorer
            student={student}
            selectedStrengths={selectedStrengths}
            onToggleStrength={handleToggleStrength}
            onAddCustomStrength={handleAddCustomStrength}
            onAddStars={handleAddStars}
            onProceedToNext={() => setCurrentMode('SORTING')}
          />
        )}

        {currentMode === 'SORTING' && (
          <SortingAdventure
            student={student}
            onAddStars={handleAddStars}
            onProceedToNext={() => setCurrentMode('EMOTION')}
          />
        )}

        {currentMode === 'EMOTION' && (
          <EmotionMagnifier
            student={student}
            onAddStars={handleAddStars}
            onProceedToNext={() => setCurrentMode('STAGE')}
          />
        )}

        {currentMode === 'STAGE' && (
          <ConfidenceStage
            student={student}
            selectedStrengths={selectedStrengths}
            onAddStars={handleAddStars}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentMode === 'PARENT_GUIDE' && (
          <ParentGuideModal
            student={student}
            onProceedToStage={() => setCurrentMode('STAGE')}
          />
        )}
      </main>

      {/* Footer info adhering to anti-slop rules (unboxed, clean typography) */}
      <footer className="border-t border-slate-200/80 py-4 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>學生：{student.name}</span>
            <span aria-hidden="true">·</span>
            <span>班別：{student.classGrade}</span>
            <span aria-hidden="true">·</span>
            <span>指導老師：{student.teacher}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>特教 IEP 目標 P046 & ASD018 教學實踐</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-4"
            >
              檢視成就證書
            </button>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        student={student}
        starsCount={starsCount}
        primaryStrength={primaryStrengthTitle}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        student={student}
        onSaveStudent={(updated) => setStudent(updated)}
      />
    </div>
  );
}
