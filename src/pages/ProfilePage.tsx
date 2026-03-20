import type { ReactNode } from 'react';
import {
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Target,
} from 'lucide-react';
import PageShell, { GlassCard } from '../components/PageShell';
import SkillChip from '../components/SkillChip';
import { mockUser } from '../data';

export default function ProfilePage() {
  const user = mockUser;
  const initials = user.fullName.split(' ').map((name) => name[0]).slice(0, 2).join('');

  return (
    <PageShell
      badge="Talent Profile"
      title="Profil yang terasa seperti digital career card"
      description="Semua data mock tetap sama, tapi sekarang disusun seperti profil talent modern: lebih premium, lebih readable, dan lebih nyaman dibuka di desktop maupun mobile."
      maxWidth="6xl"
      meta={
        <>
          <HeroPill label={user.headline} />
          <HeroPill label={user.location} />
          <HeroPill label={user.preferredRoles[0]} />
        </>
      }
      aside={
        <div className="rounded-[1.5rem] border border-surface-800/70 bg-surface-950/45 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Career Snapshot</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <MiniStat label="Skills" value={String(user.skills.length)} />
            <MiniStat label="Projects" value={String(user.projects.length)} />
            <MiniStat label="Preferred roles" value={String(user.preferredRoles.length)} />
          </div>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6">
          <GlassCard>
            <div className="p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-accent-500 to-sky-500 text-2xl font-bold text-white shadow-[0_20px_40px_rgba(16,185,129,0.28)]">
                  {initials}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-surface-50">{user.fullName}</h2>
                  <p className="mt-1 text-base font-medium text-surface-300">{user.headline}</p>
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-surface-800/70 bg-surface-950/45 px-3.5 py-2 text-sm text-surface-400">
                    <MapPin size={14} />
                    {user.location}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-surface-300">{user.about}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6 sm:p-7">
              <SectionHeader
                icon={<Code size={16} className="text-accent-400" />}
                title="Skill stack"
                subtitle="Ringkasan kemampuan utama yang sudah dimiliki"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} size="md" />
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6 sm:p-7">
              <SectionHeader
                icon={<Briefcase size={16} className="text-accent-400" />}
                title="Pengalaman"
                subtitle="Pengalaman kerja dan kontribusi yang paling relevan"
              />
              <div className="mt-5 space-y-4">
                {user.experiences.map((experience) => (
                  <div
                    key={`${experience.company}-${experience.role}`}
                    className="rounded-[1.35rem] border border-surface-800/70 bg-surface-950/45 p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-surface-100">{experience.role}</p>
                        <p className="text-sm text-surface-300">{experience.company}</p>
                      </div>
                      <span className="rounded-full border border-surface-800/70 bg-surface-900/75 px-3 py-1 text-xs font-medium text-surface-400">
                        {experience.duration}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {experience.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3 text-sm text-surface-400">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-400" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6 sm:p-7">
              <SectionHeader
                icon={<Lightbulb size={16} className="text-accent-400" />}
                title="Proyek"
                subtitle="Portfolio pieces yang memperkuat profil kandidat"
              />
              <div className="mt-5 space-y-4">
                {user.projects.map((project) => (
                  <div
                    key={project.name}
                    className="rounded-[1.35rem] border border-surface-800/70 bg-surface-950/45 p-4 sm:p-5"
                  >
                    <p className="text-base font-semibold text-surface-100">{project.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-surface-400">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <SkillChip key={tech} label={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <GlassCard>
            <div className="p-6">
              <SidebarSection
                icon={<GraduationCap size={14} />}
                title="Pendidikan"
                items={user.education.map((education) => (
                  <div key={`${education.institution}-${education.degree}`} className="rounded-[1.2rem] border border-surface-800/70 bg-surface-950/45 p-4">
                    <p className="text-sm font-semibold text-surface-100">{education.degree}</p>
                    <p className="mt-1 text-sm text-surface-300">{education.field}</p>
                    <p className="mt-1 text-sm text-surface-400">{education.institution}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-surface-500">{education.year}</p>
                  </div>
                ))}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <SidebarSection
                icon={<Target size={14} />}
                title="Role yang diminati"
                items={user.preferredRoles.map((role) => (
                  <ListPill key={role} label={role} dotColor="bg-accent-400" />
                ))}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <SidebarSection
                icon={<BookOpen size={14} />}
                title="Target belajar"
                items={user.learningGoals.map((goal) => (
                  <ListPill key={goal} label={goal} dotColor="bg-sky-400" />
                ))}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-surface-500">
                <Heart size={14} />
                <p className="text-xs font-semibold uppercase tracking-[0.22em]">Preferensi kerja</p>
              </div>

              <div className="space-y-3">
                <PreferenceRow label="Tipe kerja" value={user.workPreferences.workTypes.join(', ')} />
                <PreferenceRow label="Lokasi" value={user.workPreferences.locations.join(', ')} />
                <PreferenceRow label="Ekspektasi gaji" value={user.workPreferences.salaryExpectation} accent />
              </div>
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

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-surface-800/70 bg-surface-900/70 px-3.5 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-surface-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-surface-100">{value}</p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent-600/20 bg-accent-500/10">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-100">{title}</h3>
        <p className="text-sm text-surface-400">{subtitle}</p>
      </div>
    </div>
  );
}

function SidebarSection({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: ReactNode[];
}) {
  return (
    <>
      <div className="mb-4 flex items-center gap-2 text-surface-500">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.22em]">{title}</p>
      </div>
      <div className="space-y-3">{items}</div>
    </>
  );
}

function ListPill({ label, dotColor }: { label: string; dotColor: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.2rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3 text-sm text-surface-200">
      <div className={`h-2 w-2 rounded-full ${dotColor}`} />
      {label}
    </div>
  );
}

function PreferenceRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-[1.2rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-surface-500">{label}</p>
      <p className={`mt-2 text-sm font-medium ${accent ? 'text-accent-400' : 'text-surface-200'}`}>{value}</p>
    </div>
  );
}
