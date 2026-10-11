import type { MbtiType, PetType, QuizMode } from '@/types';

export function buildPetCompatibilityPrompt(params: {
  mbti: MbtiType;
  lifestyle: string[];
  petType: PetType;
  mode: QuizMode;
  breed?: string;
}) {
  const { mbti, lifestyle, petType, mode, breed } = params;

  const petLabel =
    petType === 'dog' ? '개' : petType === 'cat' ? '고양이' : '개 또는 고양이';

  const modeDesc =
    mode === 'current'
      ? `현재 키우는 반려동물(${breed ?? petLabel})과의 궁합을 분석해주세요.`
      : `이 사람에게 가장 잘 맞는 ${petLabel} 품종을 추천해주세요.`;

  const system = `당신은 반려동물 행동 전문가이자 MBTI 상담사입니다.
사람의 MBTI와 라이프스타일을 분석해서 반려동물과의 궁합을 귀엽고 공감적인 한국어로 알려줍니다.
결과는 반드시 유효한 JSON만 출력하세요. 마크다운 코드블록 없이 순수 JSON만 반환하세요.`;

  const user = `다음 정보를 바탕으로 반려동물 궁합을 분석해주세요.

## 유저 정보
- MBTI: ${mbti}
- 라이프스타일:
${lifestyle.map((a, i) => `  ${i + 1}. ${a}`).join('\n')}

## 분석 요청
${modeDesc}

## 출력 형식 (JSON)
{
  "compatibilityScore": <0~100 사이 정수, 70~95 범위 권장>,
  "compatibilityLabel": <"천생연분" | "잘 맞는 편" | "노력이 필요해요" | "조금 어렵지만 사랑으로 극복!" 중 하나>,
  "summary": <두 문장 이내의 핵심 요약, 공감적이고 귀엽게>,
  "strengths": [<잘 맞는 점 3가지, 각 50자 이내>],
  "challenges": [<주의할 점 2가지, 각 50자 이내>],
  "tips": [<함께 잘 지내는 팁 2가지, 각 60자 이내>],
  "recommendedBreeds": [
    {
      "name": <품종 이름>,
      "reason": <이 품종을 추천하는 이유, 60자 이내>,
      "emoji": <해당 동물 이모지>
    }
  ],
  "shareText": <SNS에 공유할 짧은 문구, 해시태그 2~3개 포함, 80자 이내>,

  "petName": <반려동물의 귀여운 한국 이름 (예: 인절미, 감자, 호떡, 뭉치 등)>,
  "petGrade": <"SSR" | "SR" | "R" 중 하나, 궁합 점수에 따라: 90이상=SSR, 80이상=SR, 나머지=R>,
  "petBreed": <아래 품종 목록 중 정확히 일치하는 이름 하나. 개: 말티즈|포메라니안|시츄|비숑프리제|골든리트리버|라브라도리트리버|진돗개|푸들|닥스훈트|웰시코기|비글|치와와|요크셔테리어|프렌치불독|시베리안허스키|기타. 고양이: 코리안숏헤어|러시안블루|스코티시폴드|페르시안|메인쿤|브리티시숏헤어|아비시니안|봄베이|노르웨이숲|라가머핀|샴|벵갈|스핑크스|기타>,
  "petDescription": <한 줄 캐릭터 설명 (예: "햇살 가득 무한 긍정의 힐링 요정")>,
  "petBreedDetail": <품종 + 특성 설명 (예: "꼬리끝터 장인 골든 리트리버 • 1세 4개월")>,
  "petTags": [<#태그 형식으로 3개, 예: "#무한_친화력_인세대", "#꼬리_프로펠러_가동", "#비타민_에너지_뿜뿜">],
  "petStats": [
    { "label": "활동성", "value": <예: "에너자이저" | "홈바디" | "중간파"> },
    { "label": "애교 레벨", "value": <예: "무한 포옹형" | "츤데레형" | "쿨한 독립파"> },
    { "label": <세번째 스탯 라벨, 동물 특성 반영>, "value": <해당 값> }
  ],
  "petCardNumber": <"No. " + 4자리 랜덤 숫자>,

  "chemistryMetrics": [
    { "label": <케미 항목 이름, 예: "주말 산책 & 액티비티 궁합">, "score": <0~100 정수>, "description": <한 줄 설명> },
    { "label": <두번째 항목>, "score": <정수>, "description": <설명> },
    { "label": <세번째 항목>, "score": <정수>, "description": <설명> },
    { "label": <네번째 항목>, "score": <정수>, "description": <설명> }
  ],

  "dailySchedule": [
    { "time": <예: "아침 7:30">, "title": <활동 이름>, "description": <한 줄 설명>, "emoji": <이모지> },
    { "time": <예: "오후 3:00">, "title": <활동 이름>, "description": <한 줄 설명>, "emoji": <이모지> },
    { "time": <예: "밤 10:00">, "title": <활동 이름>, "description": <한 줄 설명>, "emoji": <이모지> }
  ],

  "careTips": [
    { "type": "추천 놀이", "icon": "🎾", "content": <추천 놀이 방법, 40자 이내> },
    { "type": "추천 코스", "icon": "🗺️", "content": <추천 산책/외출 코스, 40자 이내> },
    { "type": "주의할 점", "icon": "⚠️", "content": <주의사항, 40자 이내> }
  ]
}

recommendedBreeds는 ${mode === 'current' ? '현재 반려동물 포함해서' : '추천 품종'} 2~3개를 반환하세요.`;

  return { system, user };
}
