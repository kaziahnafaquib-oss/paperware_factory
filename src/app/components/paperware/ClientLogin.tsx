import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Building2, User, Phone, MapPin, Briefcase, ChevronRight, Activity, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { toast } from "sonner";

interface ClientLoginProps {
  onLogin: () => void;
}

export function ClientLogin({ onLogin }: ClientLoginProps) {
  const { t, isRTL } = useLanguage();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 pt-32 pb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,191,55,0.08),transparent_70%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
        className="w-full max-w-2xl bg-[#1a1a1a] border rounded-[60px] p-8 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative z-10 overflow-hidden"
        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="text-center space-y-4 mb-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <div className="size-1.5 rounded-full bg-[#fabf37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Secure Access</span>
          </motion.div>
          <motion.h1 
             layout
             className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-4"
          >
            Client <br /> 
            <AnimatePresence mode="wait">
                <motion.span 
                    key={authMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#fabf37] inline-block"
                >
                    {authMode === 'login' ? 'Login' : 'Registration'}
                </motion.span>
            </AnimatePresence>
          </motion.h1>
          <motion.p 
            layout
            className="text-[10px] md:text-xs font-black text-zinc-500 uppercase tracking-[0.2em] italic"
          >
            {authMode === 'login' ? 'Access your global supply chain' : 'Join our manufacturing network'}
          </motion.p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6 relative z-10">
          <AnimatePresence mode="wait">
            {authMode === 'signup' ? (
              <motion.div 
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Company Name</label>
                    <div className="relative group">
                      <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                      <input required type="text" placeholder="Global Logistics" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Industry</label>
                    <div className="relative group">
                      <select className="w-full bg-[#242424] border border-white/5 rounded-2xl px-6 py-5 text-sm font-bold text-zinc-400 focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer">
                        <option>Retail</option>
                        <option>E-commerce</option>
                        <option>Food & Beverage</option>
                        <option>Pharmaceutical</option>
                        <option>Logistics</option>
                        <option>Export/Import</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 rotate-90 pointer-events-none group-focus-within:text-[#fabf37] transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Contact Person</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                      <input required type="text" placeholder="Full Name" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                      <input required type="tel" placeholder="+880 1XXX XXXXXX" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Office Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="text" placeholder="House, Road, Area, City" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Primary Product Interest</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                      <select className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-zinc-400 focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer">
                        <option>Paper Cups</option>
                        <option>Shopping Bags</option>
                        <option>Food Boxes</option>
                        <option>Marketing Materials</option>
                        <option>Custom Packaging</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 rotate-90 pointer-events-none group-focus-within:text-[#fabf37] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Monthly Order Volume</label>
                    <div className="relative group">
                      <Activity className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                      <select className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-zinc-400 focus:border-[#fabf37] outline-none transition-all appearance-none cursor-pointer">
                        <option>Under 10,000 Pcs</option>
                        <option>10,000 - 50,000 Pcs</option>
                        <option>50,000 - 100,000 Pcs</option>
                        <option>Above 100,000 Pcs</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 rotate-90 pointer-events-none group-focus-within:text-[#fabf37] transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Enterprise Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="email" placeholder="manager@company.com" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Secure Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" 
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
              </motion.div>
            ) : (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Enterprise Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                    <input required type="email" placeholder="manager@company.com" className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Secure Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-[#fabf37] transition-colors" />
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="w-full bg-[#242424] border border-white/5 rounded-2xl px-14 py-5 text-sm font-bold text-white focus:border-[#fabf37] outline-none transition-all" 
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
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full py-6 bg-[#fabf37] text-black rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(250,191,55,0.3)] mt-8 group"
          >
            {authMode === 'login' ? 'Authorize Access' : 'Create Enterprise Account'} 
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => {
              toast.success("Bypassing security protocols... Access Granted.");
              onLogin();
            }}
            className="w-full py-4 mt-4 bg-red-600/20 border border-red-500 text-red-500 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            ⚠ DEMO: BYPASS LOGIN ⚠
          </motion.button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-[#fabf37] transition-colors"
          >
            {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-[9px] font-bold text-zinc-600 uppercase tracking-widest"
      >
        Need help? <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            toast.success("Support Request Initiated", {
              description: "Our enterprise team has been notified. We'll contact you at support@paperware.com or via your registered email.",
            });
          }}
          className="text-zinc-400 hover:text-[#fabf37] underline underline-offset-4"
        >
          Contact Enterprise Support
        </a>
      </motion.p>
    </div>
  );
}