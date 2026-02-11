import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../ui/sheet";
import {
  RefreshCw,
  Languages,
  Search,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CircleCheck,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";
import { useLanguage } from "../../../context/LanguageContext";

// Helper Component for Translation Management
function TranslationManager({ language, onClose }: { language: any, onClose: () => void }) {
  const [isTranslatingAll, setIsTranslatingAll] = useState(false);

  // Mock pages data generator based on language coverage
  const generatePages = () => {
    const pages = [
      { name: "Home / Landing", priority: "High", size: "1.2kb" },
      { name: "Product Gallery", priority: "High", size: "4.5kb" },
      { name: "Contact Us", priority: "Medium", size: "0.8kb" },
      { name: "About Company", priority: "Medium", size: "2.1kb" },
      { name: "Legal / Privacy", priority: "Low", size: "5.6kb" },
      { name: "Checkout Flow", priority: "Critical", size: "3.2kb" },
      { name: "User Dashboard", priority: "High", size: "4.1kb" },
      { name: "Admin Panel", priority: "Low", size: "12.4kb" },
    ];

    return pages.map(p => {
      // Simulate completion based on global coverage
      const isComplete = Math.random() * 100 < language.coverage;
      return {
        ...p,
        status: isComplete ? "Stable" : "Missing",
        progress: isComplete ? 100 : Math.floor(Math.random() * 80)
      };
    });
  };

  const [pages, setPages] = useState(generatePages());

  const handleTranslatePage = (index: number) => {
    const newPages = [...pages];
    newPages[index] = { ...newPages[index], status: "Processing...", progress: newPages[index].progress };
    setPages(newPages);

    setTimeout(() => {
      setPages(current => {
        const updated = [...current];
        updated[index] = { ...updated[index], status: "Stable", progress: 100 };
        return updated;
      });
      toast.success(`Translated ${pages[index].name} to ${language.name}`);
    }, 1500);
  };

  const handleTranslateAll = () => {
    setIsTranslatingAll(true);
    toast.loading("Initiating Neural Translation Matrix...");

    setTimeout(() => {
      setPages(current => current.map(p => ({ ...p, status: "Stable", progress: 100 })));
      setIsTranslatingAll(false);
      toast.dismiss();
      toast.success(`Full ${language.name} Translation Complete`, {
        description: "All modules are now 100% synced with English master."
      });
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col font-['Poppins',sans-serif]">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">{(() => {
            const flags: any = { 'EN': '🇺🇸', 'BN': '🇧🇩', 'AR': '🇸🇦', 'TR': '🇹🇷', 'ES': '🇪🇸', 'FR': '🇫🇷', 'DE': '🇩🇪', 'JP': '🇯🇵', 'CN': '🇨🇳', 'IN': '🇮🇳', 'RU': '🇷🇺', 'PT': '🇵🇹', 'IT': '🇮🇹', 'NL': '🇳🇱', 'ID': '🇮🇩', 'VI': '🇻🇳', 'TH': '🇹🇭', 'MS': '🇲🇾', 'PL': '🇵🇱', 'SV': '🇸🇪', 'NO': '🇳🇴', 'FI': '🇫🇮', 'DA': '🇩🇰', 'EL': '🇬🇷', 'HE': '🇮🇱', 'CS': '🇨🇿', 'HU': '🇭🇺', 'RO': '🇷🇴', 'UK': '🇺🇦', 'SK': '🇸🇰', 'BG': '🇧🇬', 'HR': '🇭🇷', 'LT': '🇱🇹', 'LV': '🇱🇻', 'ET': '🇪🇪', 'SL': '🇸🇮', 'MT': '🇲🇹', 'IS': '🇮🇸', 'GA': '🇮🇪', 'SQ': '🇦🇱', 'MK': '🇲🇰', 'HY': '🇦🇲', 'KA': '🇬🇪' };
            return flags[language.code] || '🌐';
          })()}</span>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{language.name} ({language.code})</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Node ID: {language.code}-{Math.floor(Math.random() * 999)}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Total Strings</p>
            <p className="text-xl font-black text-white">4,281</p>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Missing</p>
            <p className="text-xl font-black text-[#fabf37]">{pages.filter(p => p.progress < 100).length} Pages</p>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Est. Time</p>
            <p className="text-xl font-black text-white">~2m</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
        {pages.map((page, i) => (
          <div key={i} className="bg-black border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-white/10 transition-colors">
            <div className="flex-1 mr-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-white uppercase">{page.name}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${page.progress === 100 ? 'text-emerald-500' : 'text-[#fabf37]'}`}>
                  {page.progress === 100 ? 'Stable' : `${page.progress}%`}
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${page.progress}%` }}
                  className={`h-full ${page.progress === 100 ? 'bg-emerald-500' : 'bg-[#fabf37]'}`}
                />
              </div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded-full">{page.priority}</span>
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{page.size}</span>
              </div>
            </div>

            {page.progress < 100 ? (
              <button
                onClick={() => handleTranslatePage(i)}
                disabled={page.status === 'Processing...'}
                className="size-8 rounded-lg bg-[#fabf37]/10 text-[#fabf37] hover:bg-[#fabf37] hover:text-black flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className={`size-4 ${page.status === 'Processing...' ? 'animate-spin' : ''}`} />
              </button>
            ) : (
              <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CircleCheck className="size-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <button
          onClick={handleTranslateAll}
          disabled={isTranslatingAll || pages.every(p => p.progress === 100)}
          className="w-full py-4 bg-[#fabf37] text-black rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(250,191,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isTranslatingAll ? (
            <>
              <RefreshCw className="size-4 animate-spin" />
              Processing Global Matrix...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Translate All Missing ({pages.filter(p => p.progress < 100).length})
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function LanguageView() {
  const { t } = useLanguage();
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'coverage', direction: 'desc' });
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const handleSort = (key: any) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const languages = [
    { code: "EN", name: "English", coverage: 100, status: "stable", ai_health: 100, users: "12.4k" },
    { code: "BN", name: "Bengali", coverage: 100, status: "stable", ai_health: 100, users: "8.2k" },
    { code: "AR", name: "Arabic", coverage: 100, status: "stable", ai_health: 100, users: "4.1k" },
    { code: "TR", name: "Turkish", coverage: 100, status: "stable", ai_health: 100, users: "3.5k" },
    { code: "DE", name: "German", coverage: 100, status: "stable", ai_health: 100, users: "2.8k" },
    { code: "FR", name: "French", coverage: 100, status: "stable", ai_health: 100, users: "3.2k" },
    { code: "ES", name: "Spanish", coverage: 100, status: "stable", ai_health: 100, users: "4.5k" },
    { code: "ZH", name: "Chinese", coverage: 100, status: "stable", ai_health: 100, users: "15.2k" },
    { code: "JA", name: "Japanese", coverage: 100, status: "stable", ai_health: 100, users: "2.1k" },
    { code: "KO", name: "Korean", coverage: 100, status: "stable", ai_health: 100, users: "1.8k" },
    { code: "HI", name: "Hindi", coverage: 100, status: "stable", ai_health: 100, users: "9.3k" },
    { code: "UR", name: "Urdu", coverage: 100, status: "stable", ai_health: 100, users: "3.2k" },
    { code: "RU", name: "Russian", coverage: 100, status: "stable", ai_health: 100, users: "5.1k" },
    { code: "PT", name: "Portuguese", coverage: 100, status: "stable", ai_health: 100, users: "3.9k" },
    { code: "IT", name: "Italian", coverage: 100, status: "stable", ai_health: 100, users: "2.4k" },
    { code: "NL", name: "Dutch", coverage: 100, status: "stable", ai_health: 100, users: "1.9k" },
    { code: "ID", name: "Indonesian", coverage: 100, status: "stable", ai_health: 100, users: "6.2k" },
    { code: "VI", name: "Vietnamese", coverage: 100, status: "stable", ai_health: 100, users: "4.8k" },
    { code: "TH", name: "Thai", coverage: 100, status: "stable", ai_health: 100, users: "2.9k" },
    { code: "MS", name: "Malay", coverage: 100, status: "stable", ai_health: 100, users: "3.1k" },
    { code: "FA", name: "Persian", coverage: 100, status: "stable", ai_health: 100, users: "2.5k" },
    { code: "PL", name: "Polish", coverage: 100, status: "stable", ai_health: 100, users: "1.7k" },
    { code: "SV", name: "Swedish", coverage: 100, status: "stable", ai_health: 100, users: "1.2k" },
    { code: "NO", name: "Norwegian", coverage: 100, status: "stable", ai_health: 100, users: "0.9k" },
    { code: "FI", name: "Finnish", coverage: 100, status: "stable", ai_health: 100, users: "0.8k" },
    { code: "DA", name: "Danish", coverage: 100, status: "stable", ai_health: 100, users: "1.1k" },
    { code: "EL", name: "Greek", coverage: 100, status: "stable", ai_health: 100, users: "1.4k" },
    { code: "HE", name: "Hebrew", coverage: 100, status: "stable", ai_health: 100, users: "1.6k" },
    { code: "CS", name: "Czech", coverage: 100, status: "stable", ai_health: 100, users: "1.3k" },
    { code: "HU", name: "Hungarian", coverage: 100, status: "stable", ai_health: 100, users: "1.1k" },
    { code: "RO", name: "Romanian", coverage: 100, status: "stable", ai_health: 100, users: "1.8k" },
    { code: "UK", name: "Ukrainian", coverage: 100, status: "stable", ai_health: 100, users: "2.2k" },
    { code: "SK", name: "Slovak", coverage: 100, status: "stable", ai_health: 100, users: "0.9k" },
    { code: "BG", name: "Bulgarian", coverage: 100, status: "stable", ai_health: 100, users: "0.8k" },
    { code: "HR", name: "Croatian", coverage: 100, status: "stable", ai_health: 100, users: "0.7k" },
    { code: "LT", name: "Lithuanian", coverage: 100, status: "stable", ai_health: 100, users: "0.5k" },
    { code: "LV", name: "Latvian", coverage: 100, status: "stable", ai_health: 100, users: "0.4k" },
    { code: "ET", name: "Estonian", coverage: 100, status: "stable", ai_health: 100, users: "0.3k" },
    { code: "SL", name: "Slovenian", coverage: 100, status: "stable", ai_health: 100, users: "0.4k" },
    { code: "MT", name: "Maltese", coverage: 100, status: "stable", ai_health: 100, users: "0.1k" },
    { code: "IS", name: "Icelandic", coverage: 100, status: "stable", ai_health: 100, users: "0.2k" },
    { code: "GA", name: "Irish", coverage: 100, status: "stable", ai_health: 100, users: "0.3k" },
    { code: "SQ", name: "Albanian", coverage: 100, status: "stable", ai_health: 100, users: "0.6k" },
    { code: "MK", name: "Macedonian", coverage: 100, status: "stable", ai_health: 100, users: "0.5k" },
    { code: "HY", name: "Armenian", coverage: 100, status: "stable", ai_health: 100, users: "0.7k" },
    { code: "KA", name: "Georgian", coverage: 100, status: "stable", ai_health: 100, users: "0.8k" }
  ];

  const filteredLanguages = languages
    .filter(lang =>
      (statusFilter === 'all' || lang.status === statusFilter) &&
      (lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <ViewContainer
      title={t('language_ecosystem_title')}
      subtitle={t('integration_matrix')}
      actions={
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? t('syncing') : t('sync_translations')}
        </button>
      }
    >
      <Sheet open={!!selectedLanguage} onOpenChange={(open) => !open && setSelectedLanguage(null)}>
        <SheetContent side="right" className="bg-zinc-950 border-l border-white/10 w-full sm:max-w-xl p-0 z-[10000]">
          <SheetHeader className="sr-only">
            <SheetTitle>Translation Details: {selectedLanguage?.name}</SheetTitle>
            <SheetDescription>Manage page-level translation progress for {selectedLanguage?.name}</SheetDescription>
          </SheetHeader>
          {selectedLanguage && (
            <div className="h-full p-8">
              <TranslationManager language={selectedLanguage} onClose={() => setSelectedLanguage(null)} />
            </div>
          )}
        </SheetContent>
      </Sheet>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('active_languages')}</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-white">46</p>
            <p className="text-[10px] font-bold text-emerald-500 mb-1">+4 WIP</p>
          </div>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('global_coverage')}</p>
          <p className="text-3xl font-black text-[#fabf37]">100%</p>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('ai_translation_health')}</p>
          <p className="text-3xl font-black text-white">92.8%</p>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('total_strings')}</p>
          <p className="text-3xl font-black text-white">12,482</p>
        </div>
      </div>

      <div className="bg-black border border-white/5 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37]">
              <Languages className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">{t('integration_pipeline')}</h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Showing {filteredLanguages.length} of 46 Languages</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder={t('search_language')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors w-64"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'stable', 'beta', 'dev'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-colors ${statusFilter === status
                    ? 'bg-[#fabf37] text-black'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/20 border-b border-white/5 sticky top-0 z-20 backdrop-blur-md">
              <tr>
                <th onClick={() => handleSort('name')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                  <div className="flex items-center gap-2">
                    {t('language_locale')}
                    <span className={`transition-opacity ${sortConfig.key === 'name' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig.key === 'name' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                    </span>
                  </div>
                </th>
                <th onClick={() => handleSort('coverage')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                  <div className="flex items-center gap-2">
                    {t('global_coverage')}
                    <span className={`transition-opacity ${sortConfig.key === 'coverage' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig.key === 'coverage' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                    </span>
                  </div>
                </th>
                <th onClick={() => handleSort('ai_health')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                  <div className="flex items-center gap-2">
                    {t('ai_translation_health')}
                    <span className={`transition-opacity ${sortConfig.key === 'ai_health' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig.key === 'ai_health' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                    </span>
                  </div>
                </th>
                <th onClick={() => handleSort('users')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                  <div className="flex items-center gap-2">
                    {t('daily_users')}
                    <span className={`transition-opacity ${sortConfig.key === 'users' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig.key === 'users' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                    </span>
                  </div>
                </th>
                <th onClick={() => handleSort('status')} className="p-6 text-[10px] font-black text-zinc-500 uppercase text-right cursor-pointer hover:text-white transition-colors select-none group">
                  <div className="flex items-center justify-end gap-2">
                    {t('deployment')}
                    <span className={`transition-opacity ${sortConfig.key === 'status' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                      {sortConfig.key === 'status' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLanguages.map((lang) => (
                <tr
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang)}
                  className="border-b border-white/5 hover:bg-white/[0.05] transition-colors group cursor-pointer"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white font-black text-xs group-hover:bg-[#fabf37] group-hover:text-black transition-all">
                        {lang.code}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{lang.name}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">ISO-639-1: {lang.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black text-white mb-1">
                        <span>{lang.coverage}%</span>
                      </div>
                      <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.coverage}%` }}
                          className={`h-full ${lang.coverage > 90 ? 'bg-emerald-500' : lang.coverage > 80 ? 'bg-[#fabf37]' : 'bg-orange-500'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-3 text-[#fabf37]" />
                      <span className="text-sm font-black text-white">{lang.ai_health}%</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-black text-zinc-400">{lang.users}</td>
                  <td className="p-6 text-right">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${lang.status === 'stable' ? 'bg-emerald-500/10 text-emerald-500' :
                      lang.status === 'beta' ? 'bg-[#fabf37]/10 text-[#fabf37]' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                      {lang.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ViewContainer>
  );
}
