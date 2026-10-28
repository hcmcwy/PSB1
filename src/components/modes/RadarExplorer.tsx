import React, { useState } from 'react';
import { StrengthItem, StudentProfile } from '../../types/game';
import { STRENGTH_CRITERIA, STRENGTH_ITEMS } from '../../data/gameData';
import { soundFx, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ThumbsUp, Trophy, Award, Volume2, CheckCircle2, 
  HelpCircle, ArrowRight, Sparkles, Plus, Check
} from 'lucide-react';

interface RadarExplorerProps {
  student: StudentProfile;
  selectedStrengths: string[];
  onToggleStrength: (id: string) => void;
  onAddCustomStrength: (title: string, category: StrengthItem['category']) => void;
  onAddStars: (count: number) => void;
  onProceedToNext: () => void;
}

export const RadarExplorer: React.FC<RadarExplorerProps> = ({
  student,
  selectedStrengths,
  onToggleStrength,
  onAddCustomStrength,
  onAddStars,
  onProceedToNext,
}) => {
  const [activeTab, setActiveTab] = useState<'CRITERIA' | 'SCENARIOS' | 'QUIZ'>('SCENARIOS');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Criteria mini-quiz items to reinforce understanding of the 3 criteria
  const quizItems = [
    {
      question: '「璟陞在校際音樂比賽中獲得冠軍，抱回了金色的獎盃！」這最符合強項的哪一項要素？',
      options: [
        { id: 'get_affirmation', label: '曾獲肯定（獲頒獎項與表揚）', isCorrect: true },
        { id: 'do_well', label: '我做得好（只是自己覺得順暢）', isCorrect: false },
        { id: 'better_than_others', label: '比別人優勝（單純速度快）', isCorrect: false },
      ],
      explanation: '非常正確！獲得獎盃、獎狀或老師家長的公開讚許，就是「曾獲肯定」！',
    },
    {
      question: '「默寫課文時，我只花了三分鐘就全部記住，比同班同學快得多！」這最符合哪一項要素？',
      options: [
        { id: 'better_than_others', label: '比別人優勝（突出表現，掌握更快）', isCorrect: true },
        { id: 'get_affirmation', label: '曾獲肯定', isCorrect: false },
        { id: 'do_well', label: '我做得好', isCorrect: false },
      ],
      explanation: '太棒了！相較同齡朋友學得更快、更突出，這代表了「比別人優勝」！',
    },
    {
      question: '「我坐在鋼琴前彈奏曲子，手指非常靈活流暢，完全沒有卡頓。」這最符合哪一項要素？',
      options: [
        { id: 'do_well', label: '我做得好（熟練專注，掌握度高）', isCorrect: true },
        { id: 'get_affirmation', label: '曾獲肯定', isCorrect: false },
        { id: 'better_than_others', label: '比別人優勝', isCorrect: false },
      ],
      explanation: '答對了！自己能順暢投入、把事情做得既優良又有品質，就是「我做得好」！',
    },
  ];

  const currentQuiz = quizItems[quizIndex];

  const handleSelectQuiz = (optId: string, isCorrect: boolean) => {
    if (quizAnswered) return;
    setQuizSelected(optId);
    setQuizAnswered(true);

    if (isCorrect) {
      soundFx.playSuccess();
      onAddStars(2);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      speakText('答對了！' + currentQuiz.explanation);
    } else {
      soundFx.playEncourage();
      speakText('很接近了，再想想看喔！' + currentQuiz.explanation);
    }
  };

  const handleNextQuiz = () => {
    soundFx.playClick();
    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(quizIndex + 1);
      setQuizAnswered(false);
      setQuizSelected(null);
    } else {
      setActiveTab('SCENARIOS');
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onAddCustomStrength(customInput.trim(), 'art');
    setCustomInput('');
    setShowCustomModal(false);
    soundFx.playSuccess();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Banner & Tab Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <span>第一關</span>
            <span aria-hidden="true">·</span>
            <span>PDF 第 1 頁：我的強項探索卡</span>
            <span aria-hidden="true">·</span>
            <span>IEP 目標 P046</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            強項探索大雷達
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            認識強項三大要素，並在生活情境中圈選出自己的強項！
          </p>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('SCENARIOS');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'SCENARIOS'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            生活情境選卡 ({selectedStrengths.length}項已選)
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('CRITERIA');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'CRITERIA'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            強項三大要素
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('QUIZ');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'QUIZ'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            要素小挑戰 ★
          </button>
        </div>
      </div>

      {/* SECTION 1: CRITERIA EXPLORATION (PDF Page 1 Section 1) */}
      {activeTab === 'CRITERIA' && (
        <div className="space-y-6">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>什麼是「強項」？（認識三大要素）</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                符合以下任一項或多項特質，就可以是你的個人強項！
              </p>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                speakText('什麼是強項？強項有三大要素：第一，我做得好；第二，比別人優勝；第三，曾獲肯定！');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>聽聽老師解說</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STRENGTH_CRITERIA.map((crit, idx) => {
              const icons = [ThumbsUp, Trophy, Award];
              const Icon = icons[idx];
              return (
                <div
                  key={crit.id}
                  className={`p-5 rounded-2xl bg-white border ${crit.border} shadow-xs hover:shadow-sm transition-all flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${crit.color} text-white flex items-center justify-center shadow-xs`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-500">
                        要素 0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {crit.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        {crit.subTitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {crit.description}
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                      <strong className="text-slate-800">情境實例：</strong>
                      {crit.example}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      speakText(`${crit.title}。${crit.description} ${crit.example}`);
                    }}
                    className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500 hover:text-amber-600 flex items-center gap-1.5 self-start cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>朗讀此要素</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('SCENARIOS');
              }}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
            >
              <span>了解了！去生活情境圈出我的強項</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: LIFE SCENARIOS SELECTION (PDF Page 1 Section 2) */}
      {activeTab === 'SCENARIOS' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                圈出至少 1 項自己的強項（可多選）
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                點擊卡片即可圈選或取消。點擊卡片上的「聽聽看」可聽語音介紹。
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  soundFx.playClick();
                  speakText(`請 ${student.name} 圈出至少 1 項自己的強項，例如音樂演奏、跑步快或英文溝通！`);
                }}
                className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg border border-slate-200 transition-colors"
                title="語音引導"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowCustomModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增其他強項</span>
              </button>
            </div>
          </div>

          {/* Strength Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRENGTH_ITEMS.map((item) => {
              const isSelected = selectedStrengths.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundFx.playClick();
                    onToggleStrength(item.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all text-left relative flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/30 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  {/* Selected checkmark indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {item.categoryLabel}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-white'
                          : 'border-2 border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>{item.title}</span>
                      {item.id === 'music_instrument' && (
                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                          璟陞的強項
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Reasons Preview */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                    <div className="text-xs text-slate-500 font-medium">常見表現與原因：</div>
                    <div className="text-xs text-slate-700 font-semibold truncate">
                      • {item.reasons[0]}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        speakText(`${item.title}。${item.description} 常見原因：${item.reasons.join('，')}`);
                      }}
                      className="text-slate-500 hover:text-amber-700 font-medium inline-flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>朗讀</span>
                    </button>

                    <span
                      className={`font-bold ${
                        isSelected ? 'text-amber-700' : 'text-slate-400'
                      }`}
                    >
                      {isSelected ? '✓ 已圈選' : '點擊圈選'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Summary & PDF Page 1 Section 3: "說出強項" */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span>PDF 第 1 頁 第 3 部分</span>
              <span aria-hidden="true">·</span>
              <span>說出強項</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-lg font-extrabold text-slate-900">
                  我的強項是：
                  {selectedStrengths.length > 0 ? (
                    <span className="text-amber-600 ml-1">
                      【
                      {selectedStrengths
                        .map((id) => STRENGTH_ITEMS.find((s) => s.id === id)?.title || id)
                        .join('、')}
                      】
                    </span>
                  ) : (
                    <span className="text-slate-400 ml-1">（請在上方圈選至少 1 項強項）</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  已選 {selectedStrengths.length} 項。下一步將前往分類配對大派對！
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={selectedStrengths.length === 0}
                  onClick={() => {
                    soundFx.playFanfare();
                    onAddStars(2);
                    confetti({ particleCount: 40, spread: 70 });
                    onProceedToNext();
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer ${
                    selectedStrengths.length > 0
                      ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>確認強項，前往第二關：分類派對</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: MINI QUIZ (辨析強項要素) */}
      {activeTab === 'QUIZ' && (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-amber-700">
              要素辨識挑戰 · 第 {quizIndex + 1} / {quizItems.length} 題
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                speakText(currentQuiz.question);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>朗讀題目</span>
            </button>
          </div>

          <div className="text-lg font-bold text-slate-900 leading-snug">
            {currentQuiz.question}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuiz.options.map((opt) => {
              const isPicked = quizSelected === opt.id;
              let btnClass = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

              if (quizAnswered) {
                if (opt.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isPicked && !opt.isCorrect) {
                  btnClass = 'border-rose-400 bg-rose-50 text-rose-900';
                } else {
                  btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={quizAnswered}
                  onClick={() => handleSelectQuiz(opt.id, opt.isCorrect)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt.label}</span>
                  {quizAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {quizAnswered && isPicked && !opt.isCorrect && (
                    <span className="text-xs text-rose-600 font-bold">再試一次</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {quizAnswered && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                {currentQuiz.explanation}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuiz}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs transition-all inline-flex items-center gap-1.5"
                >
                  <span>{quizIndex < quizItems.length - 1 ? '下一題' : '完成挑戰'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal for adding custom strength */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              新增我的專屬強項
            </h3>
            <p className="text-xs text-slate-600">
              輸入你擅長的特殊才藝或生活好習慣（例如：組裝樂高、拼圖快、細心照顧寵物等）：
            </p>

            <form onSubmit={handleAddCustom} className="space-y-4">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="例如：組裝模型、數學心算、做手工..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                autoFocus
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 rounded-lg"
                >
                  確認新增
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
