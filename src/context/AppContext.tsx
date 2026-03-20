import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Job } from '../types';

interface AppContextType {
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  targetJobForGap: Job | null;
  setTargetJobForGap: (job: Job | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [targetJobForGap, setTargetJobForGap] = useState<Job | null>(null);

  return (
    <AppContext.Provider value={{ selectedJob, setSelectedJob, targetJobForGap, setTargetJobForGap }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
