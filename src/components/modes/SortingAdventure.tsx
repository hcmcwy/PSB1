import React, { useState, useEffect } from 'react';
import { StrengthItem, StrengthCategory, StudentProfile } from '../../types/game';
import { STRENGTH_ITEMS, CATEGORY_INFO } from '../../data/gameData';
import { soundFx, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  BookOpen, Flame, Sparkles, Heart, Volume2, 
  RotateCcw, ArrowRight, CheckCircle2, Zap
} from 'lucide-react';

interface SortingAdventureProps {
  student: StudentProfile;
  onAddStars: (count: number) => void;
  onProceedToNext: () => void;
}

export const SortingAdventure: React.FC<SortingAdventureProps> = ({
  student,
  onAddStars,
  onProceedToNext,
}) => {
  // Shuffled items queue
  const [deck, setDeck] = useState<StrengthItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [sortedBuckets, setSortedBuckets] = useState<Record<StrengthCategory, StrengthItem[]>>({
    academic: [],
    sports: [],
    art: [],
    social: [],
  });
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize deck on mount
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffled = [...STRENGTH_ITEMS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLastFeedback(null);
    setSortedBuckets({
      academic: [],
      sports: [],
      art: [],
      social: [],
    });
    setIsGameOver(false);
  };

  const currentCard = deck[currentIndex];

  const handleClassify = (targetCat: StrengthCategory) => {
    if (!currentCard || isGameOver) return;

    const isCorrect = currentCard.category === targetCat;

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((prev) => Math.max(prev, newCombo));
      setScore((prev) => prev + 10 + newCombo * 2);
      soundFx.playCombo(newCombo);
      soundFx.playSuccess();

      // Add to bucket
      setSortedBuckets((prev) => ({
        ...prev,
        [targetCat]: [...prev[targetCat], currentCard],
      }));

      setLastFeedback({
        isCorrect: true,
        text: `太棒了！「${currentCard.title}」屬於【${CATEGORY_INFO[targetCat].label}】類！`,
      });

      // Advance or finish
      if (currentIndex + 1 >= deck.length) {
        setIsGameOver(true);
        soundFx.playFanfare();
        onAddStars(5);
        confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } });
        speakText(`太厲害了，${student.name}！你成功將所有強項分類完畢！`);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else {
      setCombo(0);
      soundFx.playEncourage();
      setLastFeedback({
        isCorrect: false,
        text: `「${currentCard.title}」是【${currentCard.categoryLabel}】類喔，再試試看！`,
      });
      speakText(`再想想看，「${currentCard.title}」是屬於哪一類呢？`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <span>第二關</span>
            <span aria-hidden="true">·</span>
            <span>PDF 第 2 頁：我的強項分類配對</span>
            <span aria-hidden="true">·</span>
            <span>分類歸納思維</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            強項分類大派對
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            觀察卡片上的強項，把它送入對應的「學業、運動、藝術、人際」寶箱中！
          </p>
        </div>

        {/* Score & Combo HUD */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
            進度：<span className="tabular-nums text-slate-900 font-extrabold">{currentIndex} / {deck.length}</span>
          </div>

          {combo > 1 && (
            <div className="px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-300 text-xs font-bold text-amber-700 flex items-center gap-1 animate-bounce">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{combo} 連擊 Combo!</span>
            </div>
          )}

          <div className="px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs">
            積分：<span className="tabular-nums">{score}</span>
          </div>
        </div>
      </div>

      {!isGameOver && currentCard ? (
        <div className="space-y-6">
          {/* Active Card Display */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl border-2 border-amber-300 shadow-md p-6 sm:p-8 text-center relative overflow-hidden transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>待分類卡片</span>
              <button
                onClick={() => {
                  soundFx.playClick();
                  speakText(`${currentCard.title}。${currentCard.description}`);
                }}
                className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>朗讀卡片</span>
              </button>
            </div>

            {/* Title */}
            <div className="my-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {currentCard.title}
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 max-w-md mx-auto">
                {currentCard.description}
              </p>
            </div>

            {/* Scenario snippet */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
              💡 {currentCard.scenario}
            </div>

            {/* Feedback message banner */}
            {lastFeedback && (
              <div
                className={`mt-4 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  lastFeedback.isCorrect
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {lastFeedback.text}
              </div>
            )}
          </div>

          {/* 4 Classification Treasure Chests */}
          <div>
            <div className="text-center text-xs font-bold text-slate-500 mb-3">
              請點擊下方正確的分類寶箱：
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Academic */}
              <button
                onClick={() => handleClassify('academic')}
                className="p-4 bg-white hover:bg-blue-50/80 rounded-2xl border-2 border-blue-200 hover:border-blue-400 shadow-xs hover:shadow-sm text-center transition-all cursor-pointer group active:scale-95 flex flex-col items-center justify-between h-36"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-blue-900">
                    學業
                  </div>
                  <div className="text-xs text-blue-600/80 font-medium mt-0.5">
                    英文溝通 · 記性好
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  已收納 {sortedBuckets.academic.length} 張
                </div>
              </button>

              {/* Sports */}
              <button
                onClick={() => handleClassify('sports')}
                className="p-4 bg-white hover:bg-orange-50/80 rounded-2xl border-2 border-orange-200 hover:border-orange-400 shadow-xs hover:shadow-sm text-center transition-all cursor-pointer group active:scale-95 flex flex-col items-center justify-between h-36"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-orange-900">
                    運動
                  </div>
                  <div className="text-xs text-orange-600/80 font-medium mt-0.5">
                    跑步快 · 踢球 · 體能好
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  已收納 {sortedBuckets.sports.length} 張
                </div>
              </button>

              {/* Arts */}
              <button
                onClick={() => handleClassify('art')}
                className="p-4 bg-white hover:bg-purple-50/80 rounded-2xl border-2 border-purple-200 hover:border-purple-400 shadow-xs hover:shadow-sm text-center transition-all cursor-pointer group active:scale-95 flex flex-col items-center justify-between h-36"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-purple-900">
                    藝術
                  </div>
                  <div className="text-xs text-purple-600/80 font-medium mt-0.5">
                    唱歌好 · 畫畫好 · 音樂演奏
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  已收納 {sortedBuckets.art.length} 張
                </div>
              </button>

              {/* Social / Character */}
              <button
                onClick={() => handleClassify('social')}
                className="p-4 bg-white hover:bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow-sm text-center transition-all cursor-pointer group active:scale-95 flex flex-col items-center justify-between h-36"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-emerald-900">
                    人際與品德
                  </div>
                  <div className="text-xs text-emerald-600/80 font-medium mt-0.5">
                    我幫助同學 · 我健談
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  已收納 {sortedBuckets.social.length} 張
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Game Over / Summary Dashboard matching PDF Page 2 */
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-3 bg-amber-100 rounded-full text-amber-700 mb-1">
              🏆
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              全部分類完成！大獲全勝！
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              最終積分：<strong className="text-amber-600">{score}</strong> 分 · 最高連擊：<strong className="text-amber-600">{maxCombo}</strong> Combo
            </p>
          </div>

          {/* 3 Categories Layout directly mirroring PDF Page 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Academic Column */}
            <div className="rounded-xl border border-blue-200 overflow-hidden bg-blue-50/40">
              <div className="bg-blue-600 text-white font-bold py-2 px-4 text-center text-sm">
                學業
              </div>
              <div className="p-4 space-y-2">
                {['英文溝通', '記性好'].map((item) => (
                  <div key={item} className="p-2.5 bg-white rounded-lg border border-blue-100 font-bold text-center text-xs text-slate-800 shadow-2xs">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Sports Column */}
            <div className="rounded-xl border border-orange-200 overflow-hidden bg-orange-50/40">
              <div className="bg-orange-500 text-white font-bold py-2 px-4 text-center text-sm">
                運動
              </div>
              <div className="p-4 space-y-2">
                {['跑步快', '踢球', '我體能好'].map((item) => (
                  <div key={item} className="p-2.5 bg-white rounded-lg border border-orange-100 font-bold text-center text-xs text-slate-800 shadow-2xs">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Arts Column */}
            <div className="rounded-xl border border-emerald-200 overflow-hidden bg-emerald-50/40">
              <div className="bg-emerald-600 text-white font-bold py-2 px-4 text-center text-sm">
                藝術
              </div>
              <div className="p-4 space-y-2">
                {['唱歌好', '畫畫好', '音樂演奏'].map((item) => (
                  <div key={item} className="p-2.5 bg-white rounded-lg border border-emerald-100 font-bold text-center text-xs text-slate-800 shadow-2xs">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                soundFx.playClick();
                resetGame();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新分類挑戰</span>
            </button>
            <button
              onClick={() => {
                soundFx.playFanfare();
                onProceedToNext();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>前往第三關：情緒放大鏡</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
