interface AnalysisSectionProps {
  strengths: string[];
  challenges: string[];
  tips: string[];
}

export function AnalysisSection({ strengths, challenges, tips }: AnalysisSectionProps) {
  return (
    <div className="space-y-4 mb-4">
      {/* 잘 맞는 점 */}
      <div className="card">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span>💚</span> 잘 맞는 점
        </h3>
        <ul className="space-y-2">
          {strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <span className="mt-0.5 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--mint)', color: 'var(--mint-dark)' }}>
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* 주의할 점 */}
      <div className="card">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span>🧡</span> 주의할 점
        </h3>
        <ul className="space-y-2">
          {challenges.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <span className="mt-0.5 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--peach)', color: 'var(--warm-brown)' }}>
                !
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* 함께 잘 지내는 팁 */}
      <div className="card">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span>🌟</span> 함께 잘 지내는 팁
        </h3>
        <ul className="space-y-2">
          {tips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <span className="text-base">💡</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
