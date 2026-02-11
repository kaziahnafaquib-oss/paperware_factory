import { useState } from 'react';
import { motion } from "framer-motion";
import { Upload, Youtube, Video, Trash2, Plus, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  stat: string;
  videoUrl: string;
  videoType: 'youtube' | 'video' | 'image';
}

interface JourneyMediaViewProps {
  milestones: JourneyMilestone[];
  onMilestonesUpdate: (milestones: JourneyMilestone[]) => void;
}

export function JourneyMediaView({ milestones: initialMilestones, onMilestonesUpdate }: JourneyMediaViewProps) {
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(initialMilestones);
  const [isSaving, setIsSaving] = useState(false);

  // Helper to extract YouTube video ID
  const getYouTubeEmbed = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1&modestbranding=1`
      : null;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onMilestonesUpdate(milestones);
      toast.success("Journey milestones updated successfully!");
    } catch (error) {
      console.error("Error saving milestones:", error);
      toast.error("Failed to update milestones");
    } finally {
      setIsSaving(false);
    }
  };

  const addMilestone = () => {
    const newMilestone: JourneyMilestone = {
      id: `milestone-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      title: "New Milestone",
      stat: "Achievement",
      videoUrl: "",
      videoType: "youtube"
    };
    setMilestones([...milestones, newMilestone]);
  };

  const updateMilestone = (id: string, field: keyof JourneyMilestone, value: any) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const deleteMilestone = (id: string) => {
    if (confirm("Are you sure you want to delete this milestone?")) {
      setMilestones(milestones.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">
            Journey Timeline Media
          </h3>
          <p className="text-xs font-bold text-zinc-400">
            Manage YouTube videos and images for journey milestones
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addMilestone}
            className="flex items-center gap-2 px-4 py-2 bg-[#fabf37] text-black rounded-xl text-xs font-black uppercase tracking-widest"
          >
            <Plus className="size-4" />
            Add Milestone
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save All"}
          </motion.button>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-zinc-900 rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#fabf37] flex items-center justify-center">
                  <span className="text-sm font-black text-black">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white">
                    Milestone {index + 1}
                  </h4>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                    Year: {milestone.year}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteMilestone(milestone.id)}
                className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/20"
              >
                <Trash2 className="size-4" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left - Basic Info */}
              <div className="space-y-4">
                {/* Year */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                    Year
                  </label>
                  <input
                    type="text"
                    value={milestone.year}
                    onChange={(e) => updateMilestone(milestone.id, 'year', e.target.value)}
                    placeholder="2024"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                    Title
                  </label>
                  <input
                    type="text"
                    value={milestone.title}
                    onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                    placeholder="The Beginning"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                  />
                </div>

                {/* Stat */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                    Achievement/Stat
                  </label>
                  <input
                    type="text"
                    value={milestone.stat}
                    onChange={(e) => updateMilestone(milestone.id, 'stat', e.target.value)}
                    placeholder="Founded"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                  />
                </div>
              </div>

              {/* Right - Video Settings */}
              <div className="space-y-4">
                {/* Video Type */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                    Media Type
                  </label>
                  <div className="flex gap-2">
                    {['youtube', 'video', 'image'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateMilestone(milestone.id, 'videoType', type)}
                        className={`flex-1 px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                          milestone.videoType === type 
                            ? 'bg-[#fabf37] text-black' 
                            : 'bg-black border border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        {type === 'youtube' && <Youtube className="size-3 inline mr-1" />}
                        {type === 'video' && <Video className="size-3 inline mr-1" />}
                        {type === 'image' && <Upload className="size-3 inline mr-1" />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video URL */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                    {milestone.videoType === 'youtube' ? 'YouTube URL' : milestone.videoType === 'video' ? 'Video URL' : 'Image URL'}
                  </label>
                  <input
                    type="url"
                    value={milestone.videoUrl}
                    onChange={(e) => updateMilestone(milestone.id, 'videoUrl', e.target.value)}
                    placeholder={
                      milestone.videoType === 'youtube' 
                        ? 'https://www.youtube.com/watch?v=...' 
                        : milestone.videoType === 'video'
                        ? 'https://example.com/video.mp4'
                        : 'https://example.com/image.jpg'
                    }
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                  />
                </div>

                {/* Preview */}
                {milestone.videoUrl && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                      <Eye className="size-3" />
                      Preview
                    </label>
                    <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-black border border-white/5 max-w-[200px]">
                      {milestone.videoType === 'youtube' && getYouTubeEmbed(milestone.videoUrl) ? (
                        <iframe
                          src={getYouTubeEmbed(milestone.videoUrl) || ''}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : milestone.videoType === 'video' ? (
                        <video 
                          src={milestone.videoUrl} 
                          controls 
                          className="w-full h-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                          suppressHydrationWarning
                        />
                      ) : (
                        <img 
                          src={milestone.videoUrl} 
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {milestones.length === 0 && (
          <div className="text-center py-12 bg-zinc-900 rounded-2xl border border-white/5">
            <p className="text-sm font-bold text-zinc-400 mb-4">
              No milestones added yet
            </p>
            <button
              onClick={addMilestone}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#fabf37] text-black rounded-xl text-xs font-black uppercase tracking-widest"
            >
              <Plus className="size-4" />
              Add First Milestone
            </button>
          </div>
        )}
      </div>
    </div>
  );
}