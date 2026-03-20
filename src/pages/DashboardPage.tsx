import { useMemo, type ReactNode } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { companies, jobs, mockUser } from '../data';
import MatchScoreBadge from '../components/MatchScoreBadge';
import PageShell, { GlassCard } from '../components/PageShell';
import { buildDashboardData, getHorizonRole, getRecommendedJobs } from '../utils/matching';

interface DashboardPageProps {
  onGoToJobs: () => void;
  onGoToGapInsight: () => void;
  onGoToTrajectory: () => void;
  onViewJob: (jobId: string) => void;
}

export default function DashboardPage({ onGoToJobs, onGoToGapInsight, onGoToTrajectory, onViewJob }: DashboardPageProps) {
  const dashboard = useMemo(() => buildDashboardData(mockUser, jobs), []);
  const horizon = useMemo(() => getHorizonRole(mockUser, jobs), []);
  const recommended = useMemo(() => getRecommendedJobs(mockUser, jobs), []);

  return (
    <PageShell
      badge="Career Command Center"
      title="Dashboard kesiapan kariermu"
      description="Semua insight penting buat langkah berikutnya ada di sini, dari peluang paling realistis, tingkat kesiapan, sampai action plan yang perlu kamu kejar dalam waktu dekat."
      maxWidth="6xl"
      meta={
        <>
          <HeroPill label="Cakrawa Score" value={`${dashboard.cakrawaScore}%`} />
          <HeroPill label="Horizon Role" value={dashboard.horizonRole} />
          <HeroPill label="Learning Progress" value={`${dashboard.learningProgress}%`} />
        </>
      }
      aside={
        <div className="rounded-[1.5rem] border border-surface-800/70 bg-surface-950/45 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.12)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-600/20 bg-accent-500/10 text-accent-400">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-surface-500">Next Sprint</p>
              <p className="text-sm font-semibold text-surface-100">3 fokus utama minggu ini</p>
            </div>
          </div>

          <div className="space-y-3">
            {dashboard.nextActions.slice(0, 3).map((action, index) => (
              <div key={action} className="flex items-start gap-3 rounded-2xl border border-surface-800/70 bg-surface-900/70 px-3.5 py-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-surface-700 bg-surface-950/60 text-xs font-semibold text-surface-300">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-surface-300">{action}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <QuickActionButton
              label="Lihat lowongan"
              icon={<Briefcase size={15} />}
              onClick={onGoToJobs}
            />
            <QuickActionButton
              label="Gap insight"
              icon={<BarChart3 size={15} />}
              onClick={onGoToGapInsight}
            />
            <QuickActionButton
              label="Career trajectory"
              icon={<BookOpen size={15} />}
              onClick={onGoToTrajectory}
              accent
            />
          </div>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<TrendingUp size={18} />}
          label="Cakrawa Score"
          value={`${dashboard.cakrawaScore}%`}
          hint="Skor kesiapan kariermu"
          accent
        />
        <StatCard
          icon={<Target size={18} />}
          label="Horizon Role"
          value={dashboard.horizonRole}
          hint="Role paling realistis saat ini"
        />
        <StatCard
          icon={<BarChart3 size={18} />}
          label="Skill Kurang"
          value={`${dashboard.missingSkillsCount} dari ${dashboard.totalSkillsNeeded}`}
          hint="Dari top match yang dianalisis"
        />
        <StatCard
          icon={<BookOpen size={18} />}
          label="Progress Belajar"
          value={`${dashboard.learningProgress}%`}
          hint="Momentum belajar terkini"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6">
          <GlassCard>
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-600/20 bg-accent-500/10 text-accent-400">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-100">Insight kesiapan</h3>
                  <p className="text-sm text-surface-400">Ringkasan kondisi profil dan peluangmu saat ini</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-surface-300">{dashboard.readinessInsight}</p>

              <div className="rounded-[1.35rem] border border-surface-800/70 bg-surface-950/55 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-surface-400">Progress kesiapan</span>
                  <span className="font-semibold text-accent-400">{dashboard.cakrawaScore}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-surface-800/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-600 via-accent-500 to-sky-500 transition-all duration-1000"
                    style={{ width: `${dashboard.cakrawaScore}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-surface-500">
                  <span>Baru mulai</span>
                  <span>Siap melamar</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6 sm:p-7">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-surface-100">Lowongan paling cocok</h3>
                  <p className="text-sm text-surface-400">Urutan role yang paling nyambung dengan profilmu sekarang</p>
                </div>
                <button
                  onClick={onGoToJobs}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 transition-colors hover:text-accent-300"
                >
                  Lihat semua
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="space-y-3">
                {recommended.slice(0, 4).map(({ job, match }) => {
                  const company = companies.find((companyItem) => companyItem.id === job.companyId);

                  return (
                    <button
                      key={job.id}
                      onClick={() => onViewJob(job.id)}
                      className="group flex w-full items-center gap-4 rounded-[1.35rem] border border-surface-800/70 bg-surface-950/45 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-600/20 hover:bg-surface-900/80"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-[0_14px_28px_rgba(2,6,23,0.18)]"
                        style={{ backgroundColor: company?.logoColor ?? '#475569' }}
                      >
                        {company?.name.charAt(0) ?? '?'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-surface-100 sm:text-base">{job.title}</p>
                        <p className="truncate text-sm text-surface-400">{company?.name} - {job.location}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-surface-500">{job.workType} - {job.level}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <MatchScoreBadge score={match.score} size="sm" showLabel={false} />
                        <ArrowRight size={15} className="text-surface-500 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          {horizon && (
            <GlassCard className="border-accent-700/20">
              <div className="p-6 sm:p-7">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">Horizon Role</p>
                    <h3 className="text-2xl font-bold text-surface-50">{horizon.job.title}</h3>
                    <p className="mt-1 text-sm text-surface-400">
                      {companies.find((companyItem) => companyItem.id === horizon.job.companyId)?.name} - {horizon.job.location}
                    </p>
                  </div>
                  <MatchScoreBadge score={horizon.match.score} label={horizon.match.label} size="md" />
                </div>

                <p className="mb-5 text-sm leading-relaxed text-surface-300">{horizon.match.whyFit}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <QuickActionButton
                    label="Pelajari gap skill"
                    icon={<BarChart3 size={15} />}
                    onClick={onGoToGapInsight}
                  />
                  <QuickActionButton
                    label="Buka roadmap"
                    icon={<BookOpen size={15} />}
                    onClick={onGoToTrajectory}
                    accent
                  />
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        <div className="space-y-6">
          <GlassCard>
            <div className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Langkah Selanjutnya</p>
              <div className="space-y-3">
                {dashboard.nextActions.map((action, index) => (
                  <div key={action} className="flex items-start gap-3 rounded-[1.25rem] border border-surface-800/70 bg-surface-950/50 px-3.5 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-surface-700 bg-surface-900/80 text-xs font-semibold text-surface-300">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-surface-300">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Progress Belajar</p>
              <div className="space-y-3">
                {mockUser.learningGoals.map((goal, index) => {
                  const isDone = mockUser.skills.some((skill) => skill.toLowerCase().includes(goal.split(' ')[0].toLowerCase()));

                  return (
                    <div
                      key={goal}
                      className="flex items-center gap-3 rounded-[1.15rem] border border-surface-800/70 bg-surface-950/45 px-3.5 py-3"
                    >
                      {isDone ? (
                        <CheckCircle size={16} className="shrink-0 text-accent-400" />
                      ) : (
                        <div className="h-4 w-4 shrink-0 rounded-full border border-surface-600" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm ${isDone ? 'text-surface-400 line-through' : 'text-surface-200'}`}>{goal}</p>
                        <p className="mt-1 text-xs text-surface-500">Milestone {index + 1}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}

function HeroPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-surface-800/70 bg-surface-950/45 px-3.5 py-2">
      <span className="mr-2 text-xs uppercase tracking-[0.18em] text-surface-500">{label}</span>
      <span className="text-sm font-semibold text-surface-100">{value}</span>
    </div>
  );
}

function QuickActionButton({
  label,
  icon,
  onClick,
  accent,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-[1.2rem] border px-4 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        accent
          ? 'border-accent-600/20 bg-accent-500/10 text-accent-400 hover:bg-accent-500/15'
          : 'border-surface-800/70 bg-surface-900/75 text-surface-200 hover:border-surface-700 hover:bg-surface-900'
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowRight size={14} />
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <GlassCard className={accent ? 'border-accent-700/20' : ''}>
      <div className="p-5 sm:p-6">
        <div className={`mb-3 inline-flex rounded-2xl border px-3 py-2 text-sm ${
          accent
            ? 'border-accent-600/20 bg-accent-500/10 text-accent-400'
            : 'border-surface-800/70 bg-surface-950/45 text-surface-400'
        }`}>
          <span className="mr-2">{icon}</span>
          {label}
        </div>
        <p className={`text-2xl font-bold tracking-tight ${accent ? 'text-accent-400' : 'text-surface-100'}`}>{value}</p>
        <p className="mt-2 text-sm text-surface-400">{hint}</p>
      </div>
    </GlassCard>
  );
}
