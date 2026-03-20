import { useMemo, type ReactNode } from 'react';
import { Briefcase, Search, Sparkles, Target } from 'lucide-react';
import type { Job } from '../types';
import { jobs, mockUser } from '../data';
import JobCard from '../components/JobCard';
import PageShell, { GlassCard } from '../components/PageShell';
import { getRecommendedJobs } from '../utils/matching';

interface JobsFeedProps {
  onViewDetail: (job: Job) => void;
}

export default function JobsFeed({ onViewDetail }: JobsFeedProps) {
  const recommended = useMemo(() => getRecommendedJobs(mockUser, jobs), []);
  const averageScore = recommended.length > 0
    ? Math.round(recommended.reduce((total, item) => total + item.match.score, 0) / recommended.length)
    : 0;
  const strongMatches = recommended.filter((item) => item.match.score >= 74).length;

  return (
    <PageShell
      badge="Horizon Match Feed"
      title="Lowongan yang paling nyambung buat profilmu"
      description="Feed ini menampilkan role yang paling realistis berdasarkan skill, pengalaman, dan arah belajar kamu sekarang. Semuanya tetap static, tapi tampil seperti portal yang hidup dan siap dipresentasikan."
      maxWidth="6xl"
      meta={
        <>
          <HeroPill icon={<Briefcase size={14} />} label={`${recommended.length} job match`} />
          <HeroPill icon={<Target size={14} />} label={`${strongMatches} strong match`} />
          <HeroPill icon={<Sparkles size={14} />} label={`Rata-rata skor ${averageScore}%`} />
        </>
      }
      aside={
        <div className="rounded-[1.5rem] border border-surface-800/70 bg-surface-950/45 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Matching Snapshot</p>
          <p className="mt-3 text-lg font-semibold text-surface-100">{mockUser.preferredRoles[0]}</p>
          <p className="mt-2 text-sm leading-relaxed text-surface-400">
            Prioritas feed ini disusun dari peluang yang paling dekat untuk dicapai terlebih dahulu.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <MiniStat label="Remote/Hybrid fit" value={mockUser.workPreferences.workTypes.join(', ')} />
            <MiniStat label="Lokasi prioritas" value={mockUser.workPreferences.locations[0]} />
            <MiniStat label="Ekspektasi" value={mockUser.workPreferences.salaryExpectation} />
          </div>
        </div>
      }
    >
      <GlassCard>
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-[1.35rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-surface-800/80 bg-surface-900/80 text-surface-400">
                <Search size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-200">Search bar preview</p>
                <p className="text-xs text-surface-500">Tetap static, hanya untuk simulasi portal.</p>
              </div>
            </div>

            <div className="w-full lg:max-w-xl">
              <div className="flex items-center gap-3 rounded-[1.35rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3">
                <Search size={18} className="shrink-0 text-surface-500" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan posisi, perusahaan, atau skill..."
                  className="w-full bg-transparent text-sm text-surface-200 outline-none placeholder:text-surface-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:gap-5">
        {recommended.map(({ job, match }, index) => (
          <JobCard
            key={job.id}
            job={job}
            match={match}
            onViewDetail={onViewDetail}
            index={index}
          />
        ))}
      </div>
    </PageShell>
  );
}

function HeroPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-surface-800/70 bg-surface-950/45 px-3.5 py-2 text-sm text-surface-300">
      <span className="text-accent-400">{icon}</span>
      {label}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-surface-800/70 bg-surface-900/70 px-3.5 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-surface-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-surface-100">{value}</p>
    </div>
  );
}
