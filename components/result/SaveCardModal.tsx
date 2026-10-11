'use client';

import { useState, useRef, useCallback, forwardRef } from 'react';
import type { AnalysisResult, QuizState } from '@/types';
import { getBreedImage } from '@/lib/breed-images';

type Format = 'square' | 'story';
type Theme = 'hologram' | 'pastel' | 'transparent';

const CARD_SIZE: Record<Format, { w: number; h: number }> = {
  square: { w: 264, h: 264 },
  story:  { w: 198, h: 352 },
};

const GRADE_BADGE: Record<string, { bg: string; color: string }> = {
  SSR: { bg: '#fef3c7', color: '#92400e' },
  SR:  { bg: '#e8f4fd', color: '#0c5460' },
  R:   { bg: '#f8d7da', color: '#721c24' },
};

const FORMAT_OPTIONS: { value: Format; label: string; sub: string; icon: string }[] = [
  { value: 'square', label: '정사각 소장용', sub: '1:1 기본 규격', icon: '⬛' },
  { value: 'story',  label: '인스타 스토리', sub: '9:16 릴스용',  icon: '📱' },
];

const THEME_OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: 'hologram',    label: '홀로그램 포일',   icon: '✨' },
  { value: 'pastel',      label: '오리지널 파스텔', icon: '🎨' },
  { value: 'transparent', label: '투명 배경 (PNG)', icon: '🖼️' },
];

interface ExportCardProps {
  result: AnalysisResult;
  state: QuizState;
  format: Format;
  theme: Theme;
}

const ExportCard = forwardRef<HTMLDivElement, ExportCardProps>(function ExportCard(
  { result, state, format, theme },
  ref
) {
  const { w, h } = CARD_SIZE[format];
  const isSquare = format === 'square';
  const petImage = getBreedImage(result.petBreed, state.petType ?? undefined);
  const breedLabel =
    state.breed || (state.petType === 'dog' ? '강아지' : state.petType === 'cat' ? '고양이' : '반려동물');
  const grade = result.petGrade ?? 'SR';
  const gradeStyle = GRADE_BADGE[grade] ?? GRADE_BADGE.SR;

  const bgStyle: React.CSSProperties =
    theme === 'hologram'
      ? { background: 'linear-gradient(135deg, #fce4ec 0%, #fff8e1 25%, #e8f5e9 50%, #e8eaf6 75%, #fce4ec 100%)' }
      : theme === 'pastel'
      ? { background: 'linear-gradient(145deg, #ffddd2 0%, #fce4ec 100%)' }
      : { background: 'rgba(255,255,255,0)' };

  const imgSize = isSquare ? 128 : 116;

  return (
    <div
      ref={ref}
      style={{
        width: w,
        height: h,
        ...bgStyle,
        border: theme === 'transparent' ? 'none' : '1.5px solid rgba(255,122,110,0.25)',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isSquare ? '12px 14px' : '14px 14px',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Top row */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          padding: '2px 7px',
          borderRadius: 99,
          background: gradeStyle.bg,
          color: gradeStyle.color,
          letterSpacing: '0.04em',
        }}>
          {grade}
        </span>
        {!isSquare && (
          <span style={{ fontSize: 10, fontWeight: 800, color: '#ff7a6e' }}>냥멍궁합 🐾</span>
        )}
        <span style={{ fontSize: 8, color: '#57423f', opacity: 0.55 }}>{result.petCardNumber}</span>
      </div>

      {/* Pet image */}
      <div style={{
        width: imgSize,
        height: imgSize,
        borderRadius: 14,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(255,122,110,0.2)',
        flexShrink: 0,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={petImage}
          alt={result.petName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Name + breed */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: isSquare ? 15 : 13, fontWeight: 800, color: '#231918', lineHeight: 1.2 }}>
          {result.petName}
        </div>
        <div style={{ fontSize: isSquare ? 9 : 8, color: '#57423f', marginTop: 2 }}>
          🐾 {breedLabel}
          {!isSquare && state.mbti && (
            <span style={{ marginLeft: 6, padding: '1px 5px', background: 'rgba(255,122,110,0.15)', borderRadius: 4, fontWeight: 600 }}>
              {state.mbti}
            </span>
          )}
        </div>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: isSquare ? 22 : 19, fontWeight: 900, color: '#ff7a6e', lineHeight: 1.1 }}>
          🩷 {result.compatibilityScore}%
        </div>
        <div style={{ fontSize: isSquare ? 10 : 8, fontWeight: 700, color: '#231918', marginTop: 2 }}>
          {result.compatibilityLabel}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {(result.petTags ?? []).slice(0, isSquare ? 2 : 3).map((tag) => (
          <span key={tag} style={{
            fontSize: 7.5,
            padding: '2px 6px',
            borderRadius: 99,
            background: 'rgba(255,122,110,0.12)',
            color: '#721110',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom branding (square only) */}
      {isSquare && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 8, color: '#57423f', opacity: 0.45 }}>냥멍궁합 🐾</span>
        </div>
      )}
    </div>
  );
});

interface SaveCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
  state: QuizState;
}

export function SaveCardModal({ isOpen, onClose, result, state }: SaveCardModalProps) {
  const [format, setFormat] = useState<Format>('square');
  const [theme, setTheme] = useState<Theme>('hologram');
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || loading) return;
    setLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: theme === 'transparent' ? null : undefined,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `냥멍궁합_${result.petName}_${format === 'square' ? '소장용' : '스토리'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setLoading(false);
    }
  }, [format, theme, result.petName, loading]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%',
        maxWidth: 640,
        background: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
        maxHeight: '92vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(255,122,110,0.18)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#231918', margin: 0, fontFamily: 'inherit' }}>
              🎴 캐릭터 카드 소장 &amp; 저장하기
            </h2>
            <p style={{ fontSize: 12, color: '#57423f', marginTop: 4, lineHeight: 1.5 }}>
              나의 운명적 단짝 &apos;{result.petName}&apos; 카드를 고화질로 저장하고 일상에서 소장해보세요!
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              color: '#57423f',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Left: Card preview */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#57423f',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#4ade80',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              실시간 미리보기
              <span style={{
                marginLeft: 4,
                fontSize: 9,
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 99,
                background: '#fef3c7',
                color: '#92400e',
              }}>
                ✨ SSR 에디션
              </span>
            </div>
            <ExportCard ref={cardRef} result={result} state={state} format={format} theme={theme} />
          </div>

          {/* Right: Options */}
          <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Format */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#231918', margin: '0 0 10px' }}>
                📐 카드 비율 &amp; 용도
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {FORMAT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFormat(opt.value)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: 14,
                      textAlign: 'center',
                      background: format === opt.value ? '#ffddd2' : '#fff8f7',
                      border: `2px solid ${format === opt.value ? '#f4a58a' : 'rgba(255,122,110,0.2)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{opt.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#231918' }}>{opt.label}</div>
                    <div style={{ fontSize: 10, color: '#57423f' }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#231918', margin: '0 0 10px' }}>
                🎨 프레임 &amp; 효과 테마
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: theme === opt.value ? '#ff7a6e' : '#fff8f7',
                      border: `2px solid ${theme === opt.value ? '#ff7a6e' : 'rgba(255,122,110,0.2)'}`,
                      color: theme === opt.value ? 'white' : '#231918',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      transition: 'all 0.15s',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 15 }}>{opt.icon}</span>
                    <span>{opt.label}</span>
                    {theme === opt.value && (
                      <span style={{ marginLeft: 'auto', fontSize: 13 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={handleDownload}
              disabled={loading}
              style={{
                padding: '13px 20px',
                borderRadius: 99,
                background: loading ? '#d1d5db' : '#ff7a6e',
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: loading ? 'none' : '0 4px 20px rgba(255,122,110,0.4)',
                transition: 'all 0.15s',
              }}
            >
              {loading ? '⏳ 저장 중...' : '💾 고화질 이미지 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
