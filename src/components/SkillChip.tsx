interface SkillChipProps {
  label: string;
  variant?: 'default' | 'matched' | 'missing' | 'optional';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-surface-800/80 text-surface-200 border-surface-700/80 backdrop-blur-sm',
  matched: 'bg-accent-500/10 text-accent-400 border-accent-600/20 backdrop-blur-sm',
  missing: 'bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-sm',
  optional: 'bg-sky-500/10 text-sky-400 border-sky-500/20 backdrop-blur-sm',
};

export default function SkillChip({ label, variant = 'default', size = 'sm' }: SkillChipProps) {
  return (
    <span className={`
      inline-flex items-center border rounded-full font-medium whitespace-nowrap
      ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
      ${variants[variant]}
      transition-colors duration-150
    `}>
      {label}
    </span>
  );
}
