'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MbtiSelector } from '@/components/quiz/MbtiSelector';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { PetSelector } from '@/components/quiz/PetSelector';
import { LIFESTYLE_QUESTIONS } from '@/lib/quiz-data';
import type { MbtiType, PetType, QuizMode, QuizState } from '@/types';

const TOTAL_STEPS = 2 + LIFESTYLE_QUESTIONS.length; // MBTI + 5 lifestyle + pet(last page)

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [state, setState] = useState<QuizState>({
    mbti: null,
    lifestyle: [],
    petType: null,
    mode: null,
    breed: '',
  });

  const goNext = useCallback(() => {
    setAnimating(true);
    setTimeout(() => { setStep((s) => s + 1); setAnimating(false); }, 280);
  }, []);

  const goBack = useCallback(() => {
    setAnimating(true);
    setTimeout(() => { setStep((s) => Math.max(0, s - 1)); setAnimating(false); }, 280);
  }, []);

  const handleMbtiSelect = (mbti: MbtiType) => {
    setState((s) => ({ ...s, mbti }));
  };

  const handleLifestyleSelect = (qIndex: number, value: string) => {
    setState((s) => {
      const next = [...s.lifestyle];
      next[qIndex] = value;
      return { ...s, lifestyle: next };
    });
  };

  const canProceed = () => {
    if (step === 0) return !!state.mbti;
    if (step >= 1 && step <= LIFESTYLE_QUESTIONS.length) {
      return !!state.lifestyle[step - 1];
    }
    // pet step
    if (!state.petType || !state.mode) return false;
    if (state.mode === 'current' && !state.breed) return false;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mbti: state.mbti,
          lifestyle: state.lifestyle,
          petType: state.petType,
          mode: state.mode,
          breed: state.breed || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      sessionStorage.setItem('petGunghapResult', JSON.stringify({ result, state }));
      router.push('/result');
    } catch {
      setError('분석 중 오류가 발생했습니다. 다시 시도해 주세요.');
      setLoading(false);
    }
  };

  const isPetStep = step === LIFESTYLE_QUESTIONS.length + 1;
  const lifestyleIndex = step - 1; // 1-indexed step → 0-indexed array

  const progress = Math.round((step / (TOTAL_STEPS)) * 100);

  const panelStyle: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating ? 'translateY(10px)' : 'none',
    transition: 'opacity 0.28s ease, transform 0.28s ease',
  };

  if (loading) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center min-h-screen px-5">
        <div className="text-6xl animate-float mb-6">🔮</div>
        <p className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
          궁합을 분석하고 있어요...
        </p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>잠깐만 기다려 주세요 🐾</p>
        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
        )}
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-1 min-h-screen px-5 py-8 max-w-md mx-auto w-full">

      {/* 프로그레스 바 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={goBack} disabled={step === 0}
                  className="text-sm disabled:opacity-0 transition-opacity"
                  style={{ color: 'var(--text-muted)' }}>
            ← 이전
          </button>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {step + 1} / {TOTAL_STEPS + 1}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full transition-all duration-500"
               style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--peach-dark), var(--mint-dark))' }} />
        </div>
      </div>

      {/* 컨텐츠 패널 */}
      <div className="card flex-1" style={panelStyle}>
        {step === 0 && (
          <>
            <p className="font-bold text-xl mb-5" style={{ color: 'var(--text-primary)' }}>
              나의 MBTI는? 🔮
            </p>
            <MbtiSelector selected={state.mbti} onSelect={handleMbtiSelect} />
          </>
        )}

        {step >= 1 && step <= LIFESTYLE_QUESTIONS.length && (() => {
          const q = LIFESTYLE_QUESTIONS[lifestyleIndex];
          return (
            <QuizQuestion
              key={q.id}
              question={q.question}
              options={q.options}
              selected={state.lifestyle[lifestyleIndex] ?? null}
              onSelect={(v) => handleLifestyleSelect(lifestyleIndex, v)}
            />
          );
        })()}

        {isPetStep && (
          <PetSelector
            petType={state.petType}
            mode={state.mode}
            breed={state.breed}
            onPetTypeChange={(t: PetType) => setState((s) => ({ ...s, petType: t }))}
            onModeChange={(m: QuizMode) => setState((s) => ({ ...s, mode: m }))}
            onBreedChange={(b) => setState((s) => ({ ...s, breed: b }))}
          />
        )}
      </div>

      {/* 다음/완료 버튼 */}
      <div className="mt-4" style={panelStyle}>
        {isPetStep ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            궁합 분석하기 ✨
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음 →
          </button>
        )}
      </div>
    </main>
  );
}
