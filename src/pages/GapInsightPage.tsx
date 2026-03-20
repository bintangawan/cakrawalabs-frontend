import { useMemo } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Circle,
  Target,
  XCircle,
} from 'lucide-react';
import type { Job } from '../types';
import { companies, jobs, mockUser } from '../data';
import MatchScoreBadge from '../components/MatchScoreBadge';
import PageShell, { GlassCard } from '../components/PageShell';
import { buildGapAnalysis, getHorizonRole } from '../utils/matching';

interface GapInsightPageProps {
  targetJob: Job | null;
  onGoToTrajectory: (job: Job) => void;
}

export default function GapInsightPage({ targetJob, onGoToTrajectory }: GapInsightPageProps) {
  const job = targetJob ?? getHorizonRole(mockUser, jobs)?.job ?? jobs[0];
  const gap = useMemo(() => buildGapAnalysis(mockUser, job), [job]);
  const company = companies.find((companyItem) => companyItem.id === job.companyId);

  return (
    <PageShell
      badge="Gap Insight"
      title="Peta skill gap menuju role target"
      description="Halaman ini membandingkan skill yang sudah kamu pegang dengan kebutuhan role incaranmu, lalu merangkum area yang paling penting untuk dikejar lebih dulu."
      maxWidth="6xl"
      meta={
        <>
          <HeroPill label={job.title} />
          <HeroPill label={`${gap.readinessScore}% readiness`} />
          <HeroPill label={`${gap.missingSkills.length} gap prioritas`} />
        </>
      }
      aside={
        <div className="rounded-[1.5rem] border border-surface-800/70 bg-surface-950/45 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.12)]">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] text-sm font-bold text-white shadow-[0_14px_32px_rgba(2,6,23,0.2)]"
                style={{ backgroundColor: company?.logoColor ?? '#475569' }}
              >
                {company?.name.charAt(0) ?? '?'}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-surface-500">Target Role</p>
                <p className="text-sm font-semibold text-surface-100">{job.title}</p>
                <p className="text-sm text-surface-400">{company?.name} - {job.location}</p>
              </div>
            </div>
            <MatchScoreBadge score={gap.readinessScore} size="md" showLabel={false} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <MiniStat label="Skill dimiliki" value={String(gap.ownedSkills.length)} color="text-accent-400" />
            <MiniStat label="Skill kurang" value={String(gap.missingSkills.length)} color="text-red-400" />
            <MiniStat label="Stretch skill" value={String(gap.stretchSkills.length)} color="text-sky-400" />
          </div>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6">
          {gap.groups.map((group) => (
            <GlassCard key={group.category}>
              <div className="p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-surface-100">{group.category}</h3>
                    <p className="text-sm text-surface-400">Detail kecocokan skill pada area ini</p>
                  </div>
                  <span className="rounded-full border border-surface-800/70 bg-surface-950/45 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-surface-500">
                    {group.skills.length} item
                  </span>
                </div>

                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <div
                      key={`${group.category}-${skill.name}`}
                      className="flex flex-col gap-3 rounded-[1.35rem] border border-surface-800/70 bg-surface-950/45 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                          skill.status === 'dimiliki'
                            ? 'border-accent-600/20 bg-accent-500/10 text-accent-400'
                            : skill.status === 'kurang'
                              ? 'border-red-500/20 bg-red-500/10 text-red-400'
                              : 'border-sky-500/20 bg-sky-500/10 text-sky-400'
                        }`}>
                          {skill.status === 'dimiliki' ? (
                            <CheckCircle size={16} />
                          ) : skill.status === 'kurang' ? (
                            <XCircle size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                        </div>

                        <div>
                          <p className={`text-sm font-medium ${
                            skill.status === 'dimiliki'
                              ? 'text-surface-100'
                              : skill.status === 'kurang'
                                ? 'text-red-400'
                                : 'text-sky-400'
                          }`}>
                            {skill.name}
                          </p>
                          <p className="mt-1 text-sm text-surface-400">
                            {skill.status === 'dimiliki'
                              ? 'Sudah ada di profilmu dan bisa langsung jadi kekuatan saat melamar.'
                              : skill.status === 'kurang'
                                ? 'Masih perlu dipelajari agar gap ke role target makin kecil.'
                                : 'Bukan syarat utama, tapi bisa jadi pembeda saat bersaing.'}
                          </p>
                        </div>
                      </div>

                      <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium ${
                        skill.status === 'dimiliki'
                          ? 'border-accent-600/20 bg-accent-500/10 text-accent-400'
                          : skill.status === 'kurang'
                            ? 'border-red-500/20 bg-red-500/10 text-red-400'
                            : 'border-sky-500/20 bg-sky-500/10 text-sky-400'
                      }`}>
                        {skill.status === 'dimiliki' ? 'Dimiliki' : skill.status === 'kurang' ? 'Perlu dipelajari' : 'Opsional'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}

          <GlassCard>
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-100">Penjelasan skor</h3>
                  <p className="text-sm text-surface-400">Mengapa tingkat kesiapanmu berada di level ini</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-surface-300">{gap.explanation}</p>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <GlassCard>
            <div className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Status Kesiapan</p>
              <div className={`text-2xl font-bold ${
                gap.readinessLevel === 'Siap Melamar'
                  ? 'text-accent-400'
                  : gap.readinessLevel === 'Hampir Siap'
                    ? 'text-sky-400'
                    : 'text-amber-400'
              }`}>
                {gap.readinessLevel}
              </div>
              <p className="mt-1 text-sm text-surface-400">Skor kesiapan untuk role ini: {gap.readinessScore}%</p>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-surface-800/80">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    gap.readinessLevel === 'Siap Melamar'
                      ? 'bg-gradient-to-r from-accent-600 to-accent-400'
                      : gap.readinessLevel === 'Hampir Siap'
                        ? 'bg-gradient-to-r from-sky-600 to-sky-400'
                        : 'bg-gradient-to-r from-amber-500 to-orange-400'
                  }`}
                  style={{ width: `${gap.readinessScore}%` }}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Ringkasan Prioritas</p>
              <div className="space-y-3">
                <SummaryRow label="Skill dimiliki" count={gap.ownedSkills.length} color="text-accent-400" />
                <SummaryRow label="Skill kurang" count={gap.missingSkills.length} color="text-red-400" />
                <SummaryRow label="Skill opsional" count={gap.stretchSkills.length} color="text-sky-400" />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Lanjut ke tahap berikutnya</p>
              <button
                onClick={() => onGoToTrajectory(job)}
                className="flex w-full items-center justify-between rounded-[1.2rem] border border-accent-600/20 bg-accent-500/10 px-4 py-3 text-sm font-medium text-accent-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500/15"
              >
                <span className="flex items-center gap-2">
                  <Target size={15} />
                  Lihat roadmap belajar
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}

function HeroPill({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-surface-800/70 bg-surface-950/45 px-3.5 py-2 text-sm text-surface-300">
      {label}
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[1.15rem] border border-surface-800/70 bg-surface-900/70 px-3.5 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-surface-500">{label}</p>
      <p className={`mt-2 text-xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function SummaryRow({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-[1.15rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3">
      <span className="text-sm text-surface-300">{label}</span>
      <span className={`text-lg font-bold ${color}`}>{count}</span>
    </div>
  );
}
