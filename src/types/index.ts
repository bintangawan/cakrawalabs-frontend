// ─── User / Profile ─────────────────────────────────────────
export interface UserProfile {
  id: string;
  fullName: string;
  headline: string;
  location: string;
  about: string;
  avatarUrl: string;
  skills: string[];
  preferredRoles: string[];
  learningGoals: string[];
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  workPreferences: WorkPreferences;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface WorkPreferences {
  workTypes: string[];
  locations: string[];
  salaryExpectation: string;
}

// ─── Company ────────────────────────────────────────────────
export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  summary: string;
  cultureTags: string[];
  logoColor: string;
}

// ─── Job ────────────────────────────────────────────────────
export interface Job {
  id: string;
  title: string;
  companyId: string;
  location: string;
  workType: string;
  level: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  category: string;
  postedAt: string;
  applicants: number;
}

// ─── Match Result ───────────────────────────────────────────
export interface MatchResult {
  jobId: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  label: MatchLabel;
  roleAlignmentScore: number;
  experienceScore: number;
  learningScore: number;
  skillOverlapScore: number;
  whyFit: string;
}

export type MatchLabel = 'Cocok Kuat' | 'Potensi Tinggi' | 'Perlu Upskilling';

// ─── Gap Analysis ───────────────────────────────────────────
export interface GapAnalysis {
  targetJobId: string;
  targetJobTitle: string;
  ownedSkills: string[];
  missingSkills: string[];
  stretchSkills: string[];
  readinessLevel: string;
  readinessScore: number;
  explanation: string;
  groups: GapGroup[];
}

export interface GapGroup {
  category: string;
  skills: GapSkill[];
}

export interface GapSkill {
  name: string;
  status: 'dimiliki' | 'kurang' | 'opsional';
  importance: 'tinggi' | 'sedang' | 'rendah';
}

// ─── Career Trajectory ──────────────────────────────────────
export interface CareerTrajectory {
  targetRole: string;
  totalDuration: string;
  roleSummary: string;
  strengths: string[];
  criticalSkills: string[];
  stretchSkills: string[];
  finalMilestone: string;
  phases: TrajectoryPhase[];
}

export interface TrajectoryPhase {
  id: number;
  title: string;
  focusArea: string;
  description: string;
  duration: string;
  skills: string[];
  ownedSkills: string[];
  skillsToLearn: string[];
  outcome: string;
  studyTopics: string[];
  practiceTasks: string[];
  deliverables: string[];
  successCriteria: string[];
  target: string;
  status: 'selesai' | 'berlangsung' | 'belum';
}

// ─── Dashboard ──────────────────────────────────────────────
export interface DashboardData {
  cakrawaScore: number;
  horizonRole: string;
  topMatches: { jobId: string; score: number; title: string }[];
  learningProgress: number;
  missingSkillsCount: number;
  totalSkillsNeeded: number;
  readinessInsight: string;
  nextActions: string[];
}

// ─── CV Analysis ────────────────────────────────────────────
export interface CVAnalysisResult {
  detectedSkills: string[];
  strengths: string[];
  suggestedRoles: string[];
  readinessScore: number;
  summary: string;
  missingAreas: string[];
}
