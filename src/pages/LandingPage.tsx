import { useState } from 'react';
import {
  ArrowRight,
  Target,
  Route,
  BarChart3,
  Sparkles,
  CheckCircle,
  ChevronRight,
  Briefcase,
  BrainCircuit,
  BadgeCheck,
  Compass,
  Upload,
  Stars,
  Zap,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import LoginDialog from '../components/LoginDialog';

const problems = [
  'Platform kerja hanya menampilkan lowongan, tanpa membimbing pengguna.',
  'Pencari kerja sering belum tahu skill apa yang kurang untuk role target.',
  'Roadmap belajar yang ada masih generik dan tidak personal.',
  'Perjalanan dari mencari kerja hingga benar-benar siap kerja masih terputus.',
];

const solutions = [
  {
    step: 'Pahami potensi',
    desc: 'Analisis profil dan CV untuk menemukan kekuatan awal, pengalaman relevan, dan area yang perlu dikembangkan.',
  },
  {
    step: 'Temukan peluang realistis',
    desc: 'Matching pekerjaan berdasarkan skill, pengalaman, dan arah karier yang paling masuk akal untuk dicapai.',
  },
  {
    step: 'Identifikasi skill gap',
    desc: 'Lihat skill yang sudah kamu punya, skill wajib yang kurang, dan pembeda yang bisa memperkuat profilmu.',
  },
  {
    step: 'Ikuti roadmap belajar',
    desc: 'Dapatkan career trajectory bertahap sampai kamu benar-benar siap melamar dan bersaing.',
  },
];

const steps = [
  {
    icon: Upload,
    title: 'Bangun Profil',
    desc: 'Lengkapi profil sebagai CV digitalmu. Skill, pengalaman, dan tujuan kariermu menjadi dasar seluruh analisis.',
  },
  {
    icon: Sparkles,
    title: 'Horizon Match',
    desc: 'Engine kami mencocokkan profilmu dengan lowongan dan memberikan skor kecocokan yang realistis.',
  },
  {
    icon: BarChart3,
    title: 'Gap Insight',
    desc: 'Lihat secara detail skill yang sudah dimiliki dan skill yang masih perlu dikejar untuk role target.',
  },
  {
    icon: Route,
    title: 'Career Trajectory',
    desc: 'Dapatkan roadmap belajar bertahap yang disesuaikan dengan gap skill dan target kariermu.',
  },
];

const features = [
  {
    title: 'Cakrawa Score',
    desc: 'Skor kesiapan karier yang mengukur seberapa siap kamu untuk pekerjaan target berdasarkan skill, pengalaman, dan arah pembelajaran.',
    detail: 'Skor dinamis yang berubah seiring perkembangan profilmu.',
    icon: BadgeCheck,
  },
  {
    title: 'Horizon Role',
    desc: 'Rekomendasi pekerjaan paling realistis untuk dicapai berikutnya berdasarkan kondisi profilmu saat ini, bukan sekadar keinginan.',
    detail: 'Dihitung dari gap terkecil dan peluang terbaik.',
    icon: Compass,
  },
  {
    title: 'Gap Insight',
    desc: 'Perbandingan mendalam antara skill yang kamu miliki dengan kebutuhan pekerjaan target, termasuk skill wajib dan skill pembeda.',
    detail: 'Tersedia untuk setiap lowongan yang kamu eksplor.',
    icon: Target,
  },
  {
    title: 'Career Trajectory',
    desc: 'Roadmap belajar personal yang dibagi ke fase-fase terstruktur, lengkap dengan target, practice task, dan estimasi waktu.',
    detail: 'Roadmap yang realistis, bukan template generik.',
    icon: BrainCircuit,
  },
];

const metrics = [
  { value: 'AI-Powered', label: 'Matching yang lebih personal' },
  { value: 'End-to-End', label: 'Dari CV hingga siap kerja' },
  { value: 'Actionable', label: 'Insight yang bisa langsung ditindaklanjuti' },
];

interface LandingPageProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function LandingPage({ theme, onToggleTheme }: LandingPageProps) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-surface-950 text-surface-50 overflow-x-hidden transition-colors duration-300">
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* hero */}
      <section className="relative overflow-hidden border-b border-surface-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_20%),linear-gradient(to_bottom,rgba(59,130,246,0.04),transparent_38%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute -top-28 left-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute top-10 right-0 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            {/* left */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-500/10 border border-accent-500/20 rounded-full text-xs font-medium text-accent-300 mb-6 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <Stars size={14} />
                Platform Kesiapan Karier Berbasis AI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold text-surface-50 leading-[1.02] tracking-tight mb-6">
                Pahami Potensimu,
                <br />
                <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-sky-400 bg-clip-text text-transparent">
                  Jangkau Cakrawala
                </span>{' '}
                Kariermu
              </h1>

              <p className="text-lg sm:text-xl text-surface-300 leading-relaxed max-w-2xl mb-8">
                Cakrawa Labs membantu kamu menemukan pekerjaan yang realistis, mengukur
                kesiapan, menutup skill gap, dan mengikuti roadmap belajar personal hingga
                siap kerja.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent-600 hover:bg-accent-500 text-white font-semibold rounded-2xl text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(59,130,246,0.35)] active:scale-[0.98]"
                >
                  Mulai Sekarang
                  <ArrowRight size={18} />
                </button>

                <a
                  href="#cara-kerja"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface-900/80 hover:bg-surface-800 text-surface-200 font-medium rounded-2xl text-base transition-all duration-300 border border-surface-700 hover:border-surface-600 backdrop-blur-sm"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-surface-400">
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-800 bg-surface-900/70 px-3 py-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  CV Analysis
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-800 bg-surface-900/70 px-3 py-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  Job Matching
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-800 bg-surface-900/70 px-3 py-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  Career Trajectory
                </div>
              </div>
            </div>

            {/* right */}
            <div className="relative">
              <div className="relative mx-auto max-w-[620px]">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-accent-500/20 via-sky-500/10 to-accent-400/20 blur-2xl" />
                <div className="relative rounded-[2rem] border border-surface-800/80 bg-surface-900/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-3 sm:p-4">
                  <div className="rounded-[1.5rem] overflow-hidden border border-surface-800 bg-surface-950">
                    <img
                      src="/landing.png"
                      alt="Preview Cakrawa Labs"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* floating cards */}
                <div className="hidden sm:block absolute -left-8 top-10 animate-[float_6s_ease-in-out_infinite]">
                  <div className="rounded-2xl border border-surface-800 bg-surface-900/90 backdrop-blur-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-600/15 border border-accent-600/25 flex items-center justify-center">
                        <BadgeCheck size={18} className="text-accent-400" />
                      </div>
                      <div>
                        <p className="text-xs text-surface-400">Cakrawa Score</p>
                        <p className="text-sm font-semibold text-surface-100">78% siap kerja</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block absolute -right-8 top-24 animate-[float_7s_ease-in-out_infinite]">
                  <div className="rounded-2xl border border-surface-800 bg-surface-900/90 backdrop-blur-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center">
                        <Briefcase size={18} className="text-sky-400" />
                      </div>
                      <div>
                        <p className="text-xs text-surface-400">Horizon Role</p>
                        <p className="text-sm font-semibold text-surface-100">Backend Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute left-10 -bottom-6 animate-[float_8s_ease-in-out_infinite]">
                  <div className="rounded-2xl border border-surface-800 bg-surface-900/90 backdrop-blur-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                        <Zap size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-surface-400">Gap Insight</p>
                        <p className="text-sm font-semibold text-surface-100">2 skill prioritas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute right-12 -bottom-8 animate-[float_6.5s_ease-in-out_infinite]">
                  <div className="rounded-2xl border border-surface-800 bg-surface-900/90 backdrop-blur-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                        <Route size={18} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs text-surface-400">Trajectory</p>
                        <p className="text-sm font-semibold text-surface-100">4 fase belajar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* metrics strip */}
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-surface-800 bg-surface-900/70 backdrop-blur-sm px-5 py-4 hover:border-surface-700 transition-colors"
              >
                <p className="text-lg font-semibold text-surface-100 mb-1">{item.value}</p>
                <p className="text-sm text-surface-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* problem & solution */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.06),transparent_20%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.06),transparent_20%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <div className="rounded-[1.75rem] border border-surface-800 bg-surface-900/70 backdrop-blur-sm p-7 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
              <span className="text-sm font-medium text-rose-400 tracking-wide uppercase mb-3 block">
                Masalah
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-surface-50 mb-6 leading-tight">
                Skill mismatch masih jadi hambatan utama pencari kerja Indonesia
              </h2>

              <div className="space-y-4">
                {problems.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 rounded-xl border border-transparent hover:border-surface-800 hover:bg-surface-950/40 px-3 py-2 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-rose-300">{i + 1}</span>
                    </div>
                    <p className="text-surface-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-accent-700/20 bg-gradient-to-br from-accent-600/10 via-surface-900 to-surface-900 p-7 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
              <span className="text-sm font-medium text-accent-400 tracking-wide uppercase mb-3 block">
                Solusi Cakrawa
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-surface-50 mb-6">
                Perjalanan end-to-end dari potensi hingga siap kerja
              </h3>

              <div className="space-y-4">
                {solutions.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-surface-800/70 bg-surface-950/45 px-4 py-4 hover:border-accent-600/20 transition-all"
                  >
                    <div className="w-9 h-9 rounded-2xl bg-accent-600/15 border border-accent-600/25 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-accent-300">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-surface-100 mb-1">{item.step}</p>
                      <p className="text-surface-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section
        id="cara-kerja"
        className="relative py-20 lg:py-28 bg-surface-900/30 border-y border-surface-800/50"
      >
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium text-accent-400 tracking-wide uppercase mb-3 block">
              Cara Kerja
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-50 mb-4">
              Dari profil hingga siap kerja dalam empat langkah
            </h2>
            <p className="text-surface-400">
              Cakrawa memandu setiap tahap perjalanan kariermu secara terstruktur, visual,
              dan personal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-surface-800 bg-surface-900/80 backdrop-blur-sm p-6 hover:-translate-y-1 hover:border-accent-600/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                >
                  <div className="absolute top-4 right-4 text-xs font-bold text-surface-600">
                    0{i + 1}
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center mb-4 group-hover:bg-accent-600/15 transition-colors">
                    <Icon size={20} className="text-accent-400" />
                  </div>

                  <h3 className="font-semibold text-surface-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_22%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium text-accent-400 tracking-wide uppercase mb-3 block">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-50 mb-4">
              Inovasi yang membedakan Cakrawa
            </h2>
            <p className="text-surface-400">
              Dirancang untuk membantu pengguna tidak hanya melihat peluang, tetapi juga
              benar-benar mencapainya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-surface-800 bg-surface-900/70 backdrop-blur-sm p-6 lg:p-8 transition-all duration-300 hover:border-accent-600/20 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%)]" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center mb-5">
                      <Icon size={21} className="text-accent-400" />
                    </div>

                    <h3 className="text-xl font-bold text-surface-50 mb-3">{item.title}</h3>
                    <p className="text-surface-300 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center gap-2 text-sm text-accent-400">
                      <CheckCircle size={14} />
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* value prop */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-accent-700/20 bg-gradient-to-br from-accent-600/12 via-surface-900 to-surface-900 px-6 py-10 sm:px-10 lg:px-14 lg:py-14 text-center shadow-[0_16px_60px_rgba(0,0,0,0.25)]">
            <div className="absolute -top-16 left-10 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-8 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-3.5 py-1.5 text-xs font-medium text-accent-300 mb-5">
                <Sparkles size={14} />
                Career Navigation System for Indonesia
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-surface-50 mb-4">
                Bukan sekadar mencari kerja.
                <br />
                <span className="text-accent-400">Mempersiapkan diri untuk meraihnya.</span>
              </h2>

              <p className="text-surface-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Cakrawa Labs menghubungkan talenta dengan peluang secara lebih efisien,
                mengurangi skill mismatch, dan mempercepat kesiapan kerja di era digital
                Indonesia.
              </p>

              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-600 hover:bg-accent-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(59,130,246,0.35)] active:scale-[0.98]"
              >
                Mulai Perjalanan Kariermu
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="py-10 border-t border-surface-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.35)]">
                <span className="text-white font-bold text-xs">C</span>
              </div>
              <span className="font-semibold text-surface-300">Cakrawa Labs</span>
            </div>
            <p className="text-sm text-surface-500">
              Membuka Arah, Menjangkau Cakrawala.
            </p>
          </div>
        </div>
      </footer>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
