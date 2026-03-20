import { useMemo, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  Lightbulb,
  MapPin,
  Sparkles,
  Users,
  XCircle,
} from 'lucide-react';
import type { Job } from '../types';
import { companies, mockUser } from '../data';
import MatchScoreBadge from '../components/MatchScoreBadge';
import PageShell, { GlassCard } from '../components/PageShell';
import SkillChip from '../components/SkillChip';
import { calculateMatchScore } from '../utils/matching';

interface JobDetailProps {
  job: Job;
  onBack: () => void;
  onViewGap: (job: Job) => void;
  onViewTrajectory: (job: Job) => void;
}

export default function JobDetail({ job, onBack, onViewGap, onViewTrajectory }: JobDetailProps) {
  const company = companies.find((companyItem) => companyItem.id === job.companyId);
  const match = useMemo(() => calculateMatchScore(mockUser, job), [job]);

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-800/70 bg-surface-900/70 px-4 py-2 text-sm text-surface-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-surface-700 hover:text-surface-100"
      >
        <ArrowLeft size={16} />
        Kembali ke lowongan
      </button>

      <PageShell
        badge="Job Match Detail"
        title={job.title}
        description={`${company?.name} - ${company?.industry ?? 'Perusahaan digital'} - ${job.location}`}
        maxWidth="6xl"
        meta={
          <>
            <HeroPill icon={<MapPin size={14} />} label={job.location} />
            <HeroPill icon={<Briefcase size={14} />} label={job.workType} />
            <HeroPill icon={<Users size={14} />} label={job.level} />
            <HeroPill icon={<Clock size={14} />} label={job.postedAt} />
          </>
        }
        aside={
          <div className="rounded-[1.5rem] border border-accent-700/20 bg-surface-950/45 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.12)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">Salary Range</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-surface-100">
                  <DollarSign size={18} className="text-accent-400" />
                  {job.salaryRange}
                </p>
              </div>
              <MatchScoreBadge score={match.score} label={match.label} size="md" />
            </div>
            <p className="text-sm leading-relaxed text-surface-300">{match.whyFit}</p>
          </div>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-6">
            <GlassCard>
              <div className="p-6 sm:p-7">
                <div className="mb-5 flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] text-lg font-bold text-white shadow-[0_18px_35px_rgba(2,6,23,0.22)]"
                    style={{ backgroundColor: company?.logoColor ?? '#475569' }}
                  >
                    {company?.name.charAt(0) ?? '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-100">{company?.name}</p>
                    <p className="text-sm text-surface-400">{company?.industry}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill label={`${job.applicants} pelamar`} />
                      <Pill label={job.workType} />
                      <Pill label={job.level} />
                    </div>
                  </div>
                </div>

                <h2 className="mb-3 text-lg font-semibold text-surface-100">Deskripsi posisi</h2>
                <p className="text-sm leading-relaxed text-surface-300">{job.description}</p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6 sm:p-7">
                <h3 className="mb-4 text-lg font-semibold text-surface-100">Tanggung jawab utama</h3>
                <div className="space-y-3">
                  {job.responsibilities.map((responsibility) => (
                    <div
                      key={responsibility}
                      className="flex items-start gap-3 rounded-[1.25rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3.5"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-400" />
                      <p className="text-sm leading-relaxed text-surface-300">{responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6 sm:p-7">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-surface-100">Skill yang dibutuhkan</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill) => (
                        <SkillChip
                          key={skill}
                          label={skill}
                          variant={match.matchedSkills.map((matchedSkill) => matchedSkill.toLowerCase()).includes(skill.toLowerCase()) ? 'matched' : 'missing'}
                          size="md"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-surface-100">Skill tambahan</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.preferredSkills.length > 0 ? job.preferredSkills.map((skill) => (
                        <SkillChip
                          key={skill}
                          label={skill}
                          variant={match.matchedSkills.map((matchedSkill) => matchedSkill.toLowerCase()).includes(skill.toLowerCase()) ? 'matched' : 'optional'}
                          size="md"
                        />
                      )) : (
                        <p className="text-sm text-surface-400">Belum ada skill tambahan yang dicantumkan.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {company && (
              <GlassCard>
                <div className="p-6 sm:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-surface-800/80 bg-surface-950/50 text-surface-300">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-surface-100">Tentang {company.name}</h3>
                      <p className="text-sm text-surface-400">Culture snapshot perusahaan</p>
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-surface-300">{company.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {company.cultureTags.map((tag) => (
                      <Pill key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <GlassCard>
              <div className="p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Kecocokan Profilmu</p>
                <div className="mb-5 flex justify-center">
                  <MatchScoreBadge score={match.score} label={match.label} size="lg" />
                </div>

                <div className="space-y-3">
                  <ScoreRow label="Skill overlap" value={match.skillOverlapScore} />
                  <ScoreRow label="Role alignment" value={match.roleAlignmentScore} />
                  <ScoreRow label="Pengalaman" value={match.experienceScore} />
                  <ScoreRow label="Learning momentum" value={match.learningScore} />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Skill Coverage</p>

                <div className="rounded-[1.25rem] border border-surface-800/70 bg-surface-950/45 p-4">
                  <p className="mb-3 text-sm font-medium text-surface-100">Skill kamu yang cocok</p>
                  <div className="space-y-2">
                    {match.matchedSkills.slice(0, 8).map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-sm text-accent-400">
                        <CheckCircle size={14} className="shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {match.missingSkills.length > 0 && (
                  <div className="mt-4 rounded-[1.25rem] border border-surface-800/70 bg-surface-950/45 p-4">
                    <p className="mb-3 text-sm font-medium text-surface-100">Skill yang perlu dipelajari</p>
                    <div className="space-y-2">
                      {match.missingSkills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-sm text-red-400">
                          <XCircle size={14} className="shrink-0" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb size={15} className="text-accent-400" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Langkah Selanjutnya</p>
                </div>

                <div className="space-y-3">
                  <ActionButton label="Lihat gap insight" onClick={() => onViewGap(job)} />
                  <ActionButton label="Lihat roadmap belajar" onClick={() => onViewTrajectory(job)} accent />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

function ActionButton({ label, onClick, accent }: { label: string; onClick: () => void; accent?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[1.2rem] border px-4 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        accent
          ? 'border-accent-600/20 bg-accent-500/10 text-accent-400 hover:bg-accent-500/15'
          : 'border-surface-800/70 bg-surface-900/80 text-surface-200 hover:border-surface-700'
      }`}
    >
      {label}
      <ArrowRight size={14} />
    </button>
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

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-surface-800/70 bg-surface-950/45 px-3 py-1.5 text-xs font-medium text-surface-300">
      {label}
    </span>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs text-surface-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-800/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-600 to-sky-500 transition-all duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
