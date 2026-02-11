import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, FileText, Settings, Shield, Zap, Home, Clock, Star, Gift, Share2, Box, Truck } from 'lucide-react';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');

    const commands = [
        { id: '1', name: 'Order Status', category: 'Tracking', icon: Package, shortcut: 'O' },
        { id: '2', name: 'Download Invoices', category: 'Finance', icon: FileText, shortcut: 'I' },
        { id: '3', name: 'Sustainability Report', category: 'Analytics', icon: Shield, shortcut: 'S' },
        { id: '4', name: 'Inventory Forecast', category: 'Production', icon: Zap, shortcut: 'F' },
        { id: '5', name: 'Global Port Status', category: 'Logistics', icon: Globe, shortcut: 'G' },
        { id: '6', name: 'Account Settings', category: 'System', icon: Settings, shortcut: ',' },
    ];

    const filteredCommands = query === ''
        ? commands
        : commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (isOpen) onClose();
                else onClose(); // This would toggle if we had a parent toggle
            }
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: -20 }}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-black/5"
                >
                    <div className="p-6 flex items-center gap-4 border-b border-black/5">
                        <Search className="size-6 text-zinc-400" />
                        <input
                            autoFocus
                            placeholder="Search actions, orders, or reports... (e.g. 'Tracking')"
                            className="bg-transparent border-none outline-none text-lg font-bold w-full placeholder:text-zinc-300"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="px-2 py-1 bg-zinc-100 rounded-lg text-[10px] font-black text-zinc-400">ESC</div>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
                        <div className="space-y-2">
                            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Quick Actions</p>
                            {filteredCommands.map((command) => (
                                <button
                                    key={command.id}
                                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-2xl transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 group-hover:bg-black group-hover:text-white transition-all">
                                            <command.icon className="size-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">{command.name}</p>
                                            <p className="text-[10px] font-medium text-zinc-400">{command.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <kbd className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-400 group-hover:bg-zinc-200">⌘</kbd>
                                        <kbd className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-400 group-hover:bg-zinc-200">{command.shortcut}</kbd>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {query === '' && (
                            <div className="space-y-4">
                                <p className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Recent Searches</p>
                                <div className="flex flex-wrap gap-2 px-4">
                                    {['PW-8821', 'November Invoices', 'Eco Credit'].map((tag) => (
                                        <div key={tag} className="px-3 py-1.5 bg-zinc-100 rounded-full text-[10px] font-black text-zinc-500 hover:bg-[#fabf37] hover:text-black cursor-pointer transition-colors">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-zinc-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-400">
                                <div className="size-1.5 rounded-full bg-emerald-500" /> System Online
                            </div>
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Enterprise Edition v2.4</div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function Globe({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}
