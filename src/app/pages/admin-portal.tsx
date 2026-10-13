import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Trash2, Image as ImageIcon, Users, X, Edit2, Check, MessageSquare, TrendingUp, Ticket, CheckCircle, XCircle, Loader } from "lucide-react";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { LiveChatMonitor } from "../components/admin/views/LiveChatMonitor";
import { JourneyMediaView } from "../components/admin/views/JourneyMediaView";
import { SupportTicketsView } from "../components/admin/views/SupportTicketsView";

interface AdminImageData {
  id: number;
  url: string;
  name: string;
  category: string;
  type?: string;
  role?: string;
  uploadedAt?: string;
}

type TabType = "logos" | "team" | "chat" | "journey" | "tickets";

export function AdminPortal() {
  const [activeTab, setActiveTab] = useState<TabType>("logos");
  const [logos, setLogos] = useState<AdminImageData[]>([]);
  const [teamMembers, setTeamMembers] = useState<AdminImageData[]>([]);
  const [uploadQueue, setUploadQueue] = useState<AdminImageData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingImage, setEditingImage] = useState<AdminImageData | null>(null);

  // Journey milestones state
  const [journeyMilestones, setJourneyMilestones] = useState(() => {
    const saved = localStorage.getItem('journeyMilestones');
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        year: "2019",
        title: "The Beginning",
        stat: "Founded",
        videoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "2",
        year: "2020",
        title: "Growing Trust",
        stat: "50+ Partners",
        videoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "3",
        year: "2021",
        title: "Scale Up",
        stat: "10K+ Customers",
        videoUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "4",
        year: "2022",
        title: "Mass Production",
        stat: "5M+ Products",
        videoUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "5",
        year: "2024",
        title: "Premium Status",
        stat: "150+ Clients",
        videoUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&w=800&q=80",
        videoType: "image"
      },
      {
        id: "6",
        year: "2025",
        title: "Going Global",
        stat: "International",
        videoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=800&q=80",
        videoType: "image"
      }
    ];
  });

  const handleJourneyUpdate = (milestones: any[]) => {
    setJourneyMilestones(milestones);
    localStorage.setItem('journeyMilestones', JSON.stringify(milestones));
  };

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5`;

  useEffect(() => {
    console.log("Admin Portal: Fetching images...");
    Promise.all([
      fetchImages("logo"),
      fetchImages("team")
    ]).finally(() => setLoading(false));
  }, []);

  const fetchImages = async (type: "logo" | "team") => {
    try {
      console.log(`Fetching ${type} images...`);
      const response = await fetch(`${API_URL}/images/${type}`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` }
      });
      const data = await response.json();

      console.log(`${type} images response:`, data);

      if (data.success) {
        if (type === "logo") {
          setLogos(data.images || []);
        } else {
          setTeamMembers(data.images || []);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} images:`, error);
      setMessage({ type: "error", text: `Failed to load ${type} images` });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "team") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage(null);

    // Mock optimistic UI
    const newUploads = Array.from(files).map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      url: URL.createObjectURL(file), // Preview
      category: type,
      type: type,
      uploadedAt: new Date().toISOString()
    }));
    setUploadQueue(prev => [...prev, ...newUploads]);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        if (type === "team") {
          const name = prompt(`Enter name for ${file.name}:`);
          const role = prompt("Enter role/position:");
          if (name) formData.append("name", name);
          if (role) formData.append("role", role);
        } else {
          const name = prompt(`Enter company name for ${file.name}:`) || file.name;
          formData.append("name", name);
        }

        const response = await fetch(`${API_URL}/images/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${publicAnonKey}` },
          body: formData
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error);
        }
      }

      setMessage({ type: "success", text: `${files.length} image(s) uploaded successfully!` });
      fetchImages(type);
      setUploadQueue([]); // Clear queue on success
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Upload failed" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (image: AdminImageData) => {
    if (!confirm(`Delete ${image.name}?`)) return;

    try {
      const response = await fetch(`${API_URL}/images/${image.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ type: image.type })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Image deleted successfully!" });
        fetchImages(image.type as "logo" | "team");
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Delete failed" });
    }
  };

  const handleUpdate = async () => {
    if (!editingImage) return;

    try {
      const response = await fetch(`${API_URL}/images/${editingImage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          type: editingImage.type,
          name: editingImage.name,
          role: editingImage.role
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Image updated successfully!" });
        setEditingImage(null);
        fetchImages(editingImage.type as "logo" | "team");
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Update failed" });
    }
  };

  const currentImages = activeTab === "logos" ? logos : teamMembers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 py-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-zinc-900 mb-4">
            Admin Portal
          </h1>
          <p className="text-zinc-600 text-lg">
            Manage client logos and team member photos
          </p>
        </div>

        {/* Message Alert */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === "success"
                ? "bg-green-50 border-2 border-green-200 text-green-800"
                : "bg-red-50 border-2 border-red-200 text-red-800"
                }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="size-5 shrink-0" />
              ) : (
                <XCircle className="size-5 shrink-0" />
              )}
              <span className="font-semibold">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("logos")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "logos"
              ? "bg-[#fabf37] text-zinc-900 shadow-lg"
              : "bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <ImageIcon className="size-5" />
            Client Logos ({logos.length})
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "team"
              ? "bg-[#fabf37] text-zinc-900 shadow-lg"
              : "bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <Users className="size-5" />
            Team Members ({teamMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "chat"
              ? "bg-[#fabf37] text-zinc-900 shadow-lg"
              : "bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <MessageSquare className="size-5" />
            Live Chat Monitor
          </button>
          <button
            onClick={() => setActiveTab("journey")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "journey"
              ? "bg-[#fabf37] text-zinc-900 shadow-lg"
              : "bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <TrendingUp className="size-5" />
            Journey Media
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "tickets"
              ? "bg-[#fabf37] text-zinc-900 shadow-lg"
              : "bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <Ticket className="size-5" />
            Support Tickets
          </button>
        </div>

        {/* Upload Section */}
        {(activeTab === "logos" || activeTab === "team") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-zinc-200 mb-8"
          >
            <h2 className="text-2xl font-black text-zinc-900 mb-4">
              Upload {activeTab === "logos" ? "Client Logos" : "Team Photos"}
            </h2>
            <p className="text-zinc-600 mb-6">
              {activeTab === "logos"
                ? "Upload company logos (PNG, JPG recommended, max 10MB)"
                : "Upload team member photos (PNG, JPG recommended, max 10MB)"}
            </p>

            <label className="relative block cursor-pointer group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e, activeTab === "logos" ? "logo" : "team")}
                className="hidden"
                disabled={uploading}
              />
              <div className="border-4 border-dashed border-zinc-300 rounded-2xl p-12 text-center hover:border-[#fabf37] transition-all group-hover:bg-zinc-50">
                {uploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader className="size-12 text-[#fabf37] animate-spin" />
                    <span className="text-zinc-600 font-semibold">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="size-12 text-zinc-400 mx-auto mb-4 group-hover:text-[#fabf37] transition-colors" />
                    <p className="text-zinc-700 font-bold text-lg mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-zinc-500 text-sm">
                      PNG, JPG up to 10MB • Multiple files supported
                    </p>
                  </>
                )}
              </div>
            </label>
          </motion.div>
        )}

        {/* Images Grid */}
        {(activeTab === "logos" || activeTab === "team") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            <AnimatePresence>
              {uploadQueue.map((item: AdminImageData) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-[#fabf37] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-lg overflow-hidden bg-zinc-200">
                      <img loading="lazy" decoding="async" src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      {item.type === 'team' && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Users className="size-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-900 line-clamp-1">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-zinc-400 capitalize">{item.category}</span>
                        {item.role && <span className="text-[9px] bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-500">{item.role}</span>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadQueue(prev => prev.filter((i: AdminImageData) => i.id !== item.id))}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </motion.div>
              ))}
              {currentImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border-2 border-zinc-200"
                >
                  <div className="aspect-square bg-zinc-100 relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      style={{ contentVisibility: 'auto' }}
                    />

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => setEditingImage(image)}
                        className="p-2 bg-[#fabf37] rounded-lg hover:bg-[#e5a820] transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="size-5 text-zinc-900" />
                      </button>
                      <button
                        onClick={() => handleDelete(image)}
                        className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="size-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-bold text-zinc-900 text-sm truncate">
                      {image.name}
                    </h3>
                    {image.role && (
                      <p className="text-xs text-zinc-500 truncate">
                        {image.role}
                      </p>
                    )}
                    <p className="text-xs text-zinc-400 mt-1">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {currentImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="size-20 rounded-full bg-zinc-200 mx-auto mb-6 flex items-center justify-center">
              <ImageIcon className="size-10 text-zinc-400" />
            </div>
            <p className="text-zinc-500 text-lg font-semibold">
              No {activeTab === "logos" ? "logos" : "team photos"} uploaded yet
            </p>
            <p className="text-zinc-400 text-sm mt-2">
              Upload your first image using the button above
            </p>
          </motion.div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setEditingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-black text-zinc-900 mb-6">
                Edit {editingImage.type === "logo" ? "Logo" : "Team Member"}
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">
                    Name {editingImage.type === "logo" ? "(Company)" : ""}
                  </label>
                  <input
                    type="text"
                    value={editingImage.name}
                    onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:border-[#fabf37] focus:outline-none font-medium"
                  />
                </div>

                {editingImage.type === "team" && (
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">
                      Role/Position
                    </label>
                    <input
                      type="text"
                      value={editingImage.role || ""}
                      onChange={(e) => setEditingImage({ ...editingImage, role: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:border-[#fabf37] focus:outline-none font-medium"
                    />
                  </div>
                )}

                <div className="aspect-square bg-zinc-100 rounded-xl overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={editingImage.url}
                    alt={editingImage.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-6 py-3 bg-[#fabf37] text-zinc-900 rounded-xl font-bold hover:bg-[#e5a820] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingImage(null)}
                  className="px-6 py-3 bg-zinc-200 text-zinc-700 rounded-xl font-bold hover:bg-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Monitor */}
      {activeTab === "chat" && (
        <LiveChatMonitor />
      )}

      {/* Journey Media View */}
      {activeTab === "journey" && (
        <JourneyMediaView milestones={journeyMilestones} onMilestonesUpdate={handleJourneyUpdate} />
      )}

      {/* Support Tickets View */}
      {activeTab === "tickets" && (
        <SupportTicketsView />
      )}
    </div>
  );
}