import { useState } from 'react';
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Building2, MapPin, Calendar, Shield, Award, TrendingUp, Package, DollarSign, Clock, CheckCircle2, AlertCircle, Edit2, Camera, Globe, Briefcase, CreditCard, Download, FileText, Users, Bell, Zap, BarChart3, Target, Gift, Star, Sparkles, Activity, Link2, HelpCircle, Send, MessageCircle, Upload, AlertTriangle, Info, Headphones, Video, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

interface AccountOverviewProps {
  onClose: () => void;
}

export function AccountOverview({ onClose }: AccountOverviewProps) {
  const { t } = useLanguage();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Team Member");
  const [supportMessage, setSupportMessage] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteWhatsApp, setInviteWhatsApp] = useState("");
  const [inviteDepartment, setInviteDepartment] = useState("Procurement");

  // Support Modal States
  const [supportSubject, setSupportSubject] = useState("");
  const [supportCategory, setSupportCategory] = useState("General Inquiry");
  const [supportPriority, setSupportPriority] = useState("Medium");
  const [supportContactMethod, setSupportContactMethod] = useState("Email");
  const [supportPhone, setSupportPhone] = useState("");
  const [supportAttachment, setSupportAttachment] = useState<File | null>(null);
  const [showQuickTemplates, setShowQuickTemplates] = useState(false);

  // Download Reports Function
  const handleDownloadReports = () => {
    toast.success("Generating reports...");

    // Create CSV content
    const csvContent = `Account Report - Generated on ${new Date().toLocaleDateString()}\n\nAccount Statistics:\nTotal Orders,847\nTotal Spent,$1.2M\nActive Projects,12\nAccount Status,Premium\n\nRecent Activity:\nOrder Placed,Custom Paper Bags x5000,2 hours ago\nInvoice Paid,Invoice #PW-2024-1847,1 day ago\nQuote Requested,Sustainable Packaging,3 days ago\nDocument Downloaded,Master Agreement 2024,1 week ago`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Account_Report_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success("Report downloaded successfully!");
  };

  // Invite Team Member Function
  const handleInviteTeamMember = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }

    toast.success(`Invitation sent to ${inviteEmail}!`);
    setShowInviteModal(false);
    setInviteEmail("");
    setInviteRole("Team Member");
    setInviteName("");
    setInviteWhatsApp("");
    setInviteDepartment("Procurement");
  };

  // Contact Support Function
  const handleContactSupport = () => {
    if (!supportSubject || !supportMessage) {
      toast.error("Please fill in subject and message");
      return;
    }

    const ticketNumber = `PW-${Date.now().toString().slice(-8)}`;
    toast.success(`Support ticket #${ticketNumber} created! Our team will respond within 24 hours.`);
    setShowSupportModal(false);
    setSupportMessage("");
    setSupportSubject("");
    setSupportCategory("General Inquiry");
    setSupportPriority("Medium");
    setSupportContactMethod("Email");
    setSupportPhone("");
    setSupportAttachment(null);
  };

  const handleQuickTemplate = (template: string) => {
    setSupportMessage(template);
    setShowQuickTemplates(false);
  };

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent("Hello! I need support with my Paperware account.");
    window.open(`https://wa.me/8801234567890?text=${message}`, '_blank');
    toast.success("Opening WhatsApp...");
  };

  const accountStats = [
    { label: t('portal_total_orders'), value: "847", icon: Package, trend: "+23% this quarter", color: "bg-blue-50 text-blue-600" },
    { label: t('portal_total_spent'), value: "$1.2M", icon: DollarSign, trend: "+18% vs last year", color: "bg-green-50 text-green-600" },
    { label: "Active Projects", value: "12", icon: Clock, trend: "3 pending delivery", color: "bg-yellow-50 text-yellow-600" },
    { label: t('portal_account_status'), value: "Premium", icon: Award, trend: "Enterprise tier", color: "bg-purple-50 text-purple-600" },
  ];

  const personalInfo = [
    { label: "Full Name", value: "John Doe", icon: User, editable: true },
    { label: "Email", value: "john.doe@company.com", icon: Mail, editable: true },
    { label: "Phone", value: "+1 (555) 123-4567", icon: Phone, editable: true },
    { label: "Company", value: "ACME Corporation", icon: Building2, editable: false },
    { label: "Location", value: "Singapore, APAC HQ", icon: MapPin, editable: true },
    { label: "Member Since", value: "January 2020", icon: Calendar, editable: false },
  ];

  const securityInfo = [
    { label: "Two-Factor Auth", status: "Enabled", icon: Shield, color: "text-green-600" },
    { label: "Last Login", status: "2 hours ago", icon: Clock, color: "text-zinc-600" },
    { label: "Active Sessions", status: "3 devices", icon: Globe, color: "text-blue-600" },
    { label: "Password Updated", status: "30 days ago", icon: CheckCircle2, color: "text-zinc-600" },
  ];

  const recentActivity = [
    { action: "Order Placed", detail: "Custom Paper Bags x5000", time: "2 hours ago", icon: Package, color: "bg-blue-50 text-blue-600" },
    { action: "Invoice Paid", detail: "Invoice #PW-2024-1847", time: "1 day ago", icon: DollarSign, color: "bg-green-50 text-green-600" },
    { action: "Quote Requested", detail: "Sustainable Packaging", time: "3 days ago", icon: FileText, color: "bg-yellow-50 text-yellow-600" },
    { action: "Document Downloaded", detail: "Master Agreement 2024", time: "1 week ago", icon: Download, color: "bg-purple-50 text-purple-600" },
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "Procurement Manager", status: "Active", avatar: "SJ" },
    { name: "Michael Chen", role: "Supply Chain Lead", status: "Active", avatar: "MC" },
    { name: "Emma Wilson", role: "Finance Director", status: "Active", avatar: "EW" },
  ];

  const accountHealth = {
    score: 92,
    level: "Excellent",
    color: "text-green-600",
    bgColor: "bg-green-50",
  };

  const loyaltyPoints = {
    current: 15840,
    tier: "Platinum",
    nextReward: "5,000 points away from Diamond",
  };

  const quickActions = [
    { label: t('portal_download_report'), icon: Download, action: handleDownloadReports },
    { label: t('portal_invite_team'), icon: Users, action: () => setShowInviteModal(true) },
    { label: t('portal_view_analytics'), icon: BarChart3, action: () => setShowAnalyticsModal(true) },
    { label: t('portal_contact_support'), icon: HelpCircle, action: () => setShowSupportModal(true) },
  ];

  const modalContent = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-[9999]"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-2 md:inset-4 lg:inset-8 bg-white rounded-3xl shadow-2xl z-[10000] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 md:px-6 py-4 border-b border-black/5 flex items-center justify-between bg-gradient-to-r from-zinc-50 to-white shrink-0">
          <div className="space-y-0.5">
            <p className="text-[6px] font-black uppercase tracking-[0.3em] text-zinc-400">Enterprise Profile</p>
            <h2 className="text-base md:text-lg font-black uppercase tracking-tight text-black">{t('portal_account_overview')}</h2>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg bg-[rgb(0,0,0)] border border-black/5 shadow-sm hover:bg-black hover:text-white transition-all flex items-center justify-center shrink-0 text-[rgb(255,255,255)]"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
            {accountStats.map((stat, i) => (
              <div key={i} className="p-3 bg-white border-2 border-black/10 rounded-xl hover:shadow-lg transition-all group">
                <div className={`size-9 rounded-lg ${stat.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="size-4 stroke-[2.5]" />
                </div>
                <p className="text-sm font-[900] text-black mb-0.5">{stat.value}</p>
                <p className="text-[10px] font-[900] uppercase text-zinc-400 mb-0.5 tracking-wide">{stat.label}</p>
                <p className="text-[9px] font-[900] text-zinc-500">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Personal Info */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="size-3.5 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-[900] uppercase tracking-tight text-black">{t('portal_personal_info')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {personalInfo.map((info, i) => (
                <div key={i} className="p-3 bg-zinc-50 rounded-xl border border-black/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="size-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <info.icon className="size-3.5 text-zinc-500 stroke-[2]" />
                    </div>
                    <p className="text-[9px] font-[800] uppercase tracking-wider text-zinc-400">{info.label}</p>
                  </div>
                  <p className="text-xs font-[800] text-black">{info.value}</p>
                  {info.editable && (
                    <button className="mt-1 text-[9px] font-[800] text-[#fabf37] hover:underline uppercase tracking-wider">
                      Update
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <Shield className="size-3.5 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_security_overview')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {securityInfo.map((info, i) => (
                <div key={i} className="p-3 bg-white border border-black/5 rounded-xl flex items-center hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className={`size-8 rounded-lg bg-zinc-50 flex items-center justify-center ${info.color}`}>
                      <info.icon className="size-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-[800] uppercase text-zinc-400 tracking-wide">{info.label}</p>
                      <p className="text-xs font-[800] text-black mt-0.5">{info.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <CreditCard className="size-3.5 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_billing_info')}</h3>
            </div>
            <div className="p-4 bg-gradient-to-br from-black to-zinc-800 rounded-xl text-white border border-black/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[9px] font-[800] uppercase tracking-widest text-zinc-400 mb-0.5">Payment Method</p>
                  <p className="text-base font-[800]">•••• •••• •••• 4532</p>
                  <p className="text-[10px] font-[700] text-zinc-400 mt-0.5">Expires 12/26</p>
                </div>
                <CreditCard className="size-7 text-[#fabf37] stroke-[2]" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-[10px] font-[800] uppercase tracking-wider rounded-lg hover:bg-white/20 transition-all">
                  Update Card
                </button>
                <button className="flex-1 px-3 py-2 bg-[#fabf37] text-black text-[10px] font-[800] uppercase tracking-wider rounded-lg hover:bg-yellow-400 transition-all">
                  Billing History
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <Activity className="size-3.5 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_recent_activity')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recentActivity.map((activity, i) => (
                <div key={i} className="p-3 bg-white border border-black/5 rounded-xl flex items-center hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className={`size-8 rounded-lg ${activity.color} flex items-center justify-center`}>
                      <activity.icon className="size-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-[800] uppercase text-zinc-400 tracking-wide">{activity.action}</p>
                      <p className="text-xs font-[800] text-black mt-0.5">{activity.detail}</p>
                      <p className="text-[9px] font-[700] text-zinc-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="size-3.5 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_team_members')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {teamMembers.map((member, i) => (
                <div key={i} className="p-3 bg-white border border-black/5 rounded-xl flex items-center hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-zinc-50 flex items-center justify-center">
                      <p className="text-xs font-[800] text-black">{member.avatar}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-[800] uppercase text-zinc-400 tracking-wide">{member.name}</p>
                      <p className="text-xs font-[800] text-black mt-0.5">{member.role}</p>
                      <p className="text-[9px] font-[700] text-zinc-500 mt-0.5">{member.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Health & Loyalty Points - Combined Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {/* Account Health */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="size-6 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <Shield className="size-3.5 stroke-[2.5]" />
                </div>
                <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_account_health')}</h3>
              </div>
              <div className="p-3 bg-white border border-black/5 rounded-xl flex items-center hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <div className={`size-8 rounded-lg ${accountHealth.bgColor} flex items-center justify-center ${accountHealth.color}`}>
                    <Shield className="size-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-[800] uppercase text-zinc-400 tracking-wide">Health Score</p>
                    <p className="text-xs font-[800] text-black mt-0.5">{accountHealth.score}%</p>
                    <p className="text-[9px] font-[700] text-zinc-500 mt-0.5">{accountHealth.level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loyalty Points */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="size-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Award className="size-3.5 stroke-[2.5]" />
                </div>
                <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_loyalty_points')}</h3>
              </div>
              <div className="p-3 bg-white border border-black/5 rounded-xl flex items-center hover:shadow-md transition-all">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Award className="size-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-[800] uppercase text-zinc-400 tracking-wide">Current Points</p>
                    <p className="text-xs font-[800] text-black mt-0.5">{loyaltyPoints.current.toLocaleString()}</p>
                    <p className="text-[9px] font-[700] text-zinc-500 mt-0.5">{loyaltyPoints.tier} Tier • {loyaltyPoints.nextReward}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Edit2 className="size-3.5 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-[800] uppercase tracking-tight text-black">{t('portal_quick_actions')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.action}
                  className="p-3 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <action.icon className="size-4 stroke-[2.5] text-zinc-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <p className="text-xs font-[800] uppercase text-zinc-600 tracking-wide group-hover:text-black transition-colors">{action.label}</p>
                    </div>
                    <p className="text-[10px] font-[800] text-[#fabf37] uppercase tracking-wider">Action</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invite Team Member Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowInviteModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10001]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-[10002] p-5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-[800] text-black uppercase">Invite Team Member</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Send an invitation to join your team</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="size-7 rounded-lg bg-[rgb(0,0,0)] hover:bg-zinc-200 transition-all flex items-center justify-center shrink-0"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">WhatsApp</label>
                    <input
                      type="tel"
                      value={inviteWhatsApp}
                      onChange={(e) => setInviteWhatsApp(e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Department</label>
                    <select
                      value={inviteDepartment}
                      onChange={(e) => setInviteDepartment(e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option>Procurement</option>
                      <option>Supply Chain</option>
                      <option>Finance</option>
                      <option>Operations</option>
                      <option>Logistics</option>
                      <option>Sales & Marketing</option>
                      <option>Human Resources</option>
                      <option>IT & Technology</option>
                      <option>Quality Assurance</option>
                      <option>Production</option>
                      <option>Administration</option>
                      <option>Legal & Compliance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Role</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option>Team Member</option>
                      <option>Manager</option>
                      <option>Administrator</option>
                      <option>CEO / Managing Director</option>
                      <option>Chief Operating Officer</option>
                      <option>Chief Financial Officer</option>
                      <option>Procurement Manager</option>
                      <option>Procurement Officer</option>
                      <option>Supply Chain Manager</option>
                      <option>Supply Chain Lead</option>
                      <option>Operations Manager</option>
                      <option>Operations Coordinator</option>
                      <option>Finance Director</option>
                      <option>Finance Manager</option>
                      <option>Accounts Manager</option>
                      <option>Purchase Manager</option>
                      <option>Purchase Officer</option>
                      <option>Logistics Manager</option>
                      <option>Logistics Coordinator</option>
                      <option>Warehouse Manager</option>
                      <option>Inventory Manager</option>
                      <option>Quality Control Manager</option>
                      <option>Production Manager</option>
                      <option>Marketing Manager</option>
                      <option>Sales Manager</option>
                      <option>Business Development Manager</option>
                      <option>Project Manager</option>
                      <option>Sustainability Officer</option>
                      <option>Compliance Officer</option>
                      <option>Viewer (Read Only)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Access Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg cursor-pointer hover:bg-zinc-100 transition-colors">
                      <input type="checkbox" className="rounded border-zinc-300" defaultChecked />
                      <span className="text-[10px] font-[700] text-zinc-700">View Orders</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg cursor-pointer hover:bg-zinc-100 transition-colors">
                      <input type="checkbox" className="rounded border-zinc-300" defaultChecked />
                      <span className="text-[10px] font-[700] text-zinc-700">Place Orders</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg cursor-pointer hover:bg-zinc-100 transition-colors">
                      <input type="checkbox" className="rounded border-zinc-300" />
                      <span className="text-[10px] font-[700] text-zinc-700">Manage Billing</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg cursor-pointer hover:bg-zinc-100 transition-colors">
                      <input type="checkbox" className="rounded border-zinc-300" />
                      <span className="text-[10px] font-[700] text-zinc-700">View Analytics</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-3">
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-2 block">Notification Preferences</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-zinc-300" defaultChecked />
                      <div className="flex items-center gap-1.5">
                        <Mail className="size-3.5 text-zinc-500" />
                        <span className="text-[10px] font-[700] text-zinc-700">Send Email Invitation</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-zinc-300" defaultChecked />
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="size-3.5 text-green-600" />
                        <span className="text-[10px] font-[700] text-zinc-700">Send WhatsApp Invitation</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-zinc-300" />
                      <div className="flex items-center gap-1.5">
                        <Bell className="size-3.5 text-zinc-500" />
                        <span className="text-[10px] font-[700] text-zinc-700">Enable Push Notifications</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleInviteTeamMember}
                  className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-zinc-800 transition-all text-xs font-[800] uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="size-3.5" />
                  Send Invitation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalyticsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAnalyticsModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10001]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white rounded-2xl shadow-2xl z-[10002] p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-[800] text-black uppercase">Analytics Dashboard</h3>
                  <p className="text-xs text-zinc-500 mt-1">Your account performance overview</p>
                </div>
                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="size-8 rounded-lg bg-[rgb(0,0,0)] hover:bg-zinc-200 transition-all flex items-center justify-center"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <TrendingUp className="size-6 text-blue-600 mb-2" />
                  <p className="text-2xl font-[800] text-black">+34%</p>
                  <p className="text-xs font-[700] text-zinc-600 uppercase tracking-wider mt-1">Growth Rate</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <BarChart3 className="size-6 text-green-600 mb-2" />
                  <p className="text-2xl font-[800] text-black">$284K</p>
                  <p className="text-xs font-[700] text-zinc-600 uppercase tracking-wider mt-1">Avg Order Value</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <Target className="size-6 text-purple-600 mb-2" />
                  <p className="text-2xl font-[800] text-black">92%</p>
                  <p className="text-xs font-[700] text-zinc-600 uppercase tracking-wider mt-1">Success Rate</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <Sparkles className="size-6 text-yellow-600 mb-2" />
                  <p className="text-2xl font-[800] text-black">4.9/5</p>
                  <p className="text-xs font-[700] text-zinc-600 uppercase tracking-wider mt-1">Satisfaction</p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl">
                <p className="text-sm font-[800] text-zinc-600 uppercase tracking-wider mb-3">Monthly Trends</p>
                <div className="h-32 flex items-end gap-2">
                  {[65, 72, 68, 85, 90, 88, 95].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-[10px] text-zinc-400">Jan</p>
                  <p className="text-[10px] text-zinc-400">Jul</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {showSupportModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSupportModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10001]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-[10002] p-5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-[800] text-black uppercase">Contact Support</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5">24/7 Professional Support</p>
                </div>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="size-7 rounded-lg bg-[rgb(0,0,0)] hover:bg-zinc-200 transition-all flex items-center justify-center"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Support Agent Status */}
              <div className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                <div className="size-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Headphones className="size-4 text-white stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-[800] text-green-800 uppercase tracking-wider">Support Available</p>
                  <p className="text-[9px] font-[700] text-green-600 mt-0.5">Our team is online • Avg. response: 2 hours</p>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  onClick={handleWhatsAppSupport}
                  className="p-2 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all group"
                >
                  <MessageCircle className="size-4 text-green-600 mx-auto mb-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] font-[800] text-green-700 uppercase tracking-wider text-center">WhatsApp</p>
                </button>
                <button className="p-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all group">
                  <Phone className="size-4 text-blue-600 mx-auto mb-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] font-[800] text-blue-700 uppercase tracking-wider text-center">Call Us</p>
                </button>
                <button className="p-2 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-all group">
                  <Video className="size-4 text-purple-600 mx-auto mb-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] font-[800] text-purple-700 uppercase tracking-wider text-center">Video Call</p>
                </button>
              </div>

              <div className="space-y-3">
                {/* Quick Templates Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider">Quick Templates</label>
                    <button
                      onClick={() => setShowQuickTemplates(!showQuickTemplates)}
                      className="text-[9px] font-[700] text-blue-600 hover:underline uppercase tracking-wider"
                    >
                      {showQuickTemplates ? 'Hide' : 'Show'} Templates
                    </button>
                  </div>
                  {showQuickTemplates && (
                    <div className="grid grid-cols-1 gap-1.5 p-2 bg-zinc-50 rounded-lg border border-zinc-200">
                      <button
                        onClick={() => handleQuickTemplate("I'm having trouble with my account login. Can you help me reset my password?")}
                        className="px-2 py-1.5 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[9px] font-[700] text-zinc-700"
                      >
                        🔐 Account Login Issue
                      </button>
                      <button
                        onClick={() => handleQuickTemplate("I need to update my billing information. Can you guide me through the process?")}
                        className="px-2 py-1.5 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[9px] font-[700] text-zinc-700"
                      >
                        💳 Billing Information Update
                      </button>
                      <button
                        onClick={() => handleQuickTemplate("I'm experiencing issues with the order tracking system. Can you assist me?")}
                        className="px-2 py-1.5 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[9px] font-[700] text-zinc-700"
                      >
                        📦 Order Tracking Issue
                      </button>
                      <button
                        onClick={() => handleQuickTemplate("I have a question about product specifications and customization options.")}
                        className="px-2 py-1.5 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[9px] font-[700] text-zinc-700"
                      >
                        🎨 Product Customization
                      </button>
                      <button
                        onClick={() => handleQuickTemplate("I'd like to request a quote for bulk orders. Can you help me with pricing?")}
                        className="px-2 py-1.5 bg-white border border-zinc-200 text-left rounded-lg hover:bg-zinc-100 transition-all text-[9px] font-[700] text-zinc-700"
                      >
                        💰 Bulk Order Quote
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Subject *</label>
                  <input
                    type="text"
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                    placeholder="Brief description of your issue"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Category *</label>
                    <select
                      value={supportCategory}
                      onChange={(e) => setSupportCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Issues</option>
                      <option>Account Management</option>
                      <option>Order Support</option>
                      <option>Product Questions</option>
                      <option>Delivery Issues</option>
                      <option>Refund Request</option>
                      <option>Feature Request</option>
                      <option>Bug Report</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                      Priority *
                      {supportPriority === 'High' && (
                        <AlertTriangle className="size-3 text-red-600" />
                      )}
                    </label>
                    <select
                      value={supportPriority}
                      onChange={(e) => setSupportPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Preferred Contact Method *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Email', 'Phone', 'WhatsApp'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setSupportContactMethod(method)}
                        className={`px-2 py-2 rounded-lg border-2 transition-all text-[10px] font-[800] uppercase tracking-wider ${supportContactMethod === method
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:border-blue-300'
                          }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {supportContactMethod === 'Phone' && (
                  <div>
                    <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                    <input
                      type="tel"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block flex items-center justify-between">
                    <span>Your Message *</span>
                    <span className="text-[9px] font-[700] text-zinc-400">
                      {supportMessage.length}/1000
                    </span>
                  </label>
                  <textarea
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    maxLength={1000}
                    placeholder="Describe your issue or question in detail..."
                    rows={4}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-[800] text-zinc-600 uppercase tracking-wider mb-1.5 block flex items-center gap-2">
                    <Paperclip className="size-3" />
                    Attachment (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={(e) => setSupportAttachment(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                      id="supportAttachment"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                    <label
                      htmlFor="supportAttachment"
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-all text-[10px] font-[800] uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Upload className="size-3.5" />
                      Choose File
                    </label>
                    {supportAttachment && (
                      <div className="flex items-center gap-2 p-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
                        <FileText className="size-3.5 text-zinc-500" />
                        <div>
                          <p className="text-[9px] font-[800] text-zinc-700">{supportAttachment.name}</p>
                          <p className="text-[8px] font-[700] text-zinc-500">{(supportAttachment.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                          onClick={() => setSupportAttachment(null)}
                          className="ml-1 size-4 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all"
                        >
                          <X className="size-2.5 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[8px] font-[700] text-zinc-400 mt-1">
                    Accepted formats: PDF, DOC, DOCX, PNG, JPG (Max: 10MB)
                  </p>
                </div>

                {/* Response Time Estimate */}
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="size-3.5 text-blue-600" />
                    <p className="text-[10px] font-[800] text-blue-800 uppercase tracking-wider">Estimated Response Time</p>
                  </div>
                  <p className="text-[9px] font-[700] text-blue-600">
                    {supportPriority === 'Urgent' ? '1-2 hours' : supportPriority === 'High' ? '4-6 hours' : supportPriority === 'Medium' ? '12-24 hours' : '24-48 hours'}
                  </p>
                </div>

                {/* Previous Tickets Info */}
                <div className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Info className="size-3.5 text-zinc-600" />
                    <p className="text-[10px] font-[800] text-zinc-700 uppercase tracking-wider">Your Support History</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-[700] text-zinc-600">Total Tickets</p>
                      <p className="text-[9px] font-[800] text-zinc-800">7</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-[700] text-zinc-600">Open Tickets</p>
                      <p className="text-[9px] font-[800] text-green-600">1</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-[700] text-zinc-600">Avg. Resolution Time</p>
                      <p className="text-[9px] font-[800] text-zinc-800">8 hours</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContactSupport}
                  className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-zinc-800 transition-all text-xs font-[800] uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="size-3.5" />
                  Submit Ticket
                </button>

                {/* FAQ Suggestion */}
                <div className="text-center">
                  <p className="text-[9px] font-[700] text-zinc-500 mb-1">
                    Before submitting, check our FAQ for quick answers
                  </p>
                  <button className="text-[10px] font-[800] text-blue-600 hover:underline uppercase tracking-wider">
                    View FAQ
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}