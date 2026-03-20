import { useEffect, useState, type ReactNode } from 'react';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle,
  FileText,
  Loader2,
  Sparkles,
  Upload,
} from 'lucide-react';
import SkillChip from '../components/SkillChip';
import PageShell, { GlassCard } from '../components/PageShell';
import { Skeleton } from '../components/Skeleton';
import { mockUser } from '../data';
import { generateCVAnalysis } from '../utils/matching';

interface CVAnalysisPageProps {
  onGoToJobs: () => void;
  onGoToDashboard: () => void;
  onGoToTrajectory: () => void;
}

type UploadState = 'idle' | 'selected' | 'uploading' | 'analyzing' | 'done';

export default function CVAnalysisPage({ onGoToJobs, onGoToDashboard, onGoToTrajectory }: CVAnalysisPageProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState('');
  const analysis = generateCVAnalysis(mockUser);

  const handleFileSelect = () => {
    setFileName('CV_Rizka_Amalia_2024.pdf');
    setState('selected');
  };

  const handleUpload = () => {
    setState('uploading');
  };

  useEffect(() => {
    if (state === 'uploading') {
      const timeout = setTimeout(() => setState('analyzing'), 1800);
      return () => clearTimeout(timeout);
    }

    if (state === 'analyzing') {
      const timeout = setTimeout(() => setState('done'), 2500);
      return () => clearTimeout(timeout);
    }
  }, [state]);

  return (
    <PageShell
      badge="CV Analysis"
      title="Analisis CV yang tampil lebih hidup dan meyakinkan"
      description="Upload simulation ini tetap static, tapi sekarang tampil seperti experience produk sungguhan: ada state upload, analisis, sampai hasil rekomendasi yang rapi dan enak dipresentasikan."
      maxWidth="5xl"
      meta={
        <>
          <HeroPill label="ATS preview" />
          <HeroPill label="Role recommendation" />
          <HeroPill label="Skill detection" />
        </>
      }
      aside={
        <div className="rounded-[1.5rem] border border-surface-800/70 bg-surface-950/45 p-5 shadow-[0_18px_44px_rgba(2,6,23,0.12)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-600/20 bg-accent-500/10 text-accent-400">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-surface-500">CV Engine</p>
              <p className="text-sm font-semibold text-surface-100">Preview analisis otomatis</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-surface-400">
            Engine static ini mendeteksi skill, menghitung readiness, lalu mengarahkan kamu ke role dan roadmap yang paling relevan.
          </p>
        </div>
      }
    >
      {(state === 'idle' || state === 'selected') && (
        <GlassCard>
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-surface-800/80 bg-surface-950/55 text-surface-300">
                <Upload size={26} />
              </div>
              <h3 className="text-xl font-semibold text-surface-100">
                {state === 'idle' ? 'Unggah CV kamu' : 'File siap dianalisis'}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-surface-400">
                Format yang didukung: PDF, DOC, DOCX. Di versi demo ini, upload dibuat bypass agar alurnya tetap cepat saat dipresentasikan.
              </p>

              {state === 'idle' ? (
                <button
                  onClick={handleFileSelect}
                  className="mt-7 rounded-[1.15rem] bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.25)] active:scale-[0.98]"
                >
                  Pilih file
                </button>
              ) : (
                <div className="mt-7">
                  <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-accent-600/20 bg-accent-500/10 px-4 py-2 text-sm text-accent-400">
                    <FileText size={16} />
                    {fileName}
                  </div>
                  <div>
                    <button
                      onClick={handleUpload}
                      className="rounded-[1.15rem] bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.25)] active:scale-[0.98]"
                    >
                      Mulai analisis
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      )}

      {state === 'uploading' && (
        <GlassCard>
          <div className="p-8 text-center sm:p-10">
            <Loader2 size={34} className="mx-auto mb-4 animate-spin text-accent-400" />
            <h3 className="text-xl font-semibold text-surface-100">Mengunggah CV...</h3>
            <p className="mt-2 text-sm text-surface-400">{fileName}</p>
            <div className="mx-auto mt-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-surface-800/80">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-accent-600 to-sky-500 animate-pulse" />
            </div>
          </div>
        </GlassCard>
      )}

      {state === 'analyzing' && (
        <GlassCard>
          <div className="p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <Loader2 size={22} className="animate-spin text-accent-400" />
              <div>
                <h3 className="text-xl font-semibold text-surface-100">Menganalisis CV kamu...</h3>
                <p className="text-sm text-surface-400">Mengurai pengalaman, skill, dan readiness score.</p>
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {state === 'done' && (
        <div className="space-y-6 animate-slide-up" style={{ opacity: 0 }}>
          <GlassCard className="border-accent-700/20">
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-2 text-accent-400">
                <CheckCircle size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">Analisis selesai</span>
              </div>
              <p className="text-sm leading-relaxed text-surface-300">{analysis.summary}</p>
            </div>
          </GlassCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Skor Kesiapan</p>
                <div className="mt-4 text-5xl font-bold tracking-tight text-accent-400">{analysis.readinessScore}%</div>
                <p className="mt-3 text-sm leading-relaxed text-surface-400">
                  Berdasarkan skill, pengalaman, dan proyek yang terdeteksi dari CV simulasi.
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-500">Kekuatan Utama</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {analysis.strengths.map((strength) => (
                    <SkillChip key={strength} label={strength} variant="matched" size="md" />
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-surface-100">
                Skill yang terdeteksi ({analysis.detectedSkills.length})
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.detectedSkills.map((skill) => (
                  <SkillChip key={skill} label={skill} size="md" />
                ))}
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-surface-100">Role yang disarankan</h3>
                <div className="mt-4 space-y-3">
                  {analysis.suggestedRoles.map((role) => (
                    <div
                      key={role}
                      className="flex items-center gap-3 rounded-[1.25rem] border border-surface-800/70 bg-surface-950/45 px-4 py-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-accent-400" />
                      <span className="text-sm text-surface-200">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {analysis.missingAreas.length > 0 && (
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-surface-100">Area yang perlu diperkuat</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {analysis.missingAreas.map((area) => (
                      <SkillChip key={area} label={area} variant="missing" size="md" />
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ActionButton onClick={onGoToJobs} icon={<Briefcase size={16} />} label="Lihat lowongan" />
            <ActionButton onClick={onGoToDashboard} icon={<BarChart3 size={16} />} label="Buka dashboard" />
            <ActionButton onClick={onGoToTrajectory} icon={<BookOpen size={16} />} label="Roadmap belajar" accent />
          </div>
        </div>
      )}
    </PageShell>
  );
}

function ActionButton({
  onClick,
  icon,
  label,
  accent,
}: {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-[1.25rem] border px-4 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        accent
          ? 'border-accent-600/20 bg-accent-500/10 text-accent-400 hover:bg-accent-500/15'
          : 'border-surface-800/70 bg-surface-900/75 text-surface-200 hover:border-surface-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function HeroPill({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-surface-800/70 bg-surface-950/45 px-3.5 py-2 text-sm text-surface-300">
      {label}
    </div>
  );
}
