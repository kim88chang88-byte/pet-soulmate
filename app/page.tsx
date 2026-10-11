import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = ['서비스 소개', '궁합 테스트', '후기 모아보기'];

const FEATURES = [
  { emoji: '🔮', title: 'MBTI 기반', sub: '성향 맞춤 분석' },
  { emoji: '🐾', title: '품종 추천', sub: '댕냥 & 특수동물' },
  { emoji: '📱', title: '결과 공유', sub: '예쁜 카드 지참' },
];

const STATS = [
  { label: '지금까지 매칭된 집사', value: '142,891명', icon: '●' },
  { label: '사용자 만족도', value: '4.9 / 5.0', icon: '⭐' },
  { label: '소장용 맞춤 캐릭터 카드 즉시 발급', value: '', icon: '🎁' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
           style={{ background: 'rgba(255,248,247,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-comfortaa)' }}>
          🐾 냥멍 궁합
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((label) => (
            <button key={label} className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-pink-50"
                    style={{ color: 'var(--text-muted)' }}>
              {label}
            </button>
          ))}
        </div>
        <Link href="/quiz" className="btn-primary text-sm px-5 py-2">
          시작하기
        </Link>
      </nav>

      {/* 히어로 섹션 */}
      <main className="pt-20 pb-0 flex flex-col items-center px-5">

        {/* 소셜 프루프 배지 */}
        <div className="mt-10 mb-4 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ background: 'var(--primary-light)', color: 'var(--warm-brown)' }}>
            🩷 10만+ 집사들이 발견한 운명의 단짝 🌈
          </span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-3 animate-fade-up"
            style={{ color: 'var(--primary)', fontFamily: 'var(--font-comfortaa)', animationDelay: '0.05s' }}>
          냥멍 궁합
        </h1>
        <p className="text-lg text-center mb-8 animate-fade-up" style={{ color: 'var(--text-muted)', animationDelay: '0.1s' }}>
          나와 딱 맞는 반려동물을 찾아봐요 🩷
        </p>

        {/* 히어로 카드 */}
        <div className="relative w-full max-w-sm mb-6 animate-pop-in" style={{ animationDelay: '0.15s' }}>
          <div className="rounded-3xl overflow-hidden relative"
               style={{ background: 'linear-gradient(145deg, #fff0ef, #fde8e6)', border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(255,122,110,0.15)' }}>
            {/* 궁합지수 배지 */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                 style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--primary)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--primary)' }}></span>
              궁합지수 99%
            </div>

            {/* 캐릭터 이미지 영역 */}
            <div className="flex items-center justify-center gap-4 py-8 px-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(255,122,110,0.2)' }}>
                  <Image src="/golden-retriever.png" alt="골든 댕댕" width={128} height={128} className="object-cover w-full h-full" />
                </div>
              </div>
              <div className="text-4xl animate-float">🩷</div>
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,107,84,0.2)' }}>
                  <Image src="/tortoise.png" alt="꽃거북이" width={128} height={128} className="object-cover w-full h-full" />
                </div>
              </div>
            </div>

            {/* 카드 하단 라벨 */}
            <div className="px-4 pb-4 text-center">
              <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                ✨ 골든 댕댕 &amp; 꽃거북이
              </span>
            </div>
          </div>
        </div>

        {/* 피처 칩 */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {FEATURES.map(({ emoji, title, sub }) => (
            <div key={title} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                 style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(255,122,110,0.08)' }}>
              <span className="text-xl">{emoji}</span>
              <div>
                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{title}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <Link href="/quiz" className="btn-primary text-lg px-10 py-4 flex items-center gap-2">
            🐾 궁합 테스트 시작하기 →
          </Link>
        </div>
        <p className="mt-3 text-sm animate-fade-up" style={{ color: 'var(--text-muted)', animationDelay: '0.3s' }}>
          ⏱ 약 2분 소요 · <span style={{ color: 'var(--primary)' }}>완전 무료</span>
        </p>

        {/* 플로팅 캐릭터 카드 (데스크톱) */}
        <div className="hidden lg:block absolute left-8 top-52 animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="rounded-2xl p-3 text-center w-36" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(255,122,110,0.12)' }}>
            <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden mb-2">
              <Image src="/tortoise.png" alt="꽃거북이" width={80} height={80} className="object-cover w-full h-full" />
            </div>
            <div className="text-xs font-bold" style={{ color: 'var(--teal)' }}>느긋느긋 힐링</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>꽃거북이 오원</div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-8 top-80 animate-float" style={{ animationDelay: '1.2s' }}>
          <div className="rounded-2xl p-3 text-center w-36" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(255,122,110,0.12)' }}>
            <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden mb-2">
              <Image src="/golden-retriever.png" alt="골든 댕댕" width={80} height={80} className="object-cover w-full h-full" />
            </div>
            <div className="text-xs font-bold" style={{ color: 'var(--primary)' }}>매력뿜뿜 에너지</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>골든 댕댕이</div>
          </div>
        </div>

        {/* 스탯 바 */}
        <div className="w-full max-w-2xl mt-12 mb-0 px-4 py-5 rounded-3xl flex flex-col sm:flex-row items-center justify-around gap-4 animate-fade-up"
             style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(255,122,110,0.08)', animationDelay: '0.35s' }}>
          {STATS.map(({ label, value, icon }) => (
            <div key={label} className="text-center">
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {icon} {label}
              </div>
              {value && (
                <div className="text-base font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-12 px-6 py-8 border-t" style={{ borderColor: 'var(--border)', background: 'white' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <div className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-comfortaa)' }}>
              🩷 냥멍 궁합
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              반려동물과 집사의 따뜻하고 행복한 교감을 위한 궁합 매칭 서비스
            </p>
          </div>
          <div className="flex gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            {NAV_LINKS.map((label) => (
              <button key={label} className="hover:underline">{label}</button>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 냥멍 궁합. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
