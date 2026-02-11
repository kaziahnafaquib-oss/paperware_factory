import { FormEvent, useState } from 'react';
import { ViewContainer } from "../ViewContainer";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Sparkles,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { JobDetailsModal } from "../job-details-modal";

// Mock data for jobs
const initialJobs = [
  {
    id: "JOB-2024-001",
    title: "Senior Product Designer",
    department: "Design",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    salary: "$120k - $160k",
    applicants: 45,
    status: "Active",
    postedAt: "2 days ago",
    description: "We are looking for an experienced Senior Product Designer to join our Design team. The ideal candidate will have a strong background in UX/UI and a passion for creating intuitive, user-centric designs.\n\nKey Responsibilities:\n- Lead design projects from concept to execution\n- Collaborate with product managers and engineers\n- Conduct user research and usability testing\n- Mentor junior designers"
  },
  {
    id: "JOB-2024-002",
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$140k - $180k",
    applicants: 128,
    status: "Active",
    postedAt: "5 days ago",
    description: "We are seeking a talented Full Stack Engineer to help build scalable web applications. You will work with modern technologies like React, Node.js, and TypeScript.\n\nKey Responsibilities:\n- Develop and maintain web applications\n- Optimize application performance\n- Write clean, testable code\n- Participate in code reviews"
  },
  {
    id: "JOB-2024-003",
    title: "Marketing Manager",
    department: "Marketing",
    location: "London, UK",
    type: "Full-time",
    salary: "£60k - £80k",
    applicants: 32,
    status: "Reviewing",
    postedAt: "1 week ago",
    description: "Join our dynamic Marketing team as a Marketing Manager. You will be responsible for developing and executing marketing strategies to drive growth and brand awareness.\n\nKey Responsibilities:\n- Plan and execute marketing campaigns\n- Analyze market trends and competitor activity\n- Manage social media channels\n- Coordinate with external agencies"
  },
  {
    id: "JOB-2024-004",
    title: "Sustainability Officer",
    department: "Operations",
    location: "Berlin, DE",
    type: "Contract",
    salary: "€50k - €70k",
    applicants: 12,
    status: "Draft",
    postedAt: "Just now",
    description: "We are looking for a Sustainability Officer to lead our environmental initiatives. You will work across departments to ensure our operations are sustainable and eco-friendly.\n\nKey Responsibilities:\n- Develop sustainability policies\n- Monitor environmental impact\n- Report on sustainability goals\n- Educate employees on green practices"
  }
];

export function JobsView() {
  const [jobs, setJobs] = useState(initialJobs);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesc, setGeneratedDesc] = useState("");

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Active Jobs", value: "12", trend: "+2", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: <Briefcase className="size-4" /> },
    { label: "Total Applicants", value: "842", trend: "+124", color: "text-[#fabf37]", bg: "bg-[#fabf37]/10", icon: <Users className="size-4" /> },
    { label: "Time to Hire", value: "18d", trend: "-2d", color: "text-blue-500", bg: "bg-blue-500/10", icon: <Clock className="size-4" /> },
    { label: "Interviews", value: "24", trend: "Today", color: "text-purple-500", bg: "bg-purple-500/10", icon: <CheckCircle2 className="size-4" /> },
  ];

  const handleCreateJob = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newJob = {
      id: `JOB-2024-${String(jobs.length + 1).padStart(3, '0')}`,
      title: formData.get('title') as string,
      department: formData.get('department') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as string,
      salary: formData.get('salary') as string,
      applicants: 0,
      status: "Active",
      postedAt: "Just now",
      description: formData.get('description') as string
    };

    setJobs([newJob, ...jobs]);
    setShowCreateModal(false);
    setGeneratedDesc(""); // Reset generated description
    toast.success("Job posting created successfully");
  };

  const handleUpdateJob = (updatedJob: any) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    setSelectedJob(updatedJob);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
    toast.success("Job posting deleted");
  };

  const generateDescription = () => {
    setIsGenerating(true);
    setGeneratedDesc("");
    const mockDescription = "We are seeking a highly motivated and experienced professional to join our team. \n\nThe ideal candidate will demonstrate strong leadership skills and a passion for innovation. You will collaborate with cross-functional teams to drive project success and deliver high-quality results.\n\nKey Responsibilities:\n- Lead strategic initiatives\n- Mentor team members\n- Drive process improvements";
    
    let i = 0;
    const interval = setInterval(() => {
      setGeneratedDesc(mockDescription.slice(0, i));
      i++;
      if (i > mockDescription.length) {
        clearInterval(interval);
        setIsGenerating(false);
        toast.success("AI Description generated!");
      }
    }, 10);
  };

  return (
    <ViewContainer
      title="Job Postings"
      subtitle="Manage Careers & Talent Acquisition"
      actions={
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2">
            <Filter className="size-3" /> Filter
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Plus className="size-3" /> Create Job
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-white/5 p-5 rounded-2xl group hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold ${stat.color}`}>
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & List */}
        <div className="bg-black border border-white/10 rounded-[32px] overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Active Postings</h3>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37] transition-colors"
              />
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredJobs.map((job) => (
              <motion.div 
                key={job.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-black text-white group-hover:text-[#fabf37] transition-colors">{job.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                        job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        job.status === 'Draft' ? 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20' :
                        'bg-[#fabf37]/10 text-[#fabf37] border-[#fabf37]/20'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="size-3.5" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="size-3.5" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span>{job.postedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(3, Math.ceil(job.applicants / 10)))].map((_, i) => (
                        <div key={i} className="size-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] text-white font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      {job.applicants > 0 && (
                        <div className="size-8 rounded-full bg-[#fabf37] border-2 border-black flex items-center justify-center text-[10px] text-black font-bold">
                          {job.applicants}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white transition-colors">
                        <MoreHorizontal className="size-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent double trigger with row click
                          setSelectedJob(job);
                        }}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        Details <ChevronRight className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 rounded-full bg-zinc-900 mb-4">
                  <Search className="size-6 text-zinc-500" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">No jobs found</h3>
                <p className="text-zinc-500 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Job Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-2xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#fabf37]">
                <div>
                  <h3 className="text-xl font-black text-black uppercase tracking-tight">Create Job Posting</h3>
                  <p className="text-xs font-bold text-black/70 mt-1 uppercase tracking-widest">Add new role to career portal</p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-full text-black transition-colors"
                >
                  <XCircle className="size-6" />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="p-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                      <FileText className="size-3" /> Job Details
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Job Title <span className="text-red-500">*</span></label>
                        <input 
                          name="title"
                          required
                          type="text" 
                          placeholder="e.g. Senior Product Designer"
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Department <span className="text-red-500">*</span></label>
                        <select 
                          name="department"
                          required
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none"
                        >
                          <option value="">Select Department</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Product">Product</option>
                          <option value="Operations">Operations</option>
                        </select>
                      </div>
                      <div>
                         <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Employment Type <span className="text-red-500">*</span></label>
                         <select 
                           name="type"
                           required
                           className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors appearance-none"
                         >
                           <option value="Full-time">Full-time</option>
                           <option value="Part-time">Part-time</option>
                           <option value="Contract">Contract</option>
                           <option value="Internship">Internship</option>
                         </select>
                      </div>
                    </div>

                    {/* New Description Field with AI */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
                        <button
                          type="button"
                          onClick={generateDescription}
                          disabled={isGenerating}
                          className="text-[10px] font-black uppercase tracking-widest text-[#fabf37] hover:text-[#fabf37]/80 flex items-center gap-1.5 transition-colors"
                        >
                          <Sparkles className={`size-3 ${isGenerating ? 'animate-spin' : ''}`} /> 
                          {isGenerating ? 'Generating...' : 'Auto-Write with AI'}
                        </button>
                      </div>
                      <div className="relative">
                        <textarea 
                          name="description"
                          rows={6}
                          value={generatedDesc}
                          onChange={(e) => setGeneratedDesc(e.target.value)}
                          placeholder="Enter job description or use AI to generate..."
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600 resize-none"
                        />
                        {isGenerating && (
                           <div className="absolute inset-0 bg-zinc-900/10 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-black border border-[#fabf37]/30 rounded-full shadow-lg">
                                <Bot className="size-4 text-[#fabf37]" />
                                <span className="text-[10px] font-bold text-white">AI is writing...</span>
                              </div>
                           </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-[#fabf37] uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="size-3" /> Location & Compensation
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Location <span className="text-red-500">*</span></label>
                        <input 
                          name="location"
                          required
                          type="text" 
                          placeholder="e.g. New York, NY"
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Salary Range</label>
                        <input 
                          name="salary"
                          type="text" 
                          placeholder="e.g. $120k - $150k"
                          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors placeholder:text-zinc-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-[#fabf37] hover:bg-[#fabf37]/90 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(250,191,55,0.2)]"
                    >
                      Publish Job
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)}
        onUpdate={handleUpdateJob}
        onDelete={handleDeleteJob}
      />
    </ViewContainer>
  );
}