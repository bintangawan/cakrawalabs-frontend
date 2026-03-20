import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import type { Job, MatchResult } from '../types';
import { companies } from '../data';
import SkillChip from './SkillChip';
import MatchScoreBadge from './MatchScoreBadge';

interface JobCardProps {
  job: Job;
  match: MatchResult;
  onViewDetail: (job: Job) => void;
  index?: number;
}

export default function JobCard({ job, match, onViewDetail, index = 0 }: JobCardProps) {
  const company = companies.find(c => c.id === job.companyId);
  const strongMatches = job.requiredSkills.filter(skill =>
    match.matchedSkills.map((matchedSkill) => matchedSkill.toLowerCase()).includes(skill.toLowerCase())
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] border border-surface-800/70 bg-surface-900/78 p-5 shadow-[0_20px_55px_rgba(2,6,23,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent-600/20 hover:shadow-[0_28px_70px_rgba(2,6,23,0.18)] animate-fade-in stagger-${Math.min(index + 1, 6)}`}
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_26%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      {/* header */}
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-bold text-white shadow-[0_12px_30px_rgba(2,6,23,0.22)]"
              style={{ backgroundColor: company?.logoColor ?? '#475569' }}
            >
              {company?.name.charAt(0) ?? '?'}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-surface-100">{job.title}</h3>
              <p className="truncate text-sm text-surface-400">{company?.name}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-surface-800/80 bg-surface-950/45 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-surface-400">
              {job.workType}
            </span>
            <span className="rounded-full border border-surface-800/80 bg-surface-950/45 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-surface-400">
              {job.level}
            </span>
          </div>
        </div>
        <MatchScoreBadge score={match.score} label={match.label} size="sm" />
      </div>

      {/* meta row */}
      <div className="relative mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-surface-400">
        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
        <span className="flex items-center gap-1"><Users size={12} />{job.applicants} pelamar</span>
      </div>

      {/* salary */}
      <div className="relative mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-accent-400">{job.salaryRange}</p>
        {strongMatches.length > 0 && (
          <span className="rounded-full border border-accent-600/20 bg-accent-500/10 px-2.5 py-1 text-[11px] font-medium text-accent-400">
            {strongMatches.length} skill cocok
          </span>
        )}
      </div>

      {/* description */}
      <p className="relative mb-4 line-clamp-2 text-sm leading-relaxed text-surface-300">{job.description}</p>

      {/* skills */}
      <div className="relative mb-4 flex flex-wrap gap-1.5">
        {job.requiredSkills.slice(0, 5).map(s => (
          <SkillChip
            key={s}
            label={s}
            variant={match.matchedSkills.map(m => m.toLowerCase()).includes(s.toLowerCase()) ? 'matched' : 'default'}
          />
        ))}
        {job.requiredSkills.length > 5 && (
          <span className="text-xs text-surface-500 self-center">+{job.requiredSkills.length - 5}</span>
        )}
      </div>

      {/* footer */}
      <div className="relative flex items-center justify-between border-t border-surface-800/60 pt-4">
        <div className="flex items-center gap-3 text-xs text-surface-500">
          <span className="flex items-center gap-1"><Clock size={12} />{job.postedAt}</span>
          {match.missingSkills.length > 0 && (
            <span className="text-amber-400">{match.missingSkills.length} skill kurang</span>
          )}
        </div>
        <button
          onClick={() => onViewDetail(job)}
          className="flex items-center gap-1.5 rounded-full border border-accent-600/20 bg-accent-500/10 px-3.5 py-2 text-sm font-medium text-accent-400 transition-all duration-200 hover:bg-accent-500/15 hover:text-accent-300 group-hover:gap-2"
        >
          Lihat Detail
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
