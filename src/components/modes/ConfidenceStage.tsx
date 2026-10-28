import React, { useState } from 'react';
import { StudentProfile, StrengthItem } from '../../types/game';
import { STRENGTH_ITEMS, CONFIDENCE_STEPS } from '../../data/gameData';
import { soundFx, speakText, stopSpeaking } from '../../utils/audio';
import { ExpressiveAvatar } from '../common/ExpressiveAvatar';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Megaphone, CheckCircle2, Volume2, 
  Mic, MicOff, RotateCcw, Award, ArrowRight, Play, Heart, Star
} from 'lucide-react';

interface ConfidenceStageProps {
  student: StudentProfile;
  selectedStrengths: string[];
  onAddStars: (count: number) => void;
  onOpenCertificate: () => void;
}

export const ConfidenceStage: React.FC<ConfidenceStageProps> = ({
  student,
  selectedStrengths,
  onAddStars,
  onOpenCertificate,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [hasSmiled, setHasSmiled] = useState(false);
  const [chosenStrengthId, setChosenStrengthId] = useState<string>(
    selectedStrengths[0] || 'music_instrument'
  );
  const [chosenReason, setChosenReason] = useState<string>('彈琴彈得很好');
  const [chosenAward, setChosenAward] = useState<string>('曾獲音樂獎項');
  const [customReasonInput, setCustomReasonInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasPracticedSpeaking, setHasPracticedSpeaking] = useState(false);
  const [stageApplauded, setStageApplauded] = useState(false);

  // Active chosen strength item
  const activeStrength = STRENGTH_ITEMS.find((s) => s.id === chosenStrengthId) || STRENGTH_ITEMS[0];

  // Full assembled sentence based on PDF Page 2
  const finalSpeechSentence = `我的強項是【${activeStrength.title}】，因為我【${
    customReasonInput.trim() || chosenReason
  }】且【${chosenAward}】。`;

  // Step 1: Smile & Stand Tall
  const handleCompleteStep1 = () => {
    soundFx.playSuccess();
    setHasSmiled(true);
    setCurrentStep(2);
    speakText(`步驟一完成！站穩微笑，精神奕奕！現在進入步驟二：說出你的強項！`);
  };

  // Step 2: Pick Strength
  const handleCompleteStep2 = () => {
    soundFx.playSuccess();
    setCurrentStep(3);
    speakText(`步驟二完成！你選擇了${activeStrength.title}！現在進入步驟三：說出原因！`);
  };

  // Step 3: Complete reasons & Assemble
  const handleCompleteStep3 = () => {
    soundFx.playSuccess();
    setCurrentStep(4);
    soundFx.playFanfare();
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    speakText(`太棒了！你的強項演說句式已組裝完成！一起來大聲練習吧！`);
  };

  // Step 4: Microphone simulation / Practice
  const handleToggleRecord = () => {
    if (!isRecording) {
      soundFx.playClick();
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setHasPracticedSpeaking(true);
        setStageApplauded(true);
        soundFx.playFanfare();
        onAddStars(5);
        confetti({ particleCount: 100, spread: 100 });
      }, 4000);
    } else {
      setIsRecording(false);
    }
  };

  const handleDemonstration = () => {
    soundFx.playClick();
    speakText(finalSpeechSentence);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700">
            <span>第四關</span>
            <span aria-hidden="true">·</span>
            <span>PDF 第 2 頁：【強項表達站】自信說出我的強項</span>
            <span aria-hidden="true">·</span>
            <span>IEP 目標 P046 核心演練</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            自信表達大舞台
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            依照「站穩微笑、說出強項、說出原因」三步驟，自信展現自我！
          </p>
        </div>

        {/* 3 Step Pill Indicator */}
        <div className="flex items-center gap-2 text-xs font-bold">
          {CONFIDENCE_STEPS.map((s) => {
            const isDone = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div
                key={s.step}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                  isCurrent
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
              >
                <span>{s.step}</span>
                <span className="hidden sm:inline">{s.title.split('：')[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: 站穩微笑 */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center space-y-6 max-w-2xl mx-auto">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-700 uppercase">
              步驟一 (Step 1)
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              站穩微笑 · 自信準備
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              面向觀眾，雙腳放平站穩，放鬆肩膀，眼睛看著前方，展露最自信的微笑！
            </p>
          </div>

          {/* Interactive Smile Meter / Mirror Simulation */}
          <div className="p-6 bg-gradient-to-b from-purple-50/60 to-amber-50/60 rounded-2xl border border-purple-200/80 flex flex-col items-center justify-center">
            <ExpressiveAvatar
              emotion={hasSmiled ? 'proud' : 'neutral'}
              showAccessory="star"
              size="lg"
            />

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>姿態檢核：雙腳站穩 · 微笑展露 · 眼神堅定</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFx.playClick();
                speakText('步驟一：站穩微笑！雙腳站穩，放鬆肩膀，看著大家，展現自信的微笑！');
              }}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>聽聽步驟提示</span>
            </button>
            <button
              onClick={handleCompleteStep1}
              className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>我準備好了，站穩微笑了！</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: 說出強項 */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase">
                步驟二 (Step 2)
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                說出強項：「我的強項是【_____】」
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                speakText(`步驟二：說出你的強項！你可以選擇音樂演奏，或者其他擅長的項目。`);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>語音引導</span>
            </button>
          </div>

          {/* Strength Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {STRENGTH_ITEMS.map((item) => {
              const isSelected = chosenStrengthId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFx.playClick();
                    setChosenStrengthId(item.id);
                    // update default reason and award for this strength
                    setChosenReason(item.reasons[0]);
                    setChosenAward(item.awards[0]);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-600/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {item.categoryLabel}
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </div>
                  {item.id === 'music_instrument' && (
                    <span className="text-xs font-bold text-purple-700 mt-1 inline-block">
                      ★ 璟陞拿手項
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current choice preview */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="text-base font-bold text-slate-800">
              目前選擇：
              <span className="text-purple-700 ml-1">
                「我的強項是【{activeStrength.title}】」
              </span>
            </div>

            <button
              onClick={handleCompleteStep2}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>確認，進入步驟三</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 說出原因 */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase">
                步驟三 (Step 3)
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                說出原因：「因為我【_____】/【曾獲_____】」
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                speakText(`步驟三：說出原因！告訴大家你為什麼做得好，或者曾經獲得什麼肯定！`);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              <span>語音引導</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reason Part 1: 做得好 / 熟練理由 */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                原因一：我做得好的表現（選擇或自行輸入）
              </label>

              <div className="space-y-2">
                {activeStrength.reasons.map((r) => {
                  const isChecked = chosenReason === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setChosenReason(r);
                      }}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                        isChecked
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      ✓ 因為我【{r}】
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                placeholder="或者自行輸入原因（例如：練琴很專心...）"
                value={customReasonInput}
                onChange={(e) => setCustomReasonInput(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Reason Part 2: 曾獲肯定 / 獎項肯定 */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                原因二：曾獲肯定或表揚
              </label>

              <div className="space-y-2">
                {activeStrength.awards.map((a) => {
                  const isChecked = chosenAward === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setChosenAward(a);
                      }}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                        isChecked
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      🏆 且我【{a}】
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complete Assembly Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← 返回重選強項
            </button>
            <button
              onClick={handleCompleteStep3}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>完成組裝，登上大舞台！</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 登上大舞台 (THE CONFIDENCE STAGE FINALE) */}
      {currentStep === 4 && (
        <div className="bg-gradient-to-b from-purple-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
          {/* Stage Spotlights Graphic */}
          <div className="absolute top-0 left-1/4 w-32 h-64 bg-amber-400/10 -rotate-12 blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-32 h-64 bg-purple-400/10 rotate-12 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold border border-amber-400/30">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>自信演說大舞台 · 觀眾全體注目中</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {student.name} 的強項自信演說
            </h2>
          </div>

          {/* Centerpiece: Expressive Avatar on Stage */}
          <div className="flex flex-col items-center justify-center relative z-10">
            <ExpressiveAvatar
              emotion="speaking"
              showAccessory="trophy"
              size="lg"
            />
          </div>

          {/* The Assembled Speech Formula Card (Matching PDF Page 2) */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 text-center space-y-4 relative z-10 shadow-lg">
            <div className="text-xs font-bold text-amber-300 tracking-wider uppercase">
              ★ 我的強項表達句式 ★
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-relaxed">
              「我的強項是<span className="text-amber-300 underline decoration-amber-400 decoration-wavy underline-offset-8 mx-1">【{activeStrength.title}】</span>，
              因為我<span className="text-sky-300 mx-1">【{customReasonInput.trim() || chosenReason}】</span>
              且<span className="text-emerald-300 mx-1">【{chosenAward}】</span>。」
            </div>
          </div>

          {/* Interactive Stage Controls: Demonstration & Mic practice */}
          <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              onClick={handleDemonstration}
              className="w-full sm:w-auto px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/20"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>示範朗讀</span>
            </button>

            <button
              onClick={handleToggleRecord}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>正在聆聽中... 大聲朗讀吧！</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-slate-900" />
                  <span>點擊麥克風：登台演說</span>
                </>
              )}
            </button>
          </div>

          {/* Audience Cheer & Certificate Prompt */}
          {stageApplauded && (
            <div className="max-w-xl mx-auto p-5 bg-white/10 rounded-2xl border border-amber-300/40 text-center space-y-3 relative z-10 animate-fade-in">
              <div className="text-base sm:text-lg font-extrabold text-amber-300 flex items-center justify-center gap-2">
                <span>👏 哇！全場觀眾與蔡偉業老師響起熱烈掌聲！</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                你成功達成了 IEP P046 目標：「能表達自己1項或以上的強項與原因」！
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentStep(1);
                    setStageApplauded(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  再練一次三步驟
                </button>
                <button
                  onClick={() => {
                    soundFx.playFanfare();
                    onOpenCertificate();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>領取我的專屬「強項成就獎狀」！</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
