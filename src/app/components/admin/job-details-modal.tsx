import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  FileText, 
  Users, 
  CheckCircle2, 
  MoreHorizontal,
  Trash2,
  Edit2,
  Sparkles,
  Bot,
  Zap,
  Target,
  Loader
} from "lucide-react";
import { toast } from "sonner";

interface JobDetailsModalProps {
  job: any;
  onClose: () => void;
  onUpdate: (updatedJob: any) => void;
  onDelete: (jobId: string) => void;
}

export function JobDetailsModal({ job, onClose, onUpdate, onDelete }: JobDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState(job);
  const [activeTab, setActiveTab] = useState<'details' | 'ai'>('details');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);

  // Reset edited job when job prop changes
  useEffect(() => {
    setEditedJob(job);
    setIsEditing(false);
    setActiveTab('details');
    setGeneratedQuestions([]);
  }, [job]);

  if (!job) return null;

  const handleSave = () => {
    onUpdate(editedJob);
    setIsEditing(false);
    toast.success("Job posting updated successfully");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      onDelete(job.id);
      onClose();
    }
  };

  const handleGenerateQuestions = () => {
    setIsGeneratingQuestions(true);
    // Simulate AI delay
    setTimeout(() => {
      setGeneratedQuestions([
        "Can you describe a challenging project you managed and how you overcame obstacles?",
        "How do you stay updated with the latest industry trends and technologies?",
        "Describe your experience with cross-functional collaboration.",
        "What is your approach to prioritizing tasks when dealing with tight deadlines?",
        "How would you handle a disagreement with a senior stakeholder?"
      ]);
      setIsGeneratingQuestions(false);
      toast.success("Interview questions generated!");
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-3xl max-h-[85vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-zinc-900/50 p-8 border-b border-white/10 flex items-start justify-between shrink-0">
            <div className="flex items-center gap-6">
              <div className="size-16 rounded-2xl bg-[#fabf37] flex items-center justify-center text-3xl font-black text-black shadow-[0_0_20px_rgba(250,191,55,0.2)]">
                {job.title.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{job.title}</h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    job.status === 'Draft' ? 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20' :
                    'bg-[#fabf37]/10 text-[#fabf37] border-[#fabf37]/20'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="size-3" /> {job.department} • <span className="text-zinc-400">{job.id}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               {!isEditing ? (
                 <>
                   <button 
                     onClick={() => setIsEditing(true)}
                     className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                     title="Edit"
                   >
                     <Edit2 className="size-5" />
                   </button>
                   <button 
                     onClick={handleDelete}
                     className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                     title="Delete"
                   >
                     <Trash2 className="size-5" />
                   </button>
                 </>
               ) : (
                 <button 
                   onClick={() => setIsEditing(false)}
                   className="px-4 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-700 transition-colors"
                 >
                   Cancel
                 </button>
               )}
               <button 
                 onClick={onClose}
                 className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors ml-2"
               >
                 <X className="size-6" />
               </button>
            </div>
          </div>

          {/* Tabs (Only visible when not editing) */}
          {!isEditing && (
             <div className="flex items-center gap-8 px-8 border-b border-white/10 shrink-0">
               <button 
                 onClick={() => setActiveTab('details')}
                 className={`py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-b-[2px] transition-colors ${
                   activeTab === 'details' 
                     ? 'border-[#fabf37] text-white' 
                     : 'border-transparent text-zinc-500 hover:text-white'
                 }`}
               >
                 <FileText className="size-4" /> Overview
               </button>
               <button 
                 onClick={() => setActiveTab('ai')}
                 className={`py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-b-[2px] transition-colors ${
                   activeTab === 'ai' 
                     ? 'border-purple-500 text-purple-400' 
                     : 'border-transparent text-zinc-500 hover:text-purple-400'
                 }`}
               >
                 <Sparkles className="size-4" /> AI Assistant
               </button>
             </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-20">
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                    <Edit2 className="size-3" /> Edit Job Details
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Job Title</label>
                      <input 
                        type="text" 
                        value={editedJob.title}
                        onChange={(e) => setEditedJob({...editedJob, title: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Department</label>
                      <select 
                        value={editedJob.department}
                        onChange={(e) => setEditedJob({...editedJob, department: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none"
                      >
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Product</option>
                        <option>Operations</option>
                      </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Status</label>
                        <select 
                          value={editedJob.status}
                          onChange={(e) => setEditedJob({...editedJob, status: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none"
                        >
                          <option>Active</option>
                          <option>Reviewing</option>
                          <option>Draft</option>
                          <option>Closed</option>
                        </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Location</label>
                       <input 
                         type="text" 
                         value={editedJob.location}
                         onChange={(e) => setEditedJob({...editedJob, location: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Salary</label>
                       <input 
                         type="text" 
                         value={editedJob.salary}
                         onChange={(e) => setEditedJob({...editedJob, salary: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors"
                       />
                     </div>
                  </div>

                  <div>
                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Description</label>
                     <textarea 
                       rows={6}
                       value={editedJob.description}
                       onChange={(e) => setEditedJob({...editedJob, description: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors resize-none"
                     />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                   <button 
                     onClick={handleSave}
                     className="px-8 py-3 bg-[#fabf37] hover:bg-[#fabf37]/90 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(250,191,55,0.2)]"
                   >
                     Save Changes
                   </button>
                </div>
              </div>
            ) : (
              // View Mode Content
              <>
                {activeTab === 'details' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Main Info */}
                     <div className="md:col-span-2 space-y-8">
                        <div className="space-y-4">
                           <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                             <FileText className="size-3" /> Job Description
                           </h4>
                           <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
                              {job.description || "No description provided for this job posting."}
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5">
                              <div className="flex items-center gap-3 mb-2">
                                 <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                    <Users className="size-4" />
                                 </div>
                                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Applicants</p>
                              </div>
                              <p className="text-2xl font-black text-white">{job.applicants}</p>
                              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                                 <div className="bg-blue-500 h-full w-[65%]" />
                              </div>
                              <p className="text-[10px] text-zinc-500 mt-2">Top 5% of industry average</p>
                           </div>

                           <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5">
                              <div className="flex items-center gap-3 mb-2">
                                 <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                                    <CheckCircle2 className="size-4" />
                                 </div>
                                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Interviews</p>
                              </div>
                              <p className="text-2xl font-black text-white">8</p>
                              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                                 <div className="bg-emerald-500 h-full w-[30%]" />
                              </div>
                              <p className="text-[10px] text-zinc-500 mt-2">3 scheduled for tomorrow</p>
                           </div>
                        </div>
                     </div>

                     {/* Sidebar Info */}
                     <div className="space-y-6">
                        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 space-y-4">
                           <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">At a Glance</h4>
                           
                           <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                 <MapPin className="size-4 text-zinc-600" />
                                 <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Location</p>
                                    <p className="text-xs font-bold text-white">{job.location}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <Clock className="size-4 text-zinc-600" />
                                 <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Type</p>
                                    <p className="text-xs font-bold text-white">{job.type}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <DollarSign className="size-4 text-zinc-600" />
                                 <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Salary</p>
                                    <p className="text-xs font-bold text-white">{job.salary}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <Clock className="size-4 text-zinc-600" />
                                 <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Posted</p>
                                    <p className="text-xs font-bold text-white">{job.postedAt}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-white/5">
                           <Users className="size-4" /> View Candidates
                        </button>
                     </div>
                  </div>
                ) : (
                  // AI Assistant Content
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Market Analysis Card */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-zinc-900 border border-purple-500/20 p-6 rounded-2xl">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-purple-500 rounded-xl shadow-lg shadow-purple-500/20">
                             <Bot className="size-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-tight">AI Market Analysis</h4>
                            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Based on current industry data</p>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                           <span className="text-xs font-black text-purple-400">95% Match Score</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <p className="text-xs text-zinc-400 leading-relaxed">
                             This job posting is highly competitive. The salary range <span className="text-white font-bold">{job.salary}</span> is <span className="text-emerald-500 font-bold">12% above market average</span> for {job.location}.
                           </p>
                           <p className="text-xs text-zinc-400 leading-relaxed">
                             <strong className="text-white">Suggestion:</strong> Adding "Remote flexibility" to benefits could increase applicant volume by ~25%.
                           </p>
                        </div>
                        <div className="space-y-3">
                           <div>
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                 <span className="text-zinc-500">Salary Competitiveness</span>
                                 <span className="text-emerald-500">High</span>
                              </div>
                              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500 w-[85%]" />
                              </div>
                           </div>
                           <div>
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                 <span className="text-zinc-500">Demand Score</span>
                                 <span className="text-purple-500">Very High</span>
                              </div>
                              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-purple-500 w-[92%]" />
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Interview Kit Generator */}
                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                       <div className="flex items-center justify-between mb-6">
                          <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                             <Target className="size-4 text-[#fabf37]" /> Smart Interview Kit
                          </h4>
                          {!generatedQuestions.length && !isGeneratingQuestions && (
                            <button 
                              onClick={handleGenerateQuestions}
                              className="px-4 py-2 bg-[#fabf37] hover:bg-[#fabf37]/90 text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(250,191,55,0.15)]"
                            >
                               <Sparkles className="size-3" /> Generate Questions
                            </button>
                          )}
                       </div>

                       {isGeneratingQuestions ? (
                          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                             <Loader className="size-6 text-[#fabf37] animate-spin" />
                             <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Analyzing job requirements...</p>
                          </div>
                       ) : generatedQuestions.length > 0 ? (
                          <div className="space-y-3">
                             {generatedQuestions.map((q, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="p-4 bg-black/40 border border-white/5 rounded-xl flex gap-4 hover:border-white/10 transition-colors group"
                                >
                                   <div className="size-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 group-hover:bg-[#fabf37] group-hover:text-black transition-colors shrink-0">
                                      {i + 1}
                                   </div>
                                   <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">{q}</p>
                                </motion.div>
                             ))}
                             <div className="pt-2 flex justify-end">
                                <button 
                                  onClick={handleGenerateQuestions} 
                                  className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors"
                                >
                                   <Zap className="size-3" /> Regenerate
                                </button>
                             </div>
                          </div>
                       ) : (
                          <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-xl">
                             <p className="text-xs text-zinc-500">Click generate to get AI-suggested interview questions tailored to this role.</p>
                          </div>
                       )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}