import React from "react";
import { motion } from "motion/react";
import { 
  Package, CircleCheck, Factory, 
  Truck, Search, Activity, Cpu, 
  ShieldCheck, ArrowLeft, Download, 
  Layers, MapPin, Calendar, Clock,
  User, Shield, Leaf, ChartBar,
  Facebook, Instagram, Linkedin, Share2,
  Sparkles, Award, Globe, Zap,
  Settings, Database, FileText, Info,
  TrendingUp, MousePointer2, Youtube,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function ProductJourneyPage({ onBack }: { onBack?: () => void }) {
  const chartData = [
    { time: '00:00', consistency: 98.2 },
    { time: '04:00', consistency: 99.1 },
    { time: '08:00', consistency: 97.8 },
    { time: '12:00', consistency: 99.5 },
    { time: '16:00', consistency: 99.2 },
    { time: '20:00', consistency: 98.9 },
    { time: '24:00', consistency: 99.8 },
  ];

  const factoryPosts = [
    {
      id: 1,
      title: "New Heidelberg Unit 4 Installation Live!",
      date: "Dec 15, 2025",
      image: "https://images.unsplash.com/photo-1721745250213-c3e1a2f4eeeb?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMHdvcmtlcnMlMjBwYXBlciUyMG1hbnVmYWN0dXJpbmclMjBtYWNoaW5lfGVufDF8fHx8MTc2NjMyMTMxOXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Infrastructure",
      likes: "1.2k",
      platform: <Youtube className="size-4" />,
      platformName: "YouTube"
    },
    {
      id: 2,
      title: "Sustainability Milestone: 95% Waste Recycled",
      date: "Dec 10, 2025",
      image: "https://images.unsplash.com/photo-1705592579405-0d59931c8e00?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMHBhY2thZ2luZyUyMHN1c3RhaW5hYmlsaXR5JTIwZWNvJTIwZnJpZW5kbHklMjBmYWN0b3J5fGVufDF8fHx8MTc2NjMyMTMyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Eco-News",
      likes: "2.4k",
      platform: <Instagram className="size-4" />,
      platformName: "Instagram"
    },
    {
      id: 3,
      title: "How we achieve zero-defect in Paperware",
      date: "Dec 05, 2025",
      image: "https://images.unsplash.com/photo-1730705788367-dbd288c40ee7?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwdGVjaCUyMHF1YWxpdHklMjBjb250cm9sJTIwbGFib3JhdG9yeSUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzY2MzIxMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Innovation",
      likes: "890",
      platform: <Linkedin className="size-4" />,
      platformName: "LinkedIn"
    },
    {
      id: 4,
      title: "Meet our Quality Assurance Team #Paperware",
      date: "Nov 28, 2025",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
      category: "Culture",
      likes: "1.5k",
      platform: <Facebook className="size-4" />,
      platformName: "Facebook"
    }
  ];

  const journey = [
    { 
      status: "Raw Material Sourced", 
      time: "Oct 12, 09:24 AM", 
      location: "Stock Yard A", 
      desc: "Premium 300GSM Food Grade board sourced and verified.",
      icon: <Layers className="size-6" />,
      completed: true,
      verifiedBy: "Zakir H. (Quality Inspector)",
      unit: "Material Dept."
    },
    { 
      status: "Design & CTP", 
      time: "Oct 12, 02:15 PM", 
      location: "Pre-Press Unit", 
      desc: "Digital proof approved. Aluminum plates generated for printing.",
      icon: <Cpu className="size-6" />,
      completed: true,
      verifiedBy: "Rumana A. (Lead Designer)",
      unit: "Pre-Press Hub"
    },
    { 
      status: "Printing Phase", 
      time: "Oct 13, 10:00 AM", 
      location: "Heidelberg Unit 4", 
      desc: "4-Color process with aqueous coating applied.",
      icon: <Activity className="size-6" />,
      completed: true,
      verifiedBy: "Majedur R. (Master Printer)",
      unit: "Offset Unit"
    },
    { 
      status: "Die-Cutting & Finishing", 
      time: "Oct 14, 11:30 AM", 
      location: "Finishing Floor", 
      desc: "Precision die-cutting and automated folding completed.",
      icon: <Factory className="size-6" />,
      completed: true,
      verifiedBy: "Kamrul I. (Finishing Lead)",
      unit: "Post-Press Unit"
    },
    { 
      status: "AI Quality Control", 
      time: "Oct 14, 04:45 PM", 
      location: "QC Lab", 
      desc: "100% automated visual inspection. Zero defects detected.",
      icon: <ShieldCheck className="size-6" />,
      completed: true,
      verifiedBy: "AI Vision System v4.2",
      unit: "Lab-Alpha"
    },
    { 
      status: "Packaging & Labelling", 
      time: "Oct 15, 09:00 AM", 
      location: "Dispatch Hub", 
      desc: "Bulk packed in eco-friendly corrugated boxes.",
      icon: <Package className="size-6" />,
      completed: true,
      verifiedBy: "Saiful K. (Logistics Officer)",
      unit: "Dispatch"
    },
    { 
      status: "In Transit", 
      time: "Oct 15, 01:20 PM", 
      location: "En-Route", 
      desc: "Handed over to logistics partner for delivery.",
      icon: <Truck className="size-6" />,
      completed: false,
      verifiedBy: "System (Auto)",
      unit: "Third-Party"
    }
  ];

  const handleShare = (platform: string) => {
    const text = "Checking out the manufacturing journey of my Paperware products! #Traceability #EcoFriendly #Paperware";
    const url = window.location.href;
    
    switch(platform) {
      case 'fb': window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank'); break;
      case 'li': window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank'); break;
      case 'insta': alert("Ready for Story! Capture and tag @PaperwareFactory"); break;
    }
  };

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-20 font-['Poppins',sans-serif]">
      <section className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
            >
              <ArrowLeft className="size-4" /> Back to Tracking
            </button>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 mb-2">
                <Shield className="size-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Authenticated Batch</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[rgb(0,0,0)]">Product <br /><span className="text-[#fabf37]">Traceability</span></h1>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-zinc-500 font-bold text-lg">Batch ID: #PW-88291-EXP</p>
                <div className="h-4 w-px bg-zinc-200 hidden md:block" />
                <p className="text-zinc-400 font-bold text-sm">Manufacturing Unit: Unit-4 (Dhaka)</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-black/5 shadow-sm">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 ml-4 mr-2">Share Journey:</span>
              <button onClick={() => handleShare('fb')} className="size-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"><Facebook className="size-4" /></button>
              <button onClick={() => handleShare('insta')} className="size-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"><Instagram className="size-4" /></button>
              <button onClick={() => handleShare('li')} className="size-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"><Linkedin className="size-4" /></button>
              <button className="size-10 rounded-full bg-[#fabf37] text-black flex items-center justify-center hover:scale-110 transition-all"><Share2 className="size-4" /></button>
            </div>
            <button className="bg-black text-[#fabf37] px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl">
              <Download className="size-4" /> PDF Report
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          {/* Product Overview Card & Advanced Analytics */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black rounded-[40px] p-10 text-white space-y-8 sticky top-32">
              <div className="size-20 bg-[#fabf37] rounded-3xl flex items-center justify-center text-black">
                <Package className="size-10" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Premium Paper Cup</h2>
                <p className="text-zinc-500 font-bold italic">"Crafted with 100% Biodegradable Cellulose"</p>
              </div>

              {/* Manufacturer Spotlight */}
              <div className="p-6 bg-zinc-900 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                    <User className="size-6 text-[#fabf37]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Master Printer</p>
                    <p className="font-black text-white">Majedur Rahman</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  <Award className="size-3" /> 15 Years of Experience
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 uppercase font-black tracking-widest">Production Unit</span>
                  <span className="font-black">Heidelberg Offset Hub</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 uppercase font-black tracking-widest">QC Lead</span>
                  <span className="font-black">Rumana Ahmed</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 uppercase font-black tracking-widest">Shift</span>
                  <span className="font-black">Morning (06:00 - 14:00)</span>
                </div>
              </div>

              {/* Sustainability Score Card */}
              <div className="bg-[#fabf37] p-8 rounded-[35px] text-black space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Sustainability Score</p>
                      <p className="font-black text-3xl">9.4/10</p>
                    </div>
                    <Leaf className="size-8" />
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                       <span>Carbon Footprint</span>
                       <span>Low Impact</span>
                    </div>
                    <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                       <div className="h-full bg-black rounded-full w-[94%]" />
                    </div>
                 </div>
              </div>

              {/* Batch Certificate Placeholder */}
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center gap-4 text-emerald-500">
                <ShieldCheck className="size-8" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">Compliance Status</p>
                  <p className="font-black text-sm">ISO 9001:2015 Verified</p>
                </div>
              </div>

              {/* NEW: Machine Health Matrix */}
              <div className="p-8 bg-zinc-900 rounded-[35px] border border-white/5 space-y-6">
                 <div className="flex items-center gap-2">
                    <Settings className="size-4 text-[#fabf37] animate-spin-slow" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Machine Health Matrix</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Temperature</p>
                       <p className="text-lg font-black text-white">42.5°C</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Speed (RPM)</p>
                       <p className="text-lg font-black text-white">1,240</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Pressure</p>
                       <p className="text-lg font-black text-white">8.2 Bar</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Vibration</p>
                       <p className="text-lg font-black text-emerald-400">Nominal</p>
                    </div>
                 </div>
              </div>

              {/* NEW: Batch Consistency Graph */}
              <div className="bg-black rounded-[40px] p-10 text-white space-y-8">
                 <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Quality Analytics</p>
                      <h3 className="text-xl font-black uppercase tracking-tight">Batch Consistency</h3>
                    </div>
                    <TrendingUp className="size-6 text-emerald-500" />
                 </div>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#fabf37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                          itemStyle={{ color: '#fabf37' }}
                        />
                        <Area type="monotone" dataKey="consistency" stroke="#fabf37" fillOpacity={1} fill="url(#colorCons)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 p-4 rounded-2xl">
                    <Info className="size-3" /> Data aggregated from 14,000+ sensor nodes.
                 </div>
              </div>
            </div>

            {/* NEW: Materials Provenance Card */}
            <div className="bg-white rounded-[40px] p-10 border border-black/5 space-y-8">
               <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center">
                    <Globe className="size-6 text-black" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Materials Provenance</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="size-2 bg-[#fabf37] rounded-full mt-2" />
                     <div className="flex-1 border-b border-zinc-50 pb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Raw Pulp Source</p>
                        <p className="font-bold text-sm">FSC Certified Scandinavian Forests</p>
                        <p className="text-[10px] text-zinc-400 font-medium">Batch #FS-2210-91</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="size-2 bg-black rounded-full mt-2" />
                     <div className="flex-1 border-b border-zinc-50 pb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Eco-Inks</p>
                        <p className="font-bold text-sm">Soy-Based Pigments (German Tech)</p>
                        <p className="text-[10px] text-zinc-400 font-medium">Non-Toxic / Food Grade</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="size-2 bg-emerald-500 rounded-full mt-2" />
                     <div className="flex-1">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Adhesive</p>
                        <p className="font-bold text-sm">Water-Soluble Corn Starch</p>
                        <p className="text-[10px] text-zinc-400 font-medium">100% Biodegradable</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Timeline & Worker Log */}
          <div className="lg:col-span-8 space-y-12">
            {/* Stats Overview */}
            <div className="mb-12 bg-white p-8 rounded-[40px] border border-black/5 flex flex-wrap items-center gap-8 md:gap-16">
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Production Time</p>
                  <p className="text-xl font-black">72.4 Hours</p>
               </div>
               <div className="h-8 w-px bg-zinc-100 hidden md:block" />
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">QC Pass Rate</p>
                  <p className="text-xl font-black text-emerald-600">99.98%</p>
               </div>
               <div className="h-8 w-px bg-zinc-100 hidden md:block" />
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Factory Load</p>
                  <p className="text-xl font-black text-[#fabf37]">Optimal</p>
               </div>
               <div className="h-8 w-px bg-zinc-100 hidden md:block" />
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Global Ranking</p>
                  <div className="flex items-center gap-2">
                    <ChartBar className="size-4" />
                    <p className="text-xl font-black">Top 1%</p>
                  </div>
               </div>
            </div>

            <div className="space-y-12 pl-4 md:pl-12 border-l-2 border-zinc-100 relative">
              {journey.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[54px] md:-left-[70px] top-0 size-10 md:size-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg transition-all ${item.completed ? 'bg-black text-[#fabf37]' : 'bg-zinc-100 text-zinc-400'}`}>
                    {item.icon}
                  </div>

                  <div className={`p-8 md:p-10 rounded-[40px] border transition-all ${item.completed ? 'bg-white border-black/5 hover:border-[#fabf37] hover:shadow-xl' : 'bg-white border-dashed border-zinc-200 opacity-60'}`}>
                    <div className="space-y-6">
                      {/* Title with Sparkle */}
                      <div className="flex items-center gap-2">
                        <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${item.completed ? 'text-black' : 'text-zinc-400'}`}>
                          {item.status}
                        </h4>
                        {item.completed && <Sparkles className="size-5 text-[#fabf37]" />}
                      </div>

                      {/* Time and Location */}
                      <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-400">
                        <span className="flex items-center gap-2"><Calendar className="size-4 text-zinc-300" /> {item.time}</span>
                        <span className="flex items-center gap-2 text-black"><MapPin className="size-4" /> {item.location}</span>
                      </div>

                      {/* Verified By */}
                      <div className="flex items-center gap-2 text-emerald-600 text-sm font-black uppercase">
                        <User className="size-4" /> {item.verifiedBy}
                      </div>

                      {/* Unit Badge */}
                      {item.completed && (
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#fabf37] rounded-full text-xs font-black uppercase tracking-widest">
                          <ShieldCheck className="size-4" /> {item.unit}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-zinc-500 font-bold text-base leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Footer Actions */}
                      {item.completed && (
                        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                            <Activity className="size-4" /> Real-time Node Logs Verified
                          </div>
                          <button className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-black transition-colors flex items-center gap-2">
                            View Machine Data <ChevronRight className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FACTORY PULSE - MOVED TO MIDDLE (FULL WIDTH SECTION) */}
        <div className="mt-32 pt-20 border-t border-zinc-100">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div className="space-y-4">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#fabf37]">Digital Factory Hub</p>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Factory <span className="text-zinc-300">Pulse</span></h2>
              </div>
              <div className="flex gap-4">
                 <button className="size-16 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm group">
                    <ChevronLeft className="size-6 group-hover:scale-110 transition-transform" />
                 </button>
                 <button className="size-16 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm group">
                    <ChevronRight className="size-6 group-hover:scale-110 transition-transform" />
                 </button>
              </div>
           </div>

           <div className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {factoryPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  whileHover={{ y: -15 }}
                  className="min-w-[340px] md:min-w-[500px] bg-white rounded-[60px] border border-black/5 overflow-hidden snap-start group shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                   <div className="relative h-72 overflow-hidden">
                      <ImageWithFallback 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                      />
                      <div className="absolute top-8 left-8 flex gap-3">
                        <div className="px-5 py-2.5 bg-black text-[#fabf37] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                           {post.category}
                        </div>
                        <div className="size-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-black">
                           {post.platform}
                        </div>
                      </div>
                   </div>
                   <div className="p-12 space-y-6">
                      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{post.date} • {post.platformName}</p>
                      <h3 className="text-3xl font-black uppercase tracking-tight leading-tight group-hover:text-black transition-colors">{post.title}</h3>
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                         <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                               {[1,2,3].map(i => (
                                  <div key={i} className="size-8 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center overflow-hidden">
                                     <User className="size-4 text-zinc-400" />
                                  </div>
                               ))}
                            </div>
                            <p className="text-[11px] font-black text-zinc-400">{post.likes} Engagements</p>
                         </div>
                         <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group/btn">
                            Read Post <ChevronRight className="size-4 text-[#fabf37]" />
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* TRUST IN EVERY FIBER - MOVED TO MIDDLE & STYLED AS PER IMAGE - Removed as per user request */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 md:p-32 bg-[#fabf37] rounded-[80px] text-black text-center space-y-10 relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
              <Shield className="size-96" />
           </div>

           <div className="relative z-10 space-y-8">
             <h3 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">Trust in every <br />Fiber.</h3>
             <p className="text-lg md:text-xl font-bold opacity-70 max-w-2xl mx-auto leading-relaxed">
                This batch was manufactured following the highest global sustainability and ethical standards. 
                Every fiber tells a story of integrity and responsibility.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
               <button 
                 onClick={() => handleShare('li')}
                 className="w-full sm:w-auto bg-black text-[#fabf37] px-12 py-7 rounded-full font-black uppercase tracking-widest text-[12px] hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl"
               >
                 <Share2 className="size-5" /> Share This Integrity Report
               </button>
               <button className="w-full sm:w-auto bg-white/20 backdrop-blur-md border border-black/5 text-black px-12 py-7 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-white transition-all flex items-center justify-center gap-4">
                 <Download className="size-5" /> Detailed Compliance PDF
               </button>
             </div>
           </div>
        </motion.div> */}
      </section>
    </div>
  );
}