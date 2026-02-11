import { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Globe, Bell, Lock, Eye, Mail, Phone, Shield, Palette, Moon, Sun, Volume2, VolumeX, Smartphone, Monitor, Languages, MapPin, Clock, DollarSign, Calendar, CheckCircle2, ChevronRight, Check, Download, Trash2, Key, LogOut, Accessibility, Type, Zap, Database, Link2, Code, History, UserCheck, Webhook, ToggleLeft, Plug, Github, Slack, Trello, RefreshCw, HardDrive, Wifi, WifiOff, CloudOff, Laptop, AlertCircle, Info, Search } from "lucide-react";
import { toast } from "sonner";

interface GlobalSettingsProps {
  onClose: () => void;
}

export function GlobalSettings({ onClose }: GlobalSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Regional Preferences State
  const [language, setLanguage] = useState("English (US)");
  const [region, setRegion] = useState("APAC - Singapore");
  const [timezone, setTimezone] = useState("GMT+8 (Singapore)");
  const [currency, setCurrency] = useState("USD ($)");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  // Communication Preferences
  const [newsletter, setNewsletter] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [orderConfirmations, setOrderConfirmations] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Accessibility Settings
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  // Data & Storage Settings
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const cacheSize = "124 MB";

  // Developer Settings
  const [developerMode, setDeveloperMode] = useState(false);
  const [betaFeatures, setBetaFeatures] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  // Modal States
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showDateFormatModal, setShowDateFormatModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showLoginHistoryModal, setShowLoginHistoryModal] = useState(false);
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);

  // Privacy Settings
  const [profileVisible, setProfileVisible] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully", {
      description: "All changes have been applied to your account",
    });
  };

  const settingsSections = [
    {
      title: "Notifications",
      icon: Bell,
      color: "blue",
      settings: [
        {
          id: "email",
          label: "Email Notifications",
          description: "Receive order updates via email",
          enabled: emailNotifications,
          setter: setEmailNotifications,
        },
        {
          id: "push",
          label: "Push Notifications",
          description: "Browser push notifications for urgent updates",
          enabled: pushNotifications,
          setter: setPushNotifications,
        },
        {
          id: "sms",
          label: "SMS Alerts",
          description: "Text messages for critical order status",
          enabled: smsNotifications,
          setter: setSmsNotifications,
        },
      ],
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      color: "green",
      settings: [
        {
          id: "2fa",
          label: "Two-Factor Authentication",
          description: "Extra security layer for login",
          enabled: twoFactorEnabled,
          setter: setTwoFactorEnabled,
        },
        {
          id: "biometric",
          label: "Biometric Login",
          description: "Use fingerprint or face recognition",
          enabled: biometricEnabled,
          setter: setBiometricEnabled,
        },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      color: "purple",
      settings: [
        {
          id: "dark",
          label: "Dark Mode",
          description: "Use dark theme (coming soon)",
          enabled: darkMode,
          setter: setDarkMode,
        },
        {
          id: "sound",
          label: "Sound Effects",
          description: "Play sounds for notifications",
          enabled: soundEnabled,
          setter: setSoundEnabled,
        },
      ],
    },
  ];

  const preferences = [
    {
      icon: Languages,
      label: "Language",
      value: language,
      action: "Change",
    },
    {
      icon: Globe,
      label: "Region",
      value: region,
      action: "Change",
    },
    {
      icon: Clock,
      label: "Timezone",
      value: timezone,
      action: "Change",
    },
    {
      icon: DollarSign,
      label: "Currency",
      value: currency,
      action: "Change",
    },
    {
      icon: Calendar,
      label: "Date Format",
      value: dateFormat,
      action: "Change",
    },
  ];

  const modalContent = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
        <div className="px-5 md:px-6 py-4 border-b border-black/5 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Settings className="size-3 text-orange-600" />
              <p className="text-[7px] font-[900] uppercase tracking-[0.3em] text-zinc-400">Preferences & Controls</p>
            </div>
            <h2 className="text-xl md:text-2xl font-[900] uppercase tracking-tight text-black">Global Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg bg-[rgb(0,0,0)] border border-black/5 shadow-sm hover:bg-black hover:text-white transition-all flex items-center justify-center shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Toggle Settings */}
          {settingsSections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`size-8 rounded-lg flex items-center justify-center ${
                    section.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : section.color === "green"
                      ? "bg-green-50 text-green-600"
                      : "bg-purple-50 text-purple-600"
                  }`}
                >
                  <section.icon className="size-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-black">{section.title}</h3>
              </div>

              <div className="space-y-2">
                {section.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all"
                  >
                    <div className="flex-1">
                      <p className="text-xs font-black text-black mb-0.5">{setting.label}</p>
                      <p className="text-[10px] text-zinc-500 font-bold">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setting.setter(!setting.enabled);
                        toast.info(`${setting.label} ${!setting.enabled ? "enabled" : "disabled"}`);
                      }}
                      className={`relative w-14 h-7 rounded-full transition-all ${
                        setting.enabled ? "bg-green-500" : "bg-zinc-300"
                      }`}
                    >
                      <motion.div
                        animate={{ x: setting.enabled ? 28 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Regional Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Globe className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Regional Preferences</h3>
            </div>

            <div className="space-y-2">
              {/* Language Selector */}
              <div
                className="p-4 bg-white border border-black/5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setShowLanguageModal(true)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-9 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    <Languages className="size-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-wider mb-0.5">Language</p>
                    <p className="text-xs font-black text-black">{language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity">
                    Change
                  </span>
                  <ChevronRight className="size-4 text-zinc-300 group-hover:text-[#fabf37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Region Selector */}
              <div
                className="p-4 bg-white border border-black/5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setShowRegionModal(true)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-9 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    <Globe className="size-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-wider mb-0.5">Region</p>
                    <p className="text-xs font-black text-black">{region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity">
                    Change
                  </span>
                  <ChevronRight className="size-4 text-zinc-300 group-hover:text-[#fabf37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Timezone Selector */}
              <div
                className="p-4 bg-white border border-black/5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setShowTimezoneModal(true)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-9 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    <Clock className="size-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-wider mb-0.5">Timezone</p>
                    <p className="text-xs font-black text-black">{timezone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity">
                    Change
                  </span>
                  <ChevronRight className="size-4 text-zinc-300 group-hover:text-[#fabf37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Currency Selector */}
              <div
                className="p-4 bg-white border border-black/5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setShowCurrencyModal(true)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-9 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    <DollarSign className="size-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-wider mb-0.5">Currency</p>
                    <p className="text-xs font-black text-black">{currency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity">
                    Change
                  </span>
                  <ChevronRight className="size-4 text-zinc-300 group-hover:text-[#fabf37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Date Format Selector */}
              <div
                className="p-4 bg-white border border-black/5 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setShowDateFormatModal(true)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="size-9 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    <Calendar className="size-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-wider mb-0.5">Date Format</p>
                    <p className="text-xs font-black text-black">{dateFormat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity">
                    Change
                  </span>
                  <ChevronRight className="size-4 text-zinc-300 group-hover:text-[#fabf37] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center">
                <Settings className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Advanced</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setShowDataModal(true)}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Monitor className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Data Management</p>
                <p className="text-[10px] text-zinc-500 font-bold">Export, delete, or manage your data</p>
              </button>

              <button
                onClick={() => setShowPrivacyModal(true)}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Eye className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Privacy Settings</p>
                <p className="text-[10px] text-zinc-500 font-bold">Control who can see your information</p>
              </button>

              <button
                onClick={() => setShowApiModal(true)}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Globe className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">API Access</p>
                <p className="text-[10px] text-zinc-500 font-bold">Manage API keys and integrations</p>
              </button>

              <button
                onClick={() => setShowSessionModal(true)}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Smartphone className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Session Management</p>
                <p className="text-[10px] text-zinc-500 font-bold">View and manage active sessions</p>
              </button>
            </div>
          </div>

          {/* Communication Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <Mail className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Communication</h3>
            </div>

            <div className="space-y-2">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Newsletter</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Receive our weekly newsletter</p>
                </div>
                <button
                  onClick={() => {
                    setNewsletter(!newsletter);
                    toast.info(`Newsletter ${!newsletter ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${newsletter ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: newsletter ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Marketing Emails</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Promotional offers and updates</p>
                </div>
                <button
                  onClick={() => {
                    setMarketingEmails(!marketingEmails);
                    toast.info(`Marketing emails ${!marketingEmails ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${marketingEmails ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: marketingEmails ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Order Confirmations</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Essential order status emails</p>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmations(!orderConfirmations);
                    toast.info(`Order confirmations ${!orderConfirmations ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${orderConfirmations ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: orderConfirmations ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Weekly Digest</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Summary of your weekly activity</p>
                </div>
                <button
                  onClick={() => {
                    setWeeklyDigest(!weeklyDigest);
                    toast.info(`Weekly digest ${!weeklyDigest ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${weeklyDigest ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: weeklyDigest ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Accessibility className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Accessibility</h3>
            </div>

            <div className="space-y-3">
              {/* Font Size Slider */}
              <div className="p-4 bg-white border border-black/5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-black text-black">Font Size</p>
                    <p className="text-[10px] text-zinc-500 font-bold">Adjust text size: {fontSize}%</p>
                  </div>
                  <Type className="size-5 text-zinc-400" />
                </div>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-bold mt-1">
                  <span>80%</span>
                  <span>100%</span>
                  <span>150%</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">High Contrast Mode</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Enhance visibility with higher contrast</p>
                </div>
                <button
                  onClick={() => {
                    setHighContrast(!highContrast);
                    toast.info(`High contrast ${!highContrast ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${highContrast ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: highContrast ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Reduce Animations</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Minimize motion effects</p>
                </div>
                <button
                  onClick={() => {
                    setReduceAnimations(!reduceAnimations);
                    toast.info(`Reduce animations ${!reduceAnimations ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${reduceAnimations ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: reduceAnimations ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Screen Reader Support</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Optimize for screen readers</p>
                </div>
                <button
                  onClick={() => {
                    setScreenReader(!screenReader);
                    toast.info(`Screen reader support ${!screenReader ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${screenReader ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: screenReader ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data & Storage */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Database className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Data & Storage</h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowStorageModal(true)}
                className="w-full p-4 bg-white border border-black/5 rounded-2xl text-left hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HardDrive className="size-6 text-zinc-400 group-hover:text-black transition-colors" />
                    <div>
                      <p className="text-xs font-black text-black">Cache Storage</p>
                      <p className="text-[10px] text-zinc-500 font-bold">Using {cacheSize} of cache</p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-zinc-300 group-hover:text-[#fabf37] transition-colors" />
                </div>
              </button>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Offline Mode</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Access content without internet</p>
                </div>
                <button
                  onClick={() => {
                    setOfflineMode(!offlineMode);
                    toast.info(`Offline mode ${!offlineMode ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${offlineMode ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: offlineMode ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 flex items-center justify-between hover:bg-white transition-all">
                <div className="flex-1">
                  <p className="text-xs font-black text-black mb-0.5">Auto-Sync</p>
                  <p className="text-[10px] text-zinc-500 font-bold">Automatically sync data across devices</p>
                </div>
                <button
                  onClick={() => {
                    setAutoSync(!autoSync);
                    toast.info(`Auto-sync ${!autoSync ? "enabled" : "disabled"}`);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${autoSync ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <motion.div
                    animate={{ x: autoSync ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 size-5 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Lock className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Account Security</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setShowSecurityModal(true)}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Key className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Change Password</p>
                <p className="text-[10px] text-zinc-500 font-bold">Update your account password</p>
              </button>

              <button
                onClick={() => setShowLoginHistoryModal(true)}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <History className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Login History</p>
                <p className="text-[10px] text-zinc-500 font-bold">View recent login attempts</p>
              </button>

              <button
                onClick={() => toast.info("Security Questions", { description: "Opening security questions setup..." })}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Shield className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Security Questions</p>
                <p className="text-[10px] text-zinc-500 font-bold">Set up recovery questions</p>
              </button>

              <button
                onClick={() => toast.info("Trusted Devices", { description: "Opening trusted devices..." })}
                className="p-4 bg-zinc-50 border border-black/5 rounded-2xl text-left hover:bg-white hover:shadow-lg transition-all group"
              >
                <Laptop className="size-6 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                <p className="text-xs font-black text-black mb-0.5">Trusted Devices</p>
                <p className="text-[10px] text-zinc-500 font-bold">Manage trusted devices</p>
              </button>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                <Plug className="size-4" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-tight text-black">Integrations</h3>
            </div>

            <button
              onClick={() => setShowIntegrationsModal(true)}
              className="w-full p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl text-left hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-white/80 flex items-center justify-center">
                    <Link2 className="size-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-black">Connected Apps</p>
                    <p className="text-[10px] text-zinc-600 font-bold">3 apps connected</p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-violet-400 group-hover:text-violet-600 transition-colors" />
              </div>
            </button>
          </div>

          {/* Developer Settings */}

        </div>

        {/* Footer */}
        <div className="px-5 md:px-6 py-4 border-t border-black/5 bg-zinc-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <CheckCircle2 className="size-3 text-green-600" />
            <span className="font-bold">All settings are automatically saved</span>
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-black text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-[#fabf37] hover:text-black transition-all"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </>
  );

  return ReactDOM.createPortal(
    <>
      {modalContent}
      
      {/* Language Selector Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowLanguageModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Select Language</h3>
                <button onClick={() => setShowLanguageModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={languageSearch}
                  onChange={(e) => setLanguageSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none text-xs font-semibold"
                />
              </div>

              <div className="space-y-2">
                {(() => {
                  const languages = [
                    { flag: "🇺🇸", name: "English (US)", native: "English" },
                    { flag: "🇬🇧", name: "English (UK)", native: "English" },
                    { flag: "🇪🇸", name: "Español", native: "Spanish" },
                    { flag: "🇫🇷", name: "Français", native: "French" },
                    { flag: "🇩🇪", name: "Deutsch", native: "German" },
                    { flag: "🇨🇳", name: "中文", native: "Chinese" },
                    { flag: "🇯🇵", name: "日本語", native: "Japanese" },
                    { flag: "🇰🇷", name: "한국어", native: "Korean" },
                    { flag: "🇧🇩", name: "বাংলা", native: "Bengali" },
                    { flag: "🇮🇳", name: "हिन्दी", native: "Hindi" },
                    { flag: "🇸🇦", name: "العربية", native: "Arabic" },
                    { flag: "🇷🇺", name: "Русский", native: "Russian" },
                    { flag: "🇵🇹", name: "Português", native: "Portuguese" },
                    { flag: "🇮🇹", name: "Italiano", native: "Italian" },
                    { flag: "🇹🇷", name: "Türkçe", native: "Turkish" },
                    { flag: "🇳🇱", name: "Nederlands", native: "Dutch" },
                    { flag: "🇵🇱", name: "Polski", native: "Polish" },
                    { flag: "🇹🇭", name: "ไทย", native: "Thai" },
                    { flag: "🇻🇳", name: "Tiếng Việt", native: "Vietnamese" },
                    { flag: "🇮🇩", name: "Bahasa Indonesia", native: "Indonesian" },
                    { flag: "🇲🇾", name: "Bahasa Melayu", native: "Malay" },
                    { flag: "🇵🇭", name: "Filipino", native: "Filipino" },
                    { flag: "🇺🇦", name: "Українська", native: "Ukrainian" },
                    { flag: "🇬🇷", name: "Ελληνικά", native: "Greek" },
                    { flag: "🇮🇱", name: "עברית", native: "Hebrew" },
                    { flag: "🇸🇪", name: "Svenska", native: "Swedish" },
                    { flag: "🇳🇴", name: "Norsk", native: "Norwegian" },
                    { flag: "🇩🇰", name: "Dansk", native: "Danish" },
                    { flag: "🇫🇮", name: "Suomi", native: "Finnish" },
                    { flag: "🇨🇿", name: "Čeština", native: "Czech" },
                  ];

                  const filtered = languages.filter((lang) =>
                    lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
                    lang.native.toLowerCase().includes(languageSearch.toLowerCase())
                  );

                  return filtered.length > 0 ? (
                    filtered.map((lang) => (
                      <button
                        key={lang.name}
                        onClick={() => {
                          setLanguage(lang.name);
                          setShowLanguageModal(false);
                          setLanguageSearch("");
                          toast.success(`Language changed to ${lang.name}`);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all group hover:scale-[1.01] ${
                          language === lang.name
                            ? "bg-orange-50 border-orange-300 shadow-sm"
                            : "bg-white border-black/5 hover:bg-zinc-50 hover:border-black/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div className="flex-1">
                            <div className={`text-sm ${language === lang.name ? "font-black text-black" : "font-bold text-zinc-900"}`}>
                              {lang.name}
                            </div>
                            <div className="text-[10px] font-medium text-zinc-500 mt-0.5">
                              {lang.native}
                            </div>
                          </div>
                          {language === lang.name && (
                            <Check className="size-5 text-orange-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Languages className="size-8 text-zinc-300 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-zinc-400">No languages found</p>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Region Selector Modal */}
      <AnimatePresence>
        {showRegionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowRegionModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Select Region</h3>
                <button onClick={() => setShowRegionModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {["APAC - Singapore", "APAC - Bangladesh", "North America - USA", "Europe - UK", "Europe - Germany", "Middle East - Dubai"].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      setRegion(reg);
                      setShowRegionModal(false);
                      toast.success(`Region changed to ${reg}`);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      region === reg
                        ? "bg-orange-50 border-orange-300 text-black font-black"
                        : "bg-white border-black/5 hover:bg-zinc-50 font-bold"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{reg}</span>
                      {region === reg && <Check className="size-4 text-orange-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Timezone Selector Modal */}
      <AnimatePresence>
        {showTimezoneModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowTimezoneModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Select Timezone</h3>
                <button onClick={() => setShowTimezoneModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {["GMT+8 (Singapore)", "GMT+6 (Bangladesh)", "GMT-5 (EST)", "GMT+0 (UTC)", "GMT+1 (CET)", "GMT+9 (JST)"].map((tz) => (
                  <button
                    key={tz}
                    onClick={() => {
                      setTimezone(tz);
                      setShowTimezoneModal(false);
                      toast.success(`Timezone changed to ${tz}`);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      timezone === tz
                        ? "bg-orange-50 border-orange-300 text-black font-black"
                        : "bg-white border-black/5 hover:bg-zinc-50 font-bold"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{tz}</span>
                      {timezone === tz && <Check className="size-4 text-orange-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Currency Selector Modal */}
      <AnimatePresence>
        {showCurrencyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowCurrencyModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Select Currency</h3>
                <button onClick={() => setShowCurrencyModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {["USD ($)", "BDT (৳)", "EUR (€)", "GBP (£)", "JPY (¥)", "SGD (S$)"].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setShowCurrencyModal(false);
                      toast.success(`Currency changed to ${curr}`);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      currency === curr
                        ? "bg-orange-50 border-orange-300 text-black font-black"
                        : "bg-white border-black/5 hover:bg-zinc-50 font-bold"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{curr}</span>
                      {currency === curr && <Check className="size-4 text-orange-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Date Format Selector Modal */}
      <AnimatePresence>
        {showDateFormatModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowDateFormatModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Select Date Format</h3>
                <button onClick={() => setShowDateFormatModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD", "DD.MM.YYYY"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => {
                      setDateFormat(fmt);
                      setShowDateFormatModal(false);
                      toast.success(`Date format changed to ${fmt}`);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      dateFormat === fmt
                        ? "bg-orange-50 border-orange-300 text-black font-black"
                        : "bg-white border-black/5 hover:bg-zinc-50 font-bold"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{fmt}</span>
                      {dateFormat === fmt && <Check className="size-4 text-orange-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Data Management Modal */}
      <AnimatePresence>
        {showDataModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowDataModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Data Management</h3>
                <button onClick={() => setShowDataModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    toast.success("Downloading your data...", { description: "This may take a few moments" });
                    setShowDataModal(false);
                  }}
                  className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Download className="size-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-black text-black">Export All Data</p>
                      <p className="text-[10px] text-zinc-600 font-bold">Download your complete account data as JSON</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete all your data? This cannot be undone.")) {
                      toast.error("Data deletion initiated", { description: "Your data will be deleted within 24 hours" });
                      setShowDataModal(false);
                    }
                  }}
                  className="w-full p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="size-5 text-red-600" />
                    <div>
                      <p className="text-xs font-black text-black">Delete All Data</p>
                      <p className="text-[10px] text-zinc-600 font-bold">Permanently remove all account data</p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Privacy Settings Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowPrivacyModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Privacy Settings</h3>
                <button onClick={() => setShowPrivacyModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-zinc-50 rounded-xl border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-black">Profile Visibility</p>
                    <p className="text-[10px] text-zinc-600 font-bold">Allow others to see your profile</p>
                  </div>
                  <button
                    onClick={() => setProfileVisible(!profileVisible)}
                    className={`relative w-12 h-6 rounded-full transition-all ${profileVisible ? "bg-green-500" : "bg-zinc-300"}`}
                  >
                    <motion.div
                      animate={{ x: profileVisible ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-black">Activity Tracking</p>
                    <p className="text-[10px] text-zinc-600 font-bold">Track your activity for analytics</p>
                  </div>
                  <button
                    onClick={() => setActivityTracking(!activityTracking)}
                    className={`relative w-12 h-6 rounded-full transition-all ${activityTracking ? "bg-green-500" : "bg-zinc-300"}`}
                  >
                    <motion.div
                      animate={{ x: activityTracking ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-black">Data Sharing</p>
                    <p className="text-[10px] text-zinc-600 font-bold">Share data with partners</p>
                  </div>
                  <button
                    onClick={() => setDataSharing(!dataSharing)}
                    className={`relative w-12 h-6 rounded-full transition-all ${dataSharing ? "bg-green-500" : "bg-zinc-300"}`}
                  >
                    <motion.div
                      animate={{ x: dataSharing ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* API Access Modal */}
      <AnimatePresence>
        {showApiModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowApiModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">API Access</h3>
                <button onClick={() => setShowApiModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-zinc-50 rounded-xl border border-black/5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase text-zinc-500">Your API Key</p>
                    <Key className="size-4 text-zinc-400" />
                  </div>
                  <div className="p-2 bg-white border border-zinc-200 rounded-lg">
                    <code className="text-[9px] font-mono text-zinc-600">pk_live_51abc...xyz123</code>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("pk_live_51abc...xyz123");
                    toast.success("API key copied to clipboard");
                  }}
                  className="w-full p-3 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all text-xs font-black uppercase"
                >
                  Copy API Key
                </button>
                <button
                  onClick={() => {
                    if (confirm("Generate a new API key? Your old key will stop working.")) {
                      toast.success("New API key generated");
                    }
                  }}
                  className="w-full p-3 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl hover:bg-orange-100 transition-all text-xs font-black uppercase"
                >
                  Regenerate Key
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Session Management Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowSessionModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Active Sessions</h3>
                <button onClick={() => setShowSessionModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-black text-black">This Device</p>
                    <span className="px-2 py-0.5 bg-green-600 text-white text-[8px] font-black rounded-full uppercase">Active</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 font-bold">Chrome on Windows • Dhaka, Bangladesh</p>
                  <p className="text-[9px] text-zinc-500 font-bold mt-1">Last active: Just now</p>
                </div>
                <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-black text-black">Mobile App</p>
                    <button
                      onClick={() => toast.success("Session logged out")}
                      className="text-[8px] font-black text-red-600 uppercase hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-600 font-bold">iOS App • Singapore</p>
                  <p className="text-[9px] text-zinc-500 font-bold mt-1">Last active: 2 hours ago</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Log out all other sessions?")) {
                      toast.success("All other sessions logged out");
                    }
                  }}
                  className="w-full p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl hover:bg-red-100 transition-all text-xs font-black uppercase flex items-center justify-center gap-2"
                >
                  <LogOut className="size-4" />
                  Logout All Other Sessions
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Storage Modal */}
      <AnimatePresence>
        {showStorageModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowStorageModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Cache Storage</h3>
                <button onClick={() => setShowStorageModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-black text-black">Total Cache Size</p>
                      <p className="text-[10px] text-zinc-600 font-bold">Stored on your device</p>
                    </div>
                    <HardDrive className="size-6 text-cyan-600" />
                  </div>
                  <p className="text-2xl font-black text-black">{cacheSize}</p>
                </div>
                <button
                  onClick={() => {
                    toast.success("Cache cleared successfully", { description: "Your device cache has been cleared" });
                    setShowStorageModal(false);
                  }}
                  className="w-full p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl hover:bg-red-100 transition-all text-xs font-black uppercase flex items-center justify-center gap-2"
                >
                  <Trash2 className="size-4" />
                  Clear All Cache
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Security Modal - Change Password */}
      <AnimatePresence>
        {showSecurityModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowSecurityModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Change Password</h3>
                <button onClick={() => setShowSecurityModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Current Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border border-black/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border border-black/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 mb-1 block">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border border-black/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={() => {
                    toast.success("Password changed successfully");
                    setShowSecurityModal(false);
                  }}
                  className="w-full p-3 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all text-xs font-black uppercase"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login History Modal */}
      <AnimatePresence>
        {showLoginHistoryModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowLoginHistoryModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Login History</h3>
                <button onClick={() => setShowLoginHistoryModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { time: "Just now", location: "Dhaka, Bangladesh", device: "Chrome on Windows", status: "success" },
                  { time: "2 hours ago", location: "Singapore", device: "iOS App", status: "success" },
                  { time: "Yesterday", location: "Dhaka, Bangladesh", device: "Chrome on Windows", status: "success" },
                  { time: "3 days ago", location: "Unknown Location", device: "Firefox on Linux", status: "failed" },
                  { time: "1 week ago", location: "Dhaka, Bangladesh", device: "Safari on macOS", status: "success" },
                ].map((login, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      login.status === "failed" ? "bg-red-50 border-red-200" : "bg-zinc-50 border-black/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-black text-black">{login.device}</p>
                      {login.status === "failed" && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-black rounded-full uppercase">Failed</span>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-600 font-bold">{login.location}</p>
                    <p className="text-[9px] text-zinc-500 font-bold mt-1">{login.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Integrations Modal */}
      <AnimatePresence>
        {showIntegrationsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowIntegrationsModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10003]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[10004] p-5 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase text-black">Connected Apps</h3>
                <button onClick={() => setShowIntegrationsModal(false)} className="size-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Slack", icon: Slack, color: "bg-purple-50 text-purple-600", connected: true },
                  { name: "GitHub", icon: Github, color: "bg-zinc-50 text-zinc-800", connected: true },
                  { name: "Trello", icon: Trello, color: "bg-blue-50 text-blue-600", connected: true },
                ].map((app, idx) => (
                  <div key={idx} className={`p-4 ${app.color} border border-black/10 rounded-xl`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <app.icon className="size-6" />
                        <div>
                          <p className="text-xs font-black text-black">{app.name}</p>
                          <p className="text-[10px] font-bold opacity-70">Connected</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toast.info(`Disconnecting from ${app.name}...`)}
                        className="text-[9px] font-black text-red-600 uppercase hover:underline"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => toast.info("Connect New App", { description: "Opening app marketplace..." })}
                  className="w-full p-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all text-xs font-black uppercase flex items-center justify-center gap-2"
                >
                  <Plug className="size-4" />
                  Connect New App
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}