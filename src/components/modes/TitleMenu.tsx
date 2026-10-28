import React from 'react';
import { GameMode, StudentProfile } from '../../types/game';
import { soundFx, speakText } from '../../utils/audio';
import { ExpressiveAvatar } from '../common/ExpressiveAvatar';
import { Compass, FolderCheck, Eye, Sparkles, BookOpen, Volume2, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TitleMenuProps {
  student: StudentProfile;
  starsCount: number;
  onStartMode: (mode: GameMode) => void;
  onOpenParentGuide: () => void;
  onOpenCertificate: () => void;
}

export const TitleMenu: React.FC<TitleMenuProps> = ({
  student,
  starsCount,
  onStartMode,
  onOpenParentGuide,
  onOpenCertificate,
}) => {
  const adventures = [
    {
      id: 'RADAR' as GameMode,
      title: '第一關：強項探索大雷達',
      subtitle: '認識強項三要素 · 發掘我的閃光點',
      icon: Compass,
      color: 'bg-amber-500',
      badge: '強項三要素',
      desc: '我做得好、比別人優秀、曾獲肯定！探索生活情境強項卡。',
    },
    {
      id: 'SORTING' as GameMode,
      title: '第二關：強項分類大派對',
      subtitle: '魔法寶箱 · 學業/運動/藝術/人際',
      icon: FolderCheck,
      color: 'bg-blue-500',
      badge: '分類配對',
      desc: '將「音樂演奏、英文溝通、跑步快、踢球」快速歸入四大領域！',
    },
    {
      id: 'EMOTION' as GameMode,
      title: '第三關：情緒放大鏡對對碰',
      subtitle: '自豪 · 興奮 · 滿足 · 沮喪',
      icon: Eye,
      color: 'bg-rose-500',
      badge: '進階情緒',
      desc: '辨識進階情緒詞彙，情境挑戰，並掌握沮喪應對魔法包。',
    },
    {
      id: 'STAGE' as GameMode,
      title: '第四關：自信表達大舞台',
      subtitle: '站穩微笑 · 說出強項與原因',
      icon: Sparkles,
      color: 'bg-purple-500',
      badge: 'IEP P046 核心',
      desc: '自信三步驟：「我的強項是音樂演奏，因為我彈琴很好、曾獲獎項！」',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Hero Welcome & Story Lockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Title & Introduction */}
        <div className="lg:col-span-7 space-y-5">
          {/* Metadata pill-less header */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
            <span>學生：{student.name}</span>
            <span aria-hidden="true">·</span>
            <span>班別：{student.classGrade}</span>
            <span aria-hidden="true">·</span>
            <span>負責老師：{student.teacher}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
              我的強項大冒險
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              探索自己的優點，認識進階情緒，自信大聲說出我的強項！
            </p>
          </div>

          {/* Audio read-aloud button for accessibility */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                soundFx.playClick();
                speakText(`歡迎 ${student.name} 來到我的強項大冒險！讓我們一起認識強項與情緒，自信表達自己！`);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>語音導覽：聽聽遊戲說明</span>
            </button>

            <button
              onClick={onOpenParentGuide}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>【家中延伸】家長指南</span>
            </button>
          </div>

          {/* Quick IEP Objective Badge Box */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="text-xs font-bold text-amber-700 tracking-wide">
              本單元學習目標 (IEP Target)：
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>目標 P046：</strong>能表達自己 1 項或以上的強項與原因。</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>目標 ASD018：</strong>能明白進階情緒詞彙（自豪、興奮、滿足、沮喪），並用以描述情緒。</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Mascot Centerpiece */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/80 to-sky-50/80 rounded-2xl border border-amber-200/60 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xs font-bold text-amber-600 px-2 py-0.5 bg-amber-100 rounded-md">
            ★ 已收集 {starsCount} 顆強項星
          </div>

          <ExpressiveAvatar emotion="proud" showAccessory="violin" size="lg" className="my-2" />

          <div className="mt-3 space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              你好，我是 {student.name}！
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs">
              「我的強項是音樂演奏！你準備好發掘自己的強項了嗎？」
            </p>
          </div>

          <div className="mt-5 w-full flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => {
                soundFx.playFanfare();
                onStartMode('RADAR');
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>立即啟程：進入第一關</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCertificate}
              className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
            >
              查看我的獎狀
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stage Hub Cards */}
      <div className="mt-8 pt-6 border-t border-slate-200/80">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>四大冒險關卡</span>
          <span className="text-xs font-normal text-slate-500">點擊任一關卡即可開始挑戰</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adventures.map((adv) => {
            const Icon = adv.icon;
            return (
              <button
                key={adv.id}
                onClick={() => {
                  soundFx.playClick();
                  onStartMode(adv.id);
                }}
                className="group p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm text-left transition-all flex flex-col justify-between cursor-pointer active:scale-98"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${adv.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {adv.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    {adv.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-amber-600">
                  <span>開始挑戰</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
