import { useState } from 'react';
import { FileText, Eye } from "lucide-react";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";

export default function RFQPipelineView() {
  const [rfqs, setRfqs] = useState([
    { id: "RFQ-10293", client: "Arabica Coffee Co.", product: "8oz Double Wall", quantity: "50,000 pcs", status: "pending", time: "2h ago", value: "$4,500" },
    { id: "RFQ-10294", client: "Green Leaf Cafe", product: "Eco-Friendly Tray", quantity: "10,000 pcs", status: "reviewing", time: "4h ago", value: "$1,200" },
    { id: "RFQ-10295", client: "Global Catering", product: "Single Wall (Custom)", quantity: "250,000 pcs", status: "quoted", time: "6h ago", value: "$18,500" },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setRfqs(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`RFQ ${id} moved to ${newStatus}`);
  };

  return (
    <ViewContainer title="RFQ Pipeline" subtitle="Manage Incoming Quotation Requests">
      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="bg-black border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-[#fabf37]/50 transition-all">
            <div className="flex items-center gap-6">
              <div className="size-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-[#fabf37]">
                <FileText className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{rfq.client}</h4>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{rfq.id}</span>
                </div>
                <p className="text-sm font-bold text-zinc-400 mt-1">{rfq.product} • {rfq.quantity} • <span className="text-[#fabf37]">{rfq.value}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <select 
                 value={rfq.status}
                 onChange={(e) => updateStatus(rfq.id, e.target.value)}
                 className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white outline-none focus:border-[#fabf37]"
               >
                 <option value="pending">Pending</option>
                 <option value="reviewing">Reviewing</option>
                 <option value="quoted">Quoted</option>
                 <option value="closed">Closed</option>
               </select>
               <button className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white"><Eye className="size-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </ViewContainer>
  );
}
