'use client';

interface ScoreDisplayProps {
  score: number;
  label: string;
  summary: string;
}

export function ScoreDisplay({ score, label, summary }: ScoreDisplayProps) {
  const color =
    score >= 85 ? '#F4A58A' :
    score >= 70 ? '#5BBFAA' : '#B0B0B0';

  return (
    <div className="card text-center mb-4">
      <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
        궁합 점수
      </p>
      <div className="text-6xl font-black mb-1" style={{ color }}>
        {score}
      </div>
      <div className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        {label}
      </div>

      {/* 점수 게이지 */}
      <div className="h-3 rounded-full overflow-hidden mx-4 mb-4" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 delay-300"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}, #FFDDD2)` }}
        />
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {summary}
      </p>
    </div>
  );
}
