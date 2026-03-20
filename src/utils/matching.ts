import type { UserProfile, Job, MatchResult, MatchLabel, GapAnalysis, GapGroup, GapSkill, CareerTrajectory, TrajectoryPhase, CVAnalysisResult, DashboardData } from '../types';
import { companies } from '../data/companies';

// ─── Skill Normalization ────────────────────────────────────
export function normalizeSkill(skill: string): string {
  return skill.toLowerCase().trim().replace(/[.\-\/]/g, '').replace(/\s+/g, ' ');
}

export function dedupeSkills(skills: string[]): string[] {
  const seen = new Set<string>();
  return skills.filter(s => {
    const key = normalizeSkill(s);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Skill Comparison ───────────────────────────────────────
export function getMatchedSkills(userSkills: string[], jobSkills: string[]): string[] {
  const normalizedUser = new Set(userSkills.map(normalizeSkill));
  return jobSkills.filter(s => normalizedUser.has(normalizeSkill(s)));
}

export function getMissingSkills(userSkills: string[], jobSkills: string[]): string[] {
  const normalizedUser = new Set(userSkills.map(normalizeSkill));
  return jobSkills.filter(s => !normalizedUser.has(normalizeSkill(s)));
}

export function getSkillOverlap(userSkills: string[], jobSkills: string[]): number {
  if (jobSkills.length === 0) return 0;
  const matched = getMatchedSkills(userSkills, jobSkills);
  return matched.length / jobSkills.length;
}

// ─── Match Score Calculation ────────────────────────────────
export function calculateMatchScore(profile: UserProfile, job: Job): MatchResult {
  const allJobSkills = [...job.requiredSkills, ...job.preferredSkills];
  const matchedSkills = getMatchedSkills(profile.skills, allJobSkills);
  const missingSkills = getMissingSkills(profile.skills, job.requiredSkills);

  // 70% skill overlap
  const skillOverlapScore = getSkillOverlap(profile.skills, allJobSkills) * 100;

  // 15% preferred role alignment
  const normalizedJobTitle = normalizeSkill(job.title);
  const roleAlignmentScore = profile.preferredRoles.some(
    r => normalizeSkill(r).includes(normalizedJobTitle) || normalizedJobTitle.includes(normalizeSkill(r))
  ) ? 100 : profile.preferredRoles.some(
    r => normalizedJobTitle.split(' ').some(w => normalizeSkill(r).includes(w))
  ) ? 55 : 15;

  // 10% experience relevance
  const hasRelevantExp = profile.experiences.some(exp => {
    const expSkills = exp.highlights.join(' ').toLowerCase();
    return job.requiredSkills.some(s => expSkills.includes(normalizeSkill(s)));
  });
  const experienceScore = hasRelevantExp ? 85 : 30;

  // 5% learning momentum
  const learningOverlap = profile.learningGoals.filter(g =>
    allJobSkills.some(s => normalizeSkill(g).includes(normalizeSkill(s)) || normalizeSkill(s).includes(normalizeSkill(g)))
  );
  const learningScore = learningOverlap.length > 0 ? Math.min(90, 40 + learningOverlap.length * 18) : 20;

  // Weighted total
  const rawScore = (skillOverlapScore * 0.7) + (roleAlignmentScore * 0.15) + (experienceScore * 0.1) + (learningScore * 0.05);

  // Add slight organic variation (-2 to +3)
  const variation = ((hashCode(job.id + profile.id) % 6) - 2);
  const finalScore = Math.max(12, Math.min(97, Math.round(rawScore + variation)));

  const label = getMatchLabel(finalScore, missingSkills.length);

  const company = companies.find(c => c.id === job.companyId);
  const companyName = company?.name ?? 'Perusahaan';

  const whyFit = generateWhyFit(profile, job, matchedSkills, finalScore, companyName);

  return {
    jobId: job.id,
    score: finalScore,
    matchedSkills,
    missingSkills,
    label,
    roleAlignmentScore: Math.round(roleAlignmentScore),
    experienceScore: Math.round(experienceScore),
    learningScore: Math.round(learningScore),
    skillOverlapScore: Math.round(skillOverlapScore),
    whyFit,
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateWhyFit(profile: UserProfile, job: Job, matchedSkills: string[], score: number, companyName: string): string {
  if (score >= 75) {
    return `Profil kamu memiliki ${matchedSkills.length} dari ${job.requiredSkills.length + job.preferredSkills.length} skill yang dibutuhkan ${companyName}. Pengalaman kamu di bidang ${matchedSkills.slice(0, 3).join(', ')} menjadi keunggulan kuat untuk posisi ${job.title}.`;
  } else if (score >= 55) {
    return `Kamu sudah memiliki fondasi yang baik untuk posisi ${job.title} di ${companyName}. Dengan menambah beberapa skill yang masih kurang, peluang kamu akan meningkat signifikan.`;
  }
  return `Posisi ${job.title} di ${companyName} memerlukan beberapa skill yang belum kamu miliki, tetapi learning goals kamu menunjukkan arah yang tepat. Pertimbangkan untuk mengikuti roadmap belajar yang kami sarankan.`;
}

// ─── Match Labels ───────────────────────────────────────────
export function getMatchLabel(score: number, missingCount?: number): MatchLabel {
  if (score >= 74 && (missingCount === undefined || missingCount <= 2)) return 'Cocok Kuat';
  if (score >= 55) return 'Potensi Tinggi';
  return 'Perlu Upskilling';
}

// ─── Recommendations ────────────────────────────────────────
export function getRecommendedJobs(profile: UserProfile, jobList: Job[]): { job: Job; match: MatchResult }[] {
  return jobList
    .map(job => ({ job, match: calculateMatchScore(profile, job) }))
    .sort((a, b) => b.match.score - a.match.score);
}

export function getHorizonRole(profile: UserProfile, jobList: Job[]): { job: Job; match: MatchResult } | null {
  const recommended = getRecommendedJobs(profile, jobList);
  // Horizon Role: the highest-scoring job with a realistic reach (score 60-90)
  const horizon = recommended.find(r => r.match.score >= 60 && r.match.score <= 90);
  return horizon ?? recommended[0] ?? null;
}

// ─── Gap Analysis ───────────────────────────────────────────
export function buildGapAnalysis(profile: UserProfile, job: Job): GapAnalysis {
  const match = calculateMatchScore(profile, job);
  const company = companies.find(c => c.id === job.companyId);

  const groups: GapGroup[] = [
    {
      category: 'Skill Wajib',
      skills: job.requiredSkills.map(s => ({
        name: s,
        status: match.matchedSkills.map(normalizeSkill).includes(normalizeSkill(s)) ? 'dimiliki' as const : 'kurang' as const,
        importance: 'tinggi' as const,
      })),
    },
    {
      category: 'Skill Tambahan',
      skills: job.preferredSkills.map(s => ({
        name: s,
        status: match.matchedSkills.map(normalizeSkill).includes(normalizeSkill(s)) ? 'dimiliki' as const : 'opsional' as const,
        importance: 'sedang' as const,
      })),
    },
  ];

  const readinessScore = match.score;
  let readinessLevel: string;
  if (readinessScore >= 74) readinessLevel = 'Siap Melamar';
  else if (readinessScore >= 55) readinessLevel = 'Hampir Siap';
  else readinessLevel = 'Perlu Persiapan';

  const explanation = match.missingSkills.length === 0
    ? `Kamu sudah menguasai semua skill yang dibutuhkan untuk posisi ${job.title} di ${company?.name ?? 'perusahaan ini'}. Segera kirim lamaranmu.`
    : `Kamu perlu menguasai ${match.missingSkills.length} skill tambahan untuk meningkatkan kesiapan sebagai ${job.title}. Fokuslah pada: ${match.missingSkills.slice(0, 3).join(', ')}.`;

  return {
    targetJobId: job.id,
    targetJobTitle: job.title,
    ownedSkills: match.matchedSkills,
    missingSkills: match.missingSkills,
    stretchSkills: getMissingSkills(profile.skills, job.preferredSkills),
    readinessLevel,
    readinessScore,
    explanation,
    groups,
  };
}

// ─── Career Trajectory ──────────────────────────────────────
type TrajectoryTrack = 'frontend' | 'fullstack' | 'backend' | 'data' | 'design' | 'mobile' | 'devops' | 'generic';

interface SkillBlueprint {
  topics: string[];
  practice: string[];
  deliverables: string[];
}

interface PhaseBlueprint {
  title: string;
  focusArea: string;
  durationWeeks: number;
  skills: string[];
  description: string;
  outcome: string;
  target: string;
}

export function buildCareerTrajectory(profile: UserProfile, targetJob: Job): CareerTrajectory {
  const company = companies.find(c => c.id === targetJob.companyId);
  const companyName = company?.name ?? 'perusahaan target';
  const normalizedOwned = new Set(profile.skills.map(normalizeSkill));
  const strengths = getMatchedSkills(profile.skills, targetJob.requiredSkills).slice(0, 6);
  const criticalSkills = dedupeSkills(getMissingSkills(profile.skills, targetJob.requiredSkills)).slice(0, 6);
  const stretchSkills = dedupeSkills(getMissingSkills(profile.skills, targetJob.preferredSkills)).slice(0, 6);

  const skillPlaybook: Record<string, SkillBlueprint> = {
    [normalizeSkill('React')]: {
      topics: ['Component architecture', 'State and props flow', 'Hooks pattern'],
      practice: ['Refactor satu halaman menjadi komponen reusable', 'Bangun list-detail-form flow yang rapi'],
      deliverables: ['Feature React dengan struktur komponen yang jelas'],
    },
    [normalizeSkill('TypeScript')]: {
      topics: ['Typing props dan state', 'Union types', 'API response typing'],
      practice: ['Hilangkan any di feature utama', 'Type-safe data fetching dan form'],
      deliverables: ['Refactor feature utama menjadi fully typed'],
    },
    [normalizeSkill('JavaScript')]: {
      topics: ['Async flow', 'Data transformation', 'Event handling'],
      practice: ['Latihan async error handling', 'Debug satu bug UI dan dokumentasikan akar masalahnya'],
      deliverables: ['Catatan problem solving untuk bug atau flow interaktif'],
    },
    [normalizeSkill('HTML')]: {
      topics: ['Semantic markup', 'Form structure', 'Content hierarchy'],
      practice: ['Audit heading dan form', 'Rapikan semantic HTML pada satu halaman'],
      deliverables: ['Halaman semantic yang mudah diakses'],
    },
    [normalizeSkill('CSS')]: {
      topics: ['Layout system', 'Spacing and typography', 'Responsive styling'],
      practice: ['Bangun dashboard responsive', 'Buat komponen visual yang konsisten'],
      deliverables: ['UI section dengan layout yang rapi dan konsisten'],
    },
    [normalizeSkill('Responsive Design')]: {
      topics: ['Mobile-first thinking', 'Breakpoint strategy', 'Fluid layout'],
      practice: ['Uji satu halaman pada mobile, tablet, desktop', 'Perbaiki overflow dan layout break'],
      deliverables: ['Checklist responsiveness untuk portfolio'],
    },
    [normalizeSkill('REST API')]: {
      topics: ['HTTP fundamentals', 'Loading and error state', 'Pagination and filtering'],
      practice: ['Hubungkan UI ke endpoint list dan detail', 'Bangun loading, empty, dan error state'],
      deliverables: ['Feature end-to-end berbasis API'],
    },
    [normalizeSkill('Next.js')]: {
      topics: ['Routing', 'Rendering strategy', 'Data fetching'],
      practice: ['Bangun satu flow di Next.js', 'Bandingkan SSR, SSG, dan CSR'],
      deliverables: ['Mini project Next.js yang siap dipresentasikan'],
    },
    [normalizeSkill('Testing')]: {
      topics: ['Unit vs integration test', 'Mocking', 'User-centric assertions'],
      practice: ['Tulis test untuk komponen dan util penting', 'Tambahkan edge case untuk flow kritikal'],
      deliverables: ['Coverage test pada feature inti'],
    },
    [normalizeSkill('Accessibility')]: {
      topics: ['Keyboard navigation', 'Color contrast', 'Accessible feedback'],
      practice: ['Audit satu halaman dengan checklist accessibility', 'Perbaiki focus state dan form feedback'],
      deliverables: ['Flow form yang ramah screen reader'],
    },
    [normalizeSkill('Performance Optimization')]: {
      topics: ['Bundle splitting', 'Render bottleneck', 'Web vitals dasar'],
      practice: ['Audit halaman berat', 'Bandingkan metric sebelum dan sesudah optimasi'],
      deliverables: ['Laporan optimasi singkat beserta impact-nya'],
    },
    [normalizeSkill('Docker')]: {
      topics: ['Container basics', 'Dockerfile', 'Local environment parity'],
      practice: ['Containerize app utama', 'Pisahkan app dan database dalam local stack'],
      deliverables: ['Project yang bisa jalan via container'],
    },
    [normalizeSkill('CI/CD')]: {
      topics: ['Build pipeline', 'Lint and test gate', 'Release checklist'],
      practice: ['Buat workflow build otomatis', 'Tambahkan lint dan test sebelum merge'],
      deliverables: ['Pipeline CI yang bisa dipakai untuk demo'],
    },
    [normalizeSkill('GraphQL')]: {
      topics: ['Schema thinking', 'Query and mutation', 'Caching basics'],
      practice: ['Buat satu query sederhana', 'Bandingkan GraphQL vs REST pada satu use case'],
      deliverables: ['Feature kecil dengan GraphQL query atau mutation'],
    },
    [normalizeSkill('Node.js')]: {
      topics: ['Module structure', 'Async I/O', 'Layered architecture'],
      practice: ['Bangun API kecil', 'Pisahkan route, service, repository'],
      deliverables: ['Service backend sederhana yang rapi'],
    },
    [normalizeSkill('PostgreSQL')]: {
      topics: ['Schema design', 'Join and indexing', 'Migration basics'],
      practice: ['Rancang schema untuk satu domain', 'Tulis query CRUD dan aggregate'],
      deliverables: ['Schema database dan seed data untuk project'],
    },
    [normalizeSkill('SQL')]: {
      topics: ['Aggregation', 'Join patterns', 'Window functions dasar'],
      practice: ['Latihan query analitik', 'Ubah pertanyaan bisnis menjadi query'],
      deliverables: ['Mini report insight berbasis SQL'],
    },
    [normalizeSkill('System Design')]: {
      topics: ['Requirement clarification', 'Capacity estimate', 'Trade-off explanation'],
      practice: ['Latihan satu kasus design per minggu', 'Presentasikan solusi dalam 10 menit'],
      deliverables: ['Dokumen system design untuk satu fitur penting'],
    },
    [normalizeSkill('Redis')]: {
      topics: ['Caching fundamentals', 'TTL strategy', 'Read-heavy optimization'],
      practice: ['Tambah caching ke endpoint read-heavy', 'Uji invalidation sederhana'],
      deliverables: ['API demo dengan cache layer'],
    },
    [normalizeSkill('Portfolio Storytelling')]: {
      topics: ['Problem framing', 'Decision log', 'Impact narrative'],
      practice: ['Tulis case study untuk project utama', 'Latih penjelasan trade-off dalam 3 menit'],
      deliverables: ['Case study portfolio siap recruiter review'],
    },
    [normalizeSkill('CV Tailoring')]: {
      topics: ['ATS keywords', 'Impact-based bullet', 'Role-specific headline'],
      practice: ['Sesuaikan CV untuk role target', 'Ringkas bullet yang kurang kuat'],
      deliverables: ['Versi CV khusus posisi target'],
    },
    [normalizeSkill('Technical Interview')]: {
      topics: ['Problem solving structure', 'Thinking aloud', 'Trade-off explanation'],
      practice: ['Mock interview 2 kali per minggu', 'Review jawaban teknikal yang masih melebar'],
      deliverables: ['Bank jawaban untuk topik teknikal utama'],
    },
    [normalizeSkill('Behavioral Interview')]: {
      topics: ['STAR method', 'Ownership stories', 'Collaboration example'],
      practice: ['Tulis 5 cerita pengalaman kerja atau project', 'Latih jawaban singkat tapi konkret'],
      deliverables: ['Dokumen cerita STAR untuk HR dan hiring manager'],
    },
  };

  const getSkillBlueprint = (skill: string): SkillBlueprint =>
    skillPlaybook[normalizeSkill(skill)] ?? {
      topics: [`Konsep inti ${skill}`, `Best practice ${skill}`, `Kapan menggunakan ${skill}`],
      practice: [`Kerjakan latihan kecil menggunakan ${skill}`, `Dokumentasikan keputusan saat memakai ${skill}`],
      deliverables: [`Tambahkan ${skill} ke project portfolio dan jelaskan hasilnya`],
    };

  const uniqueLimited = (values: string[], limit: number): string[] => {
    const result: string[] = [];
    const seen = new Set<string>();

    values.forEach(value => {
      const key = normalizeSkill(value);
      if (!key || seen.has(key) || result.length >= limit) return;
      seen.add(key);
      result.push(value);
    });

    return result;
  };

  const formatWeeks = (weeks: number): string => weeks <= 1 ? '1 minggu' : `${weeks} minggu`;
  const formatTotalDuration = (totalWeeks: number): string => {
    if (totalWeeks <= 4) return formatWeeks(totalWeeks);
    const months = Math.floor(totalWeeks / 4);
    const weeks = totalWeeks % 4;
    return weeks === 0 ? `${months} bulan` : `${months} bulan ${weeks} minggu`;
  };

  const title = normalizeSkill(targetJob.title);
  let track: TrajectoryTrack = 'generic';
  if (title.includes('frontend') || title.includes('ui engineer')) track = 'frontend';
  else if (title.includes('full stack') || title.includes('product engineer')) track = 'fullstack';
  else if (title.includes('backend')) track = 'backend';
  else if (title.includes('data')) track = 'data';

  const jobSkills = dedupeSkills([...targetJob.requiredSkills, ...targetJob.preferredSkills]);
  let roleSummary = `Career path ini membantu kamu bergerak terstruktur menuju posisi ${targetJob.title} di ${companyName}, dari penguatan skill inti sampai bukti kerja yang siap dipresentasikan.`;
  let blueprints: PhaseBlueprint[] = [
    {
      title: 'Bangun Fondasi Skill Utama',
      focusArea: 'Core capability',
      durationWeeks: 2,
      skills: dedupeSkills(targetJob.requiredSkills),
      description: 'Fokus menutup gap paling penting yang langsung memengaruhi kesiapanmu untuk role target.',
      outcome: 'Kamu menguasai dasar kemampuan yang paling sering dipakai di posisi ini.',
      target: `Skill utama untuk ${targetJob.title} mulai matang.`,
    },
    {
      title: 'Pendalaman Praktik Kerja',
      focusArea: 'Applied execution',
      durationWeeks: 3,
      skills: jobSkills,
      description: 'Masuk ke praktik nyata melalui project kecil, studi kasus, dan pengambilan keputusan teknis.',
      outcome: 'Kamu tidak hanya tahu teori, tetapi bisa menunjukkan implementasi dan trade-off.',
      target: 'Satu project atau case study relevan selesai dibangun.',
    },
    {
      title: 'Portfolio dan Interview Sprint',
      focusArea: 'Hiring readiness',
      durationWeeks: 2,
      skills: ['Portfolio Storytelling', 'CV Tailoring', 'Technical Interview', 'Behavioral Interview'],
      description: 'Kemas pembelajaran menjadi bukti kerja dan narasi yang siap dibawa ke proses rekrutmen.',
      outcome: 'Kamu punya portfolio, CV, dan persiapan interview yang lebih tajam.',
      target: `Siap melamar posisi ${targetJob.title}.`,
    },
  ];

  if (track === 'frontend') {
    roleSummary = `${targetJob.title} di ${companyName} menuntut UI yang rapi, cepat, accessible, dan siap dikirim ke production. Jalur ini fokus ke frontend engineering quality, product thinking, dan delivery discipline.`;
    blueprints = [
      {
        title: 'Perkuat Fondasi Frontend',
        focusArea: 'Type-safe UI and solid fundamentals',
        durationWeeks: 2,
        skills: dedupeSkills(['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', ...targetJob.requiredSkills]),
        description: 'Rapikan fondasi UI engineering supaya implementasi fitur lebih konsisten, typed, dan mudah dipelihara.',
        outcome: 'Kamu nyaman membangun halaman dan komponen yang rapi, reusable, dan aman secara type.',
        target: `Core frontend untuk ${targetJob.title} terasa solid dan bisa dipresentasikan.`,
      },
      {
        title: 'Bangun Interface Siap Produk',
        focusArea: 'Data flow, quality, and experience',
        durationWeeks: 3,
        skills: dedupeSkills(['REST API', 'Next.js', 'Testing', 'Accessibility', 'Performance Optimization', ...targetJob.preferredSkills]),
        description: 'Naikkan kualitas implementasi dari sekadar jalan menjadi siap dipakai di produk yang lebih serius.',
        outcome: 'Kamu bisa menghubungkan UI ke data, menjaga kualitas experience, dan mengontrol kualitas lewat testing.',
        target: 'Satu flow produk lengkap dari fetch data sampai feedback state selesai dibangun.',
      },
      {
        title: 'Masuk ke Production Mindset',
        focusArea: 'Delivery and collaboration',
        durationWeeks: 2,
        skills: dedupeSkills(['Docker', 'CI/CD', 'GraphQL', 'Design System', ...targetJob.preferredSkills]),
        description: 'Belajar cara mengirim fitur dengan disiplin engineering yang lebih dekat ke dunia kerja nyata.',
        outcome: 'Kamu paham pipeline rilis, quality gate, dan cara menjelaskan impact engineering ke tim.',
        target: 'Project portfolio punya quality gate, deployment story, dan trade-off yang jelas.',
      },
      {
        title: 'Portfolio dan Interview Sprint',
        focusArea: 'Career conversion',
        durationWeeks: 2,
        skills: ['Portfolio Storytelling', 'CV Tailoring', 'Technical Interview', 'Behavioral Interview'],
        description: 'Ubah hasil belajar menjadi bukti yang mudah dipahami recruiter dan hiring manager.',
        outcome: 'Kamu punya CV tajam, portfolio yang mudah dibaca, dan jawaban interview yang lebih matang.',
        target: `Siap mengirim lamaran untuk posisi ${targetJob.title} dengan narasi yang kuat.`,
      },
    ];
  } else if (track === 'fullstack') {
    roleSummary = `${targetJob.title} di ${companyName} membutuhkan kamu nyaman bergerak dari frontend, backend, sampai deployment. Roadmap ini menyeimbangkan product delivery, API design, data layer, dan production readiness.`;
    blueprints = [
      {
        title: 'Kokohkan Fondasi Product Frontend',
        focusArea: 'UI delivery and interaction flow',
        durationWeeks: 2,
        skills: dedupeSkills(['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'REST API', ...targetJob.requiredSkills]),
        description: 'Pastikan lapisan frontend cukup kuat untuk mendukung pengembangan fitur end-to-end.',
        outcome: 'Kamu cepat membangun interface produk yang bersih dan siap diintegrasikan ke backend.',
        target: 'Satu flow frontend utama selesai dengan state dan API handling yang rapi.',
      },
      {
        title: 'Dalami Backend dan Data Layer',
        focusArea: 'API design and persistence',
        durationWeeks: 3,
        skills: dedupeSkills(['Node.js', 'PostgreSQL', 'SQL', 'REST API', 'System Design', ...jobSkills]),
        description: 'Masuk ke sisi backend: bagaimana mendesain API, mengelola data, dan membangun service yang masuk akal.',
        outcome: 'Kamu mampu membangun satu fitur dari UI sampai database dengan struktur yang jelas.',
        target: `Bangun feature full stack yang mencerminkan pola kerja ${targetJob.title}.`,
      },
      {
        title: 'Production Readiness End-to-End',
        focusArea: 'Deployment and reliability',
        durationWeeks: 2,
        skills: dedupeSkills(['Docker', 'CI/CD', 'Redis', 'Testing', ...targetJob.preferredSkills]),
        description: 'Naikkan project dari sekadar demo menjadi lebih siap dipresentasikan sebagai sistem yang dapat dioperasikan.',
        outcome: 'Kamu mengerti deployment, kualitas, caching, dan reliability dasar untuk product engineering.',
        target: 'Project memiliki deployment story, automated checks, dan monitoring sederhana.',
      },
      {
        title: 'Lamaran Terarah dan Interview',
        focusArea: 'Narrative and conversion',
        durationWeeks: 2,
        skills: ['Portfolio Storytelling', 'CV Tailoring', 'Technical Interview', 'Behavioral Interview'],
        description: 'Susun bukti kerja, CV, dan cerita pengalaman agar posisi kamu lebih mudah dipahami recruiter.',
        outcome: 'Kamu punya narasi end-to-end builder yang kuat saat melamar dan interview.',
        target: `Kirim lamaran ${targetJob.title} dengan portfolio yang menunjukkan ownership end-to-end.`,
      },
    ];
  } else if (track === 'backend') {
    roleSummary = `${targetJob.title} di ${companyName} akan banyak bermain di API, database, reliability, dan system thinking. Jalur ini membantu kamu menutup gap teknis sambil menyiapkan bukti kerja yang relevan.`;
    blueprints = [
      {
        title: 'Bangun Fondasi API dan Data',
        focusArea: 'Backend fundamentals',
        durationWeeks: 3,
        skills: dedupeSkills(['Node.js', 'Go', 'REST API', 'PostgreSQL', 'SQL', ...targetJob.requiredSkills]),
        description: 'Fokus pada pondasi backend: service design, database thinking, dan struktur kode yang maintainable.',
        outcome: 'Kamu bisa membangun API yang rapi, terdokumentasi, dan terhubung ke data layer yang masuk akal.',
        target: 'Satu service backend siap dipakai untuk demo atau assessment teknikal.',
      },
      {
        title: 'Masuk ke Distributed Backend',
        focusArea: 'Scalability and architecture',
        durationWeeks: 3,
        skills: dedupeSkills(['Microservices', 'Redis', 'System Design', ...targetJob.preferredSkills]),
        description: 'Pelajari pola yang sering muncul di backend role ketika sistem mulai tumbuh dan traffic meningkat.',
        outcome: 'Kamu mengerti kapan memakai cache, queue, service boundary, dan trade-off antar pendekatan.',
        target: 'Punya satu case study arsitektur backend dengan diagram dan reasoning yang jelas.',
      },
      {
        title: 'Reliability dan Operasional',
        focusArea: 'Deployment and observability',
        durationWeeks: 2,
        skills: dedupeSkills(['Docker', 'CI/CD', 'PostgreSQL', ...targetJob.preferredSkills]),
        description: 'Belajar bagaimana backend di-deploy, dipantau, dan dijaga kualitasnya setelah kode selesai ditulis.',
        outcome: 'Kamu siap bicara tentang deployment, incident basics, dan quality gate saat interview.',
        target: 'Service demo bisa dijalankan, diuji, dan dijelaskan lifecycle deploy-nya.',
      },
      {
        title: 'Portfolio dan Technical Interview',
        focusArea: 'Conversion to hiring process',
        durationWeeks: 2,
        skills: ['Portfolio Storytelling', 'CV Tailoring', 'Technical Interview', 'Behavioral Interview'],
        description: 'Kemasi semua pembelajaran backend menjadi bukti yang konkret dan meyakinkan untuk proses rekrutmen.',
        outcome: 'Kamu punya repo, case study, dan jawaban interview yang menonjolkan reasoning teknis.',
        target: `Siap mengikuti assessment dan interview untuk posisi ${targetJob.title}.`,
      },
    ];
  } else if (track === 'data') {
    roleSummary = `${targetJob.title} di ${companyName} membutuhkan kemampuan analitik yang rapi, kuat di SQL, dan bisa bercerita lewat data. Roadmap ini menekankan analisis, visualisasi, dan cara menjelaskan insight dengan jelas.`;
  }

  const firstIncompletePhaseIndex = blueprints.findIndex(phase =>
    phase.skills.some(skill => !normalizedOwned.has(normalizeSkill(skill)))
  );

  const phases: TrajectoryPhase[] = blueprints.map((phase, index) => {
    const ownedSkills = uniqueLimited(
      phase.skills.filter(skill => normalizedOwned.has(normalizeSkill(skill))),
      6
    );
    const skillsToLearn = uniqueLimited(
      phase.skills.filter(skill => !normalizedOwned.has(normalizeSkill(skill))),
      6
    );
    const referenceSkills = skillsToLearn.length > 0 ? skillsToLearn : phase.skills;
    const playbooks = referenceSkills.map(getSkillBlueprint);

    let status: TrajectoryPhase['status'];
    if (skillsToLearn.length === 0 && index !== blueprints.length - 1) {
      status = 'selesai';
    } else if ((firstIncompletePhaseIndex === -1 && index === blueprints.length - 1) || index === firstIncompletePhaseIndex) {
      status = 'berlangsung';
    } else {
      status = 'belum';
    }

    return {
      id: index + 1,
      title: phase.title,
      focusArea: phase.focusArea,
      description: `${phase.description}${skillsToLearn.length > 0 ? ` Prioritas belajar: ${skillsToLearn.slice(0, 3).join(', ')}.` : ' Fase ini lebih banyak tentang merapikan bukti kerja dan memperdalam reasoning teknismu.'}`,
      duration: formatWeeks(phase.durationWeeks),
      skills: uniqueLimited(phase.skills, 8),
      ownedSkills,
      skillsToLearn,
      outcome: phase.outcome,
      studyTopics: uniqueLimited(playbooks.flatMap(playbook => playbook.topics), 6),
      practiceTasks: uniqueLimited(playbooks.flatMap(playbook => playbook.practice), 4),
      deliverables: uniqueLimited(
        [
          ...playbooks.flatMap(playbook => playbook.deliverables),
          `Dokumentasikan hasil fase ini agar relevan untuk ${targetJob.title}.`,
        ],
        3
      ),
      successCriteria: uniqueLimited(
        [
          skillsToLearn.length > 0
            ? `Bisa menjelaskan dan mempraktikkan ${skillsToLearn.slice(0, 2).join(' dan ')} tanpa terlalu bergantung pada tutorial.`
            : 'Punya bukti konkret bahwa skill inti fase ini sudah pernah kamu pakai di project nyata.',
          `Ada satu artefak portfolio atau case study yang bisa kamu tunjukkan untuk fase ${index + 1}.`,
          `Kamu bisa mengaitkan fase ini dengan kebutuhan role ${targetJob.title} di ${companyName}.`,
        ],
        3
      ),
      target: phase.target,
      status,
    };
  });

  const totalWeeks = blueprints.reduce((sum, phase) => sum + phase.durationWeeks, 0);

  return {
    targetRole: targetJob.title,
    totalDuration: formatTotalDuration(totalWeeks),
    roleSummary,
    strengths,
    criticalSkills,
    stretchSkills,
    finalMilestone: `Dalam ${formatTotalDuration(totalWeeks)}, targetmu adalah siap melamar ${targetJob.title} di ${companyName} dengan minimal satu project relevan, CV yang ditailor, dan kesiapan interview yang lebih matang.`,
    phases,
  };
}

// ─── CV Analysis ────────────────────────────────────────────
export function generateCVAnalysis(profile: UserProfile): CVAnalysisResult {
  const strengths = profile.skills.slice(0, 5);
  const suggestedRoles = profile.preferredRoles.slice(0, 3);

  const missingAreas: string[] = [];
  const commonIndustrySkills = ['Docker', 'CI/CD', 'Testing', 'System Design', 'Cloud Computing'];
  commonIndustrySkills.forEach(s => {
    if (!profile.skills.map(normalizeSkill).includes(normalizeSkill(s))) {
      missingAreas.push(s);
    }
  });

  const readinessScore = 65 + Math.floor(profile.skills.length * 1.5) + Math.min(profile.experiences.length * 4, 12);

  return {
    detectedSkills: dedupeSkills(profile.skills),
    strengths,
    suggestedRoles,
    readinessScore: Math.min(readinessScore, 89),
    summary: `Profil menunjukkan fondasi yang kuat di bidang frontend development dengan pengalaman di ${profile.experiences.map(e => e.company).join(' dan ')}. Kamu memiliki ${profile.skills.length} skill yang terdeteksi dan menunjukkan ketertarikan pada ${suggestedRoles.join(', ')}. Beberapa area seperti ${missingAreas.slice(0, 2).join(' dan ')} bisa diperkuat untuk meningkatkan daya saing.`,
    missingAreas,
  };
}

// ─── Dashboard Data ─────────────────────────────────────────
export function buildDashboardData(profile: UserProfile, jobList: Job[]): DashboardData {
  const recommended = getRecommendedJobs(profile, jobList);
  const horizon = getHorizonRole(profile, jobList);

  const allMissing = new Set<string>();
  recommended.slice(0, 5).forEach(r => r.match.missingSkills.forEach(s => allMissing.add(s)));
  const totalNeeded = new Set<string>();
  recommended.slice(0, 5).forEach(r => [...r.match.matchedSkills, ...r.match.missingSkills].forEach(s => totalNeeded.add(s)));

  const avgScore = recommended.length > 0
    ? Math.round(recommended.slice(0, 5).reduce((s, r) => s + r.match.score, 0) / Math.min(5, recommended.length))
    : 0;

  const learningProgress = profile.learningGoals.length > 0
    ? Math.round((profile.skills.filter(s =>
        profile.learningGoals.some(g => normalizeSkill(g).includes(normalizeSkill(s)))
      ).length / profile.learningGoals.length) * 100)
    : 0;

  return {
    cakrawaScore: avgScore,
    horizonRole: horizon?.job.title ?? 'Belum ditentukan',
    topMatches: recommended.slice(0, 4).map(r => ({
      jobId: r.job.id,
      score: r.match.score,
      title: r.job.title,
    })),
    learningProgress,
    missingSkillsCount: allMissing.size,
    totalSkillsNeeded: totalNeeded.size,
    readinessInsight: avgScore >= 70
      ? 'Kamu memiliki kesiapan karier yang baik. Beberapa skill tambahan bisa memperkuat posisimu.'
      : 'Ada beberapa area yang perlu diperkuat. Ikuti roadmap belajar untuk meningkatkan skor kesiapanmu.',
    nextActions: [
      'Lengkapi profil dengan proyek terbaru',
      'Pelajari skill yang paling sering muncul di lowongan targetmu',
      `Fokus pada ${Array.from(allMissing).slice(0, 2).join(' dan ')} dalam 2 minggu ke depan`,
      'Siapkan portfolio untuk posisi ' + (horizon?.job.title ?? 'target'),
    ],
  };
}
