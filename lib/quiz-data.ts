export interface QuizOption {
  value: string;
  label: string;
  emoji?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const;

export const LIFESTYLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'time_at_home',
    question: '하루에 집에 있는 시간은?',
    options: [
      { value: '거의 하루종일 집에 있어요', label: '거의 하루종일', emoji: '🏠' },
      { value: '오전·오후는 집에 있어요', label: '오전·오후는 집에', emoji: '🌤' },
      { value: '저녁에만 집에 들어와요', label: '저녁에만 귀가', emoji: '🌙' },
    ],
  },
  {
    id: 'activity',
    question: '선호하는 활동 수준은?',
    options: [
      { value: '매일 30분+ 산책·운동 가능해요', label: '매일 활발하게', emoji: '🏃‍♀️' },
      { value: '주말 위주로 함께 외출해요', label: '주말 위주', emoji: '🚶‍♀️' },
      { value: '실내 활동을 주로 해요', label: '실내 위주', emoji: '🛋' },
    ],
  },
  {
    id: 'housing',
    question: '거주 환경은?',
    options: [
      { value: '아파트 (마당 없음)', label: '아파트', emoji: '🏢' },
      { value: '단독주택 (마당 있음)', label: '단독주택', emoji: '🏡' },
    ],
  },
  {
    id: 'experience',
    question: '반려동물 경험은?',
    options: [
      { value: '처음 키워봐요', label: '처음이에요', emoji: '🌱' },
      { value: '키워본 적 있어요', label: '경험 있어요', emoji: '⭐' },
    ],
  },
  {
    id: 'relationship',
    question: '어떤 관계를 원하나요?',
    options: [
      { value: '항상 붙어있는 친구', label: '항상 붙어있는 친구', emoji: '🤗' },
      { value: '독립적인 동반자', label: '독립적인 동반자', emoji: '😎' },
      { value: '귀여운 아기같은 존재', label: '귀여운 아기같은 존재', emoji: '🍼' },
    ],
  },
];

export const POPULAR_BREEDS = {
  dog: [
    '말티즈', '포메라니안', '시츄', '비숑프리제', '골든리트리버',
    '라브라도리트리버', '진돗개', '푸들', '닥스훈트', '웰시코기',
    '비글', '치와와', '요크셔테리어', '프렌치불독', '시베리안허스키',
    '기타',
  ],
  cat: [
    '코리안숏헤어', '러시안블루', '스코티시폴드', '페르시안', '메인쿤',
    '브리티시숏헤어', '아비시니안', '봄베이', '노르웨이숲', '라가머핀',
    '샴', '벵갈', '스핑크스', '기타',
  ],
};
