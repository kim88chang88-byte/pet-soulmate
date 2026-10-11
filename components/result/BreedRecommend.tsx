import type { RecommendedBreed } from '@/types';

interface BreedRecommendProps {
  breeds: RecommendedBreed[];
  mode: 'current' | 'recommend';
}

export function BreedRecommend({ breeds, mode }: BreedRecommendProps) {
  return (
    <div className="card mb-4">
      <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span>🐾</span>
        {mode === 'current' ? '궁합 좋은 품종들' : '추천 품종'}
      </h3>
      <div className="space-y-3">
        {breeds.map((breed, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
               style={{ background: i === 0 ? 'var(--peach)' : 'var(--cream)' }}>
            <span className="text-2xl flex-shrink-0">{breed.emoji}</span>
            <div>
              <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {breed.name}
                {i === 0 && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'var(--peach-dark)', color: 'white' }}>
                    베스트 매치
                  </span>
                )}
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{breed.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
