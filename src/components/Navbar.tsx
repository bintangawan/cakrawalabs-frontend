import { useState } from 'react';
import { LogOut, Menu, MoonStar, SunMedium } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginDialog from './LoginDialog';

interface NavbarProps {
  isApp?: boolean;
  onToggleSidebar?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onBrandClick?: () => void;
}

export default function Navbar({ isApp, onToggleSidebar, theme, onToggleTheme, onBrandClick }: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const ThemeIcon = theme === 'dark' ? SunMedium : MoonStar;

  const handleBrandClick = () => {
    if (onBrandClick) {
      onBrandClick();
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-surface-800/70 bg-surface-950/75 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(16,185,129,0.08),transparent_18%),radial-gradient(circle_at_right,rgba(14,165,233,0.08),transparent_18%)]" />
        <div className={`${isApp ? 'px-4 lg:px-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} relative flex items-center justify-between h-16`}>
          <div className="flex items-center gap-3">
            {isApp && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden rounded-xl border border-surface-800/80 bg-surface-900/80 p-2 text-surface-400 transition-colors hover:border-surface-700 hover:text-surface-200"
                aria-label="Toggle menu"
              >
                <Menu size={20} />
              </button>
            )}
            <button type="button" onClick={handleBrandClick} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-[0_14px_32px_rgba(16,185,129,0.28)]">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold tracking-tight text-surface-100">Cakrawa Labs</span>
                {isApp && <span className="block text-[11px] uppercase tracking-[0.24em] text-surface-500">Career Portal</span>}
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-surface-800/80 bg-surface-900/80 text-surface-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-surface-700 hover:text-surface-200"
              aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
            >
              <ThemeIcon size={17} />
            </button>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-xl border border-surface-800/80 bg-surface-900/80 px-3.5 py-2 text-sm text-surface-400 transition-all duration-200 hover:border-surface-700 hover:text-surface-200"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="rounded-xl bg-accent-600 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-500 hover:shadow-lg hover:shadow-accent-600/20 active:scale-[0.97]"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
