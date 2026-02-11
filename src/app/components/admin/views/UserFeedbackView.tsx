import { useState } from 'react';
import { ViewContainer } from "../ViewContainer";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Search, Filter, Mail, User, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ShareStatsModal } from "../share-stats-modal";

const initialFeedback = [
  { 
    id: 1, 
    user: "John Doe", 
    email: "john@techflow.com", 
    rating: 5, 
    comment: "The eco-friendly packaging completely transformed our brand image. Excellent quality!", 
    date: "2h ago", 
    status: "Published",
    sentiment: "Positive",
    product: "Eco-Liner Food Box"
  },
  { 
    id: 2, 
    user: "Sarah Smith", 
    email: "sarah@greenleaf.io", 
    rating: 4, 
    comment: "Great durability, but shipping took a day longer than expected.", 
    date: "5h ago", 
    status: "Pending",
    sentiment: "Neutral",
    product: "Double Wall Coffee Cup"
  },
  { 
    id: 3, 
    user: "Michael Brown", 
    email: "m.brown@logistics.net", 
    rating: 5, 
    comment: "Perfect for our industrial needs. Will order bulk again.", 
    date: "1d ago", 
    status: "Published",
    sentiment: "Positive",
    product: "Industrial Kraft Bag"
  },
  { 
    id: 4, 
    user: "Emily Chen", 
    email: "emily@bakery.com", 
    rating: 3, 
    comment: "The customized logo print was slightly off-center on the last batch.", 
    date: "2d ago", 
    status: "Flagged",
    sentiment: "Negative",
    product: "Marketing Brochure"
  },
];

export function UserFeedbackView() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [filter, setFilter] = useState("All");
  const [showShareModal, setShowShareModal] = useState(false);

  const handleStatusChange = (id: number, newStatus: string) => {
    setFeedback(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
    toast.success(`Feedback status updated to ${newStatus}`);
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case "Positive": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "Negative": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <ViewContainer 
      title="User Feedback" 
      subtitle="Customer Insights & Reviews"
      actions={
         <button 
           onClick={() => setShowShareModal(true)}
           className="px-4 py-2 bg-zinc-800 border border-white/10 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-2 group"
         >
           <Share2 className="size-3 group-hover:text-[#fabf37] transition-colors" /> Share Report
         </button>
      }
    >
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
             <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                <Star className="size-6 fill-black" />
             </div>
             <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Average Rating</p>
                <p className="text-3xl font-black text-white">4.8<span className="text-lg text-zinc-500">/5</span></p>
             </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
             <div className="size-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-white border border-white/10">
                <MessageSquare className="size-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Reviews</p>
                <p className="text-3xl font-black text-white">1,248</p>
             </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
             <div className="size-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <ThumbsUp className="size-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Satisfaction Rate</p>
                <p className="text-3xl font-black text-white">96%</p>
             </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
           <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input 
                 type="text" 
                 placeholder="Search reviews..." 
                 className="w-full sm:w-64 bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#fabf37]"
              />
           </div>
           <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
              {["All", "Published", "Pending", "Flagged"].map((f) => (
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

        {/* Feedback List */}
        <div className="space-y-4">
           {feedback.filter(f => filter === "All" || f.status === filter).map((item) => (
              <motion.div 
                 key={item.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-black border border-white/5 rounded-3xl p-6 group hover:border-[#fabf37]/30 transition-all"
              >
                 <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                       <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                             <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
                                {item.user.charAt(0)}
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-white">{item.user}</h4>
                                <p className="text-xs text-zinc-500 flex items-center gap-1">
                                   <Mail className="size-3" /> {item.email}
                                </p>
                             </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getSentimentColor(item.sentiment)}`}>
                             {item.sentiment}
                          </div>
                       </div>
                       
                       <div>
                          <div className="flex gap-1 mb-2">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`size-4 ${i < item.rating ? "fill-[#fabf37] text-[#fabf37]" : "text-zinc-700"}`} />
                             ))}
                          </div>
                          <p className="text-zinc-300 text-sm leading-relaxed">"{item.comment}"</p>
                          <p className="text-[10px] font-bold text-zinc-600 mt-2 uppercase tracking-wide">Product: {item.product}</p>
                       </div>
                    </div>

                    <div className="flex md:flex-col items-center justify-between gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                       <div className="text-right w-full">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.date}</p>
                          <p className={`text-[10px] font-bold uppercase mt-1 ${
                             item.status === "Published" ? "text-green-500" : 
                             item.status === "Flagged" ? "text-red-500" : "text-yellow-500"
                          }`}>{item.status}</p>
                       </div>
                       
                       <div className="flex gap-2 w-full justify-end">
                          {item.status !== "Published" && (
                             <button 
                                onClick={() => handleStatusChange(item.id, "Published")}
                                className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20"
                                title="Approve"
                             >
                                <ThumbsUp className="size-4" />
                             </button>
                          )}
                          {item.status !== "Flagged" && (
                             <button 
                                onClick={() => handleStatusChange(item.id, "Flagged")}
                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                                title="Flag"
                             >
                                <ThumbsDown className="size-4" />
                             </button>
                          )}
                       </div>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>

      <ShareStatsModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        stats={{
          visitors: 1248,
          growth: "+4.8 Rating",
          topRegion: "User Feedback",
          engagementRate: "96% Satisfaction"
        }}
      />
    </ViewContainer>
  );
}