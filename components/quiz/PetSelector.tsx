'use client';

import { useState } from 'react';
import { POPULAR_BREEDS } from '@/lib/quiz-data';
import type { PetType, QuizMode } from '@/types';

interface PetSelectorProps {
  petType: PetType | null;
  mode: QuizMode | null;
  breed: string;
  onPetTypeChange: (t: PetType) => void;
  onModeChange: (m: QuizMode) => void;
  onBreedChange: (b: string) => void;
}

const PET_OPTIONS: { value: PetType; label: string; emoji: string }[] = [
  { value: 'dog', label: '강아지', emoji: '🐶' },
  { value: 'cat', label: '고양이', emoji: '🐱' },
  { value: 'any', label: '상관없어요', emoji: '🐾' },
];

export function PetSelector({
  petType, mode, breed,
  onPetTypeChange, onModeChange, onBreedChange,
}: PetSelectorProps) {
  const [showBreedList, setShowBreedList] = useState(false);

  const breeds =
    petType === 'dog' ? POPULAR_BREEDS.dog :
    petType === 'cat' ? POPULAR_BREEDS.cat :
    [...POPULAR_BREEDS.dog, ...POPULAR_BREEDS.cat];

  return (
    <div className="space-y-6">
      {/* 동물 종류 */}
      <div>
        <p className="font-bold text-xl mb-4" style={{ color: 'var(--text-primary)' }}>
          어떤 동물인가요?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {PET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onPetTypeChange(opt.value)}
              className="py-4 rounded-2xl text-center transition-all"
              style={{
                background: petType === opt.value ? 'var(--peach)' : 'white',
                border: petType === opt.value
                  ? '2px solid var(--peach-dark)'
                  : '2px solid var(--border)',
                color: 'var(--text-primary)',
                transform: petType === opt.value ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              <div className="text-3xl mb-1">{opt.emoji}</div>
              <div className="text-sm font-semibold">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 모드 선택 */}
      {petType && (
        <div>
          <p className="font-bold text-xl mb-4" style={{ color: 'var(--text-primary)' }}>
            지금 키우는 반려동물이 있나요?
          </p>
          <div className="space-y-3">
            <button
              className={`btn-option${mode === 'current' ? ' selected' : ''}`}
              onClick={() => onModeChange('current')}
            >
              <span className="text-xl">🏠</span>
              <span>네, 있어요 — 궁합 확인할게요</span>
            </button>
            <button
              className={`btn-option${mode === 'recommend' ? ' selected' : ''}`}
              onClick={() => { onModeChange('recommend'); onBreedChange(''); }}
            >
              <span className="text-xl">🔍</span>
              <span>없어요 — 맞는 품종 추천받을래요</span>
            </button>
          </div>
        </div>
      )}

      {/* 품종 선택 (current 모드일 때만) */}
      {mode === 'current' && (
        <div>
          <p className="font-bold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
            품종을 선택해주세요
          </p>
          <button
            onClick={() => setShowBreedList((v) => !v)}
            className="w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between"
            style={{
              background: breed ? 'var(--peach)' : 'white',
              border: '2px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <span>{breed || '품종 선택'}</span>
            <span style={{ color: 'var(--text-muted)' }}>{showBreedList ? '▲' : '▼'}</span>
          </button>
          {showBreedList && (
            <div className="mt-2 rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              {breeds.map((b) => (
                <button
                  key={b}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 transition-colors border-b last:border-b-0"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  onClick={() => { onBreedChange(b); setShowBreedList(false); }}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
