import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const { login } = useAuth();

  if (!open) return null;

  const handleLogin = () => {
    login();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* dialog */}
      <div className="relative animate-scale-in bg-surface-900 border border-surface-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-surface-400 hover:text-surface-200 transition-colors p-1 rounded-lg hover:bg-surface-800"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          {/* logo */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-surface-100">Cakrawa Labs</span>
          </div>

          <h2 className="text-2xl font-bold text-surface-50 mb-2">Masuk ke Cakrawa</h2>
          <p className="text-surface-400 mb-8 text-sm leading-relaxed">
            Temukan pekerjaan yang sesuai dengan potensimu dan dapatkan roadmap karier yang personal.
          </p>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-surface-50 hover:bg-white text-surface-900 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          <p className="text-surface-500 text-xs mt-6">
            Dengan melanjutkan, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi Cakrawa Labs.
          </p>
        </div>
      </div>
    </div>
  );
}
