import React from "react";
import { ViewContainer } from "../ViewContainer";
import { Package, FileText, Truck, Clock, AlertCircle, Download, ExternalLink, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const activeOrders = [
  { id: "ORD-7829", item: "Biodegradable Cups (12oz)", qty: "50,000", status: "In Production", eta: "2 Days", progress: 65 },
  { id: "ORD-7830", item: "Kraft Paper Bags", qty: "10,000", status: "Dispatched", eta: "Arrived", progress: 100 },
];

const invoices = [
  { id: "INV-2024-001", date: "Jan 15, 2024", amount: "$4,250.00", status: "Paid" },
  { id: "INV-2024-002", date: "Feb 02, 2024", amount: "$1,800.00", status: "Pending" },
];

export function ClientPortalView() {
  return (
    <ViewContainer title="Client Portal Simulator" subtitle="View as Client: TechFlow Systems">
      <div className="space-y-8">
        
        {/* Client Welcome Banner */}
        <div className="bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-[32px] p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Package className="size-32" />
           </div>
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                 <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Account Active</span>
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Welcome Back, TechFlow</h2>
              <p className="text-zinc-400 max-w-lg text-sm">Track your sustainable packaging orders, manage invoices, and download compliance certificates directly from your dedicated hub.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Active Orders */}
           <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                 <Truck className="size-5 text-[#fabf37]" /> Active Orders
              </h3>
              <div className="space-y-4">
                 {activeOrders.map((order) => (
                    <motion.div 
                       key={order.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="bg-black border border-white/5 rounded-3xl p-6 group hover:border-[#fabf37]/30 transition-all"
                    >
                       <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                          <div>
                             <div className="flex items-center gap-3 mb-1">
                                <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{order.id}</span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${order.status === 'Dispatched' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{order.status}</span>
                             </div>
                             <h4 className="text-lg font-bold text-white">{order.item}</h4>
                             <p className="text-xs text-zinc-500 mt-1">Quantity: {order.qty} units</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Est. Delivery</p>
                             <p className="text-xl font-black text-white">{order.eta}</p>
                          </div>
                       </div>
                       
                       {/* Progress Bar */}
                       <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${order.progress}%` }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className={`absolute top-0 left-0 h-full ${order.progress === 100 ? 'bg-blue-500' : 'bg-[#fabf37]'}`}
                          />
                       </div>
                       <div className="flex justify-between mt-2">
                          <span className="text-[9px] font-bold text-zinc-600 uppercase">Processing</span>
                          <span className="text-[9px] font-bold text-zinc-600 uppercase">Production</span>
                          <span className="text-[9px] font-bold text-zinc-600 uppercase">QC Check</span>
                          <span className="text-[9px] font-bold text-zinc-600 uppercase">Shipping</span>
                       </div>
                    </motion.div>
                 ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <button className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                           <FileText className="size-5" />
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-bold text-white uppercase">Catalog</p>
                           <p className="text-[10px] text-zinc-500">Browse Products</p>
                        </div>
                     </div>
                     <ExternalLink className="size-4 text-zinc-600 group-hover:text-white" />
                  </button>
                  <button className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                           <AlertCircle className="size-5" />
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-bold text-white uppercase">Support</p>
                           <p className="text-[10px] text-zinc-500">Open Ticket</p>
                        </div>
                     </div>
                     <ExternalLink className="size-4 text-zinc-600 group-hover:text-white" />
                  </button>
              </div>
           </div>

           {/* Sidebar: Invoices & Docs */}
           <div className="space-y-8">
              <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <CreditCard className="size-4 text-zinc-500" /> Recent Invoices
                 </h3>
                 <div className="space-y-4">
                    {invoices.map((inv) => (
                       <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5">
                          <div>
                             <p className="text-xs font-bold text-white">{inv.id}</p>
                             <p className="text-[10px] text-zinc-500">{inv.date}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xs font-black text-white">{inv.amount}</p>
                             <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${inv.status === 'Paid' ? 'text-emerald-500 bg-emerald-500/10' : 'text-orange-500 bg-orange-500/10'}`}>{inv.status}</span>
                          </div>
                       </div>
                    ))}
                 </div>
                 <button className="w-full mt-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white border border-dashed border-white/10 rounded-xl hover:bg-white/5 transition-all">View All History</button>
              </div>

              <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Download className="size-4 text-zinc-500" /> Compliance Docs
                 </h3>
                 <div className="space-y-2">
                    {["ISO 9001:2015 Cert", "FSC Chain of Custody", "Material Safety Data"].map((doc, i) => (
                       <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-left group transition-all">
                          <span className="text-xs font-bold text-zinc-400 group-hover:text-white">{doc}</span>
                          <Download className="size-3.5 text-zinc-600 group-hover:text-[#fabf37]" />
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </ViewContainer>
  );
}