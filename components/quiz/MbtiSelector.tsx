'use client';

import { MBTI_TYPES } from '@/lib/quiz-data';
import type { MbtiType } from '@/types';

const MBTI_GROUPS = [
  { label: '분석가형', color: '#E8D5FF', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
  { label: '외교관형', color: '#C8F0E8', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  { label: '관리자형', color: '#FFDDD2', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
  { label: '탐험가형', color: '#FFF3C4', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
] as const;

interface MbtiSelectorProps {
  selected: MbtiType | null;
  onSelect: (mbti: MbtiType) => void;
}

export function MbtiSelector({ selected, onSelect }: MbtiSelectorProps) {
  return (
    <div className="space-y-4">
      {MBTI_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-semibold mb-2 px-1" style={{ color: 'var(--text-muted)' }}>
            {group.label}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {group.types.map((type) => {
              const isSelected = selected === type;
              return (
                <button
                  key={type}
                  onClick={() => onSelect(type as MbtiType)}
                  className="h-11 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: isSelected ? group.color : 'white',
                    border: isSelected
                      ? `2px solid var(--peach-dark)`
                      : '2px solid var(--border)',
                    color: isSelected ? 'var(--warm-brown)' : 'var(--text-primary)',
                    transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                    boxShadow: isSelected ? '0 2px 8px rgba(244,165,138,0.3)' : 'none',
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// suppress unused import warning
void MBTI_TYPES;
