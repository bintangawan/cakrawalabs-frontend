import { Briefcase, LayoutDashboard, User, FileSearch, BarChart3, Route, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'jobs', label: 'Lowongan', icon: Briefcase },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'cv-analysis', label: 'Analisis CV', icon: FileSearch },
  { id: 'gap-insight', label: 'Gap Insight', icon: BarChart3 },
  { id: 'trajectory', label: 'Career Trajectory', icon: Route },
];

export default function Sidebar({ currentPage, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-16 left-0 bottom-0 z-40 w-64 overflow-hidden border-r border-surface-800/70 bg-surface-950/85 backdrop-blur-xl
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_24%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.08),transparent_20%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative flex items-center justify-between border-b border-surface-800/70 px-4 py-3 lg:hidden">
          <span className="font-semibold text-surface-200">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-surface-400 transition-colors hover:bg-surface-800 hover:text-surface-200"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="relative p-3 space-y-1">
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`
                  w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'border border-accent-600/20 bg-accent-500/10 text-accent-300 shadow-[0_14px_30px_rgba(16,185,129,0.12)]'
                    : 'border border-transparent text-surface-400 hover:border-surface-800 hover:bg-surface-900/70 hover:text-surface-200'
                  }
                `}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${isActive ? 'border-accent-600/20 bg-accent-500/10 text-accent-400' : 'border-surface-800/80 bg-surface-900/80 text-surface-500'}`}>
                  <Icon size={17} />
                </div>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-surface-800/60 p-4">
          <div className="rounded-2xl border border-surface-800/70 bg-surface-900/80 p-3 shadow-[0_16px_36px_rgba(2,6,23,0.12)]">
            <p className="text-xs text-surface-400 leading-relaxed">
              Powered by <span className="text-accent-400 font-medium">Horizon Match</span> engine
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
