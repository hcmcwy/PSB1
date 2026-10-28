export type StrengthCategory = 'academic' | 'sports' | 'art' | 'social';

export interface StrengthItem {
  id: string;
  title: string;
  category: StrengthCategory;
  categoryLabel: string;
  iconName: string;
  description: string;
  reasons: string[];
  awards: string[];
  scenario: string;
  color: string;
  badgeBg: string;
}

export type EmotionType = 'proud' | 'excited' | 'content' | 'frustrated';

export interface EmotionInfo {
  id: EmotionType;
  titleZh: string;
  titleEn: string;
  summary: string;
  description: string;
  faceEmoji: string;
  facialFeatures: string[];
  bodyFeelings: string;
  color: string;
  bgColor: string;
  borderColor: string;
  copingTip?: string;
}

export interface EmotionScenario {
  id: string;
  situation: string;
  context: string;
  speaker: string;
  targetEmotion: EmotionType;
  distractors: EmotionType[];
  explanation: string;
  copingAdvice?: string;
  tag: string;
}

export interface StudentProfile {
  name: string;
  classGrade: string;
  teacher: string;
  iepGoalP046: string;
  iepGoalASD018: string;
  avatarSeed: string;
}

export type GameMode = 
  | 'MENU'
  | 'RADAR'
  | 'SORTING'
  | 'EMOTION'
  | 'STAGE'
  | 'CERTIFICATE'
  | 'PARENT_GUIDE';

export interface StrengthSpeechDraft {
  strengthTitle: string;
  reason1: string;
  reason2: string;
  customReason?: string;
}
