'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { AnalysisResult, QuizState } from '@/types';
import { getBreedImage } from '@/lib/breed-images';
import { SaveCardModal } from '@/components/result/SaveCardModal';
import { AnalysisSection } from '@/components/result/AnalysisSection';

const GRADE_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  SSR: { bg: '#fff3cd', color: '#856404', label: 'SSR 등급' },
  SR:  { bg: '#e8f4fd', color: '#0c5460', label: 'SR 등급' },
  R:   { bg: '#f8d7da', color: '#721c24', label: 'R 등급' },
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [state, setState] = useState<QuizState | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (!result) return;
    const text = `${result.shareText}\n\n🐾 냥멍궁합 테스트 해봐요!`;
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title: '냥멍 궁합 결과', text });
        return;
      } catch { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch { /* ignore */ }
  }, [result]);

  useEffect(() => {
    const stored = sessionStorage.getItem('petGunghapResult');
    if (!stored) { router.push('/quiz'); return; }
    const parsed = JSON.parse(stored);
    setResult(parsed.result);
    setState(parsed.state);
  }, [router]);

  if (!result || !state) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-5xl animate-float">🐾</div>
      </main>
    );
  }

  const grade = result.petGrade ?? 'SR';
  const gradeStyle = GRADE_STYLES[grade] ?? GRADE_STYLES.SR;
  const petImage = getBreedImage(result.petBreed, state.petType ?? undefined);

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* 저장 모달 */}
      {showSaveModal && result && state && (
        <SaveCardModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          result={result}
          state={state}
        />
      )}

      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
           style={{ background: 'rgba(255,248,247,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-comfortaa)' }}>
          🐾 냥멍 궁합
        </Link>
        <Link href="/quiz" className="btn-primary text-sm px-5 py-2">다시 테스트</Link>
      </nav>

      <main className="pt-24 pb-16 px-4 max-w-5xl mx-auto">

        {/* 상단 배지 + 타이틀 */}
        <div className="text-center mb-8 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{ background: 'var(--primary-light)', color: 'var(--warm-brown)' }}>
            🏆 10만 집사가 인정한 최고의 궁합 분석 완료!
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-comfortaa)' }}>
            당신의 운명적인 평생 짝꿍은?
          </h1>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            집사님의 활발한 라이프스타일과 다정한 성향을 10가지 데이터로 정밀 분석한 결과예요.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #ff7a6e, #ffb5af)', color: 'white' }}>
            ✨ 운명적 인연 지수 {result.compatibilityScore}% 달성 ✨
          </span>
        </div>

        {/* 2컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>

          {/* 왼쪽: 캐릭터 카드 */}
          <div className="rounded-3xl overflow-hidden" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(255,122,110,0.1)' }}>
            {/* 카드 헤더 */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--primary)', color: 'white' }}>
                  🩷 매칭률 {result.compatibilityScore}%
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: gradeStyle.bg, color: gradeStyle.color }}>
                  {gradeStyle.label} {state.petType === 'dog' ? '댕댕이' : state.petType === 'cat' ? '고양이' : '반려동물'}
                </span>
              </div>
            </div>

            {/* 설명 */}
            <div className="px-5 pb-2">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{result.petDescription}</p>
              <h2 className="text-2xl font-bold mt-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-comfortaa)' }}>
                {result.petName}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                🐾 {result.petBreedDetail}
              </p>
            </div>

            {/* 캐릭터 이미지 */}
            <div className="relative mx-5 mb-4 rounded-2xl overflow-hidden"
                 style={{ background: 'linear-gradient(145deg, #fff0ef, #fde8e6)', aspectRatio: '1' }}>
              <Image src={petImage} alt={result.petName} fill className="object-cover" unoptimized />
              <div className="absolute bottom-2 left-3 text-xs px-2 py-1 rounded-full font-medium"
                   style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--text-primary)' }}>
                ✨ {gradeStyle.label} 컬렉션
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                   style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--primary)' }}>
                🩷 {result.compatibilityScore}%
              </div>
            </div>

            {/* 태그 */}
            <div className="px-5 mb-4 flex flex-wrap gap-2">
              {(result.petTags ?? []).map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'var(--primary-light)', color: 'var(--warm-brown)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* 스탯 */}
            <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
              {(result.petStats ?? []).map(({ label, value }) => (
                <div key={label} className="text-center p-2 rounded-xl"
                     style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* 카드 번호 */}
            <div className="px-5 pb-3 flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{result.petCardNumber}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>냥멍 궁합 공식 캐릭터 카드</span>
            </div>

            {/* 버튼 */}
            <div className="px-5 pb-5 flex gap-3">
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
                style={{ background: 'var(--primary)', color: 'white' }}>
                📋 캐릭터 카드 저장
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-colors"
                style={{ background: shareCopied ? '#d1fae5' : 'var(--cream)', border: '1px solid var(--border)', color: shareCopied ? '#065f46' : 'var(--text-primary)' }}>
                {shareCopied ? '✓ 복사됨!' : '🔗 친구에게 공유하기'}
              </button>
            </div>
          </div>

          {/* 오른쪽: 분석 패널 */}
          <div className="flex flex-col gap-4">

            {/* 케미스트리 분석 */}
            <div className="rounded-3xl p-5" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(255,122,110,0.06)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔬</span>
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                  집사 &amp; {result.petName}의 종합 케미스트리 분석
                </h3>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>성격 리듬과 야외 활동 반경의 일치율 리포트</p>

              {/* 대표 인용구 */}
              <div className="rounded-2xl p-3 mb-4 text-sm italic" style={{ background: 'var(--cream)', color: 'var(--text-primary)' }}>
                "{result.summary}"
              </div>

              <div className="space-y-4">
                {(result.chemistryMetrics ?? []).map(({ label, score, description }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
                      <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{score}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full mb-1" style={{ background: 'var(--primary-light)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, background: 'var(--primary)' }} />
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 하루 일과 미리보기 */}
            <div className="rounded-3xl p-5" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(255,122,110,0.06)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">⏰</span>
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>하루 일과로 보는 궁합 미리보기</h3>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{result.petName}와 함께할 사랑스러운 24시간 루틴</p>

              <div className="grid grid-cols-3 gap-3">
                {(result.dailySchedule ?? []).map(({ time, title, description, emoji }) => (
                  <div key={time} className="rounded-2xl p-3 text-center" style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
                    <div className="text-xl mb-1">{emoji}</div>
                    <div className="text-xs font-bold mb-0.5" style={{ color: 'var(--text-muted)' }}>{time}</div>
                    <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{title}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 케어 꿀팁 */}
            <div className="rounded-3xl p-5" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(255,122,110,0.06)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">💡</span>
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                  {result.petName}와 더 행복해지는 집사 맞춤 케어 꿀팁
                </h3>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>건강하고 신나는 동행을 위한 가이드</p>

              <div className="space-y-3">
                {(result.careTips ?? []).map(({ type, icon, content }) => (
                  <div key={type} className="flex items-start gap-3 p-3 rounded-2xl" style={{ border: '1px solid var(--border)' }}>
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <div className="text-xs font-bold mb-0.5" style={{ color: 'var(--primary)' }}>{type}</div>
                      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 잘 맞는 점 / 주의할 점 / 팁 */}
            {((result.strengths?.length ?? 0) > 0 || (result.challenges?.length ?? 0) > 0) && (
              <AnalysisSection
                strengths={result.strengths ?? []}
                challenges={result.challenges ?? []}
                tips={result.tips ?? []}
              />
            )}
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/quiz" className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
                style={{ border: '1px solid var(--border)', background: 'white', color: 'var(--text-primary)' }}>
            🔄 다시 테스트하기
          </Link>
          <Link href="/quiz" className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
                style={{ border: '1px solid var(--border)', background: 'white', color: 'var(--text-primary)' }}>
            🐾 다른 매칭 유형 둘러보기
          </Link>
          <a href="https://www.animal.go.kr" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
             style={{ background: 'var(--primary)', color: 'white' }}>
            🏠 입양 및 보호소 연계 정보 확인하기
          </a>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: 'var(--border)', background: 'white' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <div className="font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-comfortaa)' }}>🩷 냥멍 궁합</div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>반려동물과 집사의 따뜻하고 행복한 교감을 위한 궁합 매칭 서비스</p>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 냥멍 궁합. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
