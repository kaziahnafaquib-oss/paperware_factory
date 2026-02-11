import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Activity, Bot, Sparkles, Terminal } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-[#111111] border border-white/10 rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
          >
            {/* Top Branding Bar */}
            <div className="h-2 bg-[#fabf37] w-full" />

            <button
              onClick={onClose}
              className="absolute top-8 right-8 size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X className="size-6" />
            </button>

            <div className="p-12 md:p-16">
              <div className="text-center space-y-4 mb-12">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Terminal className="size-4 text-[#fabf37]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">System Access</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  Admin <br /> <span className="text-[#fabf37]">Console.</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Neural Link Status: Active</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Authorized Email</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@paperware.global"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Access Secret</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all"
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

                <button type="submit" className="w-full py-6 bg-[#fabf37] text-black rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_20px_40px_-10px_rgba(250,191,55,0.3)] mt-8 group">
                  Initiate System Login
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Bypass Login for Testing */}
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full py-4 mt-4 bg-white/5 text-zinc-500 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-white/10 hover:text-white transition-all border border-white/5"
                >
                  Bypass Authentication (Dev Mode)
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-3 text-emerald-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">AES-256 Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="size-3 text-zinc-600" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Trace Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tech Detail */}
            <div className="bg-black/40 p-6 flex items-center justify-center gap-3">
              <Bot className="size-4 text-[#fabf37]" />
              <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-[0.4em]">Paperware Neural Network v2.0.4 - Secure Node 8821</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}