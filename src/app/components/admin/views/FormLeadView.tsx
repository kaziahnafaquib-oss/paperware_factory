
import { useState, useEffect } from 'react';
import { Mail, Phone, FileText, Download, Star, Clock, CheckCircle, XCircle, Filter, Search, Calendar, ChevronRight, MoreHorizontal, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContainer } from "../ViewContainer";
import { SimulatedDB, Lead } from "../../../../lib/simulated-db";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function FormLeadView() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [viewMode, setViewMode] = useState<'List' | 'Kanban'>('Kanban');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadLeads();
        const handleUpdate = () => loadLeads();
        window.addEventListener('paperware-leads-update', handleUpdate);
        return () => window.removeEventListener('paperware-leads-update', handleUpdate);
    }, []);

    const loadLeads = () => setLeads(SimulatedDB.getLeads());

    const updateStatus = (id: string, newStatus: Lead['status']) => {
        const lead = leads.find(l => l.id === id);
        if (lead) {
            SimulatedDB.updateLead({ ...lead, status: newStatus });
            toast.success("Lead Updated", { description: `${lead.name} moved to ${newStatus}` });
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { draggableId, destination } = result;
        const newStatus = destination.droppableId as Lead['status'];
        updateStatus(draggableId, newStatus);
    };

    const exportToExcel = () => {
        toast.success("Export Started", { description: "Downloading leads.xlsx..." });
    };

    const getColumns = () => {
        const columns: Record<string, Lead[]> = {
            'New': [],
            'Contacted': [],
            'Qualified': [],
            'Closed': []
        };
        leads.filter(l =>
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.company.toLowerCase().includes(search.toLowerCase())
        ).forEach(lead => {
            if (columns[lead.status]) columns[lead.status].push(lead);
        });
        return columns;
    };

    return (
        <ViewContainer
            title="Form & Lead Manager"
            subtitle="Customer Inquiries & Pipeline"
            actions={
                <div className="flex gap-3">
                    <div className="flex bg-black/50 p-1 rounded-xl">
                        <button
                            onClick={() => setViewMode('List')}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'List' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('Kanban')}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'Kanban' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                            Kanban
                        </button>
                    </div>
                </div>
            }
        >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'New Leads', val: leads.filter(l => l.status === 'New').length, icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                    { label: 'In Progress', val: leads.filter(l => l.status === 'Contacted').length, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
                    { label: 'Qualified', val: leads.filter(l => l.status === 'Qualified').length, icon: Star, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                    { label: 'Closed Won', val: leads.filter(l => l.status === 'Closed').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                ].map((stat, i) => (
                    <div key={i} className={`rounded-[24px] p-6 border ${stat.bg} ${stat.border}`}>
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className={`size-8 ${stat.color}`} />
                            <span className="text-2xl font-black text-white">{stat.val}</span>
                        </div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search leads..."
                        className="bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#fabf37] w-64"
                    />
                </div>
                <button onClick={exportToExcel} className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest">
                    <Download className="size-3" /> Export Data
                </button>
            </div>

            {viewMode === 'Kanban' ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-400px)] overflow-hidden">
                        {Object.entries(getColumns()).map(([columnId, columnLeads]) => (
                            <div key={columnId} className="flex flex-col h-full bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{columnId}</span>
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-bold text-zinc-500">{columnLeads.length}</span>
                                </div>
                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                                        >
                                            {columnLeads.map((lead, index) => (
                                                <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`bg-black border border-white/10 p-4 rounded-xl hover:border-[#fabf37]/50 group transition-all shadow-sm ${snapshot.isDragging ? 'rotate-2 scale-105 shadow-xl ring-2 ring-[#fabf37]' : ''}`}
                                                            onClick={() => setSelectedLead(lead)}
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${lead.priority === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-zinc-800 text-zinc-500'}`}>
                                                                    {lead.priority}
                                                                </span>
                                                                <span className="text-[9px] text-zinc-600">{lead.date}</span>
                                                            </div>
                                                            <h4 className="text-xs font-black text-white mb-1 group-hover:text-[#fabf37] transition-colors">{lead.company || lead.name}</h4>
                                                            <p className="text-[10px] text-zinc-400 mb-3 truncate">{lead.email}</p>
                                                            <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                                                                <span className="text-[9px] font-bold text-zinc-600 uppercase">{lead.type}</span>
                                                                {lead.value && <span className="text-[9px] font-mono text-emerald-500">${lead.value.toLocaleString()}</span>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            ) : (
                <div className="bg-black border border-white/5 rounded-[24px] overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-zinc-900 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Name</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Company</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Priority</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-500 uppercase tracking-widest">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white">{lead.name}</span>
                                            <span className="text-[10px] text-zinc-500">{lead.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-zinc-400">{lead.company}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-white/5 rounded text-[9px] font-bold uppercase tracking-widest text-zinc-400">{lead.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest ${lead.priority === 'High' ? 'text-red-500' : 'text-zinc-500'}`}>{lead.priority}</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-zinc-400">{lead.value ? `$${lead.value.toLocaleString()}` : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </ViewContainer>
    );
}
