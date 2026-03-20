import type { ReactNode } from 'react';

interface PageShellProps {
  badge?: string;
  title: string;
  description: string;
  meta?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  maxWidth?: '4xl' | '5xl' | '6xl';
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const maxWidthClass = {
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-surface-800/70 bg-surface-900/75 shadow-[0_20px_60px_rgba(2,6,23,0.16)] backdrop-blur-xl ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_28%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function PageShell({
  badge,
  title,
  description,
  meta,
  aside,
  children,
  maxWidth = '6xl',
}: PageShellProps) {
  return (
    <div className={`${maxWidthClass[maxWidth]} mx-auto animate-fade-in`}>
      <GlassCard className="mb-6 sm:mb-8">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute -top-20 left-8 h-40 w-40 rounded-full bg-accent-500/14 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-500/12 blur-3xl" />

        <div className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              {badge && (
                <span className="mb-4 inline-flex items-center rounded-full border border-accent-600/20 bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
                  {badge}
                </span>
              )}

              <h1 className="text-3xl font-bold tracking-tight text-surface-50 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-surface-300 sm:text-base">
                {description}
              </p>

              {meta && <div className="mt-5 flex flex-wrap gap-2.5">{meta}</div>}
            </div>

            {aside && <div className="w-full lg:max-w-sm">{aside}</div>}
          </div>
        </div>
      </GlassCard>

      <div className="space-y-6">{children}</div>
    </div>
  );
}
