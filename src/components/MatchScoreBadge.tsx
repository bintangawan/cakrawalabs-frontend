import type { MatchLabel } from '../types';

interface MatchScoreBadgeProps {
  score: number;
  label?: MatchLabel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function MatchScoreBadge({ score, label, size = 'md', showLabel = true }: MatchScoreBadgeProps) {
  const getScoreColor = () => {
    if (score >= 74) return { ring: 'stroke-accent-400', text: 'text-accent-400', bg: 'bg-accent-500/10 border-accent-600/20' };
    if (score >= 55) return { ring: 'stroke-sky-400', text: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' };
    return { ring: 'stroke-amber-400', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
  };

  const getLabelStyle = () => {
    if (!label) return '';
    if (label === 'Cocok Kuat') return 'bg-accent-500/15 text-accent-300 border-accent-600/30';
    if (label === 'Potensi Tinggi') return 'bg-sky-500/15 text-sky-300 border-sky-600/30';
    return 'bg-amber-500/15 text-amber-300 border-amber-600/30';
  };

  const colors = getScoreColor();
  const dim = size === 'lg' ? 80 : size === 'md' ? 56 : 40;
  const strokeWidth = size === 'lg' ? 4 : 3;
  const fontSize = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-sm' : 'text-xs';
  const r = (dim - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`relative inline-flex items-center justify-center rounded-full border backdrop-blur-sm ${colors.bg}`}
        style={{ width: dim, height: dim }}
      >
        <svg width={dim} height={dim} className="absolute -rotate-90">
          <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-surface-800/80" />
          <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" strokeWidth={strokeWidth} strokeLinecap="round"
            className={colors.ring}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        <span className={`relative font-bold ${fontSize} ${colors.text}`}>{score}%</span>
      </div>
      {showLabel && label && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getLabelStyle()}`}>
          {label}
        </span>
      )}
    </div>
  );
}
