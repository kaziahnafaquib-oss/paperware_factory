
import { useState, useEffect } from 'react';
import { Search, TrendingUp, Monitor, Link, CheckCircle, AlertTriangle, Download, RefreshCw, Zap, Target, Layout, ShieldCheck, BarChart3, X, Users, ExternalLink, ArrowRight, BrainCircuit, Code, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContainer } from "../ViewContainer";
import { toast } from "sonner";
import { SimulatedDB, SEOPage, KeywordRank, Competitor, Backlink } from "../../../../lib/simulated-db";

export default function SEOCommandView() {
    const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'keywords' | 'technical' | 'content-ai' | 'schema'>('overview');
    const [isScanning, setIsScanning] = useState(false);
    const [pages, setPages] = useState<SEOPage[]>([]);
    const [scanProgress, setScanProgress] = useState(0);

    const [keywords] = useState<KeywordRank[]>(SimulatedDB.getKeywords());

    useEffect(() => {
        loadPages();
        const handleUpdate = () => loadPages();
        window.addEventListener('paperware-seo-update', handleUpdate);
        return () => window.removeEventListener('paperware-seo-update', handleUpdate);
    }, []);

    const loadPages = () => {
        setPages(SimulatedDB.getSEOPages());
    };

    const handleScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    toast.success("Site Scan Complete", { description: "Updated SEO metrics and issues found." });
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <ViewContainer
            title="SEO Command Center"
            subtitle="Search Engine Optimization & Ranking Intelligence"
            actions={
                <div className="flex gap-3">
                    <button
                        disabled={isScanning}
                        onClick={handleScan}
                        className="px-6 py-3 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 overflow-hidden relative"
                    >
                        {isScanning && (
                            <motion.div
                                className="absolute inset-0 bg-emerald-500/20"
                                initial={{ width: 0 }}
                                animate={{ width: `${scanProgress}%` }}
                            />
                        )}
                        <RefreshCw className={`size-4 relative z-10 ${isScanning ? 'animate-spin' : ''}`} />
                        <span className="relative z-10">{isScanning ? `Scanning ${scanProgress}%` : 'Run Smart Scan'}</span>
                    </button>
                    <button className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
                        <Download className="size-4" /> Export Report
                    </button>
                </div>
            }
        >
            <div className="space-y-8">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 border-b border-white/5 pb-4">
                    {[
                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                        { id: 'pages', label: 'Pages & Content', icon: Layout },
                        { id: 'keywords', label: 'Keyword Rankings', icon: Target },
                        { id: 'technical', label: 'Technical Health', icon: Monitor },
                        { id: 'content-ai', label: 'Content Optimization AI', icon: BrainCircuit },
                        { id: 'schema', label: 'Schema Generator', icon: Code },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-white text-black'
                                : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon className="size-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && <OverviewTab key="overview" pages={pages} keywords={keywords} />}
                    {activeTab === 'pages' && <PagesTab key="pages" pages={pages} />}
                    {activeTab === 'keywords' && <KeywordsTab key="keywords" keywords={keywords} />}
                    {activeTab === 'technical' && <TechnicalTab key="technical" />}
                    {activeTab === 'content-ai' && <ContentAITab key="content-ai" pages={pages} />}
                    {activeTab === 'schema' && <SchemaGenTab key="schema" />}
                </AnimatePresence>
            </div>
        </ViewContainer>
    );
}

function OverviewTab({ pages, keywords }: { pages: SEOPage[], keywords: KeywordRank[] }) {
    const avgScore = Math.round(pages.reduce((acc, p) => acc + p.score, 0) / pages.length);
    const topKeywords = keywords.filter(k => k.position <= 3).length;
    const backlinks = SimulatedDB.getBacklinks();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Site Health Score" value={`${avgScore}/100`} trend="+5%" icon={Zap} color="text-[#fabf37]" />
                <StatsCard title="Keywords in Top 3" value={topKeywords.toString()} trend="+2" icon={Target} color="text-emerald-500" />
                <StatsCard title="Organic Traffic" value="12.5K" trend="+18%" icon={TrendingUp} color="text-blue-500" />
                <StatsCard title="Total Backlinks" value="1,240" trend="+12" icon={Link} color="text-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <AlertTriangle className="size-5 text-red-500" /> Critical Issues
                    </h3>
                    <div className="space-y-4">
                        {pages.filter(p => p.issues.length > 0).slice(0, 3).map(p => (
                            <div key={p.id} className="flex gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                                <div className="size-2 bg-red-500 rounded-full mt-1.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-black text-white uppercase mb-1">{p.page}</p>
                                    <ul className="text-[10px] text-zinc-400 space-y-1">
                                        {p.issues.map((issue, i) => <li key={i}>• {issue}</li>)}
                                    </ul>
                                </div>
                                <button className="ml-auto text-[9px] font-bold text-[#fabf37] uppercase tracking-widest hover:underline self-start">Fix</button>
                            </div>
                        ))}
                        {pages.every(p => p.issues.length === 0) && (
                            <div className="text-center py-8 text-zinc-500">
                                <CheckCircle className="size-8 mx-auto mb-2 text-emerald-500/50" />
                                <p className="text-[10px] uppercase tracking-widest">No critical issues found.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                        <Link className="size-5 text-purple-500" /> Recent Backlinks
                    </h3>
                    <div className="space-y-4">
                        {backlinks.map(link => (
                            <div key={link.id} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-zinc-800 rounded-lg">
                                        <Link className="size-4 text-zinc-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-white uppercase">{link.source}</h4>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-500 hover:text-purple-400 flex items-center gap-1">
                                            {new URL(link.url).hostname} <ExternalLink className="size-2" />
                                        </a>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest block">DA {link.authority}</span>
                                    <span className={`text-[9px] font-bold uppercase ${link.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>{link.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PagesTab({ pages }: { pages: SEOPage[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<SEOPage>>({});

    const handleEdit = (page: SEOPage) => {
        setEditingId(page.id);
        setEditForm({ ...page });
    };

    const handleSave = () => {
        if (editForm.id && editingId) {
            SimulatedDB.updateSEOPage(editForm as SEOPage);
            setEditingId(null);
            toast.success(`Updated SEO for ${editForm.page}`);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-8">
            <div className="flex-1 space-y-4">
                {pages.map((page) => (
                    <motion.div
                        key={page.id}
                        layout
                        onClick={() => handleEdit(page)}
                        className={`p-6 rounded-[24px] border cursor-pointer transition-all group ${editingId === page.id ? 'bg-[#fabf37] border-[#fabf37]' : 'bg-black border-white/5 hover:border-[#fabf37]/50'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className={`text-sm font-black uppercase ${editingId === page.id ? 'text-black' : 'text-white'}`}>{page.page}</h4>
                                <p className={`text-[10px] mt-1 truncate max-w-[300px] ${editingId === page.id ? 'text-black/70' : 'text-zinc-500'}`}>{page.url}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xl font-black ${editingId === page.id ? 'text-black' : page.score > 80 ? 'text-emerald-500' : 'text-yellow-500'}`}>{page.score}</span>
                            </div>
                        </div>
                        {page.issues.length > 0 && (
                            <div className="flex gap-2">
                                {page.issues.map((issue, i) => (
                                    <span key={i} className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase ${editingId === page.id ? 'bg-black/10 text-black' : 'bg-white/5 text-zinc-400'}`}>
                                        {issue}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Edit Panel */}
            <div className="w-[400px]">
                <AnimatePresence mode="wait">
                    {editingId ? (
                        <motion.div
                            key="editor"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-zinc-900 border border-white/10 rounded-[32px] p-6 sticky top-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-white uppercase">Edit Metadata</h3>
                                <button onClick={() => setEditingId(null)} className="p-2 hover:bg-white/10 rounded-full"><X className="size-4" /></button>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Page Title</label>
                                    <input
                                        type="text"
                                        value={editForm.title || ''}
                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white"
                                    />
                                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${editForm.title!.length > 60 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                            style={{ width: `${Math.min(100, (editForm.title!.length / 60) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Meta Description</label>
                                    <textarea
                                        rows={4}
                                        value={editForm.description || ''}
                                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white/90 leading-relaxed resize-none"
                                    />
                                    <p className="text-[8px] text-right text-zinc-500">{editForm.description?.length || 0} / 160</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Keywords (Comma Separated)</label>
                                    <input
                                        type="text"
                                        value={editForm.keywords || ''}
                                        onChange={e => setEditForm({ ...editForm, keywords: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white"
                                    />
                                </div>

                                <button onClick={handleSave} className="w-full py-4 bg-[#fabf37] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-zinc-600 p-8 border border-white/5 rounded-[32px] bg-zinc-900/20 border-dashed"
                        >
                            <Layout className="size-12 mb-4 opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Select a page to edit</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function KeywordsTab({ keywords }: { keywords: KeywordRank[] }) {
    const [subTab, setSubTab] = useState<'Rankings' | 'Competitors'>('Rankings');
    const competitors = SimulatedDB.getCompetitors();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex gap-2">
                <button
                    onClick={() => setSubTab('Rankings')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${subTab === 'Rankings' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                >
                    My Rankings
                </button>
                <button
                    onClick={() => setSubTab('Competitors')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${subTab === 'Competitors' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                >
                    Competitor Analysis
                </button>
            </div>

            {subTab === 'Rankings' ? (
                <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-black/40 border-b border-white/5">
                            <tr>
                                <th className="text-left py-6 px-8 text-[9px] font-black uppercase tracking-widest text-zinc-500">Keyword</th>
                                <th className="text-left py-6 px-8 text-[9px] font-black uppercase tracking-widest text-zinc-500">Position</th>
                                <th className="text-left py-6 px-8 text-[9px] font-black uppercase tracking-widest text-zinc-500">Difficulty</th>
                                <th className="text-left py-6 px-8 text-[9px] font-black uppercase tracking-widest text-zinc-500">Volume</th>
                                <th className="text-right py-6 px-8 text-[9px] font-black uppercase tracking-widest text-zinc-500">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {keywords.map((k, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors group">
                                    <td className="py-4 px-8 text-sm font-bold text-white group-hover:text-[#fabf37] transition-colors">{k.keyword}</td>
                                    <td className="py-4 px-8">
                                        <span className={`inline-flex items-center justify-center size-8 rounded-lg font-black text-xs ${k.position <= 3 ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                            {k.position}
                                        </span>
                                    </td>
                                    <td className="py-4 px-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <div className={`h-full ${k.difficulty > 60 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${k.difficulty}%` }} />
                                            </div>
                                            <span className="text-[9px] font-bold text-zinc-400">{k.difficulty}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-8 text-xs font-medium text-zinc-400">{k.volume.toLocaleString()}</td>
                                    <td className="py-4 px-8 text-right">
                                        {k.trend > 0 ? (
                                            <span className="text-emerald-500 text-[10px] font-black flex items-center justify-end gap-1"><TrendingUp className="size-3" /> +{k.trend}</span>
                                        ) : k.trend < 0 ? (
                                            <span className="text-red-500 text-[10px] font-black flex items-center justify-end gap-1"><TrendingUp className="size-3 rotate-180" /> {k.trend}</span>
                                        ) : (
                                            <span className="text-zinc-600 text-[10px] font-black">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {competitors.map((comp, i) => (
                        <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#fabf37]/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center">
                                    <Users className="size-6 text-zinc-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-white">{comp.name}</h4>
                                    <a href={`https://${comp.domain}`} target="_blank" className="text-xs text-zinc-500 hover:text-white transition-colors">{comp.domain}</a>
                                </div>
                            </div>

                            <div className="flex gap-8">
                                <div className="text-center">
                                    <span className="text-2xl font-black text-white">{comp.avgPosition}</span>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Avg Pos</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-2xl font-black text-white">{comp.keywordOverlap}%</span>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Overlap</span>
                                </div>
                                <div className="text-center">
                                    <span className={`text-2xl font-black ${comp.visibilityScore > 80 ? 'text-emerald-500' : 'text-yellow-500'}`}>{comp.visibilityScore}</span>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Visibility</span>
                                </div>
                            </div>

                            <button className="px-6 py-3 rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
                                Analysis <ArrowRight className="size-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function TechnicalTab() {
    const checks = [
        { label: 'SSL Certificate', status: 'pass', msg: 'Valid (Expires in 240 days)' },
        { label: 'Mobile Responsiveness', status: 'pass', msg: 'Passed Google Mobile-Friendly Test' },
        { label: 'Core Web Vitals', status: 'warning', msg: 'LCP needs improvement (2.8s)' },
        { label: 'Robots.txt', status: 'pass', msg: 'Properly configured' },
        { label: 'Sitemap.xml', status: 'pass', msg: 'Auto-generating daily' },
        { label: 'Broken Links', status: 'pass', msg: '0 broken internal links found' },
        { label: 'Hreflang Tags', status: 'fail', msg: 'Missing on 4 pages' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checks.map((check, i) => (
                <div key={i} className="p-6 bg-zinc-900/50 border border-white/5 rounded-[24px] hover:border-[#fabf37]/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl border ${check.status === 'pass' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                            check.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                'bg-red-500/10 border-red-500/20 text-red-500'
                            }`}>
                            {check.status === 'pass' ? <ShieldCheck className="size-5" /> : check.status === 'warning' ? <AlertTriangle className="size-5" /> : <X className="size-5" />}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${check.status === 'pass' ? 'text-emerald-500 bg-emerald-500/5' :
                            check.status === 'warning' ? 'text-yellow-500 bg-yellow-500/5' :
                                'text-red-500 bg-red-500/5'
                            }`}>{check.status}</span>
                    </div>
                    <h4 className="text-sm font-black text-white uppercase mb-1">{check.label}</h4>
                    <p className="text-[10px] font-medium text-zinc-500">{check.msg}</p>
                </div>
            ))}
        </motion.div>
    );
}

function SchemaGenTab() {
    const [type, setType] = useState('Organization');
    const [generated, setGenerated] = useState('');

    const templates: any = {
        'Organization': {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Paperware Factory",
            "url": "https://paperware.com",
            "logo": "https://paperware.com/logo.png"
        },
        'Product': {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Eco Paper Cup 8oz",
            "image": "https://paperware.com/imgs/cup-8oz.jpg",
            "description": "Sustainable double-wall paper cup.",
            "brand": {
                "@type": "Brand",
                "name": "Paperware"
            }
        }
    }

    useEffect(() => {
        setGenerated(JSON.stringify(templates[type], null, 2));
    }, [type]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generated);
        toast.success("Copied to clipboard");
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Schema Type</h3>
                <div className="space-y-4">
                    {['Organization', 'Product', 'Article', 'LocalBusiness'].map(t => (
                        <button
                            key={t}
                            onClick={() => setType(t)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${type === t ? 'bg-[#fabf37]/10 border-[#fabf37] text-[#fabf37]' : 'bg-black border-white/5 text-zinc-500 hover:text-white'}`}
                        >
                            <span className="font-black uppercase tracking-widest text-xs">{t}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-black border border-white/5 rounded-[32px] p-8 relative group">
                <button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
                >
                    <Copy className="size-4" />
                </button>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">JSON-LD Output</h3>
                <pre className="font-mono text-xs text-blue-400 overflow-x-auto">
                    {generated}
                </pre>
            </div>
        </motion.div>
    )
}

function ContentAITab({ pages }: { pages: SEOPage[] }) {
    const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyze = () => {
        if (!selectedPage) return;
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                score: 72,
                suggestions: [
                    "Keyword density for 'eco-friendly' is too low (0.5%)",
                    "Add more H2 headings to structure the content",
                    "Meta description is missing a call-to-action",
                    "Content readability is good (Grade 8)"
                ]
            });
        }, 1500);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Select Content</h3>
                <div className="space-y-2">
                    {pages.map(p => (
                        <button
                            key={p.id}
                            onClick={() => { setSelectedPage(p); setResult(null); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedPage?.id === p.id ? 'bg-[#fabf37] text-black border-[#fabf37]' : 'bg-black border-white/5 text-zinc-500 hover:text-white'}`}
                        >
                            <div className="text-xs font-black uppercase tracking-widest">{p.page}</div>
                            <div className={`text-[10px] mt-1 ${selectedPage?.id === p.id ? 'text-black/70' : 'text-zinc-600'}`}>{p.url}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                {selectedPage ? (
                    <>
                        <div className="bg-black border border-white/5 rounded-[32px] p-8 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-white uppercase">{selectedPage.page} Analysis</h3>
                                <p className="text-xs text-zinc-500 mt-1">AI-powered content audit</p>
                            </div>
                            <button
                                onClick={analyze}
                                disabled={analyzing}
                                className="px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                            >
                                {analyzing ? <RefreshCw className="size-4 animate-spin" /> : <BrainCircuit className="size-4" />}
                                {analyzing ? 'Analyzing...' : 'Run Analysis'}
                            </button>
                        </div>

                        {result && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-[24px]">
                                        <span className="text-4xl font-black text-white mb-2 block">{result.score}/100</span>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Optimization Score</span>
                                    </div>
                                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-[24px]">
                                        <span className="text-4xl font-black text-emerald-500 mb-2 block">Good</span>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Readability</span>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
                                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">AI Suggestions</h4>
                                    <ul className="space-y-3">
                                        {result.suggestions.map((s: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-zinc-400 text-xs">
                                                <div className="mt-1 size-1.5 rounded-full bg-[#fabf37]" />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 p-8 border border-white/5 rounded-[32px] bg-zinc-900/20 border-dashed">
                        <BrainCircuit className="size-12 mb-4 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Select a page to analyze</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

function StatsCard({ title, value, trend, icon: Icon, color }: any) {
    return (
        <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-[28px] hover:border-white/10 transition-all">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-black ${color}`}>
                    <Icon className="size-5" />
                </div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest">{trend}</span>
            </div>
            <h4 className="text-2xl font-black text-white mb-1">{value}</h4>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{title}</p>
        </div>
    );
}
