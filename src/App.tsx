import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import JobsFeed from './pages/JobsFeed';
import JobDetail from './pages/JobDetail';
import ProfilePage from './pages/ProfilePage';
import CVAnalysisPage from './pages/CVAnalysisPage';
import DashboardPage from './pages/DashboardPage';
import GapInsightPage from './pages/GapInsightPage';
import TrajectoryPage from './pages/TrajectoryPage';
import type { Job } from './types';
import { jobs } from './data';

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'cakrawa-theme-mode';

function AppContent({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) {
  const { isAuthenticated } = useAuth();
  const { selectedJob, setSelectedJob, targetJobForGap, setTargetJobForGap } = useAppContext();
  const [currentPage, setCurrentPage] = useState('jobs');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user logs in, go to jobs feed
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('jobs');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    scrollToTop();
  }, [currentPage, selectedJob?.id, targetJobForGap?.id]);

  if (!isAuthenticated) {
    return <LandingPage theme={theme} onToggleTheme={onToggleTheme} />;
  }

  const handleViewJobDetail = (job: Job) => {
    setSelectedJob(job);
    setCurrentPage('job-detail');
    scrollToTop();
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setCurrentPage('jobs');
    scrollToTop();
  };

  const handleViewGap = (job: Job) => {
    setTargetJobForGap(job);
    setCurrentPage('gap-insight');
    scrollToTop();
  };

  const handleViewTrajectory = (job: Job) => {
    setTargetJobForGap(job);
    setCurrentPage('trajectory');
    scrollToTop();
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedJob(null);
    scrollToTop();
  };

  const handleViewJobFromDashboard = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) handleViewJobDetail(job);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'jobs':
        return <JobsFeed onViewDetail={handleViewJobDetail} />;
      case 'job-detail':
        return selectedJob ? (
          <JobDetail
            job={selectedJob}
            onBack={handleBackToJobs}
            onViewGap={handleViewGap}
            onViewTrajectory={handleViewTrajectory}
          />
        ) : <JobsFeed onViewDetail={handleViewJobDetail} />;
      case 'dashboard':
        return (
          <DashboardPage
            onGoToJobs={() => handleNavigate('jobs')}
            onGoToGapInsight={() => handleNavigate('gap-insight')}
            onGoToTrajectory={() => handleNavigate('trajectory')}
            onViewJob={handleViewJobFromDashboard}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'cv-analysis':
        return (
          <CVAnalysisPage
            onGoToJobs={() => handleNavigate('jobs')}
            onGoToDashboard={() => handleNavigate('dashboard')}
            onGoToTrajectory={() => handleNavigate('trajectory')}
          />
        );
      case 'gap-insight':
        return <GapInsightPage targetJob={targetJobForGap} onGoToTrajectory={handleViewTrajectory} />;
      case 'trajectory':
        return <TrajectoryPage targetJob={targetJobForGap} />;
      default:
        return <JobsFeed onViewDetail={handleViewJobDetail} />;
    }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-surface-950 text-surface-100 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_22%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_18%),linear-gradient(to_bottom,rgba(16,185,129,0.04),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute -top-20 left-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative">
        <Navbar
          isApp
          theme={theme}
          onToggleTheme={onToggleTheme}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onBrandClick={() => handleNavigate('jobs')}
        />
      </div>

      <div className="relative flex">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="relative flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div data-theme={theme} className="min-h-[100dvh]">
      <AuthProvider>
        <AppProvider>
          <AppContent theme={theme} onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')} />
        </AppProvider>
      </AuthProvider>
    </div>
  );
}
