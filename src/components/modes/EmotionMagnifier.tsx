import React, { useState } from 'react';
import { EmotionType, StudentProfile } from '../../types/game';
import { EMOTIONS, EMOTION_SCENARIOS } from '../../data/gameData';
import { soundFx, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Eye, Volume2, CheckCircle2, RotateCcw, 
  ArrowRight, HeartHandshake, Smile, Sparkles, AlertCircle
} from 'lucide-react';
import { ExpressiveAvatar } from '../common/ExpressiveAvatar';

interface EmotionMagnifierProps {
  student: StudentProfile;
  onAddStars: (count: number) => void;
  onProceedToNext: () => void;
}

export const EmotionMagnifier: React.FC<EmotionMagnifierProps> = ({
  student,
  onAddStars,
  onProceedToNext,
}) => {
  const [activeTab, setActiveTab] = useState<'EXPLORER' | 'SCENARIO_QUIZ'>('SCENARIO_QUIZ');
  const [selectedEmotionId, setSelectedEmotionId] = useState<EmotionType>('proud');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswered, setScenarioAnswered] = useState(false);
  const [chosenEmotion, setChosenEmotion] = useState<EmotionType | null>(null);
  const [score, setScore] = useState(0);
  const [showCopingModal, setShowCopingModal] = useState(false);

  const currentScenario = EMOTION_SCENARIOS[scenarioIndex];

  const handlePickEmotion = (picked: EmotionType) => {
    if (scenarioAnswered) return;
    setChosenEmotion(picked);
    setScenarioAnswered(true);

    const isCorrect = picked === currentScenario.targetEmotion;
    if (isCorrect) {
      soundFx.playSuccess();
      setScore((s) => s + 10);
      onAddStars(2);
      confetti({ particleCount: 35, spread: 60 });
      speakText(`答對了！在這種情境下，感到「${EMOTIONS[picked].titleZh}」是非常自然且真實的。`);
    } else {
      soundFx.playEncourage();
      speakText(`很接近囉！這時候最常體會到的是「${EMOTIONS[currentScenario.targetEmotion].titleZh}」。`);
    }
  };

  const handleNextScenario = () => {
    soundFx.playClick();
    if (scenarioIndex < EMOTION_SCENARIOS.length - 1) {
      setScenarioIndex((i) => i + 1);
      setScenarioAnswered(false);
      setChosenEmotion(null);
    } else {
      soundFx.playFanfare();
      confetti({ particleCount: 80, spread: 90 });
    }
  };

  const isCompleted = scenarioIndex === EMOTION_SCENARIOS.length - 1 && scenarioAnswered;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700">
            <span>第三關</span>
            <span aria-hidden="true">·</span>
            <span>PDF 第 3 頁：【情緒放大鏡】我的情緒</span>
            <span aria-hidden="true">·</span>
            <span>IEP 目標 ASD018</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            情緒放大鏡對對碰
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            辨別「自豪、興奮、滿足、沮喪」四種進階情緒，感受自我與同理他人！
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('SCENARIO_QUIZ');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'SCENARIO_QUIZ'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            情境對對碰 ({scenarioIndex + 1}/{EMOTION_SCENARIOS.length})
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('EXPLORER');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'EXPLORER'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            四表情深度放大鏡
          </button>
        </div>
      </div>

      {/* 4 Quick Emotion Cards Row (always visible for visual cue) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(EMOTIONS) as EmotionType[]).map((emKey) => {
          const em = EMOTIONS[emKey];
          const isSelected = activeTab === 'EXPLORER' && selectedEmotionId === emKey;

          return (
            <button
              key={em.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedEmotionId(em.id);
                speakText(`${em.titleZh}，${em.titleEn}。${em.summary}`);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-400/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">{em.faceEmoji}</span>
                <span className="text-xs font-semibold text-slate-400 uppercase">
                  {em.titleEn}
                </span>
              </div>
              <div className="text-base font-extrabold text-slate-900">
                {em.titleZh}
              </div>
              <div className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">
                {em.summary}
              </div>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SCENARIO QUIZ (情境對對碰) */}
      {activeTab === 'SCENARIO_QUIZ' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                情境挑戰 第 {scenarioIndex + 1} / {EMOTION_SCENARIOS.length} 題 · {currentScenario.tag}
              </span>

              <button
                onClick={() => {
                  soundFx.playClick();
                  speakText(currentScenario.situation);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-rose-700 inline-flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>朗讀題目情境</span>
              </button>
            </div>

            {/* Scenario Presentation Card */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50/60 via-rose-50/40 to-sky-50/60 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
              <ExpressiveAvatar
                emotion={
                  scenarioAnswered
                    ? currentScenario.targetEmotion
                    : 'neutral'
                }
                showAccessory="none"
                size="md"
                className="shrink-0"
              />

              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  生活情境探索：
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
                  「{currentScenario.situation}」
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  這時候，{student.name}會感到哪一種進階情緒呢？
                </p>
              </div>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(Object.keys(EMOTIONS) as EmotionType[]).map((emKey) => {
                const em = EMOTIONS[emKey];
                const isPicked = chosenEmotion === emKey;
                const isCorrect = emKey === currentScenario.targetEmotion;

                let cardStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-900';

                if (scenarioAnswered) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30 font-bold';
                  } else if (isPicked && !isCorrect) {
                    cardStyle = 'border-rose-400 bg-rose-50 text-rose-800 opacity-80';
                  } else {
                    cardStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-50';
                  }
                }

                return (
                  <button
                    key={emKey}
                    disabled={scenarioAnswered}
                    onClick={() => handlePickEmotion(emKey)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{em.faceEmoji}</span>
                      <div>
                        <div className="text-base font-extrabold">
                          {em.titleZh} ({em.titleEn})
                        </div>
                        <div className="text-xs opacity-80 mt-0.5">
                          {em.summary}
                        </div>
                      </div>
                    </div>

                    {scenarioAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Coping Advice */}
            {scenarioAnswered && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  💡 <strong>老師解析：</strong>{currentScenario.explanation}
                </div>

                {/* If Frustrated, highlight coping tip */}
                {currentScenario.targetEmotion === 'frustrated' && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold flex items-start gap-2">
                    <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      {currentScenario.copingAdvice || '感到沮喪時別著急：深呼吸 3 次，放慢速度，明天再試一次！'}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  {!isCompleted ? (
                    <button
                      onClick={handleNextScenario}
                      className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>下一道情境題</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundFx.playFanfare();
                        onAddStars(5);
                        onProceedToNext();
                      }}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>太棒了！前往第四關：自信表達大舞台</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: EXPLORER (四表情深度放大鏡) */}
      {activeTab === 'EXPLORER' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-rose-600" />
              <span>放大鏡觀察：{EMOTIONS[selectedEmotionId].titleZh} ({EMOTIONS[selectedEmotionId].titleEn})</span>
            </h2>
            <button
              onClick={() => {
                soundFx.playClick();
                speakText(`${EMOTIONS[selectedEmotionId].titleZh}。${EMOTIONS[selectedEmotionId].description} 面部特徵：${EMOTIONS[selectedEmotionId].facialFeatures.join('，')}。身體感覺：${EMOTIONS[selectedEmotionId].bodyFeelings}`);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>完整朗讀</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Avatar Focus */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <ExpressiveAvatar emotion={selectedEmotionId} showAccessory="none" size="lg" />
              <div className="text-base font-extrabold text-slate-900 mt-2">
                {EMOTIONS[selectedEmotionId].titleZh}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                「{EMOTIONS[selectedEmotionId].summary}」
              </div>
            </div>

            {/* Explanation Details */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  情緒意義：
                </h3>
                <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed mt-1">
                  {EMOTIONS[selectedEmotionId].description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  面部表情觀察重點：
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {EMOTIONS[selectedEmotionId].facialFeatures.map((feat, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  身體感覺：
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {EMOTIONS[selectedEmotionId].bodyFeelings}
                </p>
              </div>

              {EMOTIONS[selectedEmotionId].copingTip && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-800">
                    <HeartHandshake className="w-4 h-4" />
                    <span>特別關懷提示：</span>
                  </div>
                  <p>{EMOTIONS[selectedEmotionId].copingTip}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
