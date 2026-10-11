export type MbtiType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type PetType = 'dog' | 'cat' | 'any';
export type QuizMode = 'current' | 'recommend';

export interface QuizState {
  mbti: MbtiType | null;
  lifestyle: string[];
  petType: PetType | null;
  mode: QuizMode | null;
  breed: string;
}

export interface RecommendedBreed {
  name: string;
  reason: string;
  emoji: string;
}

export interface ChemistryMetric {
  label: string;
  score: number;
  description: string;
}

export interface DailySlot {
  time: string;
  title: string;
  description: string;
  emoji: string;
}

export interface CareTip {
  type: '추천 놀이' | '추천 코스' | '주의할 점';
  icon: string;
  content: string;
}

export interface AnalysisResult {
  // 기본 궁합
  compatibilityScore: number;
  compatibilityLabel: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  tips: string[];
  recommendedBreeds: RecommendedBreed[];
  shareText: string;

  // 캐릭터 카드 (Stitch 디자인)
  petName: string;
  petGrade: 'SSR' | 'SR' | 'R';
  petBreed?: string;
  petDescription: string;
  petBreedDetail: string;
  petTags: string[];
  petStats: { label: string; value: string }[];
  petCardNumber: string;

  // 케미스트리 분석
  chemistryMetrics: ChemistryMetric[];

  // 하루 일과 미리보기
  dailySchedule: DailySlot[];

  // 케어 꿀팁
  careTips: CareTip[];
}
