import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, User, Building2, Phone, Briefcase, Activity, ChevronRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'admin' | 'client';
  onLoginSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, type, onLoginSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>(type === 'admin' ? 'login' : 'login');
  const [showPassword, setShowPassword] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20"
          >
            <X className="size-6" />
          </button>

          <div className="p-8 md:p-16">
            <div className="text-center space-y-4 mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`size-1.5 rounded-full ${type === 'admin' ? 'bg-red-500' : 'bg-[#fabf37]'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                  {type === 'admin' ? 'Administrative Access' : 'Client Secure Access'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                {type === 'admin' ? 'Admin' : 'Client'} <br />
                <span className={type === 'admin' ? 'text-red-500' : 'text-[#fabf37]'}>
                  {authMode === 'login' ? 'Portal Login' : 'Registration'}
                </span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {authMode === 'signup' && type === 'client' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                      <input required type="text" placeholder="Global Logistics" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-4 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                      <input required type="text" placeholder="John Doe" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-4 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Enterprise Email</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                  <input required type="email" placeholder="manager@company.com" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-4 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Secure Key</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-4 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#fabf37] transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-xl mt-8 group ${type === 'admin'
                    ? 'bg-red-500 text-white shadow-red-500/20'
                    : 'bg-[#fabf37] text-black shadow-[#fabf37]/20'
                  }`}
              >
                {authMode === 'login' ? 'Authorize Access' : 'Register Account'}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>

            {type === 'client' && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-[#fabf37] transition-colors"
                >
                  {authMode === 'login' ? "Don't have an account? Create one" : "Already have an account? Login"}
                </button>
              </div>
            )}

            {type === 'admin' && (
              <p className="mt-8 text-center text-[9px] font-black uppercase tracking-[0.2em] text-red-500/50">
                Unauthorized access is strictly prohibited and logged.
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}