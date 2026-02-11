import { FormEvent, useState } from 'react';
import { ViewContainer } from "../ViewContainer";
import { Search, Filter, Mail, User, Phone, Globe, Calendar, Clock, Edit, Lock, MoreHorizontal, MessageSquare, Plus, Trash2, Check, Bell } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const initialLeads = [
  { 
    id: "LEAD-2024-001", 
    name: "TechFlow Systems", 
    contact: "John Doe", 
    email: "john@techflow.com", 
    phone: "+1 (555) 0123-4567",
    source: "Website",
    status: "Active", 
    lastActive: "2h ago",
    notes: "Interested in bulk kraft paper bags.",
    credentials: { hasAccess: true, role: "Client" }
  },
  { 
    id: "LEAD-2024-002", 
    name: "Green Leaf Cafe", 
    contact: "Sarah Smith", 
    email: "sarah@greenleaf.io", 
    phone: "+44 20 7123 4567",
    source: "LinkedIn",
    status: "Negotiation", 
    lastActive: "1d ago",
    notes: "Requested sample pack for double wall cups.",
    credentials: { hasAccess: false, role: "Guest" }
  },
  { 
    id: "LEAD-2024-003", 
    name: "Urban Brew Co.", 
    contact: "Mike Ross", 
    email: "mike@urbanbrew.co", 
    phone: "+1 (555) 9876-5432",
    source: "Website",
    status: "New", 
    lastActive: "5m ago",
    notes: "Just signed up via form.",
    credentials: { hasAccess: false, role: "Guest" }
  },
];

export function LeadManagementView() {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  
  // Modal States
  const [isManageAccountOpen, setIsManageAccountOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === "All" || lead.status === filter;
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                          lead.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateCredentials = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    // Simulate API call
    setTimeout(() => {
       setLeads(prev => prev.map(l => l.id === selectedLead.id ? { 
           ...l, 
           email: email,
           credentials: { ...l.credentials, hasAccess: true } 
       } : l));
       
       toast.success("Credentials Updated", { description: `Access granted for ${email}` });
       setIsManageAccountOpen(false);
    }, 800);
  };

  const handleAddReminder = (e: FormEvent) => {
      e.preventDefault();
      toast.success("Reminder Set", { description: "You will be notified at the scheduled time." });
      setIsReminderOpen(false);
  };

  return (
    <ViewContainer title="Lead Management" subtitle="Track & Manage Potential Clients">
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Leads</p>
               <p className="text-2xl font-black text-white">{leads.length}</p>
            </div>
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
               <User className="size-5" />
            </div>
         </div>
         <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Website Generated</p>
               <p className="text-2xl font-black text-white">{leads.filter(l => l.source === 'Website').length}</p>
            </div>
            <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
               <Globe className="size-5" />
            </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5 mb-6">
         <div className="relative w-full md:w-auto flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <input 
               type="text" 
               placeholder="Search leads..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#fabf37]"
            />
         </div>
         <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            {["All", "New", "Active", "Negotiation", "Closed"].map((f) => (
               <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${
                     filter === f ? "bg-[#fabf37] text-black" : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
               >
                  {f}
               </button>
            ))}
         </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
         <AnimatePresence>
            {filteredLeads.map((lead) => (
               <motion.div 
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-black border border-white/5 rounded-3xl p-6 group hover:border-[#fabf37]/30 transition-all relative overflow-hidden"
               >
                  {/* Website Badge */}
                  {lead.source === "Website" && (
                     <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#fabf37]/10 text-[#fabf37] text-[9px] font-black uppercase tracking-widest rounded-bl-2xl border-l border-b border-[#fabf37]/20">
                        Generated from Website
                     </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-black text-lg border border-white/10">
                           {lead.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                              {lead.name}
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                                 lead.status === 'New' ? 'bg-blue-500/10 text-blue-500' : 
                                 lead.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                                 'bg-zinc-800 text-zinc-400'
                              }`}>{lead.status}</span>
                           </h4>
                           <div className="flex flex-wrap items-center gap-4 mt-1">
                              <p className="text-xs text-zinc-500 flex items-center gap-1.5"><User className="size-3" /> {lead.contact}</p>
                              <p className="text-xs text-zinc-500 flex items-center gap-1.5"><Mail className="size-3" /> {lead.email}</p>
                              <p className="text-xs text-zinc-500 flex items-center gap-1.5"><Phone className="size-3" /> {lead.phone}</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                        <button 
                           onClick={() => { setSelectedLead(lead); setIsReminderOpen(true); }}
                           className="size-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#fabf37] hover:border-[#fabf37]/50 transition-all"
                           title="Set Reminder"
                        >
                           <Bell className="size-4" />
                        </button>
                        
                        <button 
                           onClick={() => { setSelectedLead(lead); setIsManageAccountOpen(true); }}
                           className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                              lead.credentials.hasAccess 
                                 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20" 
                                 : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                           }`}
                        >
                           {lead.credentials.hasAccess ? <Lock className="size-3" /> : <Edit className="size-3" />}
                           {lead.credentials.hasAccess ? "Manage Access" : "Set Credentials"}
                        </button>

                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <button className="size-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                                 <MoreHorizontal className="size-4" />
                              </button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="w-48 bg-black border border-white/10 text-white z-50">
                              <DropdownMenuItem className="text-xs cursor-pointer"><MessageSquare className="size-3.5 mr-2" /> Send Message</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs cursor-pointer"><Edit className="size-3.5 mr-2" /> Edit Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs text-red-500 cursor-pointer hover:bg-red-500/10"><Trash2 className="size-3.5 mr-2" /> Delete Lead</DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Manage Account Modal */}
      <AnimatePresence>
         {isManageAccountOpen && selectedLead && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={() => setIsManageAccountOpen(false)}
               />
               <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-md bg-zinc-900 rounded-[32px] p-8 border border-white/10 shadow-2xl"
               >
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Client Portal Access</h3>
                  <p className="text-xs text-zinc-500 mb-6">Set up or update login credentials for {selectedLead.name}.</p>
                  
                  <form onSubmit={handleUpdateCredentials} className="space-y-4">
                     <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Login Email</label>
                        <input type="email" name="email" defaultValue={selectedLead.email} required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#fabf37] outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">New Password</label>
                        <input type="password" name="password" placeholder="••••••••" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#fabf37] outline-none" />
                     </div>
                     <div className="flex gap-3 mt-6">
                        <button type="button" onClick={() => setIsManageAccountOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-zinc-400 text-xs font-black uppercase tracking-widest hover:bg-white/10">Cancel</button>
                        <button type="submit" className="flex-1 py-3 rounded-xl bg-[#fabf37] text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">Save Access</button>
                     </div>
                  </form>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Reminder Modal */}
      <AnimatePresence>
         {isReminderOpen && selectedLead && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={() => setIsReminderOpen(false)}
               />
               <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-sm bg-zinc-900 rounded-[32px] p-8 border border-white/10 shadow-2xl"
               >
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2"><Bell className="size-5 text-[#fabf37]" /> Set Reminder</h3>
                  <p className="text-xs text-zinc-500 mb-6">Schedule a follow-up for {selectedLead.name}.</p>
                  
                  <form onSubmit={handleAddReminder} className="space-y-4">
                     <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Date</label>
                        <input type="date" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#fabf37] outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Time</label>
                        <input type="time" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#fabf37] outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Note</label>
                        <textarea placeholder="e.g. Call regarding bulk order..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#fabf37] outline-none min-h-[80px]" />
                     </div>
                     <div className="flex gap-3 mt-6">
                        <button type="button" onClick={() => setIsReminderOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-zinc-400 text-xs font-black uppercase tracking-widest hover:bg-white/10">Cancel</button>
                        <button type="submit" className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors">Set Alarm</button>
                     </div>
                  </form>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </ViewContainer>
  );
}