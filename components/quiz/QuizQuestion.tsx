'use client';

interface Option {
  value: string;
  label: string;
  emoji?: string;
}

interface QuizQuestionProps {
  question: string;
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export function QuizQuestion({ question, options, selected, onSelect }: QuizQuestionProps) {
  return (
    <div className="space-y-3">
      <p className="font-bold text-xl leading-snug mb-5" style={{ color: 'var(--text-primary)' }}>
        {question}
      </p>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`btn-option${selected === opt.value ? ' selected' : ''}`}
          onClick={() => onSelect(opt.value)}
        >
          {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
