import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, Type, Palette, Layout, Download, Share2, 
  CircleCheck, RotateCcw, ChevronRight, Settings2,
  Layers, Sparkles, Zap, Printer, Box, Eye, Maximize2,
  Leaf, DollarSign, Clock, Sun, Moon, Monitor, Activity,
  ShoppingBag, FileText, ShieldCheck, Scan, Cpu, Terminal,
  Database, Globe, ArrowRight, Save, WandSparkles as Wand2, Info
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";
import yPaperCups from "figma:asset/6adcf127ea8fcf1105d20bd5049c27d9545b8c86.webp";
import imgTakeawayBox from "../../assets/products/takeaway-food-box.webp";
import imgGiftBags from "../../assets/products/gift-bags.webp";
import imgBrochures from "../../assets/products/brochures.webp";
import imgMedicineBoxes from "../../assets/products/medicine-boxes.webp";
import { useScrollScrub, clamp01, easeOut3 } from "../lib/useScrollScrub";
import { useGo } from "../lib/useGo";

// 3D preview: lazy-loaded only on /studio; any failure falls back to the SVG mockup.
const ProductScene = React.lazy(() => import("../components/studio/ProductScene").then((m) => ({ default: m.ProductScene })));
const SUPPORTS_3D = new Set(["cup", "box"]);

let webglSupport: boolean | null = null;
function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement("canvas");
    webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

class PreviewErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// CSS-only paper grain (replaces former external texture PNGs).
const GRAIN_FINE = "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 3px)";
const GRAIN_BOARD = "repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0 2px, transparent 2px 7px)";

const PRODUCTS_LIST = [
  { id: 'cup', name: "Single Wall Cup", category: "Paper Cups", image: yPaperCups, icon: '🥤' },
  { id: 'box', name: "Burger Box", category: "Food Boxes", image: imgTakeawayBox, icon: '🍔' },
  { id: 'bag', name: "Luxury Paper Bag", category: "Paper Bags", image: imgGiftBags, icon: '🛍️' },
  { id: 'brochure', name: "Brand Brochure", category: "Marketing", image: imgBrochures, icon: '📄' },
  { id: 'pharm', name: "Medicine Box", category: "Pharma", image: imgMedicineBoxes, icon: '💊' },
];

export function StudioPage() {
  const go = useGo();
  const { t } = useLanguage();
  const [logo, setLogo] = React.useState<string | null>(null);
  const [color, setColor] = React.useState("#ffffff");
  const [itemType, setItemType] = React.useState("cup");
  const [selectedProductId, setSelectedProductId] = React.useState("cup");
  const [size, setSize] = React.useState("Medium");
  const [text, setText] = React.useState("BRAND CORE");
  const [texture, setTexture] = React.useState("matte");
  const [rotation, setRotation] = React.useState(15);
  // Owner (2 Nov 2026): brands pick the printed logo size before placing it on the cup.
  const [logoScale, setLogoScale] = React.useState(100);
  const [fontFamily, setFontFamily] = React.useState("Inter");
  const [finish, setFinish] = React.useState("none");
  const [material, setMaterial] = React.useState("Kraft");
  const [activeTab, setActiveTab] = React.useState("product");
  const [lighting, setLighting] = React.useState("studio");
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [consoleLogs, setConsoleLogs] = React.useState<string[]>(["Initializing Render Engine...", "Loading Assets...", "Ready."]);

  const addLog = (log: string) => {
    setConsoleLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${log}`]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      addLog("Analyzing uploaded asset...");
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
        setTimeout(() => {
          setIsAnalyzing(false);
          addLog("Asset integrated successfully.");
          toast.success("Design asset uploaded!");
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSelect = (product: typeof PRODUCTS_LIST[0]) => {
    setSelectedProductId(product.id);
    setItemType(product.id);
    addLog(`Switched target to ${product.name}`);
  };

  const sustainabilityScore = material === "Bamboo" ? 98 : material === "Recycled" ? 92 : material === "Kraft" ? 85 : 78;
  const estimatedCost = (itemType === "cup" ? 0.12 : itemType === "bag" ? 0.45 : itemType === 'brochure' ? 0.30 : 0.85) + (finish !== "none" ? 0.05 : 0);

  const headRef = React.useRef<HTMLDivElement>(null);
  const panelsRef = React.useRef<HTMLDivElement>(null);

  // Scroll-scrubbed: command bar drifts up and fades; the two work panels rise and settle.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;
    const head = headRef.current;
    if (head) {
      const p = clamp01(window.scrollY / (h * 0.5));
      head.style.transform = `translate3d(0,${(p * 50).toFixed(1)}px,0)`;
      head.style.opacity = (1 - 0.6 * p).toFixed(3);
    }
    const panels = panelsRef.current;
    if (panels) {
      const r = panels.getBoundingClientRect();
      const tp = clamp01((h - r.top) / (h * 0.6));
      panels.querySelectorAll<HTMLElement>("[data-panel]").forEach((el, i) => {
        const u = easeOut3((tp - i * 0.12) / 0.6);
        el.style.transform = `translate3d(0,${((1 - u) * 56).toFixed(1)}px,0)`;
        el.style.opacity = (0.15 + 0.85 * u).toFixed(3);
      });
    }
  });

  return (
    <div className="pt-32 md:pt-36 pb-12 bg-[#f8f9fa] min-h-screen font-sans selection:bg-[#fabf37] selection:text-black overflow-hidden">
      {/* Cinematic Grid & HUD Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fabf37]/30 to-transparent z-[50]" />

      <div className="container mx-auto px-4 max-w-[1800px] relative z-10">
        {/* Top Command Bar */}
        <div ref={headRef} className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 will-change-transform">
          <div className="flex items-center gap-8">
             <div className="space-y-1">
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-black flex items-center gap-3">
                  <Cpu className="size-8 text-[#fabf37]" />
                  {t(t('studio_v') || "Studio Interactive")}
                </h1>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-2">
                   <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   {t("studio_paperware_design_studio")}
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-xl p-2 rounded-2xl border border-black/5 shadow-sm">
             <div className="flex items-center gap-2 px-4 border-r border-black/5">
                <Database className="size-4 text-zinc-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/60">{t("studio_cloud_sync_enabled")}</span>
             </div>
             <div className="flex gap-2">
                <button onClick={() => { try { localStorage.setItem('paperware_studio_draft', JSON.stringify({ color, itemType, size, text, texture, fontFamily, finish, material })); toast.success('Draft saved on this device'); } catch { toast.error('Could not save the draft'); } }} className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 group">
                   <Save className="size-3 group-hover:scale-110 transition-transform" /> {t(t('save_draft') || "Save")}
                </button>
                <button onClick={() => { toast.info("Send us your spec through the quote form"); go("quote"); }} className="px-5 py-2.5 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 group">
                   <Download className="size-3 group-hover:translate-y-0.5 transition-transform" /> {t(t('export_spec') || "Export")}
                </button>
             </div>
          </div>
        </div>

        <div ref={panelsRef} className="grid lg:grid-cols-12 gap-10">
          {/* Left Panel: Configuration */}
          <div data-panel className="lg:col-span-3 space-y-6 will-change-transform">
            {/* HUD Status Monitor */}
            <div className="bg-black text-white rounded-3xl p-6 space-y-4 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal className="size-20 -rotate-12" />
               </div>
               <div className="flex justify-between items-center relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#fabf37]">{t("studio_terminal_log")}</span>
                  <div className="flex gap-1">
                     <div className="size-1 rounded-full bg-red-500" />
                     <div className="size-1 rounded-full bg-yellow-500" />
                     <div className="size-1 rounded-full bg-green-500" />
                  </div>
               </div>
               <div className="space-y-2 font-mono text-[9px] text-zinc-500 h-24 overflow-hidden relative z-10">
                  {consoleLogs.map((log, i) => (
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex gap-2">
                       <span className="text-[#fabf37]/40">&gt;</span>
                       <span>{t(log)}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-3xl p-2 flex gap-1 border border-black/5 shadow-sm">
               {[
                 { id: 'inventory', label: 'Matrix', icon: Layout },
                 { id: 'design', label: 'Identity', icon: Palette },
                 { id: 'material', label: 'Substrate', icon: Layers }
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#fabf37] text-black shadow-lg' : 'text-zinc-400 hover:bg-zinc-50'}`}
                 >
                   <tab.icon className="size-4" />
                   {t(tab.label)}
                 </button>
               ))}
            </div>

            {/* Dynamic Controls Content */}
            <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-[32px] p-6 min-h-[500px] shadow-xl">
               <AnimatePresence mode="wait">
                 {activeTab === 'inventory' && (
                   <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                      <SectionHeader title={t("studio_object_selection")} />
                      <div className="space-y-3">
                         {PRODUCTS_LIST.map(product => (
                           <button 
                             key={product.id}
                             onClick={() => handleProductSelect(product)}
                             className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${selectedProductId === product.id ? 'bg-black border-black text-white' : 'bg-white border-zinc-100 text-zinc-400 hover:border-black/10'}`}
                           >
                             <div className="size-12 rounded-xl bg-zinc-100 overflow-hidden flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                <img loading="lazy" decoding="async" src={product.image} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1">
                               <p className={`font-black text-[11px] uppercase tracking-widest ${selectedProductId === product.id ? 'text-[#fabf37]' : 'text-black'}`}>{t(product.name)}</p>
                               <p className="text-[9px] font-bold uppercase tracking-wider opacity-60">{t(product.category)}</p>
                             </div>
                             {selectedProductId === product.id && <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />}
                           </button>
                         ))}
                      </div>

                      <SectionHeader title={t("studio_industrial_scale")} />
                      <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL'].map(s => (
                          <button 
                            key={s}
                            onClick={() => { setSize(s); addLog(`Resized to ${s}`); }}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${size === s ? 'bg-black border-black text-[#fabf37]' : 'bg-white border-zinc-100 text-zinc-400 hover:border-black/10'}`}
                          >
                            {t(s)}
                          </button>
                        ))}
                      </div>
                   </motion.div>
                 )}

                 {activeTab === 'design' && (
                   <motion.div key="design" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                      <SectionHeader title={t("studio_color_profile")} />
                      <div className="grid grid-cols-4 gap-3">
                        {["#ffffff", "#fabf37", "#000000", "#e3d1ae", "#2a3b2b", "#1a2c3d", "#d1d5db", "#4b5563"].map(c => (
                          <button 
                            key={c}
                            onClick={() => { setColor(c); addLog(`Primary color adjusted to ${c}`); }}
                            className={`aspect-square rounded-xl border-4 transition-all hover:scale-110 ${color === c ? 'border-black' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>

                      <SectionHeader title={t("studio_visual_identity")} />
                      <label className="flex flex-col items-center justify-center w-full h-32 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[24px] cursor-pointer hover:bg-zinc-100 hover:border-[#fabf37] transition-all group overflow-hidden relative">
                        {logo ? (
                          <img loading="lazy" decoding="async" src={logo} className="w-full h-full object-contain p-4" />
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                             <Upload className="size-6 text-zinc-300 group-hover:text-[#fabf37] transition-colors" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("studio_upload_svg_png")}</span>
                          </div>
                        )}
                        <input type="file" className="hidden" onChange={handleImageUpload} />
                        {isAnalyzing && (
                          <motion.div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3">
                             <Scan className="size-8 text-[#fabf37] animate-bounce" />
                             <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">{t("studio_ai_scanning")}</span>
                          </motion.div>
                        )}
                      </label>
                      {logo && (
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 shrink-0">{t("studio_logo_size")}</span>
                          <input
                            type="range"
                            min="40"
                            max="180"
                            value={logoScale}
                            onChange={(e) => setLogoScale(parseInt(e.target.value))}
                            aria-label={t("studio_logo_size")}
                            className="flex-1 h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-black"
                          />
                          <span className="text-[9px] font-black tabular-nums text-black w-9 text-right">{logoScale}%</span>
                        </div>
                      )}

                      <SectionHeader title={t("studio_terminal_labeling")} />
                      <div className="relative">
                        <input 
                          type="text" 
                          value={text}
                          onChange={(e) => setText(e.target.value.toUpperCase())}
                          className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl py-4 px-6 font-black text-[12px] focus:border-[#fabf37] outline-none transition-all placeholder:text-zinc-300"
                          placeholder={t("studio_enter_brand_string")}
                        />
                        <Type className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-zinc-300" />
                      </div>
                   </motion.div>
                 )}

                 {activeTab === 'material' && (
                   <motion.div key="material" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                      <SectionHeader title={t("studio_engineered_substrate")} />
                      <div className="space-y-3">
                        {['Kraft', 'Bamboo', 'Recycled', 'Premium White'].map(m => (
                          <button 
                            key={m}
                            onClick={() => { setMaterial(m); addLog(`Substrate changed to ${m}`); }}
                            className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center justify-between ${material === m ? 'bg-black border-black text-white' : 'bg-white border-zinc-100 text-zinc-400 hover:border-black/10'}`}
                          >
                            <div className="flex items-center gap-3">
                               <div className={`size-3 rounded-full ${m === 'Bamboo' ? 'bg-emerald-500' : m === 'Kraft' ? 'bg-amber-800' : 'bg-zinc-400'}`} />
                               <span className="font-black uppercase tracking-widest text-[10px]">{t(m)} {t("studio_paper")}</span>
                            </div>
                            {material === m && <Sparkles className="size-4 text-[#fabf37]" />}
                          </button>
                        ))}
                      </div>

                      <SectionHeader title={t("studio_molecular_finish")} />
                      <div className="grid grid-cols-2 gap-3">
                        {['None', 'Gold Foil', 'Spot UV', 'Embossed'].map(f => (
                          <button 
                            key={f}
                            onClick={() => { setFinish(f); addLog(`Finish set to ${f}`); }}
                            className={`py-4 rounded-2xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${finish === f ? 'bg-black border-black text-[#fabf37]' : 'bg-white border-zinc-100 text-zinc-400 hover:border-black/10'}`}
                          >
                            {t(f)}
                          </button>
                        ))}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Immersive Preview */}
          <div data-panel className="lg:col-span-9 flex flex-col gap-8 h-full will-change-transform">
            <div className="bg-white rounded-[48px] border border-black/5 shadow-2xl relative overflow-hidden flex items-center justify-center p-12 min-h-[700px] group">
               {/* Glassmorphic Background Decor */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[#fabf37]/5 rounded-full blur-[100px] -z-10" />
               <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-50 to-transparent -z-10" />

               {/* Engine Controls Overlay */}
               <div className="absolute top-10 left-10 flex flex-col gap-3 z-30">
                  <div className="p-1 bg-black/5 rounded-2xl flex flex-col gap-1 border border-black/5">
                    <button onClick={() => setLighting('studio')} aria-label={t("studio_studio_lighting")} aria-pressed={lighting === 'studio'} className={`p-3 rounded-xl transition-all ${lighting === 'studio' ? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:text-black'}`}>
                      <Sun className="size-5" />
                    </button>
                    <button onClick={() => setLighting('night')} aria-label={t("studio_night_lighting")} aria-pressed={lighting === 'night'} className={`p-3 rounded-xl transition-all ${lighting === 'night' ? 'bg-black text-white shadow-lg' : 'text-zinc-400 hover:text-black'}`}>
                      <Moon className="size-5" />
                    </button>
                  </div>
                  <button onClick={() => { setRotation(15); addLog("Re-calibrating camera..."); }} aria-label={t("studio_reset_view")} className="p-4 bg-white border border-black/5 rounded-2xl text-zinc-400 hover:text-black hover:scale-110 transition-all shadow-sm">
                    <RotateCcw className="size-5" />
                  </button>
               </div>

               {/* Cinematic HUD Overlays */}
               <div className="absolute top-10 right-10 text-right z-30 pointer-events-none">
                  <div className="flex items-center gap-4 justify-end">
                     <div className="text-right">
                        <p className="text-[10px] font-black text-black uppercase tracking-[0.4em]">{t("papercups_3d_preview")}</p>
                        <p className="text-[9px] font-black text-[#fabf37] uppercase tracking-[0.3em] mt-1">{t("featured_products_magazine_ready")}</p>
                     </div>
                     <div className="h-10 w-px bg-black/10" />
                     <Globe className="size-6 text-black/10" />
                  </div>
               </div>

               {/* Dynamic Product Preview */}
               <div className="relative w-full h-full flex items-center justify-center perspective-[3000px] cursor-grab active:cursor-grabbing">
                  {(() => {
                    const mockup = (
                      <motion.div 
                        animate={{ rotateY: rotation, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 30, damping: 20 }}
                        className="relative z-20"
                      >
                        <div className={`transition-all duration-700 ${lighting === 'night' ? 'brightness-75 contrast-110' : 'brightness-100'}`}>
                          <MockupRenderer 
                            itemType={itemType} 
                            color={color} 
                            logo={logo} 
                            logoScale={logoScale}
                            text={text} 
                            fontFamily={fontFamily} 
                            finish={finish}
                            material={material}
                          />
                        </div>
                      </motion.div>
                    );
                    if (!SUPPORTS_3D.has(itemType) || !hasWebGL()) return mockup;
                    return (
                      <PreviewErrorBoundary fallback={mockup}>
                        <React.Suspense fallback={mockup}>
                          <ProductScene
                            itemType={itemType}
                            color={color}
                            logo={logo}
                            logoScale={logoScale}
                            text={text}
                            fontFamily={fontFamily}
                            finish={finish}
                            material={material}
                            lighting={lighting}
                            rotation={rotation}
                          />
                        </React.Suspense>
                      </PreviewErrorBoundary>
                    );
                  })()}

                  {/* Reflection & Shadow HUD */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-12 pointer-events-none opacity-20">
                     <span className="text-[8px] font-black uppercase tracking-[0.6em] text-black">{t("studio_z_axis")} {rotation}°</span>
                     <div className="size-1 rounded-full bg-black" />
                     <span className="text-[8px] font-black uppercase tracking-[0.6em] text-black">{t("studio_3d_preview")}</span>
                  </div>
               </div>

               {/* Interaction Slider */}
               <div className="absolute bottom-12 left-10 right-10 flex items-center gap-8 z-30">
                  <div className="flex items-center gap-3">
                     <Maximize2 className="size-4 text-zinc-300" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("studio_rotation")}</span>
                  </div>
                  <input 
                    type="range" 
                    min="-180" 
                    max="180" 
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    aria-label={t("studio_rotation")}
                    className="flex-1 h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-black hover:bg-zinc-200 transition-all"
                  />
                  <div className="flex items-center gap-3">
                     <Globe className="size-4 text-zinc-300" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("studio_global_view")}</span>
                  </div>
               </div>
            </div>

            {/* Bottom Insight Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

               <div className="bg-[#fabf37] text-black rounded-[32px] p-8 md:col-span-4 flex items-center justify-between shadow-xl group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Wand2 className="size-24 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                  </div>
                  <div className="space-y-4 relative z-10">
                     <div className="flex items-center gap-3">
                        <div className="size-2 bg-black rounded-full animate-ping" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">{t("studio_action_terminal")}</h4>
                     </div>
                     <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{t("export_request_form_initialize")} <br /> {t("studio_bulk_quotation")}</h3>
                  </div>
                  <button type="button" tabIndex={-1} aria-hidden="true" className="relative z-10 bg-black text-[#fabf37] size-20 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl group/btn">
                     <ArrowRight className="size-8 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #000;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #fabf37;
          box-shadow: 0 0 15px rgba(250,191,55,0.4);
        }
      `}</style>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-5 border-b border-black/5 pb-2">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">{t(title)}</h4>
      <div className="size-1.5 rounded-full bg-[#fabf37]" />
    </div>
  );
}

function MockupRenderer({ itemType, color, logo, logoScale = 100, text, fontFamily, finish, material }: any) {
  const { t } = useLanguage();
  const logoStyle = { width: `${logoScale}%`, maxWidth: "100%" } as React.CSSProperties;
  const isDark = color === '#000000' || color === '#1a2c3d' || color === '#2a3b2b';
  
  return (
    <div className="relative preserve-3d">
      {itemType === 'cup' && (
        /* Owner (2 Nov 2026): realistic paper cup — tapered body with cylindrical
           shading, rolled rim, visible interior, side seam, base ellipse, PET-style lid. */
        <div className="relative w-72 h-[440px]" style={{ filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.28))' }}>
          <svg viewBox="0 0 288 440" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <linearGradient id="pwf-cup-shade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.55" />
                <stop offset="0.14" stopColor="#000" stopOpacity="0.12" />
                <stop offset="0.36" stopColor="#fff" stopOpacity="0.30" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
                <stop offset="0.78" stopColor="#000" stopOpacity="0.06" />
                <stop offset="1" stopColor="#000" stopOpacity="0.58" />
              </linearGradient>
              <linearGradient id="pwf-cup-inner" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#5a4a2a" />
                <stop offset="1" stopColor="#1a1409" />
              </linearGradient>
              <linearGradient id="pwf-lid" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#d9d9d9" />
                <stop offset="0.35" stopColor="#ffffff" />
                <stop offset="0.7" stopColor="#f1f1f1" />
                <stop offset="1" stopColor="#c9c9c9" />
              </linearGradient>
              <clipPath id="pwf-cup-body">
                <path d="M18 60 L270 60 L232 412 Q144 436 56 412 Z" />
              </clipPath>
            </defs>
            {/* base colour */}
            <path d="M18 60 L270 60 L232 412 Q144 436 56 412 Z" fill={color} />
            {/* bottom base shadow band */}
            <path d="M57 404 Q144 430 231 404 L232 412 Q144 436 56 412 Z" fill="#000" opacity="0.35" />
          </svg>

          {/* artwork, clipped to the body */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-10 pt-24 text-center"
            style={{ clipPath: 'polygon(6.5% 13.6%, 93.5% 13.6%, 80.5% 93.6%, 19.5% 93.6%)' }}
          >
            {logo && (
              <motion.img loading="lazy" decoding="async"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={logo}
                style={{ width: `${Math.round(140 * logoScale / 100)}px`, maxWidth: '100%' }}
                className="mb-5"
              />
            )}
            <p
              className={`text-2xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}
              style={{
                fontFamily,
                textShadow: finish === 'Gold Foil' ? '0 0 20px rgba(250,191,55,0.6)' : 'none',
                transform: 'scaleX(0.94)',
              }}
            >
              {text}
            </p>
          </div>

          {/* cylindrical shading, paper grain, seam and rim — above the artwork */}
          <svg viewBox="0 0 288 440" className="absolute inset-0 size-full pointer-events-none" aria-hidden="true">
            <g clipPath="url(#pwf-cup-body)">
              <rect x="0" y="0" width="288" height="440" fill="url(#pwf-cup-shade)" style={{ mixBlendMode: 'multiply' }} />
              <rect x="0" y="0" width="288" height="440" fill="url(#pwf-cup-shade)" opacity="0.55" />
              {/* side seam */}
              <path d="M214 60 L186 420" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" />
              <path d="M216 60 L188 420" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.8" />
              {/* rim curl shadow under the lip */}
              <path d="M18 60 L270 60 L268 78 L20 78 Z" fill="#000" opacity="0.18" />
            </g>
            {/* rolled rim */}
            <ellipse cx="144" cy="60" rx="126" ry="13" fill={color} />
            <ellipse cx="144" cy="60" rx="126" ry="13" fill="url(#pwf-cup-shade)" opacity="0.7" />
            <ellipse cx="144" cy="60" rx="126" ry="13" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
            {/* lid, seated on the rim */}
            <ellipse cx="144" cy="60" rx="134" ry="15" fill="#9a9a9a" />
            <ellipse cx="144" cy="56" rx="134" ry="15" fill="url(#pwf-lid)" />
            <path d="M22 56 Q22 46 48 40 L240 40 Q266 46 266 56 Z" fill="url(#pwf-lid)" />
            <path d="M48 40 Q72 20 144 20 Q216 20 240 40 Z" fill="url(#pwf-lid)" />
            <ellipse cx="144" cy="40" rx="96" ry="8" fill="#e4e4e4" />
            <ellipse cx="144" cy="40" rx="96" ry="8" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1" />
            <ellipse cx="144" cy="30" rx="56" ry="5" fill="#dcdcdc" />
            <rect x="170" y="27" width="30" height="7" rx="3.5" fill="#6f6f6f" opacity="0.9" />
            <path d="M22 56 Q144 86 266 56" fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="2" />
            <path d="M24 60 Q144 88 264 60" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" />
          </svg>

          {/* paper grain */}
          <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none" style={{ backgroundImage: GRAIN_FINE, clipPath: 'polygon(6.5% 13.6%, 93.5% 13.6%, 80.5% 93.6%, 19.5% 93.6%)' }} />

          {/* floor contact shadow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[62%] h-7 bg-black/50 blur-[18px] rounded-full" />
        </div>
      )}

      {itemType === 'box' && (
        <div className="relative w-[500px] h-[340px] preserve-3d">
          <div 
            className="w-full h-full rounded-[48px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] relative overflow-hidden flex items-center justify-center border-b-[12px] border-black/10"
            style={{ 
              backgroundColor: color,
              transform: 'rotateX(10deg) translateZ(60px)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: GRAIN_BOARD }} />
            
            <div className="flex flex-col items-center p-12 text-center relative z-10">
               {logo && <img loading="lazy" decoding="async" src={logo} style={{ ...logoStyle, width: `${Math.round(200 * logoScale / 100)}px` }} className=" mb-8 drop-shadow-2xl" />}
               <p className={`text-5xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily }}>{text}</p>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/5 rounded-b-[24px] border-x-2 border-b-2 border-black/10" />
          </div>
          <div className="absolute bottom-0 left-[8%] right-[8%] h-14 bg-black/30 rounded-b-[48px] blur-[20px] -z-10" />
        </div>
      )}

      {itemType === 'bag' && (
        <div className="relative w-80 h-[480px] preserve-3d">
           <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-16 z-0">
              <div className="w-28 h-40 border-[12px] border-black/10 rounded-full" style={{ clipPath: 'inset(0 0 50% 0)' }} />
           </div>
           
           <div className="relative w-full h-full shadow-[0_70px_140px_-30px_rgba(0,0,0,0.4)] flex flex-col items-center overflow-hidden rounded-t-[10px]" style={{ backgroundColor: color }}>
              <div className="absolute inset-0 opacity-15 mix-blend-multiply" style={{ backgroundImage: GRAIN_BOARD }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
              
              <div className="mt-32 w-full flex flex-col items-center p-10 text-center relative z-10">
                 {logo && <img loading="lazy" decoding="async" src={logo} style={{ ...logoStyle, width: `${Math.round(180 * logoScale / 100)}px` }} className=" mb-8 drop-shadow-2xl" />}
                 <p className={`text-4xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily }}>{text}</p>
              </div>

              <div className="absolute left-0 top-0 bottom-0 w-10 bg-black/5" />
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-black/5" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/10" />
           </div>
           <div className="absolute top-0 right-0 w-16 h-full bg-black/20 origin-left rotate-y-90 translate-x-16" />
        </div>
      )}

      {itemType === 'brochure' && (
        <div className="relative w-[550px] h-[400px] flex preserve-3d">
          <div 
            className="flex-1 h-full shadow-2xl origin-right transition-all duration-700 hover:rotate-y-[-25deg] border-r border-black/5 rounded-l-2xl"
            style={{ 
              backgroundColor: color,
              transform: 'rotateY(-20deg)',
              transformStyle: 'preserve-3d'
            }}
          >
             <div className="absolute inset-0 opacity-15" style={{ backgroundImage: GRAIN_FINE }} />
             <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                {logo && <img loading="lazy" decoding="async" src={logo} style={{ ...logoStyle, width: `${Math.round(140 * logoScale / 100)}px` }} className=" mb-8 drop-shadow-xl" />}
                <p className={`text-2xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily }}>{text}</p>
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div 
            className="flex-1 h-full shadow-xl relative"
            style={{ backgroundColor: color }}
          >
             <div className="absolute inset-0 flex flex-col p-12 space-y-6">
                <div className="h-2 bg-black/10 w-3/4 rounded-full" />
                <div className="h-2 bg-black/10 w-full rounded-full" />
                <div className="h-2 bg-black/10 w-5/6 rounded-full" />
                <div className="flex-1" />
                <div className="grid grid-cols-2 gap-6 opacity-10">
                   <div className="aspect-square bg-black rounded-2xl" />
                   <div className="aspect-square bg-black rounded-2xl" />
                </div>
             </div>
          </div>
        </div>
      )}

      {itemType === 'pharm' && (
        <div className="relative w-56 h-80 preserve-3d">
          <div 
            className="w-full h-full rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col border border-black/5"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />
            
            <div className="h-20 bg-black/5 flex items-center justify-center p-6 border-b border-black/5">
              <div className="w-1/2 h-2 bg-black/10 rounded-full" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
               {logo && <img loading="lazy" decoding="async" src={logo} style={{ ...logoStyle, width: `${Math.round(120 * logoScale / 100)}px` }} className=" grayscale opacity-40 hover:opacity-100 transition-opacity" />}
               <div className="space-y-2">
                 <p className={`text-xl font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily }}>{text}</p>
                 <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">{t("pharma_supplies_medical_grade_packaging")}</p>
               </div>
               
               <div className="w-full pt-6 space-y-3 opacity-10">
                  <div className="flex justify-between">
                    <div className="h-1 bg-black w-1/4 rounded-full" />
                    <div className="h-1 bg-black w-1/2 rounded-full" />
                  </div>
                  <div className="h-1 bg-black w-full rounded-full" />
                  <div className="h-1 bg-black w-2/3 rounded-full" />
               </div>
            </div>
            
            <div className="absolute top-6 right-6 p-2 bg-white/10 rounded-full backdrop-blur-md opacity-40">
               <ShieldCheck className="size-5" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-10 h-full bg-black/15 origin-left rotate-y-90 translate-x-10" />
        </div>
      )}
    </div>
  );
}