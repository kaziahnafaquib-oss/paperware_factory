import { FormEvent, useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, User, Building2, Phone, Briefcase, Activity, ChevronRight, Fingerprint, ScanLine, Laptop, Server } from "lucide-react";
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'admin' | 'client';
  onLoginSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, type, onLoginSuccess }: AuthModalProps) {
  const { t } = useLanguage();
  console.log('🔐 AuthModal rendered:', { isOpen, type });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(type === 'admin' ? 'login' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 1, 100));
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate processing delay for effect
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  const themeColor = type === 'admin' ? 'red-500' : '[#fabf37]';
  const themeShadow = type === 'admin' ? 'shadow-red-500/20' : 'shadow-[#fabf37]/20';
  const themeBg = type === 'admin' ? 'bg-red-500' : 'bg-[#fabf37]';
  const themeText = type === 'admin' ? 'text-red-500' : 'text-[#fabf37]';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 overflow-hidden"
      >
        {/* Backdrop with Blur and Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_${type === 'admin' ? 'rgba(239,68,68,0.1)' : 'rgba(250,191,55,0.1)'}_0%,_transparent_50%)] animate-spin-slow`} style={{ animationDuration: '60s' }} />
          </div>
        </motion.div>

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40, rotateX: -10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] backdrop-blur-3xl group"
        >
          {/* Top Decorative Line */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${type === 'admin' ? 'red-500' : '[#fabf37]'} to-transparent opacity-50`} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 size-10 md:size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 z-20 group/close"
          >
            <X className="size-5 md:size-6 text-zinc-400 group-hover/close:text-white transition-colors" />
          </button>

          <div className="p-8 md:p-12 lg:p-16 relative">
            {/* Background Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-${type === 'admin' ? 'red-500' : '[#fabf37]'} blur-[120px] opacity-10 pointer-events-none`} />

            <div className="text-center space-y-6 mb-12 relative z-10">
              {/* Status Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-2"
              >
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-2 backdrop-blur-md">
                  <div className={`size-1.5 rounded-full ${themeBg} animate-pulse`} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    {type === 'admin' ? t('auth_system_restricted') : t('auth_encrypted_connection')}
                  </span>
                  <span className={`text-[9px] font-mono ${themeText} opacity-70`}>
                    {scanProgress}% {t('auth_secure')}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  {type === 'admin' ? (
                    <>{t('portal_enterprise')} <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800">{t('auth_admin_panel')}</span></>
                  ) : (
                    <>{t('portal_client')} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fabf37] to-[#9a7b3a]">{t('auth_client_portal')}</span></>
                  )}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 opacity-50">
                  <ScanLine className="size-3 text-white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                    {authMode === 'login' ? t('auth_identity_verification') : t('auth_new_entity')}
                  </span>
                </div>
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <AnimatePresence mode="wait">
                {authMode === 'signup' && type === 'client' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t('auth_company')}</label>
                      <div className="relative group/input">
                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within/input:text-white transition-colors" />
                        <input required type="text" placeholder="Global Logistics" className="w-full bg-white/5 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold text-white focus:border-[#fabf37] focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t('auth_full_name')}</label>
                      <div className="relative group/input">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within/input:text-white transition-colors" />
                        <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold text-white focus:border-[#fabf37] focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t('auth_identity_email')}</label>
                <div className="relative group/input">
                  <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within/input:${type === 'admin' ? 'text-red-500' : 'text-[#fabf37]'} transition-colors`} />
                  <input
                    required
                    type="email"
                    placeholder={type === 'admin' ? "admin@paperware.com" : "manager@company.com"}
                    className={`w-full bg-white/5 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold text-white focus:border-${type === 'admin' ? 'red-500' : '[#fabf37]'} focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700`}
                  />
                  {type === 'admin' && <ShieldCheck className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-red-500/30" />}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t('auth_passkey')}</label>
                <div className="relative group/input">
                  <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within/input:${type === 'admin' ? 'text-red-500' : 'text-[#fabf37]'} transition-colors`} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className={`w-full bg-white/5 border border-white/5 rounded-2xl px-12 py-4 text-sm font-bold text-white focus:border-${type === 'admin' ? 'red-500' : '[#fabf37]'} focus:bg-white/10 outline-none transition-all placeholder:text-zinc-700`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:${type === 'admin' ? 'text-red-500' : 'text-[#fabf37]'} transition-colors`}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all shadow-xl mt-8 relative overflow-hidden ${themeBg} ${themeShadow} ${type === 'admin' ? 'text-white' : 'text-black'}`}
              >
                <div className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <ScanLine className="size-4 animate-spin" />
                      <span>{t('auth_verifying_credentials')}</span>
                    </>
                  ) : (
                    <>
                      {authMode === 'login' ? t('auth_authenticate') : t('auth_initiate_registration')}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </div>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </motion.button>

              {/* Bypass Button for Admin Testing */}
              {(type === 'admin' || type === 'client') && (
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      onLoginSuccess();
                      onClose();
                    }, 800);
                  }}
                  className={`w-full py-3 mt-2 bg-transparent text-zinc-600 hover:text-white rounded-xl font-bold uppercase tracking-[0.1em] text-[9px] flex items-center justify-center gap-2 transition-all border border-transparent hover:border-white/10 hover:bg-white/5`}
                >
                  <Fingerprint className="size-3" />
                  {type === 'admin' ? t('auth_bypass_dev') : t('auth_demo_login')}
                </button>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
              {type === 'client' && (
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  {authMode === 'login' ? (
                    <>{t('auth_new_partner')} <span className="text-[#fabf37] group-hover:underline decoration-[#fabf37]">{t('auth_apply_access')}</span></>
                  ) : (
                    <>{t('auth_existing_partner')} <span className="text-[#fabf37] group-hover:underline decoration-[#fabf37]">{t('auth_return_login')}</span></>
                  )}
                </button>
              )}

              {type === 'admin' && (
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-red-900/40">
                  <Server className="size-3" />
                  <span>{t('auth_secure_node')}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}