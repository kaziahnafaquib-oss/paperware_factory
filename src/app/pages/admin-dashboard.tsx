import { DragEvent, MouseEvent as ReactMouseEvent, Suspense, lazy, memo, useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Search,
  Activity,
  FileText,
  Package,
  Users,
  Menu,
  X,
  Sparkles,
  Globe,
  Settings,
  Wifi,
  RefreshCw,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
  ChevronDown,
  Trash2
} from "lucide-react";
import { AdminSidebar } from "../components/admin/sidebar";
import { StatsCard } from "../components/admin/stats-card";

const ERPNextView = lazy(() => import("../components/admin/views/ERPNextView"));
const HostingView = lazy(() => import("../components/admin/views/HostingView"));
const CMSView = lazy(() => import("../components/admin/views/CMSView"));
const LanguageView = lazy(() => import("../components/admin/views/LanguageView"));
const ProductionInventoryView = lazy(() => import("../components/admin/views/ProductionInventoryView"));
const RFQPipelineView = lazy(() => import("../components/admin/views/RFQPipelineView"));
const ActiveOrdersView = lazy(() => import("../components/admin/views/ActiveOrdersView"));
const ClientCRMView = lazy(() => import("../components/admin/views/LeadManagementView").then(module => ({ default: module.LeadManagementView })));
const BrochureAnalyticsView = lazy(() => import("../components/admin/views/BrochureAnalyticsView").then(module => ({ default: module.BrochureAnalyticsView })));
const BrochureUploadView = lazy(() => import("../components/admin/views/BrochureUploadView").then(module => ({ default: module.BrochureUploadView })));
const NeuralCommLogView = lazy(() => import("../components/admin/views/NeuralCommLogView").then(module => ({ default: module.NeuralCommLogView })));
const SustainabilityView = lazy(() => import("../components/admin/views/SustainabilityView"));
const SecurityComplianceView = lazy(() => import("../components/admin/views/SecurityComplianceView"));
const AINeuralSyncView = lazy(() => import("../components/admin/views/AINeuralSyncView"));
const AttributesView = lazy(() => import("../components/admin/views/AttributesView"));
const JobsView = lazy(() => import("../components/admin/views/JobsView").then(module => ({ default: module.JobsView })));
const TrafficView = lazy(() => import("../components/admin/views/TrafficView").then(module => ({ default: module.TrafficView })));
const SocialMediaManagerView = lazy(() => import("../components/admin/views/SocialMediaManagerView"));
const UserFeedbackView = lazy(() => import("../components/admin/views/UserFeedbackView").then(module => ({ default: module.UserFeedbackView })));
const ClientPortalView = lazy(() => import("../components/admin/views/ClientPortalView").then(module => ({ default: module.ClientPortalView })));
const MediaManagerView = lazy(() => import("../components/admin/views/MediaManagerView").then(module => ({ default: module.MediaManagerView })));
const ShareStatsView = lazy(() => import("../components/admin/views/ShareStatsView").then(module => ({ default: module.ShareStatsView })));
const UserEngagementView = lazy(() => import("../components/admin/views/UserEngagementView"));
const AboutUsMediaView = lazy(() => import("../components/admin/views/AboutUsMediaView"));
const SEOCommandView = lazy(() => import("../components/admin/views/SEOCommandView"));
const PerformanceMonitorView = lazy(() => import("../components/admin/views/PerformanceMonitorView"));
const FormLeadView = lazy(() => import("../components/admin/views/FormLeadView"));
const BlogManagerView = lazy(() => import("../components/admin/views/BlogManagerView"));
const AnnouncementManagerView = lazy(() => import("../components/admin/views/AnnouncementManagerView"));
const NewsletterView = lazy(() => import("../components/admin/views/NewsletterView"));

import { ProductEditModal } from "../components/admin/product-edit-modal";
import { useLanguage } from "../context/LanguageContext";
import { LanguageCode } from "../lib/translations";
import { motion, AnimatePresence } from "framer-motion";

const DashboardOverview = lazy(() => import("../components/admin/DashboardOverview").then(module => ({ default: module.DashboardOverview })));

// Optimized Catalog Item Component
const CatalogItem = memo(({
  item,
  itemId,
  isActive,
  onToggle,
  products,
  itemAttributes,
  setItemAttributes,
  setViewingImage,
  setViewingVideo,
  detectorLabel,
  setIsEditingDetector,
  isEditingDetector,
  foodBoxAttributes,
  setFoodBoxAttributes,
  addingOptionFor,
  setAddingOptionFor,
  setIsAddingAttribute,
  isAddingAttribute
}: any) => {
  return (
    <div className="group/item">
      <div
        onClick={() => onToggle(isActive ? null : itemId)}
        className={`
                    flex items-center justify-between px-4 py-2.5 border rounded-xl text-[10px] font-bold uppercase tracking-wide cursor-pointer transition-all shadow-sm group/handle
                    ${isActive
            ? "bg-[#fabf37] border-[#fabf37] text-black rounded-b-none"
            : "bg-white border-black/5 hover:border-[#fabf37] hover:bg-zinc-50"
          }
                `}
      >
        <span className={`block w-full text-[9px] font-bold uppercase tracking-wide ${isActive ? "text-black" : "text-zinc-900"}`}>
          {item}
        </span>
        <ChevronDown className={`size-3 transition-transform duration-300 ${isActive ? "rotate-180 text-black" : "-rotate-90 text-zinc-300 group-hover/handle:text-black"}`} />
      </div>

      {item === "Paper Cup" && !isActive && (
        <div className="mt-1 ml-6 space-y-1 border-l-2 border-black/5 pl-2">
          {["Single Wall", "Double Wall", "Ripple Wall"].map((sub) => (
            <div
              key={sub}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(itemId);
              }}
              className="px-3 py-1.5 border border-black/5 bg-zinc-50 rounded-lg text-[8px] font-bold uppercase tracking-wide text-zinc-500 flex items-center gap-2 cursor-pointer hover:bg-white hover:border-[#fabf37] hover:text-black transition-all group/sub"
            >
              <div className="size-1 rounded-full bg-zinc-300 group-hover/sub:bg-[#fabf37] transition-colors" />
              {sub}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white border-x border-b border-black/5 rounded-b-xl shadow-xl relative z-20"
          >
            <div className="p-4 space-y-4">
              <MediaGallery
                item={item}
                products={products}
                setViewingImage={setViewingImage}
                setViewingVideo={setViewingVideo}
              />

              {/* Attributes Section */}
              <div className="pt-2 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Product Attributes</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const attr = prompt("Add new attribute (e.g. Size, Color, Grade):");
                      if (attr) {
                        setItemAttributes((prev: any) => {
                          const current = prev[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly'];
                          return { ...prev, [item]: [...current, attr] };
                        });
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full hover:bg-[#fabf37] hover:text-black transition-all group/add-attr shadow-sm"
                  >
                    <Plus className="size-2.5 group-hover/add-attr:rotate-90 transition-transform" />
                    <span className="text-[8px] font-black uppercase tracking-wider">Add New</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(itemAttributes[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly']).map((tag: string, idx: number) => (
                    <div key={`${tag}-${idx}`} className="flex items-center gap-2 pl-2 pr-1 py-1 bg-zinc-50 border border-zinc-200 rounded-lg text-[9px] text-zinc-600 font-bold group/tag hover:border-[#fabf37] transition-colors shadow-sm">
                      <span className="uppercase tracking-tighter">{tag}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemAttributes((prev: any) => {
                            const current = prev[item] || ['In Stock', 'Premium Grade', 'Eco-Friendly'];
                            return { ...prev, [item]: current.filter((_: any, i: number) => i !== idx) };
                          });
                        }}
                        className="p-0.5 hover:bg-red-500 hover:text-white rounded transition-colors text-zinc-300"
                      >
                        <X className="size-2" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offer Toggle */}
              <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg border border-black/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3 text-[#fabf37]" />
                  <span className="text-[9px] font-bold text-zinc-700">Seasonal Bundle Offer</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-6 h-3 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-[#fabf37]"></div>
                </label>
              </div>

              {/* Advanced Configurator */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Opening Advanced SKU Configurator for: ${item}`);
                }}
                className="w-full py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-[#fabf37] hover:text-black transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Settings className="size-3" />
                <span>Configure Full SKU</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Optimized Media Gallery Component with Drag & Drop
const MediaGallery = memo(({ item, products, setViewingImage, setViewingVideo }: any) => {
  const sysProducts = useMemo(() => Array.isArray(products) ? products : [], [products]);

  const linkedProduct = useMemo(() => sysProducts.find(p => {
    const pName = (p.title || p.name || "").toLowerCase().replace(/[\s-]/g, '');
    const iName = (item || "").toLowerCase().replace(/[\s-]/g, '');
    return pName.includes(iName) || iName.includes(pName);
  }), [sysProducts, item]);

  const [images, setImages] = useState<any[]>([]);
  const [showVideo, setShowVideo] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    const secondaryImages = sysProducts
      .filter(p => !linkedProduct || p.id !== linkedProduct.id)
      .slice(0, 5);
    setImages(secondaryImages);
  }, [sysProducts, linkedProduct]);

  const handleDelete = (e: ReactMouseEvent, type: string, index?: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to remove this ${type}?`)) {
      if (type === "Video") {
        setShowVideo(false);
      } else if (index !== undefined) {
        setImages(prev => {
          const newImages = [...prev];
          newImages.splice(index, 1);
          return newImages;
        });
      }
      console.log(`${type} removed from view`);
    }
  };

  const handleDragStart = (e: DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newImages = [...images];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);

    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-zinc-900 uppercase tracking-wider">Product Media Gallery</span>
        <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
          <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[7px] font-bold text-green-700 uppercase">Live</span>
        </div>
      </div>

      {/* Primary Image */}
      <div className="relative group/main rounded-2xl overflow-hidden border-2 border-zinc-200 bg-zinc-50 aspect-[16/10] shadow-lg hover:shadow-2xl transition-all">
        {linkedProduct ? (
          <>
            <img
              src={linkedProduct.image}
              alt={item}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setViewingImage(linkedProduct.image)}
            />
            {/* Primary Badge */}
            <div className="absolute top-3 left-3 bg-[#fabf37] px-2.5 py-1 rounded-lg shadow-lg">
              <span className="text-[8px] font-black text-black uppercase">Primary</span>
            </div>
            {/* Delete Button */}
            <button
              onClick={(e) => handleDelete(e, "Primary Image")}
              className="absolute top-3 right-3 size-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <Trash2 className="size-4" />
            </button>
            {/* View Button */}
            <button
              onClick={() => setViewingImage(linkedProduct.image)}
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 hover:bg-[#fabf37] text-white hover:text-black rounded-lg text-[8px] font-bold uppercase transition-all"
            >
              View Full
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <Package className="size-12 text-zinc-300" />
            <p className="text-[9px] font-bold text-zinc-500 uppercase">No Primary Image</p>
            <button className="px-4 py-2 bg-[#fabf37] text-black rounded-lg text-[8px] font-black uppercase hover:bg-black hover:text-white transition-all">
              Upload Image
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Grid - Draggable & Deletable */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-zinc-600 uppercase">Additional Photos</span>
            <span className="text-[7px] text-zinc-400 italic">(Drag to reorder)</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); alert("Upload workflow activated..."); }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#fabf37] hover:bg-black text-black hover:text-white rounded-lg transition-all"
          >
            <Plus className="size-3" />
            <span className="text-[7px] font-black uppercase">Add Photo</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {images.map((p, idx) => (
            <div
              key={p.id || idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`relative group/img rounded-3xl overflow-hidden border-4 bg-white aspect-square transition-all shadow-xl hover:shadow-2xl cursor-move ${draggedIndex === idx ? 'opacity-50 scale-95' : ''} ${dragOverIndex === idx ? 'border-[#fabf37] scale-105' : 'border-zinc-200'} hover:border-[#fabf37]`}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover pointer-events-none select-none"
              />

              {/* Always Visible Delete Button - Top Right */}
              <button
                onClick={(e) => handleDelete(e, "Photo", idx)}
                className="absolute top-2 right-2 size-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
                title="Delete Asset"
              >
                <Trash2 className="size-4" />
              </button>

              {/* Minimal Top Control Bar (Drag Handle Only) - Hover Only */}
              <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center">
                  <div className="size-7 bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
                    <MoreHorizontal className="size-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Center View Button - Hover Only */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all bg-black/10 backdrop-blur-[1px]">
                <button
                  onClick={() => setViewingImage(p.image)}
                  className="px-5 py-2.5 bg-white hover:bg-[#fabf37] text-black rounded-xl flex items-center gap-2 transition-all font-black text-[10px] uppercase tracking-wider shadow-xl hover:scale-110"
                >
                  <Eye className="size-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}

          {/* Video Thumbnail - Corrected Hierarchy & Deletable */}
          {showVideo && (
            <div
              className="relative group/vid rounded-3xl overflow-hidden border-4 border-zinc-200 bg-zinc-900 aspect-square hover:border-[#fabf37] transition-all shadow-xl hover:shadow-2xl cursor-pointer"
              onClick={() => setViewingVideo("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4")}
            >
              <img
                src={images.length > 0 ? images[0].image : "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format"}
                alt="Video"
                className="w-full h-full object-cover opacity-50"
              />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="size-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/50 shadow-2xl">
                  <div className="ml-1 border-l-[16px] border-l-white border-y-[12px] border-y-transparent h-6" />
                </div>
              </div>

              {/* Always Visible Control Bar - Top */}
              <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 bg-[#fabf37]/90 rounded-lg">
                    <span className="text-[9px] font-black text-black uppercase">Video</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, "Video")}
                    className="size-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
                    title="Delete Video"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Label - Inside the Div */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-[10px] font-black text-white uppercase tracking-wider">Production Video</p>
                  <p className="text-[7px] text-white/60 uppercase">Click to play</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const data = []; // Placeholder or remove if not used elsewhere
const inventoryData = [];
const rfqs = [];

export default function AdminDashboard({
  onLogout,
  heroVideoUrl,
  onUpdateHeroVideo,
  heroVideoMobileUrl,
  onUpdateHeroVideoMobile,
  clientsVideoUrl,
  onUpdateClientsVideo,
  heroContent,
  onUpdateHeroContent,
  products,
  onUpdateProducts,
  testimonials,
  onUpdateTestimonials,
  impactStats,
  onUpdateImpactStats,
  productionStats,
  onUpdateProductionStats,
  careers,
  onUpdateCareers,
  clientProjects,
  onUpdateClientProjects,
  partners,
  onUpdatePartners,
  brochureUrl,
  onUpdateBrochure,
  aboutUsVideos,
  onUpdateAboutUsVideos,
  teamMembers,
  onUpdateTeamMembers,
  teamSectionContent,
  onUpdateTeamSectionContent,
  clients,
  onUpdateClients
}: {
  onLogout: () => void,
  heroVideoUrl?: string,
  onUpdateHeroVideo?: (url: string) => void,
  heroVideoMobileUrl?: string,
  onUpdateHeroVideoMobile?: (url: string) => void,
  clientsVideoUrl?: string,
  onUpdateClientsVideo?: (url: string) => void,
  heroContent?: any,
  onUpdateHeroContent?: (content: any) => void,
  products?: any[],
  onUpdateProducts?: (products: any[]) => void,
  testimonials?: any[],
  onUpdateTestimonials?: (testimonials: any[]) => void,
  impactStats?: any[],
  onUpdateImpactStats?: (stats: any[]) => void,
  productionStats?: any,
  onUpdateProductionStats?: (stats: any) => void,
  careers?: any[],
  onUpdateCareers?: (careers: any[]) => void,
  clientProjects?: any[],
  onUpdateClientProjects?: (projects: any[]) => void,
  partners?: any[],
  onUpdatePartners?: (partners: any[]) => void,
  brochureUrl?: string,
  onUpdateBrochure?: (url: string) => void,
  aboutUsVideos?: any,
  onUpdateAboutUsVideos?: (videos: any) => void,
  teamMembers?: any[],
  onUpdateTeamMembers?: (members: any[]) => void,
  teamSectionContent?: any,
  onUpdateTeamSectionContent?: (content: any) => void,
  clients?: any[],
  onUpdateClients?: (clients: any[]) => void
}) {
  const { language, setLanguage, tone, setTone, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("visitors");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [viewingVideo, setViewingVideo] = useState<string | null>(null);
  const [isProductionExpanded, setIsProductionExpanded] = useState(false);
  const [foodBoxAttributes, setFoodBoxAttributes] = useState([
    { title: "Paper Material", options: ["Premium Swedish Pulp", "Recycled Kraft", "Luxury Art Paper"] },
    { title: "GSM", options: ["280 GSM", "300 GSM", "350 GSM", "400 GSM"] },
    { title: "Finish", options: ["Matte UV", "Gloss Laminated", "Soft Touch", "Metallic Foil"] }
  ]);
  const [addingOptionFor, setAddingOptionFor] = useState<string | null>(null);
  const [isAddingAttribute, setIsAddingAttribute] = useState(false);
  const [itemAttributes, setItemAttributes] = useState<Record<string, string[]>>({});
  const [detectorLabel, setDetectorLabel] = useState("AI-DETECT");
  const [isEditingDetector, setIsEditingDetector] = useState(false);
  const [productionFeed, setProductionFeed] = useState(
    Array.from({ length: 20 }).map((_, i) => {
      const clients = ["Greenleaf Organics", "Urban Brew Co.", "Medisafe Pharma", "Velocity Logistics", "EcoWare Solutions", "BioPack Industries", "PureFiber Tech", "NatureFirst Packaging"];
      const titles = [
        "Biodegradable Food Containers",
        "Thermal Insulation Cups",
        "Secure Sterility Boxes",
        "Heavy-Duty Shipping Units",
        "Sustainable Coffee Sleeves",
        "Recycled Kraft Bags",
        "Compostable Cutlery Sets",
        "Bamboo Fiber Plates",
        "Corrugated Retail Displays",
        "Pharmaceutical Blister Packs"
      ];
      const statuses = ["production", "qc_check", "dispatched", "pending_material"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: i + 1,
        client: clients[Math.floor(Math.random() * clients.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        desc: "Automated production line item with real-time quality monitoring and sustainability tracking.",
        image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?q=80&w=800&auto=format",
        isVisible: true,
        status: i < 3 ? "production" : randomStatus,
        timestamp: i === 0 ? "Live" : `${Math.floor(Math.random() * 59) + 1}m ago`
      };
    })
  );

  // Sync production feed images with real products
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setProductionFeed(prev => prev.map((item, idx) => ({
        ...item,
        // Cycle through real product images
        image: products[idx % products.length].image
      })));
    }
  }, [products]);
  const [productCategories, setProductCategories] = useState([
    { id: "01", name: "Office Stationary Supplies", items: ["Business Card", "Envelope", "Invoice Pad", "Letterhead Pad", "Money Receipt Book", "Delivery Note Book", "Note Book", "Diary", "File Folder"] },
    { id: "02", name: "Paper Cup Supplies", items: ["Paper Cup", "Paper Cup Holder", "Paper Cup Jacket/Sleeve", "Paper Cup Carrier"] },
    { id: "03", name: "Restaurant Supplies", items: ["FOOD BOX", "CHOWMEIN BOX", "MEAT BOX", "SANDWICH BOX", "BURGER BOX", "PIZZA BOX", "CAKE BOX", "SWEET BOX", "FRIES BOX", "SHAWARMA BOX", "WAFFLE BOX & TRAY", "WEDGES CONE", "ICE CREAM CONE", "SUGAR SACHET", "TABLE MAT", "CARRY BAG", "FOOD MENU"] },
    { id: "04", name: "Marketing Materials Supplies", items: ["Paper Bag", "Brochure / Catalog", "Premium Magazine", "Flyer & Leaflet", "Sticker", "Calendar", "Tissue Box"] },
    { id: "05", name: "Hospitals & Pharmaceuticals Supplies", items: ["Patient File", "X-Ray File", "Doctor's Prescription Pad", "Report Envelope", "Medicine Box", "Medicine Literature"] },
    { id: "06", name: "FMCG Products Supplies", items: ["Food & Beverage Packaging", "Personal Care Product Packaging", "Home Care Product Packaging", "Confectionary Goods Packaging"] },
    { id: "07", name: "Garments Accessories Supplies", items: ["Hangtag", "Label", "Sticker"] },
  ]);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Handle Product Save
  const handleSaveProduct = (product: any) => {
    // Update product categories
    setProductCategories(prev => {
      const categoryIndex = prev.findIndex(c => c.name === product.category);
      if (categoryIndex >= 0) {
        const category = prev[categoryIndex];
        if (!category.items.includes(product.title)) {
          const updated = [...prev];
          updated[categoryIndex] = {
            ...category,
            items: [...category.items, product.title]
          };
          return updated;
        }
      } else {
        // Create new category
        return [...prev, {
          id: String(prev.length + 1).padStart(2, '0'),
          name: product.category,
          items: [product.title]
        }];
      }
      return prev;
    });

    // If onUpdateProducts callback exists, call it
    if (onUpdateProducts) {
      onUpdateProducts(product);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const renderView = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fabf37]"></div></div>}>
            <DashboardOverview t={t} />
          </Suspense>
        );
      case "visitors": return <TrafficView />;
      case "shares": return <ShareStatsView />;
      case "engagement": return <UserEngagementView />;
      case "seo-command": return <SEOCommandView />;
      case "performance": return <PerformanceMonitorView />;
      case "form-leads": return <FormLeadView />;
      case "blog-manager": return <BlogManagerView />;
      case "announcements": return <AnnouncementManagerView />;
      case "newsletter": return <NewsletterView />;
      case "erpnext": return <ERPNextView />;
      case "neural-sync": return <AINeuralSyncView />;
      case "hosting": return <HostingView />;
      case "rfqs": return <RFQPipelineView />;
      case "inventory": return <ProductionInventoryView />;
      case "orders": return <ActiveOrdersView />;
      case "clients": return <ClientCRMView />;
      case "brochure-stats": return <BrochureAnalyticsView />;
      case "brochure-upload": return <BrochureUploadView />;
      case "comm-log": return <NeuralCommLogView />;
      case "sustainability": return <SustainabilityView />;
      case "compliance": return <SecurityComplianceView />;
      case "partners-cms": return (
        <CMSView
          defaultCategory="Global Partners"
          heroVideoUrl={heroVideoUrl}
          onUpdateHeroVideo={onUpdateHeroVideo}
          heroVideoMobileUrl={heroVideoMobileUrl}
          onUpdateHeroVideoMobile={onUpdateHeroVideoMobile}
          clientsVideoUrl={clientsVideoUrl}
          onUpdateClientsVideo={onUpdateClientsVideo}
          heroContent={heroContent}
          onUpdateHeroContent={onUpdateHeroContent}
          products={products}
          onUpdateProducts={onUpdateProducts}
          testimonials={testimonials}
          onUpdateTestimonials={onUpdateTestimonials}
          impactStats={impactStats}
          onUpdateImpactStats={onUpdateImpactStats}
          productionStats={productionStats}
          onUpdateProductionStats={onUpdateProductionStats}
          careers={careers}
          onUpdateCareers={onUpdateCareers}
          clientProjects={clientProjects}
          onUpdateClientProjects={onUpdateClientProjects}
          partners={partners}
          onUpdatePartners={onUpdatePartners}
          brochureUrl={brochureUrl}
          onUpdateBrochure={onUpdateBrochure}
          teamMembers={teamMembers}
          onUpdateTeamMembers={onUpdateTeamMembers}
          teamSectionContent={teamSectionContent}
          onUpdateTeamSectionContent={onUpdateTeamSectionContent}
          clients={clients}
          onUpdateClients={onUpdateClients}
        />
      );
      case "cms": return (
        <CMSView
          heroVideoUrl={heroVideoUrl}
          onUpdateHeroVideo={onUpdateHeroVideo}
          heroVideoMobileUrl={heroVideoMobileUrl}
          onUpdateHeroVideoMobile={onUpdateHeroVideoMobile}
          clientsVideoUrl={clientsVideoUrl}
          onUpdateClientsVideo={onUpdateClientsVideo}
          heroContent={heroContent}
          onUpdateHeroContent={onUpdateHeroContent}
          products={products}
          onUpdateProducts={onUpdateProducts}
          testimonials={testimonials}
          onUpdateTestimonials={onUpdateTestimonials}
          impactStats={impactStats}
          onUpdateImpactStats={onUpdateImpactStats}
          productionStats={productionStats}
          onUpdateProductionStats={onUpdateProductionStats}
          careers={careers}
          onUpdateCareers={onUpdateCareers}
          clientProjects={clientProjects}
          onUpdateClientProjects={onUpdateClientProjects}
          partners={partners}
          onUpdatePartners={onUpdatePartners}
          brochureUrl={brochureUrl}
          onUpdateBrochure={onUpdateBrochure}
          teamMembers={teamMembers}
          onUpdateTeamMembers={onUpdateTeamMembers}
          teamSectionContent={teamSectionContent}
          onUpdateTeamSectionContent={onUpdateTeamSectionContent}
          clients={clients}
          onUpdateClients={onUpdateClients}
        />
      );
      case "social-media": return <SocialMediaManagerView />;
      case "languages": return <LanguageView />;
      case "attributes": return <AttributesView />;
      case "careers": return <JobsView />;
      case "feedback": return <UserFeedbackView />;
      case "portal": return <ClientPortalView />;
      case "media": return <MediaManagerView products={products} />;
      case "about-media": return <AboutUsMediaView aboutUsVideos={aboutUsVideos} onUpdateAboutUsVideos={onUpdateAboutUsVideos} />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Product Command Center</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Connected to ERPNext v14.0 • Production DB</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => alert("ERPNext Connection Status:\n\n• API Gateway: Online\n• Webhook Latency: 14ms\n• Last Sync: Just now\n• Queue: Empty")}
                  className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                  <Activity className="size-4 text-[#fabf37] animate-pulse" />
                  <span>Sync Status</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (typeof onUpdateProducts !== 'function') {
                      alert("ACTION FAILED: 'onUpdateProducts' prop is missing. Please ensure the parent component passes this function.");
                      return;
                    }

                    const title = window.prompt("ENTER NEW SKU / PRODUCT NAME:");
                    if (title) {
                      const newItem = {
                        id: `new-${Date.now()}`,
                        title: title,
                        category: "Manual Entry",
                        image: ""
                      };
                      const currentList = Array.isArray(products) ? products : [];
                      onUpdateProducts([newItem, ...currentList]);
                    }
                  }}
                  className="px-5 py-2.5 bg-[#fabf37] text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#fabf37]/90 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,191,55,0.2)] cursor-pointer relative z-10"
                >
                  <Package className="size-4" />
                  <span>Add New SKU</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total SKU", value: products?.length || 0, trend: "+12%", color: "text-white" },
                { label: "Low Stock", value: "3", trend: "Urgent", color: "text-red-500" },
                { label: "Pending Sync", value: "0", trend: "All Good", color: "text-green-500" },
                { label: "ERP Status", value: "Online", trend: "14ms", color: "text-[#fabf37]" }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className={`text-2xl font-black uppercase tracking-tight ${stat.color}`}>{stat.value}</p>
                    <p className="text-[9px] font-bold text-zinc-600 bg-white/5 px-2 py-1 rounded-md">{stat.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Split View: Recent Deployments + All Products */}
            <div className="space-y-12">

              {/* Part 1: Recent Deployments */}
              <div>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-[#fabf37] w-12" />
                  <h3 className="text-xs font-black text-black bg-[#fabf37] px-3 py-1 uppercase tracking-widest rounded-sm">Recent_Deployments</h3>
                  <div className="h-px bg-[#fabf37] w-12" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* ERP Status Header */}
                  <div className="col-span-full flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        <Wifi className="size-3 text-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">ERP Live Sync</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 rounded-full border border-white/5">
                        <RefreshCw className="size-3 text-zinc-400" />
                        <span className="text-[10px] font-medium text-zinc-400">Last updated: Just now</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsProductionExpanded(!isProductionExpanded)}
                        className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white group"
                      >
                        <span className="text-[9px] font-bold uppercase tracking-wider">{isProductionExpanded ? "Show Less" : "View All"}</span>
                        <ChevronDown className={`size-4 transition-transform duration-300 ${isProductionExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white group relative">
                        <Settings className="size-4 group-hover:rotate-90 transition-transform duration-500" />
                        <span className="absolute -top-8 right-0 bg-black text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Configure Feed</span>
                      </button>
                    </div>
                  </div>

                  {productionFeed.slice(0, isProductionExpanded ? 20 : 4).map(item => (
                    <div key={item.id} className={`relative aspect-[3/4] rounded-[32px] overflow-hidden group border transition-all duration-300 ${item.isVisible ? 'border-white/10 hover:border-[#fabf37]/50 opacity-100' : 'border-red-500/30 opacity-40 grayscale'}`}>
                      {/* Controls Overlay */}
                      <div className={`absolute top-4 right-4 z-20 flex flex-col gap-2 transition-transform duration-300 ${activeDropdown === `prod-${item.id}` ? 'translate-x-0' : 'translate-x-12 group-hover:translate-x-0'}`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newFeed = productionFeed.map(p => p.id === item.id ? { ...p, isVisible: !p.isVisible } : p);
                            setProductionFeed(newFeed);
                          }}
                          className="size-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
                          title={item.isVisible ? "Hide Item" : "Show Item"}
                        >
                          {item.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === `prod-${item.id}` ? null : `prod-${item.id}`);
                          }}
                          className="size-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-[#fabf37] hover:text-black transition-colors"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === `prod-${item.id}` && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            className="absolute top-16 right-4 z-30 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-xl flex flex-col gap-1 w-32"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button onClick={() => alert("Pausing production for " + item.title)} className="text-left px-3 py-2 text-[10px] font-bold text-zinc-300 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Pause Production</button>
                            <button onClick={() => alert("Flagging for QC: " + item.title)} className="text-left px-3 py-2 text-[10px] font-bold text-zinc-300 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Flag Issue</button>
                            <div className="h-px bg-white/10 my-1" />
                            <button className="text-left px-3 py-2 text-[10px] font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">Stop Line</button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Info Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <div className="mb-2">
                          <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${item.status === 'production' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                            item.status === 'qc_check' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                              'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
                            }`}>
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white leading-tight mb-1">{item.title}</h4>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
                          {item.client} • <span className={item.timestamp === 'Live' ? 'text-red-500 animate-pulse' : 'text-zinc-500'}>{item.timestamp}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Full Product Catalog (Collapsible) */}
              <div>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-zinc-800 w-full" />
                  <h3 className="text-xs font-black text-zinc-500 px-3 py-1 uppercase tracking-widest whitespace-nowrap">Full_Product_Database</h3>
                  <div className="h-px bg-zinc-800 w-full" />
                </div>

                <div className="space-y-4">
                  {productCategories.map((category) => (
                    <div key={category.id} className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
                      <div className="bg-zinc-800/50 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-xs font-black text-[#fabf37] uppercase tracking-widest">
                          {category.id} / {category.name}
                        </h3>
                        <span className="bg-black/30 px-2 py-1 rounded text-[9px] font-bold text-zinc-400">
                          {category.items.length} SKUs
                        </span>
                      </div>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {category.items.map((item, idx) => (
                          <div key={idx}>
                            <CatalogItem
                              item={item}
                              itemId={`${category.id}-${idx}`}
                              isActive={activeDropdown === `${category.id}-${idx}`}
                              onToggle={(id: string) => setActiveDropdown(id)}
                              products={products}
                              itemAttributes={itemAttributes}
                              setItemAttributes={setItemAttributes}
                              setViewingImage={setViewingImage}
                              setViewingVideo={setViewingVideo}
                              detectorLabel={detectorLabel}
                              setIsEditingDetector={setIsEditingDetector}
                              isEditingDetector={isEditingDetector}
                              foodBoxAttributes={foodBoxAttributes}
                              setFoodBoxAttributes={setFoodBoxAttributes}
                              addingOptionFor={addingOptionFor}
                              setAddingOptionFor={setAddingOptionFor}
                              setIsAddingAttribute={setIsAddingAttribute}
                              isAddingAttribute={isAddingAttribute}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-[#fabf37] selection:text-black">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Bar: Breadcrumbs & Actions */}
          <div className="flex items-center justify-between mb-8 sticky top-0 z-40 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <span className="hover:text-white cursor-pointer transition-colors">Admin</span>
              <span className="text-zinc-700">/</span>
              <span className="text-[#fabf37]">{activeTab.replace('-', ' ')}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-[#fabf37] transition-colors" />
                <input
                  type="text"
                  placeholder="SEARCH DATABASE..."
                  className="bg-zinc-900 border border-white/10 rounded-full px-10 py-2.5 w-64 text-[10px] font-bold text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37] focus:w-80 transition-all uppercase tracking-wider"
                />
              </div>

              <button className="relative p-2.5 bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 hover:border-[#fabf37] transition-all group">
                <Bell className="size-4 text-zinc-400 group-hover:text-white" />
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-zinc-900" />
              </button>

              <div className="relative group">
                <button
                  className="size-10 rounded-full bg-gradient-to-br from-[#fabf37] to-yellow-600 p-[2px] cursor-pointer"
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="font-black text-[#fabf37]">K</span>
                  </div>
                </button>

                {/* Profile Scan Effect */}
                <div className="absolute inset-0 rounded-full border border-[#fabf37]/50 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Suspense fallback={
                <div className="h-[60vh] flex flex-col items-center justify-center">
                  <RefreshCw className="size-10 text-[#fabf37] animate-spin mb-4" />
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Loading Module...</p>
                </div>
              }>
                {renderView()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      {/* Image Viewer Modal */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-10"
            onClick={() => setViewingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e: ReactMouseEvent) => e.stopPropagation()}
            >
              <img src={viewingImage} alt="Full View" className="w-full h-full object-contain" />
              <button
                onClick={() => setViewingImage(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X className="size-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Viewer Modal */}
      <AnimatePresence>
        {viewingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-10"
            onClick={() => setViewingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
              onClick={(e: ReactMouseEvent) => e.stopPropagation()}
            >
              <video
                src={viewingVideo}
                className="w-full h-full object-contain"
                controls
                autoPlay
                suppressHydrationWarning
              />
              <button
                onClick={() => setViewingVideo(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors z-10"
              >
                <X className="size-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Edit Modal */}
      <ProductEditModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
        categories={productCategories.map(c => c.name)}
      />
    </div>
  );
}