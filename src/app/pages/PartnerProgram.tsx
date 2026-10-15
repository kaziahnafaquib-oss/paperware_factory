import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { openWhatsAppInquiry, INQUIRY_HANDOFF_TITLE, INQUIRY_HANDOFF_BODY } from '../lib/inquiry';
import { 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Users, 
  Briefcase, 
  ArrowRight,
  Building2,
  Globe,
  Award,
  ShieldCheck,
  Handshake,
  DollarSign,
  BarChart3,
  ChevronRight,
  Phone,
  MessageCircle,
  Mail,
  Plus,
  Trash2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CircleCheck,
  Upload,
  Star,
  ShoppingBag,
  LayoutDashboard,
  Package,
  Settings,
  Search,
  Bell,
  Menu
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import partnerBanner from 'figma:asset/b075043713f864ee3b46a98de066b431d81fde8c.webp';

export function PartnerProgramPage() {
  const { scrollY, scrollYProgress } = useScroll();
  const heroTitleY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroButtonY = useTransform(scrollY, [0, 500], [0, 50]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const blobY = useTransform(scrollY, [0, 1000], [0, -200]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [contactNumbers, setContactNumbers] = React.useState([{ number: '', apps: [] as string[] }]);
  const [emails, setEmails] = React.useState(['']);
  const [attachment, setAttachment] = React.useState<File | null>(null);

  // Scroll animation for Partner Portal section

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 40, damping: 10 } 
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 30, damping: 15, delay: 0.2 } 
    }
  };

  const addContactNumber = () => {
    if (contactNumbers.length < 3) {
      setContactNumbers([...contactNumbers, { number: '', apps: [] }]);
    }
  };

  const removeContactNumber = (index: number) => {
    const newNumbers = contactNumbers.filter((_, i) => i !== index);
    setContactNumbers(newNumbers);
  };

  const updateContactNumber = (index: number, value: string) => {
    const newNumbers = [...contactNumbers];
    newNumbers[index].number = value;
    setContactNumbers(newNumbers);
  };

  const toggleAppForContact = (index: number, app: string) => {
    const newNumbers = [...contactNumbers];
    const currentApps = newNumbers[index].apps;
    if (currentApps.includes(app)) {
      newNumbers[index].apps = currentApps.filter(a => a !== app);
    } else {
      newNumbers[index].apps = [...currentApps, app];
    }
    setContactNumbers(newNumbers);
  };

  const addEmail = () => {
    if (emails.length < 3) {
      setEmails([...emails, '']);
    }
  };

  const removeEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Include dynamic state in submission
    const formData = {
        ...data,
        contactNumbers,
        emails,
        attachment
    };
    
    // Phase A0: no backend yet; hand the application to WhatsApp instead of faking "submitted".
    const fields: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || value === false) return;
      if (key === "attachment") { if (value) fields["Attachment"] = `${(value as File).name} (I will send this file in the chat)`; return; }
      if (key === "contactNumbers") { fields["Contact numbers"] = (value as { number: string; apps: string[] }[]).filter(c => c.number).map(c => c.apps.length ? `${c.number} (${c.apps.join("/")})` : c.number).join(", "); return; }
      if (key === "emails") { fields["Emails"] = (value as string[]).filter(Boolean).join(", "); return; }
      fields[key] = Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : String(value);
    });
    openWhatsAppInquiry("Partner program application", fields);
    toast.info(INQUIRY_HANDOFF_TITLE, { description: INQUIRY_HANDOFF_BODY, duration: 12000 });
    reset();
    setContactNumbers([{ number: '', apps: [] }]);
    setEmails(['']);
    setAttachment(null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#fabf37] origin-left z-50"
        style={{ scaleX: scrollYProgress }} 
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-white text-zinc-900 pt-20">
        {/* Background elements */}
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,191,55,0.08),transparent_40%)]" />
           {/* Grid pattern */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 py-20 flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl text-center flex flex-col items-center"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center justify-between px-6 py-3 bg-[#fabf37] text-black rounded-full font-black text-sm uppercase tracking-widest mb-8 border border-[#fabf37]/20 shadow-[0_0_20px_rgba(250,191,55,0.3)] hover:scale-105 transition-transform cursor-default"
            >
               <span>Partner Program</span>
               <ChevronRight className="size-5 ml-2" />
            </motion.div>
            
            <motion.div style={{ y: heroTitleY }}>
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-black"
            >
              <motion.span 
                className="inline-block"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                SCALE WITH
              </motion.span> 
              <br/>
              <motion.span 
                className="text-[#fabf37] inline-block cursor-pointer"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -2,
                  textShadow: "0px 10px 20px rgba(250,191,55,0.4)"
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% auto",
                  backgroundImage: "linear-gradient(45deg, #fabf37, #ffd700, #fabf37, #ffcc00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PAPERWARE
              </motion.span>
            </motion.h1>
            </motion.div>
            
            <motion.div style={{ y: heroTextY }}>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-zinc-500 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Join the leading B2B sustainable packaging network. Unlock exclusive pricing, dedicated support, and premium marketing resources to grow your business.
            </motion.p>
            </motion.div>

            <motion.div style={{ y: heroButtonY }} className="w-full flex justify-center">
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 items-center">
              <motion.button 
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-16 px-10 bg-[#fabf37] text-black font-black uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all shadow-[0_10px_20px_rgba(250,191,55,0.2)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(250,191,55,0.4)" }}
                  whileTap={{ scale: 0.95 }}
              >
                  Join The Network
              </motion.button>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 border border-zinc-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Applications Open</span>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Feed & Clients */}
      <section className="py-12 border-y border-zinc-100 bg-zinc-50/50 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 mb-8"
        >
            <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-8">Trusted by Global Partners</p>
            <div className="flex overflow-hidden relative">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    className="flex gap-16 whitespace-nowrap w-max items-center"
                >
                    {/* Partner Logos (To be managed via Admin Portal) */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-16 items-center shrink-0">
                            {[
                                { name: 'Al Arabian', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Fresh', src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Bengal Classic Tea', src: 'https://images.unsplash.com/photo-1597318130878-5a2c275eb9e6?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Cafe Z', src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Coffee Avenue', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Crimson Cup', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Dhakai Khana', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Abdul Monem Ltd', src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Walton', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'Novatek', src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'MGI', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&w=400&h=200&fit=crop&q=75' },
                                { name: 'ICDDR,B', src: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&w=400&h=200&fit=crop&q=75' }
                            ].map((partner, idx) => (
                                <div 
                                    key={idx}
                                    className="h-8 md:h-10 w-auto opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                    title={partner.name}
                                >
                                    <ImageWithFallback 
                                        src={partner.src}
                                        alt={`${partner.name} Logo`}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>

      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-zinc-50 relative border-t border-zinc-100">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: TrendingUp, title: "Aggressive Wholesale Pricing", desc: "Enjoy our lowest tier pricing designed to maximize your profit margins on every order.", isFirst: true },
                    { icon: ShieldCheck, title: "Priority Production", desc: "Your orders get priority in our manufacturing queue, ensuring faster turnaround times." },
                    { icon: Globe, title: "Exclusive Territories", desc: "Secure exclusive distribution rights for specific regions or industry verticals." },
                    { icon: Users, title: "Dedicated Account Manager", desc: "Direct access to a dedicated specialist who understands your business needs." },
                    { icon: Briefcase, title: "White Label Options", desc: "Option to rebrand select products with your own identity and packaging." },
                    { icon: Target, title: "Qualified Leads", desc: "We forward inquiries from your region directly to you for fulfillment." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                        whileHover={{ y: -10, boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.1)" }}
                        className="p-10 rounded-[32px] bg-white border border-zinc-100 hover:border-[#fabf37]/50 shadow-sm transition-all group duration-300 min-h-[320px] flex flex-col justify-start items-start"
                    >
                        <div className={`size-14 rounded-xl flex items-center justify-center mb-10 transition-all duration-300 ${item.isFirst ? 'bg-[#fabf37] text-black shadow-lg shadow-[#fabf37]/30' : 'bg-zinc-100 border border-zinc-200 text-black group-hover:bg-[#fabf37] group-hover:text-black group-hover:border-[#fabf37]'}`}>
                            <item.icon className="size-7" />
                        </div>
                        <h3 className="text-lg font-black mb-4 uppercase tracking-widest leading-tight text-black">{item.title}</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm font-semibold group-hover:text-zinc-600">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>


      {/* Application Section */}
      <section id="application-form" className="pt-24 pb-24 bg-white text-zinc-900 relative overflow-hidden z-20">
        {/* Decorative elements */}
        <motion.div 
            style={{ y: blobY }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#fabf37]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" 
        />
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col gap-16 lg:gap-24 items-center">
                <div className="lg:w-2/3 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight leading-none text-black">Become a <span className="text-[#fabf37]">Partner</span> Today</h2>
                      <p className="text-zinc-500 mb-12 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                          Ready to expand your product portfolio? Complete the application form and our partnership team will review your profile.
                      </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 relative mb-16">
                        {/* Connecting line for desktop */}
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="hidden md:block absolute top-6 left-10 right-10 h-0.5 bg-zinc-200 -z-10 origin-left" 
                        />
                        
                        {[
                            { step: 1, title: "Submit Application", desc: "Tell us about your company." },
                            { step: 2, title: "Verification", desc: "Our team verifies your details." },
                            { step: 3, title: "Onboarding", desc: "Sign agreement & get access." }
                        ].map((item, i) => (
                            <motion.div 
                              key={item.step} 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.2 }}
                              viewport={{ once: true }}
                              className="flex flex-col items-center text-center bg-white p-4 rounded-2xl md:bg-transparent"
                            >
                                <div className="size-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-lg font-bold shadow-sm shrink-0 text-black mb-4">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-black mb-1">{item.title}</h4>
                                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-4xl">
                    <motion.div 
                      variants={formVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="bg-white border border-zinc-200 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 mx-auto"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">First Name</label>
                                    <input {...register("firstName", { required: true })} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Last Name</label>
                                    <input {...register("lastName", { required: true })} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="Doe" />
                                </div>
                            </div>

                            {/* Company & Email Dynamic */}
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Company Name</label>
                                        <input {...register("company", { required: true })} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="Your Company Ltd." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Website</label>
                                        <input {...register("website")} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="https://..." />
                                    </div>
                                </div>

                                {/* Emails */}
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Email Address(es)</label>
                                    {emails.length < 3 && (
                                      <button type="button" onClick={addEmail} className="text-[10px] font-bold text-[#fabf37] hover:underline flex items-center gap-1">
                                        <Plus className="size-3" /> Add
                                      </button>
                                    )}
                                  </div>
                                  <div className="space-y-3">
                                    {emails.map((email, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <input 
                                          type="email" 
                                          required={idx === 0}
                                          value={email}
                                          onChange={(e) => updateEmail(idx, e.target.value)}
                                          placeholder={idx === 0 ? "Primary Email Address" : "Secondary Email Address"}
                                          className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs"
                                        />
                                        {idx > 0 && (
                                          <button 
                                            type="button" 
                                            onClick={() => removeEmail(idx)} 
                                            className="p-3 bg-zinc-100 rounded-xl text-zinc-500 hover:text-red-500 transition-colors border border-zinc-200"
                                          >
                                            <Trash2 className="size-4" />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                            </div>

                            {/* Contact Numbers Dynamic */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Contact Number(s)</label>
                                  {contactNumbers.length < 3 && (
                                    <button type="button" onClick={addContactNumber} className="text-[10px] font-bold text-[#fabf37] hover:underline flex items-center gap-1">
                                      <Plus className="size-3" /> Add
                                    </button>
                                  )}
                                </div>
                                
                                <div className="space-y-4">
                                  {contactNumbers.map((contact, idx) => (
                                    <div key={idx} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 relative group hover:border-zinc-300 transition-colors">
                                      {idx > 0 && (
                                        <button 
                                          type="button" 
                                          onClick={() => removeContactNumber(idx)}
                                          className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors"
                                        >
                                          <Trash2 className="size-3.5" />
                                        </button>
                                      )}
                                      <div className="space-y-4">
                                        <input 
                                          type="tel" 
                                          value={contact.number}
                                          required={idx === 0}
                                          onChange={(e) => updateContactNumber(idx, e.target.value)}
                                          placeholder={idx === 0 ? "Primary Contact Number" : "Alternative Number"}
                                          className="w-full bg-transparent border-b border-zinc-200 py-2 font-bold text-xs outline-none focus:border-[#fabf37] transition-colors text-black placeholder:text-zinc-400 pr-8"
                                        />
                                        <div className="flex flex-wrap gap-2 items-center">
                                          <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider mr-2">Available on:</span>
                                          {['WhatsApp', 'Viber', 'IMO', 'Direct Call'].map((app) => (
                                            <button
                                              key={app}
                                              type="button"
                                              onClick={() => toggleAppForContact(idx, app)}
                                              className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all ${
                                                contact.apps.includes(app) 
                                                  ? 'bg-[#fabf37] text-black border-[#fabf37]' 
                                                  : 'bg-white text-zinc-400 border-zinc-200 hover:border-black hover:text-black'
                                              }`}
                                            >
                                              {app}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                            </div>

                            {/* Social Verification */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Social Verification (Optional)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {[
                                    { icon: Facebook, placeholder: "Facebook Profile URL", name: "facebook" },
                                    { icon: Instagram, placeholder: "Instagram Handle/URL", name: "instagram" },
                                    { icon: Linkedin, placeholder: "LinkedIn Company URL", name: "linkedin" },
                                    { icon: Twitter, placeholder: "X (Twitter) Handle", name: "twitter" }
                                  ].map((social, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-zinc-50 px-3 py-3 rounded-xl border border-zinc-200 focus-within:border-[#fabf37]/50 transition-colors">
                                      <social.icon className="size-3.5 text-zinc-400" />
                                      <div className="h-3 w-[1px] bg-zinc-200" />
                                      <input 
                                        type="text"
                                        {...register(social.name)}
                                        placeholder={social.placeholder}
                                        className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-black placeholder:text-zinc-400"
                                      />
                                    </div>
                                  ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Country</label>
                                  <select {...register("country")} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black font-bold text-xs appearance-none">
                                    <option value="">Select Country</option>
                                    <option>United Kingdom</option>
                                    <option>United Arab Emirates</option>
                                    <option>Germany</option>
                                    <option>United States</option>
                                    <option>Australia</option>
                                    <option>Saudi Arabia</option>
                                    <option>Netherlands</option>
                                    <option>Bangladesh</option>
                                    <option>Other</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">City / Region</label>
                                  <input {...register("city")} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="e.g. London" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Zip / Postal Code</label>
                                  <input {...register("zip")} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="e.g. E1 6AN" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Business Type</label>
                                    <div className="relative">
                                        <select {...register("type")} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black appearance-none cursor-pointer font-bold text-xs">
                                            <option value="distributor">Distributor</option>
                                            <option value="wholesaler">Wholesaler</option>
                                            <option value="reseller">Reseller</option>
                                            <option value="consultant">Sales Consultant</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronRight className="size-4 text-zinc-500 rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products & Quantity */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Primary Product Interest</label>
                                  <div className="relative">
                                      <select {...register("productInterest")} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black appearance-none cursor-pointer font-bold text-xs">
                                        <option value="">Select Product Type</option>
                                        <optgroup label="Paper Cups & Accessories">
                                          <option>Paper Cup (All Sizes)</option>
                                          <option>Paper Cup Accessories</option>
                                        </optgroup>
                                        <optgroup label="Restaurant & Food Service">
                                          <option>Food Boxes</option>
                                          <option>Paper Bags</option>
                                          <option>Cutlery & Straws</option>
                                        </optgroup>
                                        <optgroup label="Pharma & Medical">
                                          <option>Medicine Boxes</option>
                                          <option>Prescription Pads</option>
                                        </optgroup>
                                        <optgroup label="Garments">
                                          <option>Hangtags & Labels</option>
                                          <option>Packaging Boxes</option>
                                        </optgroup>
                                      </select>
                                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                          <ChevronRight className="size-4 text-zinc-500 rotate-90" />
                                      </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Est. Monthly Volume (Units)</label>
                                  <input {...register("volume")} type="number" className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 font-bold text-xs" placeholder="e.g. 50,000" />
                                </div>
                            </div>
                            
                            {/* Certifications Checkboxes */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Required Certifications</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {[
                                    { id: 'fsc', label: 'FSC Certified' },
                                    { id: 'fda', label: 'FDA Approved' },
                                    { id: 'iso', label: 'ISO 9001/14001' },
                                    { id: 'brc', label: 'BRCGS Food' },
                                  ].map((cert) => (
                                    <label key={cert.id} className="flex items-center gap-2 p-3 border border-zinc-200 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors has-[:checked]:border-[#fabf37] has-[:checked]:bg-[#fabf37]/10 group">
                                      <input type="checkbox" {...register(`cert_${cert.id}`)} className="sr-only" />
                                      <div className="size-3.5 border border-zinc-300 rounded flex items-center justify-center group-has-[:checked]:bg-[#fabf37] group-has-[:checked]:border-[#fabf37]">
                                        <CheckCircle className="size-2.5 text-black opacity-0 group-has-[:checked]:opacity-100" />
                                      </div>
                                      <span className="text-[8px] font-black uppercase tracking-tight text-zinc-500 group-has-[:checked]:text-[#fabf37]">{cert.label}</span>
                                    </label>
                                  ))}
                                </div>
                            </div>

                            {/* Additional Info & Upload */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Additional Information / Requirements</label>
                                <textarea {...register("message")} rows={4} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-[#fabf37] focus:ring-1 focus:ring-[#fabf37] outline-none transition-all text-black placeholder:text-zinc-400 resize-none font-bold text-xs" placeholder="Tell us about your distribution network, target market, or specific requirements..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 ml-1">Company Profile / Docs (Optional)</label>
                                <div className="relative group">
                                  <div className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${attachment ? 'border-[#fabf37] bg-[#fabf37]/5' : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                                    <input 
                                      type="file" 
                                      accept=".pdf,.doc,.docx,image/*"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          setAttachment(e.target.files[0]);
                                        }
                                      }}
                                      aria-label="Attach a file (PDF, Word or image)"
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {attachment ? (
                                      <div className="flex flex-col items-center">
                                        <div className="size-10 bg-zinc-100 rounded-xl flex items-center justify-center mb-2 overflow-hidden text-[#fabf37]">
                                          <Upload className="size-5" />
                                        </div>
                                        <p className="text-[10px] font-black text-black">{attachment.name}</p>
                                        <p className="text-[8px] font-bold text-zinc-400">{(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                                        <button 
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setAttachment(null);
                                          }}
                                          className="mt-2 text-[9px] font-bold text-red-500 hover:underline z-10 relative"
                                        >
                                          Remove File
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center text-zinc-400">
                                        <Upload className="size-8 mb-3 opacity-50" />
                                        <p className="text-[10px] font-bold text-zinc-500">Click to upload or drag and drop</p>
                                        <p className="text-[8px] opacity-60">PDF, DOC, Images (Max 10MB)</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className="w-full py-5 bg-[#fabf37] text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(250,191,55,0.3)] hover:shadow-lg"
                            >
                                {isSubmitting ? "Processing..." : "Submit Application"}
                                {!isSubmitting && <ArrowRight className="size-5" />}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>
      
      {/* Top Selling Products (Auto Scroll) */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200 overflow-hidden">
        <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">Top Selling <span className="text-[#fabf37]">Products</span></h2>
            <p className="text-zinc-500 max-w-xl">High-demand packaging solutions ready for immediate wholesale distribution.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#fabf37] hover:text-black transition-colors">
            View Catalog <ArrowRight className="size-4" />
          </button>
        </div>
        
        {/* Horizontal Auto Scroll Container */}
        <div className="flex overflow-hidden relative">
          <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
             className="flex gap-6 whitespace-nowrap px-4"
          >
             {[...Array(2)].map((_, listIndex) => (
               <div key={listIndex} className="flex gap-6">
                 {[
                   { name: "Double Wall Coffee Cup", price: "Price on request", min: "Flexible", img: "https://images.unsplash.com/photo-1648587456176-4969b0124b12?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGNvZmZlZSUyMGN1cCUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3Njc2NzE4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", tag: "Best Seller" },
                   { name: "Eco Burger Box", price: "Price on request", min: "Flexible", img: "https://images.unsplash.com/photo-1652862730730-26712af6bcac?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBib3glMjBwYWNrYWdpbmd8ZW58MXx8fHwxNzY3Nzc1NDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", tag: "Trending" },
                   { name: "Kraft Shopping Bag", price: "Price on request", min: "Flexible", img: "https://images.unsplash.com/photo-1654160225308-9ccb4d1b38e3?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFmdCUyMHBhcGVyJTIwc2hvcHBpbmclMjBiYWd8ZW58MXx8fHwxNzY3Nzc1NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", tag: "Eco Friendly" },
                   { name: "Bio-Plastic Cutlery", price: "Price on request", min: "Flexible", img: "https://images.unsplash.com/photo-1711885417467-6eac5cb81607?auto=format&ixlib=rb-4.1.0&q=80&crop=entropy&cs=tinysrgb&w=1080&fit=max", tag: "New" },
                   { name: "Corrugated Pizza Box", price: "Price on request", min: "Flexible", img: "https://images.unsplash.com/photo-1689793600363-31a3eb87b462?auto=format&ixlib=rb-4.1.0&q=80&crop=entropy&cs=tinysrgb&w=1080&fit=max", tag: "Hot" }
                 ].map((product, i) => (
                   <div 
                     key={i}
                     className="min-w-[280px] md:min-w-[320px] bg-white rounded-3xl p-4 border border-zinc-100 hover:border-[#fabf37] transition-all group shadow-sm hover:shadow-xl hover:-translate-y-2 whitespace-normal"
                   >
                     <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                       <ImageWithFallback src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                         {product.tag}
                       </div>
                     </div>
                     <div className="px-2">
                       <h3 className="font-bold text-lg text-black mb-2">{product.name}</h3>
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex flex-col">
                           <span className="text-[10px] text-zinc-400 uppercase font-bold">Price</span>
                           <span className="text-[#fabf37] font-black text-lg">{product.price}</span>
                         </div>
                         <div className="flex flex-col text-right">
                           <span className="text-[10px] text-zinc-400 uppercase font-bold">MOQ</span>
                           <span className="text-zinc-900 font-bold">{product.min}</span>
                         </div>
                       </div>
                       <button className="w-full py-3 rounded-xl bg-zinc-100 text-black font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                         <ShoppingBag className="size-4" /> Add to Inquiry
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Trust Strip */}
      <section className="py-12 bg-white border-t border-zinc-100">
          <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40">
                   {[
                      { icon: ShieldCheck, text: "SECURE PARTNERSHIP" },
                      { icon: Globe, text: "EXPORT READY" },
                      { icon: Award, text: "QUALITY CHECKED" }
                   ].map((item, i) => (
                       <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2"
                       >
                          <item.icon className="size-6 text-zinc-400" />
                          <span className="font-bold text-sm text-zinc-400">{item.text}</span>
                       </motion.div>
                   ))}
              </div>
          </div>
      </section>

      {/* Social Media Auto Scroll */}
      <div className="py-6 bg-black text-[#fabf37] overflow-hidden border-t border-zinc-800">
        <motion.div 
           animate={{ x: ["0%", "-50%"] }}
           transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
           className="flex whitespace-nowrap gap-12 items-center"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 text-sm md:text-base font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-3"><Instagram className="size-5" /> Follow on Instagram</span>
              <Star className="size-4 text-white/20" />
              <span className="flex items-center gap-3"><Facebook className="size-5" /> Like on Facebook</span>
              <Star className="size-4 text-white/20" />
              <span className="flex items-center gap-3"><Linkedin className="size-5" /> Connect on LinkedIn</span>
              <Star className="size-4 text-white/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
