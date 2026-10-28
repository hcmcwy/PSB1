import React, { useState } from 'react';
import { HOME_EXTENSIONS } from '../../data/gameData';
import { StudentProfile } from '../../types/game';
import { soundFx, speakText } from '../../utils/audio';
import { Home, Volume2, CheckCircle2, HeartHandshake, ArrowRight, Printer, Sparkles } from 'lucide-react';

interface ParentGuideModalProps {
  student: StudentProfile;
  onClose?: () => void;
  onProceedToStage?: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({
  student,
  onProceedToStage,
}) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTask = (pageIdx: number) => {
    soundFx.playClick();
    if (completedTasks.includes(pageIdx)) {
      setCompletedTasks(completedTasks.filter((t) => t !== pageIdx));
    } else {
      setCompletedTasks([...completedTasks, pageIdx]);
      soundFx.playSuccess();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <span>家校合作指南</span>
            <span aria-hidden="true">·</span>
            <span>PDF 第 1、2、3 頁【家中延伸】任務全集</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <Home className="w-7 h-7 text-emerald-600" />
            <span>【家中延伸】家長引導指引與打卡手冊</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            協助家長在家中與 {student.name} 進行正向互動，固化「認識強項」與「進階情緒表達」學習成效。
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="self-start sm:self-auto px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>列印指引與記錄單</span>
        </button>
      </div>

      {/* 3 Major Home Extensions from PDF */}
      <div className="space-y-5">
        {HOME_EXTENSIONS.map((ext, idx) => {
          const isDone = completedTasks.includes(ext.page);
          return (
            <div
              key={ext.page}
              className={`p-6 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                    教材第 {ext.page} 頁延伸任務
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {ext.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      speakText(`${ext.title}。${ext.quote}。指引建議：${ext.guide.join('。')}`);
                    }}
                    className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="朗讀延伸指引"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleTask(ext.page)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? '✓ 今日已完成打卡' : '點擊打卡標記'}</span>
                  </button>
                </div>
              </div>

              {/* Original Quote from PDF */}
              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs sm:text-sm font-semibold text-amber-950 mb-4">
                📝 <strong>學習單原話：</strong>「{ext.quote}」
              </div>

              {/* Step by step practical instructions */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  蔡偉業老師建議之親子實踐步驟：
                </div>
                <div className="space-y-1.5">
                  {ext.guide.map((tip, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {gIdx + 1}
                      </span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special ASD / SEN Communication Tips Card */}
      <div className="p-6 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border border-sky-200 space-y-3">
        <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
          <HeartHandshake className="w-5 h-5 text-sky-600" />
          <span>特教心法小叮嚀：給予孩子最堅實的鷹架支持</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          對於自閉症譜系 (ASD) 或特殊學習需要的學童而言，情緒詞彙往往需要連結具體的「生理感覺」與「具體生活事件」。當孩子遇到彈琴彈錯、做題卡關時，請先肯定他的努力：「媽媽看見你很努力想要彈好，現在感到有點沮喪是很正常的，我們深呼吸，喝口水休息一下！」建立安全溫暖的情緒避風港。
        </p>
      </div>

      {/* Navigation action */}
      {onProceedToStage && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onProceedToStage}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>前往自信表達大舞台</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
