import React from 'react';
import { StudentProfile } from '../../types/game';
import { soundFx } from '../../utils/audio';
import { ExpressiveAvatar } from '../common/ExpressiveAvatar';
import { Award, Printer, X, CheckCircle, Star } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  starsCount: number;
  primaryStrength: string;
  expressionSentence?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  starsCount,
  primaryStrength,
  expressionSentence,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const defaultSentence = expressionSentence || `我的強項是【${primaryStrength || '音樂演奏'}】，因為我【彈琴彈得很好】且【曾獲音樂獎項】。`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-amber-300 relative overflow-hidden my-8">
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-amber-500 text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-200" />
            <span>IEP 學習歷程認證 · 強項成就獎狀</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>列印 / 存為 PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE BODY */}
        <div id="printable-certificate" className="p-8 sm:p-10 space-y-6 bg-radial from-amber-50/40 via-white to-amber-50/20 text-slate-800 relative">
          {/* Ornate Gold Border & Header */}
          <div className="text-center space-y-2 border-b-2 border-dashed border-amber-200 pb-5">
            <div className="flex items-center justify-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>特教個別化教育計劃 (IEP) 成果證書</span>
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              強項與自信表達卓越獎
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Certificate of Achievement: Strengths Recognition & Confident Expression
            </p>
          </div>

          {/* Student Info Grid (Matching PDF Header) */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-center text-xs sm:text-sm font-bold text-slate-800">
            <div>
              <span className="text-slate-500 font-normal block text-xs">學生姓名</span>
              <span className="text-base text-amber-900">{student.name}</span>
            </div>
            <div>
              <span className="text-slate-500 font-normal block text-xs">就讀班別</span>
              <span className="text-base text-slate-900">{student.classGrade}</span>
            </div>
            <div>
              <span className="text-slate-500 font-normal block text-xs">負責老師</span>
              <span className="text-base text-slate-900">{student.teacher}</span>
            </div>
          </div>

          {/* IEP Objectives Verification Badge */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              已達成 IEP 目標認證：
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>目標 P046：</strong>能表達自己 1 項或以上的強項與原因（✓ 已達標）</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>目標 ASD018：</strong>能明白進階情緒詞彙（自豪、興奮、滿足、沮喪）（✓ 已達標）</span>
              </div>
            </div>
          </div>

          {/* Core Strengths & Expression Sentence */}
          <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 space-y-2 text-center">
            <div className="text-xs font-bold text-amber-700">
              ★ 我的強項自信發表宣言 ★
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
              「{defaultSentence}」
            </div>
          </div>

          {/* 4 Emotions Mastered Cluster */}
          <div className="space-y-1.5 text-center">
            <div className="text-xs font-bold text-slate-500">
              四項進階情緒掌握認證：
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg">自豪 (Proud)</span>
              <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg">興奮 (Excited)</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg">滿足 (Content)</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg">沮喪 (Frustrated)</span>
            </div>
          </div>

          {/* Footer Signature & Seal */}
          <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs text-slate-600">
            <div className="space-y-1 text-left">
              <div className="w-32 border-b border-slate-400 pb-1 font-bold text-slate-900">
                {student.teacher}
              </div>
              <div className="text-slate-500">負責老師簽署</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex flex-col items-center justify-center text-amber-600 font-extrabold mx-auto shadow-2xs rotate-[-6deg]">
                <span className="text-[10px] leading-none">特教教研</span>
                <span className="text-xs leading-none mt-0.5">優異認證</span>
                <span className="text-[9px] leading-none text-amber-500">★ ★ ★</span>
              </div>
            </div>

            <div className="space-y-1 text-right">
              <div className="w-32 border-b border-slate-400 pb-1 font-bold text-slate-900">
                家長簽名欄
              </div>
              <div className="text-slate-500">家中延伸鼓勵簽署</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
