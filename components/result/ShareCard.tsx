'use client';

import { useRef } from 'react';
import type { AnalysisResult, QuizState } from '@/types';

interface ShareCardProps {
  result: AnalysisResult;
  state: QuizState;
}

export function ShareCard({ result, state }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const petEmoji =
    state.petType === 'dog' ? '🐶' :
    state.petType === 'cat' ? '🐱' : '🐾';

  const handleShare = async () => {
    const text = `${result.shareText}\n\n🔮 냥멍궁합 테스트 해봐요!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: '냥멍 궁합 결과', text });
        return;
      } catch {
        // fallthrough to clipboard
      }
    }
    await navigator.clipboard.writeText(text);
    alert('결과가 클립보드에 복사됐어요! 📋');
  };

  return (
    <div className="space-y-4">
      {/* 공유 카드 미리보기 */}
      <div
        ref={cardRef}
        className="rounded-3xl p-6 text-center"
        style={{ background: 'linear-gradient(135deg, #FFDDD2 0%, #C8F0E8 100%)' }}
      >
        <div className="text-5xl mb-3">{petEmoji}</div>
        <div className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
          냥멍 궁합
        </div>
        <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {state.mbti} × {state.breed || (state.petType === 'dog' ? '강아지' : state.petType === 'cat' ? '고양이' : '반려동물')}
        </div>
        <div className="text-5xl font-black my-3" style={{ color: 'var(--warm-brown)' }}>
          {result.compatibilityScore}점
        </div>
        <div className="text-lg font-bold mb-2" style={{ color: 'var(--warm-brown)' }}>
          {result.compatibilityLabel}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {result.summary}
        </p>
      </div>

      {/* 공유 버튼 */}
      <button onClick={handleShare} className="btn-primary w-full">
        📱 친구에게 공유하기
      </button>
    </div>
  );
}
