import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, Eye, EyeOff, Phone, AlertCircle, Shield, Fingerprint, Clock, Smartphone, CheckCircle2, QrCode } from "lucide-react";
import { ContactSupportModal } from "./ContactSupportModal";

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onViewFaq?: () => void;
}

export function ClientLoginModal({ isOpen, onClose, onLoginSuccess, onViewFaq }: ClientLoginModalProps) {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "otp">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      // Mock validation
      if (loginMethod === "email" && formData.email && formData.password) {
        onLoginSuccess();
        onClose();
      } else if (loginMethod === "phone" && formData.phone && formData.password) {
        onLoginSuccess();
        onClose();
      } else if (loginMethod === "otp" && formData.otp) {
        onLoginSuccess();
        onClose();
      } else {
        setError("Invalid credentials. Please try again.");
        setLoginAttempts(loginAttempts + 1);
        if (loginAttempts >= 2) {
          setShowSecurityInfo(true);
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const sendOtp = async () => {
    setError("");
    setIsLoading(true);

    // Simulate OTP sending API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 500 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-[40px] p-5 md:p-7 w-full max-w-md max-h-[75vh] overflow-y-auto shadow-2xl relative border border-black/5">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-0 right-0 ml-auto size-8 rounded-full bg-black/5 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/10 transition-all z-10 mb-4"
              >
                <X className="size-4" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center size-12 rounded-full bg-[#fabf37]/10 mb-3">
                  <Lock className="size-6 text-[#fabf37]" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-1">
                  Client Portal
                </h2>
                <p className="text-xs font-bold text-black/50">
                  Sign in to access your dashboard
                </p>
              </div>

              {/* Login Method Toggle */}
              <div className="flex gap-2 bg-black/5 rounded-[20px] p-1 mb-5">
                <button
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-wider transition-all ${
                    loginMethod === "email"
                      ? "bg-[#fabf37] text-black shadow-sm"
                      : "text-black/40 hover:text-black"
                  }`}
                >
                  <Mail className="size-3.5 inline mr-1.5" />
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-wider transition-all ${
                    loginMethod === "phone"
                      ? "bg-[#fabf37] text-black shadow-sm"
                      : "text-black/40 hover:text-black"
                  }`}
                >
                  <Phone className="size-3.5 inline mr-1.5" />
                  Phone
                </button>
                <button
                  onClick={() => setLoginMethod("otp")}
                  className={`flex-1 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-wider transition-all ${
                    loginMethod === "otp"
                      ? "bg-[#fabf37] text-black shadow-sm"
                      : "text-black/40 hover:text-black"
                  }`}
                >
                  <QrCode className="size-3.5 inline mr-1.5" />
                  OTP
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email/Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-black/40 px-5">
                    {loginMethod === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  {loginMethod === "email" ? (
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-black/30" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@company.com"
                        className="w-full bg-black/5 border border-black/10 rounded-[24px] pl-12 pr-5 py-4 text-xs font-bold text-black focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-black/30"
                        required
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-black/30" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 XXXX-XXXXXX"
                        className="w-full bg-black/5 border border-black/10 rounded-[24px] pl-12 pr-5 py-4 text-xs font-bold text-black focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-black/30"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-black/40 px-5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-black/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-black/5 border border-black/10 rounded-[24px] pl-12 pr-12 py-4 text-xs font-bold text-black focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-black/30"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* OTP Input */}
                {loginMethod === "otp" && (
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-black/40 px-5">
                      OTP
                    </label>
                    <div className="relative">
                      <QrCode className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-black/30" />
                      <input
                        type="text"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        placeholder="123456"
                        className="w-full bg-black/5 border border-black/10 rounded-[24px] pl-12 pr-5 py-4 text-xs font-bold text-black focus:border-[#fabf37] focus:bg-white outline-none transition-all placeholder:text-black/30"
                        required
                      />
                      {!otpSent && (
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-[18px] p-3 flex items-center gap-2"
                    >
                      <AlertCircle className="size-4 text-red-500 shrink-0" />
                      <p className="text-[10px] font-bold text-red-600">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Remember Me & Biometric */}
                {loginMethod !== "otp" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-4 rounded border-2 border-black/20 bg-black/5 text-[#fabf37] focus:ring-[#fabf37] cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-black/50 group-hover:text-black transition-colors">
                        Remember Me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-[10px] font-bold text-black/40 hover:text-[#fabf37] transition-colors"
                    >
                      <Fingerprint className="size-4" />
                      Use Biometric
                    </button>
                  </div>
                )}

                {/* OTP Success Message */}
                <AnimatePresence>
                  {otpSent && loginMethod === "otp" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-500/10 border border-green-500/20 rounded-[18px] p-3 flex items-center gap-2"
                    >
                      <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                      <p className="text-[10px] font-bold text-green-600">OTP sent successfully! Check your phone.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-[10px] font-bold text-[#fabf37] hover:text-black transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full bg-[#fabf37] text-black py-4 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-black hover:text-[#fabf37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="size-4 border-2 border-black/20 border-t-black rounded-full"
                      />
                      <span className="text-[10px]">Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-black/10" />
                <span className="text-[9px] font-black uppercase tracking-wider text-black/30">Or Continue With</span>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <button
                  type="button"
                  className="bg-black/5 hover:bg-black/10 border border-black/10 rounded-[16px] py-3 flex items-center justify-center transition-all group"
                >
                  <svg className="size-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-black/5 hover:bg-black/10 border border-black/10 rounded-[16px] py-3 flex items-center justify-center transition-all group"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" fill="#0A66C2"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-black/5 hover:bg-black/10 border border-black/10 rounded-[16px] py-3 flex items-center justify-center transition-all group"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="#5E5E5E">
                    <path d="M23.5 6.507a.809.809 0 00-.87-.678l-11.63 1.373-3.384-4.15a.809.809 0 00-.999-.225L.31 5.29a.809.809 0 00-.24 1.28l3.992 4.115-3.88 1.72a.809.809 0 00-.34 1.211L3.26 17.55a.809.809 0 001.125.17l3.762-2.684 3.657 3.772c.216.223.54.283.82.153l12.817-6.023a.809.809 0 00.46-.885l-.402-5.546z"/>
                  </svg>
                </button>
              </div>

              {/* Quick Demo Access */}
              <div className="bg-gradient-to-r from-[#fabf37]/10 to-[#fabf37]/5 border border-[#fabf37]/20 rounded-[20px] p-4 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[#fabf37]/20 flex items-center justify-center">
                      <Smartphone className="size-4 text-[#fabf37]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-black">Quick Demo Access</p>
                      <p className="text-[9px] font-bold text-black/50">Explore without login</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onLoginSuccess();
                      onClose();
                    }}
                    className="text-[9px] font-black uppercase tracking-wider text-[#fabf37] hover:text-black transition-colors px-3 py-1.5 bg-white rounded-full"
                  >
                    Try Now →
                  </button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="size-4 text-green-500" />
                <p className="text-[9px] font-bold text-black/40">
                  256-bit SSL Encrypted • SOC 2 Certified
                </p>
              </div>

              {/* Login Attempts Warning */}
              {loginAttempts > 0 && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="size-3.5 text-orange-500" />
                  <p className="text-[9px] font-bold text-orange-600">
                    {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''} • {3 - loginAttempts} remaining
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="text-center">
                <p className="text-[10px] font-bold text-black/40">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setShowContactSupport(true)}
                    className="text-[#fabf37] hover:text-black transition-colors"
                  >
                    Contact Sales
                  </button>
                </p>
              </div>

              {/* Security Info */}
              {showSecurityInfo && (
                <div className="mt-5 text-center">
                  <p className="text-[10px] font-bold text-black/40">
                    For security reasons, please contact support to reset your password.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Support Modal */}
          <ContactSupportModal 
            isOpen={showContactSupport} 
            onClose={() => setShowContactSupport(false)}
            onViewFaq={onViewFaq}
          />
        </>
      )}
    </AnimatePresence>
  );
}