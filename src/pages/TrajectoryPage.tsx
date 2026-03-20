import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  Crosshair,
  Database,
  FileText,
  Rocket,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import type { Job, TrajectoryPhase } from '../types';
import { companies, jobs, mockUser } from '../data';
import { buildCareerTrajectory, getHorizonRole } from '../utils/matching';
import SkillChip from '../components/SkillChip';

interface TrajectoryPageProps {
  targetJob: Job | null;
}

export default function TrajectoryPage({ targetJob }: TrajectoryPageProps) {
  const job = targetJob ?? getHorizonRole(mockUser, jobs)?.job ?? jobs[0];
  const trajectory = useMemo(() => buildCareerTrajectory(mockUser, job), [job]);
  const company = companies.find(c => c.id === job.companyId);

  const [selectedPhase, setSelectedPhase] = useState<TrajectoryPhase | null>(null);

  const completedCount = trajectory.phases.filter(phase => phase.status === 'selesai').length;
  const activeCount = trajectory.phases.filter(phase => phase.status === 'berlangsung').length;
  const progress =
    trajectory.phases.length > 0
      ? Math.round(((completedCount + activeCount * 0.5) / trajectory.phases.length) * 100)
      : 0;

  useEffect(() => {
    if (!selectedPhase) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhase(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhase]);

  return (
    <>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-surface-50 mb-2">Career Trajectory</h1>
          <p className="text-surface-400 text-sm">
            Roadmap belajar yang diringkas per tahap, supaya kamu cepat paham urutan
            belajarnya. Klik <span className="text-surface-200 font-medium">View Detail</span>{' '}
            untuk melihat semua hal yang perlu dikerjakan di tiap fase.
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-600/8 via-surface-900 to-surface-900 border border-accent-700/20 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-5">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shrink-0"
                style={{ backgroundColor: company?.logoColor ?? '#475569' }}
              >
                {company?.name?.charAt(0) ?? '?'}
              </div>

              <div>
                <p className="text-xs text-accent-400 uppercase tracking-[0.18em] font-medium mb-1">
                  Career Path Target
                </p>
                <h2 className="text-xl font-bold text-surface-50 mb-1">{trajectory.targetRole}</h2>
                <p className="text-sm text-surface-300 mb-3">
                  {company?.name ?? '-'} - {job.location}
                </p>
                <p className="text-sm text-surface-300 leading-relaxed max-w-3xl">
                  {trajectory.roleSummary}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 min-w-[220px]">
              <MetricCard
                icon={<Clock3 size={15} />}
                label="Estimasi Durasi"
                value={trajectory.totalDuration}
              />
              <MetricCard
                icon={<Target size={15} />}
                label="Total Fase"
                value={`${trajectory.phases.length} fase`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-surface-400 mb-2">
            <span>
              Progress roadmap: {completedCount} selesai, {activeCount} sedang berjalan
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 bg-surface-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-600 via-accent-400 to-sky-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <SummaryCard
            icon={<CheckCircle2 size={16} className="text-accent-400" />}
            title="Sudah Kuat"
            subtitle="Skill yang sudah jadi modal awal"
            chips={trajectory.strengths}
            emptyLabel="Belum ada skill utama yang match penuh"
            variant="success"
          />
          <SummaryCard
            icon={<Crosshair size={16} className="text-amber-400" />}
            title="Gap Prioritas"
            subtitle="Skill wajib yang perlu dikejar dulu"
            chips={trajectory.criticalSkills}
            emptyLabel="Skill wajib sudah cukup siap"
            variant="warning"
          />
          <SummaryCard
            icon={<Sparkles size={16} className="text-sky-400" />}
            title="Stretch Skill"
            subtitle="Pembeda yang bikin profilmu lebih kuat"
            chips={trajectory.stretchSkills}
            emptyLabel="Tidak ada stretch skill besar saat ini"
            variant="info"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-accent-400" />
                <h3 className="text-base font-semibold text-surface-100">Strategi Belajar</h3>
              </div>
              <p className="text-sm text-surface-300 leading-relaxed">
                Roadmap ini disusun berurutan: mulai dari fondasi skill, lanjut praktik kerja,
                lalu bukti portfolio, dan terakhir kesiapan melamar. Fokuskan satu fase dulu
                sampai selesai, baru lanjut ke tahap berikutnya.
              </p>
            </div>

            <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-surface-100 mb-1">Tahapan Roadmap</h3>
                  <p className="text-sm text-surface-400">
                    Ringkasan per fase. Klik detail untuk melihat apa yang harus dipelajari,
                    dipraktikkan, dan diselesaikan.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {trajectory.phases.map((phase) => (
                  <PhasePreviewCard
                    key={phase.id}
                    phase={phase}
                    onViewDetail={() => setSelectedPhase(phase)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-accent-400" />
                <h3 className="text-base font-semibold text-surface-100">Milestone Akhir</h3>
              </div>
              <p className="text-sm text-surface-300 leading-relaxed">
                {trajectory.finalMilestone}
              </p>
            </div>

            <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wide mb-4">
                Cara Pakai Roadmap Ini
              </h3>
              <div className="space-y-3 text-sm text-surface-300">
                <TipRow
                  number="1"
                  text="Selesaikan fase aktif dulu sebelum lompat ke fase berikutnya."
                />
                <TipRow
                  number="2"
                  text="Setiap fase harus menghasilkan artefak nyata, bukan cuma catatan belajar."
                />
                <TipRow
                  number="3"
                  text="Kalau waktu mepet, prioritaskan gap skill wajib dulu baru stretch skill."
                />
                <TipRow
                  number="4"
                  text="Gunakan deliverable fase sebagai bahan CV, portfolio, dan cerita interview."
                />
              </div>
            </div>

            <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wide mb-4">
                Snapshot Target Role
              </h3>
              <div className="space-y-3 text-sm">
                <SnapshotRow label="Perusahaan" value={company?.name ?? '-'} />
                <SnapshotRow label="Lokasi" value={job.location} />
                <SnapshotRow label="Work Type" value={job.workType} />
                <SnapshotRow label="Level" value={job.level} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPhase ? (
        <PhaseDetailModal
          phase={selectedPhase}
          onClose={() => setSelectedPhase(null)}
        />
      ) : null}
    </>
  );
}

function PhasePreviewCard({
  phase,
  onViewDetail,
}: {
  phase: TrajectoryPhase;
  onViewDetail: () => void;
}) {
  const Icon = getPhaseIcon(phase);
  const style = getPhaseStyle(phase.status);
  const previewSkills = phase.skillsToLearn.slice(0, 4);

  return (
    <div
      className={`rounded-2xl border p-4 md:p-5 transition-all ${style.card}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${style.iconWrap}`}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <StatusBadge status={phase.status} />
                <span className="text-xs text-surface-500">Fase {phase.id}</span>
                <span className="text-xs text-surface-500">•</span>
                <span className="text-xs text-surface-400">{phase.focusArea}</span>
              </div>

              <h4 className="text-base font-semibold text-surface-100 mb-1">
                {phase.title}
              </h4>
              <p className="text-sm text-surface-300 leading-relaxed">
                {phase.description}
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-surface-800 bg-surface-950/70 px-3 py-2 min-w-[120px]">
              <div className="flex items-center gap-2 text-xs text-surface-400 mb-1">
                <Clock3 size={12} />
                Durasi
              </div>
              <p className="text-sm font-semibold text-surface-100">{phase.duration}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4 items-end">
            <div className="space-y-3">
              <div className="rounded-xl border border-surface-800 bg-surface-950/60 p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-accent-400" />
                  <h5 className="text-sm font-semibold text-surface-100">Target Fase</h5>
                </div>
                <p className="text-sm text-surface-300 leading-relaxed">{phase.target}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-surface-500 mb-2">
                  Preview skill yang akan dikejar
                </p>
                {previewSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {previewSkills.map((skill) => (
                      <SkillChip key={skill} label={skill} variant="optional" />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-surface-500">
                    Tidak ada gap besar di fase ini.
                  </p>
                )}
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={onViewDetail}
                className="inline-flex items-center gap-2 rounded-xl border border-accent-600/30 bg-accent-600/10 px-4 py-2.5 text-sm font-medium text-accent-300 transition hover:bg-accent-600/15 hover:border-accent-500/40"
              >
                View Detail
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseDetailModal({
  phase,
  onClose,
}: {
  phase: TrajectoryPhase;
  onClose: () => void;
}) {
  const Icon = getPhaseIcon(phase);
  const style = getPhaseStyle(phase.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-surface-800 bg-surface-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-surface-800">
          <div className="flex items-start gap-4 min-w-0">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${style.iconWrap}`}
            >
              <Icon size={20} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <StatusBadge status={phase.status} />
                <span className="text-xs text-surface-500">Fase {phase.id}</span>
                <span className="text-xs text-surface-500">•</span>
                <span className="text-xs text-surface-400">{phase.focusArea}</span>
              </div>

              <h3 className="text-xl font-semibold text-surface-50 mb-2">{phase.title}</h3>
              <p className="text-sm text-surface-300 leading-relaxed">{phase.description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-surface-700 bg-surface-950/70 text-surface-300 hover:bg-surface-800 transition shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-5 md:p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <MetricCard
              icon={<Clock3 size={15} />}
              label="Durasi"
              value={phase.duration}
            />
            <MetricCard
              icon={<Target size={15} />}
              label="Outcome"
              value={phase.outcome}
            />
            <MetricCard
              icon={<ArrowRight size={15} />}
              label="Target Keluar"
              value={phase.target}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <SkillGroup
              title="Sudah Dimiliki"
              chips={phase.ownedSkills}
              variant="matched"
              emptyLabel="Belum ada skill fase ini yang benar-benar kuat."
            />
            <SkillGroup
              title="Perlu Dipelajari"
              chips={phase.skillsToLearn}
              variant={phase.status === 'berlangsung' ? 'optional' : 'default'}
              emptyLabel="Tidak ada gap besar di fase ini."
            />
          </div>

          <div className="grid xl:grid-cols-2 gap-4">
            <InfoListCard
              icon={<BookOpen size={15} className="text-accent-400" />}
              title="Yang Perlu Dipelajari"
              items={phase.studyTopics}
            />
            <InfoListCard
              icon={<Briefcase size={15} className="text-sky-400" />}
              title="Latihan dan Praktik"
              items={phase.practiceTasks}
            />
            <InfoListCard
              icon={<FileText size={15} className="text-amber-400" />}
              title="Deliverable Portfolio"
              items={phase.deliverables}
            />
            <InfoListCard
              icon={<CheckCircle2 size={15} className="text-emerald-400" />}
              title="Kriteria Lulus Fase"
              items={phase.successCriteria}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getPhaseIcon(phase: TrajectoryPhase) {
  const signature = `${phase.title} ${phase.focusArea}`.toLowerCase();

  if (signature.includes('frontend') || signature.includes('ui')) return Code2;
  if (signature.includes('backend') || signature.includes('api') || signature.includes('data')) return Database;
  if (
    signature.includes('production') ||
    signature.includes('delivery') ||
    signature.includes('observability')
  ) {
    return Rocket;
  }
  if (
    signature.includes('portfolio') ||
    signature.includes('interview') ||
    signature.includes('career')
  ) {
    return Briefcase;
  }

  return Compass;
}

function getPhaseStyle(status: TrajectoryPhase['status']) {
  if (status === 'selesai') {
    return {
      card: 'bg-surface-900 border-accent-700/20',
      iconWrap:
        'border-accent-500/40 bg-accent-500/12 text-accent-300 shadow-lg shadow-accent-500/10',
    };
  }

  if (status === 'berlangsung') {
    return {
      card: 'bg-gradient-to-br from-accent-600/5 to-surface-900 border-accent-700/25',
      iconWrap:
        'border-sky-500/40 bg-sky-500/12 text-sky-300 shadow-lg shadow-sky-500/10',
    };
  }

  return {
    card: 'bg-surface-900 border-surface-800',
    iconWrap: 'border-surface-700 bg-surface-950 text-surface-400',
  };
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-surface-800 bg-surface-950/70 p-3">
      <div className="flex items-center gap-2 text-xs text-surface-400 mb-1">
        {icon}
        {label}
      </div>
      <p className="text-sm font-semibold text-surface-100 leading-relaxed">{value}</p>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  subtitle,
  chips,
  emptyLabel,
  variant,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  chips: string[];
  emptyLabel: string;
  variant: 'success' | 'warning' | 'info';
}) {
  const chipVariant =
    variant === 'success' ? 'matched' : variant === 'warning' ? 'missing' : 'optional';

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-base font-semibold text-surface-100">{title}</h3>
      </div>
      <p className="text-sm text-surface-400 mb-4">{subtitle}</p>

      {chips.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <SkillChip key={chip} label={chip} variant={chipVariant} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-surface-500">{emptyLabel}</p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: 'selesai' | 'berlangsung' | 'belum' }) {
  const styles =
    status === 'selesai'
      ? 'bg-accent-500/10 text-accent-300 border-accent-500/20'
      : status === 'berlangsung'
        ? 'bg-sky-500/10 text-sky-300 border-sky-500/20'
        : 'bg-surface-800 text-surface-400 border-surface-700';

  const label =
    status === 'selesai' ? 'Selesai' : status === 'berlangsung' ? 'Berlangsung' : 'Belum Dimulai';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}

function SkillGroup({
  title,
  chips,
  variant,
  emptyLabel,
}: {
  title: string;
  chips: string[];
  variant: 'default' | 'matched' | 'missing' | 'optional';
  emptyLabel: string;
}) {
  return (
    <div className="rounded-xl border border-surface-800 bg-surface-950/60 p-4">
      <h4 className="text-sm font-semibold text-surface-100 mb-3">{title}</h4>
      {chips.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <SkillChip key={chip} label={chip} variant={variant} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-surface-500">{emptyLabel}</p>
      )}
    </div>
  );
}

function InfoListCard({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-surface-800 bg-surface-950/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="text-sm font-semibold text-surface-100">{title}</h4>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2.5">
          {items.map((item, index) => (
            <div
              key={`${title}-${index}-${item}`}
              className="flex items-start gap-2 text-sm text-surface-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-surface-500 mt-2 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-surface-500">Belum ada item untuk bagian ini.</p>
      )}
    </div>
  );
}

function TipRow({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center text-xs font-semibold text-surface-300 shrink-0">
        {number}
      </div>
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-surface-400">{label}</span>
      <span className="text-surface-200 text-right">{value}</span>
    </div>
  );
}