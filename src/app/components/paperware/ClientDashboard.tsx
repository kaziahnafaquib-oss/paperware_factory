import { useState, useCallback, useMemo, useEffect, lazy, Suspense, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, Truck, FileText, Settings, Bell, Search, Filter, ArrowUpRight, Clock, MapPin, CircleCheck, ChevronRight, Download, CreditCard, Activity, User, Lock, Mail, Building2, ArrowRight, Eye, EyeOff, X, MoreHorizontal, ShieldCheck, History, ChartBar, Globe, Zap, Phone, Map, Briefcase, Ticket, Plus, RefreshCw, MessageSquare, FileQuestion, Gift, Megaphone, AlertCircle, ShoppingBag, Tag, Star, Share2, Camera, Play, Facebook, Instagram, Linkedin, Copy, Sparkles, Trash2, Users, ChevronDown, Rotate3d, Home } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";
import { ManagerCard } from "./manager-card";
import { ActionModal } from "./action-modal";
import { ActiveOrders } from "./ActiveOrders";
import { RecentInvoices } from "./RecentInvoices";
import { TrackingWidget } from "./TrackingWidget";
import { SocialFeed } from "./SocialFeed";
import { AccountOverview } from "./AccountOverview";
import { DigitalVault } from "./DigitalVault";
import { OrderHistory } from "./OrderHistory";
import { GlobalSettings } from "./GlobalSettings";
import { CommandPalette } from "./CommandPalette";
import {
  SustainabilityReport,
  AIInventoryForecasting,
  LogisticsNeuralNetwork,
  WarehouseManagement,
  DigitalTwinShowcase
} from "./DashboardAdditionalFeatures";

const SpendingChart = lazy(() => import('./SpendingChart'));

interface ClientDashboardProps {
  onLogout: () => void;
}

export function ClientDashboard({ onLogout }: ClientDashboardProps) {
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    // Simulate premium neural sync
    const timer = setTimeout(() => setIsLoading(false), 1800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const inviteProducts = useMemo(() => [
    t('prod_kraft_boxes'),
    t('prod_coffee_cups'),
    t('prod_food_containers'),
    t('prod_cartons'),
    t('prod_paper_bags'),
    t('prod_stickers')
  ], [t]);

  const orders = useMemo(() => [
    {
      id: "#PW-8821", date: "Oct 24, 2024", item: t('prod_kraft_boxes'), qty: `25,000 ${t('unit_pcs')}`, status: t('order_status_in_transit'), progress: 75, destination: "Dhaka, BD", origin: "Singapore", steps: [
        { label: t('order_step_placed'), date: "Oct 24", status: "completed" },
        { label: t('order_step_production'), date: "Oct 28", status: "completed" },
        { label: t('order_step_qc'), date: "Oct 30", status: "completed" },
        { label: t('order_step_shipping'), date: "Nov 02", status: "active" },
        { label: t('order_step_delivery'), date: "Est. Nov 05", status: "pending" }
      ]
    },
    {
      id: "#PW-8815", date: "Oct 20, 2024", item: t('prod_coffee_cups'), qty: `50,000 ${t('unit_pcs')}`, status: t('order_status_production'), progress: 40, destination: "Chittagong, BD", origin: "Shanghai", steps: [
        { label: t('order_step_placed'), date: "Oct 20", status: "completed" },
        { label: t('order_step_production'), date: "Oct 22", status: "active" },
        { label: t('order_step_qc'), date: t('order_step_pending'), status: "pending" },
        { label: t('order_step_shipping'), date: t('order_step_pending'), status: "pending" },
        { label: t('order_step_delivery'), date: "Est. Nov 15", status: "pending" }
      ]
    },
    {
      id: "#PW-8792", date: "Oct 12, 2024", item: t('prod_food_containers'), qty: `10,000 ${t('unit_pcs')}`, status: t('order_status_delivered'), progress: 100, destination: "Sylhet, BD", origin: "Dubai", steps: [
        { label: t('order_step_placed'), date: "Oct 12", status: "completed" },
        { label: t('order_step_production'), date: "Oct 14", status: "completed" },
        { label: t('order_step_qc'), date: "Oct 16", status: "completed" },
        { label: t('order_step_shipping'), date: "Oct 18", status: "completed" },
        { label: t('order_step_delivery'), date: "Oct 20", status: "completed" }
      ]
    }
  ], [t]);

  const docs = useMemo(() => [
    { name: "Proforma Invoice #92", date: "Oct 12", type: "Financial", size: "1.2MB" },
    { name: "Packing List - PW8821", date: "Oct 10", type: "Logistics", size: "845KB" },
    { name: "SGS Quality Cert", date: "Sep 28", type: "Quality", size: "2.4MB" }
  ], []);

  const spendingData = useMemo(() => [
    { month: t('month_jan'), amount: 45000 },
    { month: t('month_feb'), amount: 52000 },
    { month: t('month_mar'), amount: 48000 },
    { month: t('month_apr'), amount: 61000 },
    { month: t('month_may'), amount: 55000 },
    { month: t('month_jun'), amount: 67000 },
  ], [t]);

  const supportTickets = useMemo(() => [
    { id: "TK-204", subject: t('ticket_logo_adj'), status: t('ticket_status_open'), date: "2h ago", priority: t('ticket_priority_high') },
    { id: "TK-198", subject: t('ticket_shipping_delay'), status: t('ticket_status_closed'), date: "1d ago", priority: t('ticket_priority_medium') },
    { id: "TK-185", subject: t('ticket_billing_quest'), status: t('ticket_status_closed'), date: "3d ago", priority: t('ticket_priority_low') },
    { id: "TK-172", subject: t('ticket_prod_spec'), status: t('ticket_status_closed'), date: "1w ago", priority: t('ticket_priority_medium') },
  ], [t]);

  const suggestedProducts = useMemo(() => [
    { name: t('prod_straws'), price: "$0.02/unit", image: "https://images.unsplash.com/photo-1572048572872-2394404cf1f3?auto=format&fit=crop&q=80&w=200", tag: t('tag_new_arrival') },
    { name: t('prod_napkins'), price: "$0.01/unit", image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=200", tag: t('tag_best_seller') },
    { name: t('prod_paper_bags'), price: "$0.15/unit", image: "https://images.unsplash.com/photo-1623945033469-450f3c5f4035?auto=format&fit=crop&q=80&w=200", tag: t('tag_trending') },
    { name: t('prod_cutlery'), price: "$0.05/unit", image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=200", tag: t('tag_eco_choice') },
    { name: t('prod_plates'), price: "$0.12/unit", image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80&w=200", tag: t('tag_organic') },
    { name: t('prod_salad_bowls'), price: "$0.18/unit", image: "https://images.unsplash.com/photo-1534939561126-855f86218185?auto=format&fit=crop&q=80&w=200", tag: t('tag_popular') },
    { name: t('prod_hot_cups'), price: "$0.08/unit", image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&q=80&w=200", tag: t('tag_winter_special') },
    { name: t('prod_carriers'), price: "$0.10/unit", image: "https://images.unsplash.com/photo-1605642913174-2c634c0587d5?auto=format&fit=crop&q=80&w=200", tag: t('tag_durable') },
    { name: t('prod_spoons'), price: "$0.04/unit", image: "https://images.unsplash.com/photo-1627995964724-c155d0459c0d?auto=format&fit=crop&q=80&w=200", tag: t('tag_eco_friendly') },
    { name: t('prod_burger_boxes'), price: "$0.09/unit", image: "https://images.unsplash.com/photo-1594910069352-78d2b9986345?auto=format&fit=crop&q=80&w=200", tag: t('tag_greaseproof') },
    { name: t('prod_clear_cups'), price: "$0.06/unit", image: "https://images.unsplash.com/photo-1596450514734-60c7f2025359?auto=format&fit=crop&q=80&w=200", tag: t('tag_recyclable') },
    { name: t('prod_pizza_boxes'), price: "$0.25/unit", image: "https://images.unsplash.com/photo-1593560708920-639846018318?auto=format&fit=crop&q=80&w=200", tag: t('tag_customizable') },
    { name: t('prod_sushi_trays'), price: "$0.20/unit", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=200", tag: t('tag_premium') },
    { name: t('prod_tissue_packs'), price: "$0.03/unit", image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=200", tag: t('tag_soft') },
    { name: t('prod_trash_bags'), price: "$0.10/unit", image: "https://images.unsplash.com/photo-1610444391696-6d24495574c8?auto=format&fit=crop&q=80&w=200", tag: t('tag_biodegradable') },
  ], [t]);

  const feedItems = useMemo(() => [
    t('feed_item_1'),
    t('feed_item_2'),
    t('feed_item_3'),
    t('feed_item_4')
  ], [t]);

  const notifications = useMemo(() => [
    { title: t('notif_order_shipped'), desc: t('notif_order_shipped_desc'), time: "2h ago", type: "logistics" },
    { title: t('notif_invoice_ready'), desc: t('notif_invoice_ready_desc'), time: "5h ago", type: "finance" },
    { title: t('notif_qc_passed'), desc: t('notif_qc_passed_desc'), time: "1d ago", type: "quality" }
  ], [t]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [selectedStat, setSelectedStat] = useState<any>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // New State for Modals
  const [activeModal, setActiveModal] = useState<'order' | 'reorder' | 'quote' | 'support' | 'sample' | null>(null);
  const [showAllTickets, setShowAllTickets] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState<any>(null);
  const [feedbackChallan, setFeedbackChallan] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Invite Modal State
  const [inviteList, setInviteList] = useState<{ value: string, type: 'email' | 'phone' }[]>([]);
  const [inviteInput, setInviteInput] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [selectedInviteProduct, setSelectedInviteProduct] = useState<string | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const stats = useMemo(() => [
    {
      label: t('portal_active_orders'),
      val: "12",
      icon: Package,
      trend: "+2 this month",
      detail: t('portal_production_status_desc'),
      breakdown: [
        { label: t('portal_production'), count: 8, color: "bg-[#fabf37]" },
        { label: t('portal_shipping'), count: 4, color: "bg-emerald-500" }
      ]
    },
    {
      label: t('portal_pending_quotes'),
      val: "04",
      icon: FileText,
      trend: t('requires_action') || "Requires Action",
      detail: t('portal_quotes_review_desc'),
      breakdown: [
        { label: t('portal_status_draft'), count: 1, color: "bg-zinc-200" },
        { label: t('portal_awaiting_review'), count: 3, color: "bg-[#fabf37]" }
      ]
    },
    {
      label: t('portal_total_savings'),
      val: "14%",
      icon: CreditCard,
      trend: t('sustainable_credit') || "Sustainable Credit",
      detail: t('portal_eco_discount_desc') || "Eco-friendly discount applied",
      breakdown: [
        { label: t('portal_eco_credit'), count: "8%", color: "bg-emerald-500" },
        { label: t('portal_bulk_discount'), count: "6%", color: "bg-black" }
      ]
    }
  ], [t]);

  const quickActions = useMemo(() => [
    { icon: Plus, label: t('portal_new_order_label'), color: "bg-black text-white", action: 'order' },
    { icon: RefreshCw, label: t('portal_re_order'), color: "bg-[#fabf37] text-black", action: 'reorder' },
    { icon: FileQuestion, label: t('portal_request_quote'), color: "bg-zinc-100 text-black", action: 'quote' },
    { icon: MessageSquare, label: t('portal_support'), color: "bg-zinc-100 text-black", action: 'support' },
    { icon: Gift, label: t('portal_request_sample'), color: "bg-purple-100 text-purple-600", action: 'sample' },
  ], [t]);

  // Profile Menu Pages
  const [showAccountOverview, setShowAccountOverview] = useState(false);
  const [showDigitalVault, setShowDigitalVault] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showGlobalSettings, setShowGlobalSettings] = useState(false);
  const [showDigitalTwin, setShowDigitalTwin] = useState(false);

  const handleAddContact = useCallback(() => {
    if (!inviteInput) return;
    const type = inviteInput.includes('@') ? 'email' : 'phone';
    setInviteList(prev => [...prev, { value: inviteInput, type }]);
    setInviteInput('');
  }, [inviteInput]);

  const handleAiGenerate = useCallback(() => {
    setIsAiGenerating(true);
    setTimeout(() => {
      const productText = selectedInviteProduct ? `specifically our ${selectedInviteProduct}` : "our sustainable packaging solutions";
      const templates = [
        `Hi! I've been using Paperware for ${productText} and it's been a game changer. Wanted to share this invite with you for 15% off!`,
        `Hey, check out Paperware for ${productText}. I think it would be great for your business. Here's an invite link.`,
        `Found this amazing platform for sourcing packaging. Great quality ${selectedInviteProduct ? `on ${selectedInviteProduct}` : ""} and reliable delivery. Use my referral link to join!`
      ];
      setInviteMessage(templates[Math.floor(Math.random() * templates.length)]);
      setIsAiGenerating(false);
      toast.success("Message generated with AI ✨");
    }, 1000);
  }, [selectedInviteProduct]);

  const filteredStatOrders = useMemo(() => {
    if (!selectedStat?.activeCategory) return [];
    return orders.filter(o => {
      if (selectedStat.activeCategory === 'Production') return o.status === 'Production';
      if (selectedStat.activeCategory === 'Shipping') return o.status === 'In Transit' || o.status === 'Shipping';
      return true;
    });
  }, [selectedStat?.activeCategory]);

  const isOverlayOpen = selectedOrder || selectedDoc || selectedStat || showAllOrders || activeModal || showAllTickets || selectedTicket || showTracking || selectedInvoice || showAllInvoices || selectedChallan || feedbackChallan || showInviteModal || showAccountOverview || showDigitalVault || showOrderHistory || showGlobalSettings || showDigitalTwin || isCommandPaletteOpen;

  // Render logic from lines 427-2283 of original file, with adjustments for props/state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="size-24 border-2 border-zinc-100 rounded-full border-t-[#fabf37]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-12 bg-black rounded-2xl flex items-center justify-center text-[#fabf37] font-black text-xl shadow-2xl">
              P
            </div>
          </div>
        </div>
        <div className="space-y-2 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 animate-pulse">Establishing Neural Link...</p>
          <div className="h-1 w-48 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-black"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-zinc-50 pt-32 pb-20 ${isRTL ? 'rtl' : 'ltr'} relative transition-all duration-150 ${isOverlayOpen ? 'overflow-hidden' : ''}`}>
      {/* Dynamic Background Blur Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[100] transition-all duration-150"
            onClick={() => {
              setSelectedOrder(null);
              setSelectedDoc(null);
              setSelectedStat(null);
              setShowAllOrders(false);
              setActiveModal(null);
              setShowAllTickets(false);
              setSelectedInvoice(null);
              setShowAllInvoices(false);
              setSelectedChallan(null);
              setFeedbackChallan(null);
              setShowInviteModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`container mx-auto px-4 max-w-7xl relative z-10 transition-all duration-200 ease-in-out ${isOverlayOpen ? 'scale-[0.98] opacity-40 blur-[2px]' : 'scale-100 opacity-100 blur-0'}`}
      >
        {/* Portal Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="px-3 md:px-4 py-1 bg-black text-[#fabf37] text-[8px] md:text-[9px] font-black rounded-full uppercase tracking-widest">{t('portal_enterprise')}</div>
              <div className="h-px w-6 md:w-8 bg-zinc-200" />
            </div>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-black flex flex-wrap items-baseline gap-x-3 md:gap-x-4 leading-[0.85]">
              {t('portal_client')} <span className="text-zinc-300">{t('portal_hub')}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4 relative w-full md:w-auto justify-between md:justify-start z-50">
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setShowInviteModal(true);
              }}
              className={`size-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center transition-all relative z-50 ${showInviteModal ? 'bg-[#fabf37] border-black text-black' : 'hover:bg-zinc-50 text-zinc-400'}`}
            >
              <Gift className="size-6" />
            </button>

            <div className="relative z-50">
              <button
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                }}
                className={`size-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center transition-all relative z-50 ${showNotifications ? 'bg-[#fabf37] border-black text-black' : 'hover:bg-zinc-50 text-zinc-400'}`}
              >
                <Bell className="size-6" />
                <div className="absolute top-4 right-4 size-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[200]"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="fixed top-24 right-4 md:right-8 w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] overflow-y-auto bg-white rounded-[40px] border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] p-8 z-[250]"
                      onClick={(e: MouseEvent) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black">{t('portal_live_feed')}</p>
                        <button onClick={() => setShowNotifications(false)} className="size-8 rounded-full bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all"><X className="size-4" /></button>
                      </div>
                      <div className="space-y-6">
                        {notifications.map((n, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setShowNotifications(false);
                              if (n.type === 'logistics') {
                                const orderId = n.desc.match(/#PW-\d+/)?.[0];
                                const order = orders.find(o => o.id === orderId) || orders[0];
                                setSelectedOrder(order);
                              } else if (n.type === 'finance') {
                                setSelectedDoc(docs[0]);
                              } else {
                                setSelectedStat({
                                  label: "Notification Detail",
                                  val: n.title,
                                  icon: Bell,
                                  trend: n.time,
                                  detail: n.desc,
                                  breakdown: []
                                });
                              }
                            }}
                            className="flex gap-4 group cursor-pointer"
                          >
                            <div className="size-2 rounded-full bg-[#fabf37] mt-1 shrink-0 group-hover:scale-150 transition-transform" />
                            <div className="space-y-1">
                              <p className="text-[12px] font-black uppercase text-black">{n.title}</p>
                              <p className="text-[11px] text-zinc-500 font-bold leading-relaxed">{n.desc}</p>
                              <p className="text-[9px] text-zinc-300 font-black uppercase tracking-widest pt-1">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-50">
              <button
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                  toast.info("Accessing Enterprise Profile: John Doe", {
                    description: "Role: Logistics Director | ID: PW-8821-B | Region: APAC HQ",
                  });
                }}
                className={`h-16 px-8 rounded-[32px] bg-white border border-black/5 shadow-sm flex items-center gap-5 transition-all group ${showProfileMenu ? 'border-black ring-8 ring-black/5' : 'hover:bg-zinc-50'}`}
              >
                <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black font-black text-base relative shadow-inner">
                  JD
                  <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-[12px] font-black uppercase tracking-tight flex items-center gap-2 group-hover:text-[#fabf37] transition-colors">
                    John Doe
                    <ChevronRight className={`size-3 transition-transform duration-150 ${showProfileMenu ? 'rotate-90' : ''}`} />
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t('role_logistics_director')}</p>
                    <div className="size-1 bg-zinc-200 rounded-full" />
                    <p className="text-[10px] font-black text-[#fabf37]">ID: 8821-B</p>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setShowProfileMenu(false)}
                      className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[200]"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="fixed top-24 right-4 md:right-8 w-72 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] overflow-y-auto bg-white border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] z-[250]"
                      onClick={(e: MouseEvent) => e.stopPropagation()}
                    >
                      <div className="p-8 space-y-4">
                        <button
                          type="button"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            setShowProfileMenu(false);
                            setShowAccountOverview(true);
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all group"
                        >
                          <User className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-black">{t('portal_account_overview')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            setShowProfileMenu(false);
                            setShowDigitalVault(true);
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all group"
                        >
                          <ShieldCheck className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-black">{t('portal_digital_vault')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            setShowProfileMenu(false);
                            setShowOrderHistory(true);
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all group"
                        >
                          <History className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-black">{t('portal_order_history')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            setShowProfileMenu(false);
                            setShowGlobalSettings(true);
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all group"
                        >
                          <Settings className="size-5 text-zinc-400 group-hover:text-black transition-colors" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-black">{t('portal_global_settings')}</span>
                        </button>

                        <div className="h-px bg-zinc-100 my-4" />
                        <button
                          type="button"
                          onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            setShowProfileMenu(false);
                            onLogout();
                            toast.success("Session logged out securely.");
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 transition-all hover:bg-red-100"
                        >
                          <Lock className="size-5" />
                          <span className="text-[11px] font-black uppercase tracking-widest">{t('portal_logout_session')}</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-10">
            {/* Client Profile & Details Card */}
            <div className="bg-white rounded-[40px] p-8 border border-black/5 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fabf37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="size-24 rounded-[32px] bg-black text-[#fabf37] flex items-center justify-center text-3xl font-black shadow-xl">
                    GL
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Global Logistics</h2>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ID: C-8821 • Gulshan 1, Dhaka</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">{t('portal_premium_tier')}</span>
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-[9px] font-black uppercase tracking-widest">{t('portal_verified')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-8 px-6 py-3 bg-zinc-50 rounded-2xl border border-black/5">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t('portal_total_orders')}</p>
                      <p className="text-xl font-black">142</p>
                    </div>
                    <div className="h-8 w-px bg-zinc-200" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t('portal_total_spent')}</p>
                      <p className="text-xl font-black">৳ 4.2M</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAllOrders(true)}
                    className="w-full py-3 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all"
                  >
                    {t('portal_view_all_sales')}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Inventory Forecasting */}
            <AIInventoryForecasting t={t} />

            {/* Invoice Reminder */}
            <div className="bg-red-50 border border-red-100 rounded-[32px] p-6 flex items-center justify-between gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="size-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <AlertCircle className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wide text-red-900">{t('portal_invoice_due')}</h4>
                  <p className="text-[10px] font-bold text-red-700 mt-0.5">{t('portal_invoice_reminder_desc')}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 relative z-10">
                <button
                  onClick={() => toast.info("Payment Gateway Integration Coming Soon!", {
                    description: "In the future, you will be able to pay via Bank Transfer, bKash, and Nagad.",
                    icon: <CreditCard className="size-4 text-[#fabf37]" />
                  })}
                  className="px-5 py-2.5 bg-red-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                >
                  {t('portal_pay_now')}
                </button>
                <span className="text-[8px] font-bold text-red-400 uppercase tracking-widest">{t('portal_coming_soon')}</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStat(stat)}
                  className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-black/5 shadow-sm space-y-2 md:space-y-4 group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="size-10 md:size-14 rounded-xl bg-zinc-50 flex items-center justify-center text-black group-hover:bg-[#fabf37] transition-colors shadow-sm">
                    <stat.icon className="size-5 md:size-7" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                    <div className="flex items-baseline gap-1 md:gap-2">
                      <p className="text-2xl md:text-4xl font-black italic">{stat.val}</p>
                      <span className="text-[8px] md:text-[10px] font-bold text-emerald-600 uppercase">{stat.trend}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Spending Analytics Chart */}
            <Suspense fallback={<div className="h-[250px] w-full bg-zinc-100 rounded-[40px] animate-pulse" />}>
              <SpendingChart data={spendingData} />
            </Suspense>

            {/* Active Orders List */}
            <ActiveOrders
              onViewAll={() => setShowAllOrders(true)}
              onSelectOrder={setSelectedOrder}
            />

            {/* Recent Invoices List */}
            <RecentInvoices
              onViewAll={() => setShowAllInvoices(true)}
              onSelectInvoice={setSelectedInvoice}
            />

            {/* Delivery Challans Section */}
            <div className="bg-white rounded-[40px] md:rounded-[60px] border border-black/5 shadow-sm overflow-hidden">
              <div className="p-6 md:p-10 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/30">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-zinc-100 flex items-center justify-center text-black">
                    <Truck className="size-5" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight">{t('portal_delivery_challans')}</h3>
                </div>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {t('portal_total_received')}: 12
                </span>
              </div>
              <div className="divide-y divide-zinc-100">
                {[
                  { id: "DC-8821-01", date: "Dec 25, 2025", items: "Custom Kraft Boxes (Part 1)", qty: "10,000", status: "Received" },
                  { id: "DC-8815-03", date: "Dec 10, 2025", items: "Premium Coffee Cups", qty: "50,000", status: "Received" },
                  { id: "DC-8792-01", date: "Dec 05, 2025", items: "Food Containers", qty: "10,000", status: "Received" }
                ].map((challan, i) => (
                  <div key={i} onClick={() => setSelectedChallan(challan)} className="p-6 md:p-8 flex items-center justify-between hover:bg-zinc-50/50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="size-2 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{challan.id}</p>
                        <p className="text-sm font-black uppercase tracking-tight text-[12px]">{challan.items}</p>
                        <p className="text-[10px] font-bold text-zinc-500 mt-1">Qty: {challan.qty} • {challan.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e: MouseEvent) => { e.stopPropagation(); setFeedbackChallan(challan); }}
                      className="px-5 py-2.5 bg-zinc-100 text-zinc-600 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-[#fabf37] transition-all flex items-center gap-2"
                    >
                      <Star className="size-3" />
                      {t('portal_product_feedback')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <TrackingWidget
              onOpenTracking={() => { setShowTracking(true); toast.success("Tracking shipment #PW-8821"); }}
            />

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowDigitalTwin(true)}
                className="col-span-2 p-6 rounded-[32px] bg-gradient-to-br from-[#fabf37] to-black text-white flex items-center justify-between gap-4 transition-transform hover:scale-[1.02] group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Rotate3d className="size-6 text-[#fabf37]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Pro Feature</p>
                    <p className="text-sm font-black uppercase">3D Digital Twin Lab</p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModal(action.action as any)}
                  className={`p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 text-center transition-transform hover:scale-105 ${action.color}`}
                >
                  <action.icon className="size-6" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-tight">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Support Tickets Preview */}
            <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest">{t('portal_support_tickets')}</h3>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[9px] font-black">{supportTickets.filter(t => t.status === 'Open').length} {t('portal_open')}</span>
              </div>
              <div className="space-y-3">
                {supportTickets.slice(0, 2).map((ticket, i) => (
                  <div key={i} className="p-4 bg-zinc-50 rounded-2xl flex items-center justify-between group hover:bg-black hover:text-white transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Ticket className="size-3 text-zinc-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">{ticket.id}</span>
                      </div>
                      <p className="text-[10px] font-bold">{ticket.subject}</p>
                    </div>
                    <div className={`size-2 rounded-full ${ticket.status === 'Open' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAllTickets(true)} className="w-full py-3 border border-black/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                {t('portal_view_all_tickets')}
              </button>
            </div>

            <div className="bg-white p-10 rounded-[60px] border border-black/5 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tight">{t('portal_vault')}</h3>
                <button onClick={() => toast("Vault filter applied")}><Filter className="size-4 text-zinc-300 hover:text-black transition-colors" /></button>
              </div>
              <div className="space-y-4">
                {docs.map((doc, i) => (
                  <div key={i} onClick={() => setSelectedDoc(doc)} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                    <div className="flex items-center gap-4">
                      <FileText className="size-4 text-zinc-400 group-hover:text-[#fabf37] transition-colors" />
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-tight">{doc.name}</p>
                        <p className="text-[8px] font-bold text-zinc-400">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <Download className="size-4 text-zinc-200 group-hover:text-black transition-colors" />
                  </div>
                ))}
              </div>
              <button onClick={(e: MouseEvent) => { e.preventDefault(); toast.success("Accessing Secure Vault..."); setSelectedDoc({ name: "All Documents", date: "Archive", type: "Directory", size: "N/A" }); }} className="w-full py-5 bg-zinc-50 border border-black/5 rounded-[32px] text-[9px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                {t('portal_access_all_docs')}
              </button>
            </div>

            {/* Messages & Offers Box */}
            <div className="bg-[#1a1a1a] p-8 rounded-[40px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#fabf37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                    <Megaphone className="size-5 text-[#fabf37]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">{t('portal_offers_updates')}</h3>
                    <p className="text-[9px] font-bold text-zinc-500">{t('portal_latest_updates')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-[#fabf37] text-black text-[8px] font-black uppercase">Promo</span>
                      <span className="text-[8px] font-bold text-zinc-500">Expires in 2d</span>
                    </div>
                    <h4 className="font-bold text-xs mb-1">Free Shipping on Bulk Orders</h4>
                    <p className="text-[9px] text-zinc-400 leading-relaxed">Place an order over 50k units this week and get free global shipping.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[8px] font-black uppercase">New</span>
                      <span className="text-[8px] font-bold text-zinc-500">Just now</span>
                    </div>
                    <h4 className="font-bold text-xs mb-1">Sustainable Ink Upgrade</h4>
                    <p className="text-[9px] text-zinc-400 leading-relaxed">We've upgraded our printing process to 100% soy-based inks.</p>
                  </div>
                </div>

                <button onClick={() => toast.success("Loading all active offers...")} className="w-full py-4 bg-[#fabf37] text-black rounded-2xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                  {t('portal_view_all_offers')}
                </button>
              </div>
            </div>

            <ManagerCard />

            {/* Security & Compliance Section */}
            <div className="bg-white rounded-[40px] p-6 md:p-10 border border-black/5 shadow-sm space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 shadow-inner">
                    <ShieldCheck className="size-6 md:size-8" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-zinc-900">{t('portal_security_compliance')}</h3>
                    <p className="text-[7px] md:text-[8px] font-bold text-zinc-400 uppercase tracking-widest text-emerald-600/60">Enterprise Grade Protection • Last Audit: 24h ago</p>
                  </div>
                </div>
                <button className="w-full md:w-auto px-4 py-2.5 bg-black text-[#fabf37] rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all flex items-center justify-center gap-2 shadow-xl group/btn active:scale-95">
                  <FileText className="size-3 group-hover/btn:scale-110 transition-transform" />
                  <span className="truncate">{t('portal_download_report')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
                {[
                  { id: "ISO", title: "ISO 9001:2015", label: "Certification", desc: "Quality Management System certified for global manufacturing standards.", icon: <CircleCheck className="size-3" /> },
                  { id: "GDPR", title: "GDPR Compliant", label: "Data Privacy", desc: "All client data is encrypted and processed according to EU regulations.", icon: <Lock className="size-3" /> },
                  { id: "FSC", title: "FSC Certified", label: "Sustainability", desc: "Sourced from responsibly managed forests catering to eco-goals.", icon: <Globe className="size-3" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col space-y-2 group/card">
                    <div className="flex items-center gap-1.5 px-1">
                      <div className="size-4 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 scale-75">{item.icon}</span>
                      </div>
                      <span className="text-[7.5px] font-black uppercase tracking-[0.1em] text-zinc-400">{item.label}</span>
                    </div>

                    <div className="bg-zinc-50/50 rounded-[20px] p-3.5 border border-black/5 hover:bg-white hover:shadow-xl transition-all flex flex-col items-start gap-3 h-full">
                      <div className="size-8 bg-white border border-black/5 rounded-lg flex items-center justify-center font-black text-[9px] shadow-sm transform group-hover/card:scale-105 transition-all">{item.id}</div>
                      <div className="space-y-1">
                        <h4 className="font-black text-[10px] leading-tight uppercase tracking-tight text-zinc-800">{item.title}</h4>
                        <p className="text-[8px] text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End of Security & Compliance Section */}
          </div>
          {/* End of lg:col-span-4 column */}
        </div>
        {/* End of main grid (lg:col-span-8 and lg:col-span-4) */}

        {/* Full Width Sections */}
        <div className="space-y-10 mt-10">

          <SustainabilityReport t={t} />

          <LogisticsNeuralNetwork t={t} />

          <WarehouseManagement t={t} />

          {/* Section Divider/Header */}
          <div className="flex items-center gap-4 px-4 opacity-50">
            <div className="h-px bg-black/10 flex-1" />
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              <Globe className="size-3" />
              <span>Global Network Pulse</span>
            </div>
            <div className="h-px bg-black/10 flex-1" />
          </div>

          {/* Live Digital Feed */}
          <div className="bg-black rounded-[32px] p-1 overflow-hidden">
            <div className="bg-[#1a1a1a] rounded-[28px] p-4 flex items-center gap-4 overflow-hidden relative">
              <div className="px-3 py-1 bg-[#fabf37] rounded-full text-[8px] font-black uppercase tracking-widest text-black shrink-0 z-10">
                Live Feed
              </div>
              <div className="flex-1 overflow-hidden relative h-6">
                <motion.div
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute whitespace-nowrap flex items-center gap-8 text-[10px] font-bold text-zinc-400"
                >
                  {feedItems.map((item, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="size-1 bg-[#fabf37] rounded-full" />
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Referral Section */}
          <div className="bg-gradient-to-br from-[#fabf37] to-[#eacb48] rounded-[48px] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-md">
                <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-black shadow-inner">
                  <Gift className="size-7" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-black">Refer & Earn Rewards</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Refer a business partner to Paperware and earn up to <span className="text-black font-black">15% credit</span> on your next bulk order. It's our way of saying thanks.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-8 py-4 bg-black text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Share2 className="size-4" />
                  Invite Partners
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Products Scroll */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black uppercase tracking-tight">Suggested For You</h3>
              <div className="flex gap-2">
                <button className="size-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"><ChevronRight className="size-4 rotate-180" /></button>
                <button className="size-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"><ChevronRight className="size-4" /></button>
              </div>
            </div>
            <div className="overflow-hidden relative pb-6 group">
              <motion.div
                className="flex gap-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
                style={{ width: "fit-content" }}
              >
                {[...suggestedProducts, ...suggestedProducts].map((product, i) => (
                  <div key={i} className="min-w-[200px] md:min-w-[240px] bg-white rounded-[32px] p-4 border border-black/5 hover:shadow-xl transition-all group-hover:scale-[0.98] hover:!scale-105 cursor-pointer">
                    <div className="aspect-square rounded-2xl bg-zinc-50 mb-4 overflow-hidden relative">
                      <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-[8px] font-black uppercase tracking-wider text-white">
                        {product.tag}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black uppercase text-xs tracking-wide">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-zinc-400">{product.price}</p>
                        <button className="size-6 rounded-full bg-[#fabf37] flex items-center justify-center text-black hover:scale-110 transition-transform">
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Social Media Feed */}
          <SocialFeed />
        </div>
      </motion.div>
      <ActionModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} type={activeModal} />

      <AnimatePresence mode="wait">
        {/* Tickets Modal */}
        {showAllTickets && (
          <motion.div
            key="tickets-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
            onClick={() => setShowAllTickets(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl border border-black/5 p-8 md:p-12 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">Support History</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">All previous inquiries and resolutions</p>
                </div>
                <button onClick={() => setShowAllTickets(false)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <X className="size-6" />
                </button>
              </div>
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {supportTickets.map((ticket, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    onClick={() => setSelectedTicket(ticket)}
                    className="p-6 bg-zinc-50 rounded-3xl flex items-center justify-between group hover:bg-black hover:text-white transition-colors cursor-pointer border border-black/5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${ticket.status === 'Open' ? 'bg-red-500 text-white' : 'bg-zinc-200 text-zinc-500 group-hover:bg-zinc-800'}`}>{ticket.status}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500">{ticket.id}</span>
                      </div>
                      <h4 className="font-bold text-sm">{ticket.subject}</h4>
                    </div>
                    <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
              <button onClick={() => { setShowAllTickets(false); setActiveModal('support'); }} className="w-full py-5 mt-6 bg-black text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                Open New Ticket
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Stat Modal */}
        {selectedStat && (
          <motion.div
            key="stat-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
            onClick={() => setSelectedStat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateX: 10 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.9, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden"
            >
              <div className="absolute top-8 right-8">
                <button onClick={() => setSelectedStat(null)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <X className="size-6" />
                </button>
              </div>
              <div className="space-y-8 text-center">
                <div className="size-24 rounded-[32px] bg-zinc-50 mx-auto flex items-center justify-center text-black shadow-inner">
                  <selectedStat.icon className="size-12" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{selectedStat.label}</p>
                  <h2 className="text-6xl font-black italic">{selectedStat.val}</h2>
                  <p className="text-sm font-bold text-zinc-500 uppercase">{selectedStat.detail}</p>
                </div>
                <div className="space-y-4 pt-4">
                  {selectedStat.activeCategory ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <button
                        onClick={() => setSelectedStat({ ...selectedStat, activeCategory: null })}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors mb-4 group mx-auto"
                      >
                        <ChevronRight className="size-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        {t('portal_back_to_overview')}
                      </button>
                      <div className="space-y-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar text-left">
                        {filteredStatOrders.map((order: any, i: number) => (
                          <motion.div
                            key={order.id}
                            layoutId={`order-${order.id}`}
                            onClick={() => {
                              setSelectedStat(null);
                              setSelectedOrder(order);
                            }}
                            className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-black/5 hover:bg-white hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-3 pr-8">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">{order.id}</span>
                                <span className="text-[9px] font-bold text-zinc-300 group-hover:text-zinc-400 transition-colors">{order.date}</span>
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${order.status === 'Production' ? 'bg-[#fabf37]/20 text-black' : 'bg-blue-100 text-blue-700'}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="font-bold text-sm mb-1">{order.item}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    selectedStat.breakdown?.map((item: any, i: number) => (
                      <motion.button
                        layout
                        whileHover={{ scale: 1.02, backgroundColor: "#f4f4f5" }}
                        whileTap={{ scale: 0.98 }}
                        key={`breakdown-${item.label}-${i}`}
                        onClick={() => {
                          setSelectedStat({ ...selectedStat, activeCategory: item.label });
                        }}
                        style={{ backgroundColor: "#fafafa" }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl cursor-pointer group border border-transparent hover:border-black/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`size-3 rounded-full ${item.color} shadow-sm group-hover:ring-2 ring-offset-2 ring-black/5 transition-all`} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-black transition-colors">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black group-hover:text-[#fabf37] transition-colors">{item.count}</span>
                          <ChevronRight className="size-3 text-zinc-300 group-hover:text-black transition-colors" />
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
                <button onClick={() => setSelectedStat(null)} className="w-full py-5 bg-black text-[#fabf37] rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                  {t('portal_close_report')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <motion.div
            key="invite-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[250] flex items-center justify-center p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-8"
            >
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-3 rounded-full bg-[#fabf37]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Growth Network</p>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">Invite Partners</h2>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Grow your sustainable network. Invite partners to Paperware and earn <span className="text-black font-black">15% credits</span> on their first bulk order.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Add Contacts</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter email or phone..."
                      value={inviteInput}
                      onChange={(e) => setInviteInput(e.target.value)}
                      className="flex-1 bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-black focus:ring-2 focus:ring-[#fabf37] outline-none"
                    />
                    <button
                      onClick={handleAddContact}
                      className="size-14 rounded-2xl bg-black text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-colors"
                    >
                      <Plus className="size-6" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {inviteList.map((invite, i) => (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key={i} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full border border-black/5">
                        {invite.type === 'email' ? <Mail className="size-3 text-zinc-400" /> : <Phone className="size-3 text-zinc-400" />}
                        <span className="text-[10px] font-bold">{invite.value}</span>
                        <button onClick={() => setInviteList(l => l.filter((_, idx) => idx !== i))} className="size-4 rounded-full bg-black/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                          <X className="size-2" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Personalized Message</label>
                    <button
                      onClick={handleAiGenerate}
                      disabled={isAiGenerating}
                      className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#fabf37] hover:text-black transition-colors"
                    >
                      <Sparkles className={`size-3 ${isAiGenerating ? 'animate-spin' : ''}`} />
                      {isAiGenerating ? 'AI Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    placeholder="Hey, check out Paperware for your packaging needs..."
                    className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:ring-2 focus:ring-[#fabf37] outline-none resize-none"
                  />
                </div>
              </div>

              <div className="w-full md:w-72 bg-zinc-50 rounded-[40px] p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Recommended Product</label>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                    {inviteProducts.map((prod) => (
                      <button
                        key={prod}
                        onClick={() => setSelectedInviteProduct(prod)}
                        className={`w-full p-3 rounded-xl text-left text-[10px] font-bold uppercase tracking-wide transition-all ${selectedInviteProduct === prod ? 'bg-black text-white shadow-lg' : 'bg-white text-zinc-500 hover:bg-zinc-200'}`}
                      >
                        {prod}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#fabf37] rounded-3xl p-6 text-center space-y-2">
                  <Gift className="size-8 text-black mx-auto mb-2" />
                  <p className="text-3xl font-black">15%</p>
                  <p className="text-[9px] font-black uppercase tracking-widest">Credit Reward</p>
                </div>

                <button onClick={() => { toast.success(`Invites sent to ${inviteList.length} contacts!`); setShowInviteModal(false); }} className="w-full py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                  Send Invites
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Tracking Modal */}
        {showTracking && (
          <motion.div
            key="tracking-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
            onClick={() => setShowTracking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              className="w-full max-w-4xl bg-black text-white rounded-[60px] shadow-2xl p-12 overflow-hidden relative"
            >
              <button onClick={() => setShowTracking(false)} className="absolute top-8 right-8 size-12 rounded-2xl bg-zinc-900 flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all z-20">
                <X className="size-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-3 rounded-full bg-[#fabf37] animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Live Tracking</p>
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tight">Shipment #PW-8821</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="size-4 rounded-full bg-[#fabf37] ring-4 ring-[#fabf37]/20" />
                        <div className="w-0.5 h-16 bg-[#fabf37]" />
                      </div>
                      <div className="pb-8">
                        <p className="text-xs font-black uppercase text-[#fabf37]">Departed from Singapore</p>
                        <p className="text-[10px] font-bold text-zinc-500">Oct 24 • 14:20 GMT</p>
                        <p className="text-[10px] text-zinc-600 mt-1">Vessel: CMA CGM MARCO POLO</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="size-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                        <div className="w-0.5 h-16 bg-zinc-800" />
                      </div>
                      <div className="pb-8">
                        <p className="text-xs font-black uppercase text-white">In Transit to Colombo</p>
                        <p className="text-[10px] font-bold text-zinc-500">Currently at Malacca Strait</p>
                        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-zinc-900 rounded-lg w-fit">
                          <Activity className="size-3 text-emerald-500" />
                          <span className="text-[9px] font-bold">Speed: 18 Knots</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="size-4 rounded-full border-2 border-zinc-700 bg-black" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-zinc-500">Estimated Arrival: Chittagong</p>
                        <p className="text-[10px] font-bold text-zinc-600">Nov 05 • 09:00 GMT+6</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[400px] bg-zinc-900 rounded-[40px] overflow-hidden opacity-80 border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="size-64 text-zinc-800 opacity-20 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(250,191,55,0.05)_50%,transparent_100%)] animate-[shimmer_3s_infinite]" />
                  <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Coordinates</p>
                    <p className="text-xs font-mono font-bold mt-1">1.2921° N, 103.8198° E</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* View All Orders Modal (Placeholder logic for full list) */}
        {
          showAllOrders && (
            <motion.div
              key="all-orders-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setShowAllOrders(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 50 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-5xl h-[80vh] bg-white rounded-[60px] shadow-2xl border border-black/5 p-8 md:p-12 overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between mb-8 shrink-0">
                  <h2 className="text-3xl font-black uppercase tracking-tight">All Active Shipments</h2>
                  <button onClick={() => setShowAllOrders(false)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <ActiveOrders onViewAll={() => { }} onSelectOrder={setSelectedOrder} />
                  {/* Repeating to simulate more orders */}
                  <div className="mt-8 opacity-50 pointer-events-none grayscale">
                    <ActiveOrders onViewAll={() => { }} onSelectOrder={() => { }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
        {/* Order Details Modal */}
        {
          selectedOrder && (
            <motion.div
              key="order-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`size-3 rounded-full ${selectedOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-[#fabf37]'}`} />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{selectedOrder.status}</p>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">{selectedOrder.item}</h2>
                    <p className="text-xs font-bold text-zinc-500 mt-1">Order ID: {selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Progress Steps */}
                  <div className="relative pl-4 space-y-8 border-l-2 border-zinc-100 ml-2">
                    {selectedOrder.steps?.map((step: any, i: number) => (
                      <div key={i} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-1 size-4 rounded-full border-2 border-white ${step.status === 'completed' ? 'bg-black' : step.status === 'active' ? 'bg-[#fabf37] animate-pulse' : 'bg-zinc-200'}`} />
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-bold ${step.status === 'pending' ? 'text-zinc-300' : 'text-black'}`}>{step.label}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Destination</p>
                      <p className="font-bold text-sm mt-1">{selectedOrder.destination}</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Quantity</p>
                      <p className="font-bold text-sm mt-1">{selectedOrder.qty}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => { setShowTracking(true); setSelectedOrder(null); }} className="flex-1 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg">
                      Track Live
                    </button>
                    <button onClick={() => toast.success("Downloading invoice...")} className="flex-1 py-4 bg-zinc-100 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }

        {/* Document Preview Modal */}
        {
          selectedDoc && (
            <motion.div
              key="doc-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setSelectedDoc(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden text-center"
              >
                <div className="size-24 bg-zinc-50 rounded-[32px] mx-auto flex items-center justify-center mb-6">
                  <FileText className="size-10 text-zinc-400" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">{selectedDoc.name}</h2>
                <p className="text-zinc-500 text-xs font-bold mb-8">{selectedDoc.type} • {selectedDoc.size} • {selectedDoc.date}</p>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg flex items-center justify-center gap-2">
                    <Download className="size-4" /> Download File
                  </button>
                  <button onClick={() => setSelectedDoc(null)} className="w-full py-4 bg-zinc-50 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all">
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        }

        {/* Invoice Modal */}
        {
          selectedInvoice && (
            <motion.div
              key="invoice-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setSelectedInvoice(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Invoice Details</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">{selectedInvoice.id}</p>
                  </div>
                  <button onClick={() => setSelectedInvoice(null)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-6" />
                  </button>
                </div>

                <div className="p-6 bg-zinc-50 rounded-3xl border border-black/5 mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Amount</p>
                    <p className="text-3xl font-black">{selectedInvoice.amount}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${selectedInvoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {selectedInvoice.status}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-xs font-bold text-zinc-500">Item</span>
                    <span className="text-xs font-bold text-black">{selectedInvoice.items}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-xs font-bold text-zinc-500">Issued Date</span>
                    <span className="text-xs font-bold text-black">{selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-xs font-bold text-zinc-500">Due Date</span>
                    <span className="text-xs font-bold text-black">{selectedInvoice.dueDate}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedInvoice.status !== 'Paid' && (
                    <button onClick={() => toast.success("Redirecting to payment gateway...")} className="flex-1 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg">
                      Pay Now
                    </button>
                  )}
                  <button className="flex-1 py-4 bg-zinc-100 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
                    Download PDF
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        }

        {/* All Invoices Modal */}
        {
          showAllInvoices && (
            <motion.div
              key="all-invoices-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setShowAllInvoices(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 50 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-4xl h-[80vh] bg-white rounded-[60px] shadow-2xl border border-black/5 p-8 md:p-12 overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between mb-8 shrink-0">
                  <h2 className="text-3xl font-black uppercase tracking-tight">Invoice History</h2>
                  <button onClick={() => setShowAllInvoices(false)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <RecentInvoices onViewAll={() => { }} onSelectInvoice={setSelectedInvoice} />
                  {/* Duplicate for demo scroll */}
                  <div className="mt-8 opacity-50 pointer-events-none grayscale">
                    <RecentInvoices onViewAll={() => { }} onSelectInvoice={() => { }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }

        {/* Challan Modal */}
        {
          selectedChallan && (
            <motion.div
              key="challan-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setSelectedChallan(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Delivery Challan</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">{selectedChallan.id}</p>
                  </div>
                  <button onClick={() => setSelectedChallan(null)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-6" />
                  </button>
                </div>

                <div className="bg-zinc-50 rounded-3xl p-6 border border-black/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Items</span>
                    <span className="font-bold text-sm">{selectedChallan.items}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Quantity</span>
                    <span className="font-bold text-sm">{selectedChallan.qty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Date Received</span>
                    <span className="font-bold text-sm">{selectedChallan.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">{selectedChallan.status}</span>
                  </div>
                </div>

                <button className="w-full py-5 mt-8 bg-black text-white rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all shadow-lg">
                  Download Digital Copy
                </button>
              </motion.div>
            </motion.div>
          )
        }

        {/* Feedback Modal */}
        {
          feedbackChallan && (
            <motion.div
              key="feedback-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setFeedbackChallan(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden text-center"
              >
                <div className="flex justify-end mb-4">
                  <button onClick={() => setFeedbackChallan(null)} className="size-10 rounded-xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-4" />
                  </button>
                </div>
                <div className="size-20 bg-[#fabf37]/20 text-[#fabf37] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="size-10 fill-current" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Rate Delivery</h2>
                <p className="text-zinc-500 text-xs font-bold mb-8">How was the quality of {feedbackChallan.items}?</p>

                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} className="size-12 rounded-xl bg-zinc-50 hover:bg-[#fabf37] hover:text-black transition-colors flex items-center justify-center font-black text-lg group">
                      {s}
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Any additional comments? (Optional)"
                  rows={3}
                  className="w-full bg-zinc-50 border border-black/5 rounded-2xl p-4 text-xs font-medium outline-none mb-6 resize-none focus:ring-2 focus:ring-[#fabf37]"
                />

                <button onClick={() => { toast.success("Feedback submitted!"); setFeedbackChallan(null); }} className="w-full py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                  Submit Feedback
                </button>
              </motion.div>
            </motion.div>
          )
        }

        {/* Ticket Details Modal */}
        {
          selectedTicket && (
            <motion.div
              key="ticket-details-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[120] flex items-center justify-center p-4"
              onClick={() => setSelectedTicket(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white rounded-[40px] md:rounded-[60px] shadow-2xl border border-black/5 p-12 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Ticket Details</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">{selectedTicket.id} • {selectedTicket.priority} Priority</p>
                  </div>
                  <button onClick={() => setSelectedTicket(null)} className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <X className="size-6" />
                  </button>
                </div>

                <div className="bg-zinc-50 rounded-3xl p-8 border border-black/5 mb-8">
                  <h3 className="font-bold text-lg mb-2">{selectedTicket.subject}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {selectedTicket.desc || "No description provided for this ticket. Our support team is reviewing the request."}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black shrink-0">AI</div>
                    <div className="bg-zinc-100 rounded-2xl rounded-tl-none p-4 text-xs text-zinc-600 leading-relaxed max-w-[80%]">
                      Hello! I'm the automated support assistant. I've escalated this ticket to our {selectedTicket.priority} priority queue. An agent will respond shortly.
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-8">
                  <input placeholder="Type a reply..." className="flex-1 bg-zinc-50 rounded-2xl px-6 text-sm font-medium outline-none border border-black/5 focus:ring-2 focus:ring-[#fabf37]" />
                  <button className="size-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all">
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>

      <button onClick={() => toast.success("Opening Help Center...")} className="fixed bottom-20 right-20 md:bottom-10 md:right-10 size-14 md:size-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[1000000] group border-2 border-[#fabf37]/20">
        <span className="text-xl font-black">?</span>
        <div className="absolute right-full mr-4 bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          Need Assistance?
        </div>
      </button>

      {/* Profile Menu Pages */}
      <AnimatePresence>
        {showAccountOverview && (
          <AccountOverview onClose={() => setShowAccountOverview(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDigitalVault && (
          <DigitalVault onClose={() => setShowDigitalVault(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOrderHistory && (
          <OrderHistory onClose={() => setShowOrderHistory(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGlobalSettings && (
          <GlobalSettings onClose={() => setShowGlobalSettings(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDigitalTwin && (
          <DigitalTwinShowcase t={t} onClose={() => setShowDigitalTwin(false)} />
        )}
      </AnimatePresence>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}