import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContainer } from "../ViewContainer";
import { SimulatedDB, Order } from "../../../../lib/simulated-db";
import { RefreshCw, ArrowUpRight } from "lucide-react";

export default function ActiveOrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = () => {
    setOrders(SimulatedDB.getOrders().filter(o => o.type !== 'Support'));
  };

  useEffect(() => {
    loadOrders();
    const handleUpdate = () => loadOrders();
    window.addEventListener('paperware-storage-update', handleUpdate);
    return () => window.removeEventListener('paperware-storage-update', handleUpdate);
  }, []);

  return (
    <ViewContainer
      title="Active Orders"
      subtitle="Production & Logistics Tracking"
      actions={
        <button onClick={loadOrders} className="p-2 bg-zinc-800 rounded-lg text-white hover:bg-zinc-700 transition-colors">
          <RefreshCw className="size-4" />
        </button>
      }
    >
      <AnimatePresence>
        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-zinc-900/10 rounded-[32px] border border-dashed border-zinc-800">
            <p className="text-zinc-500 font-bold uppercase tracking-widest">No active orders in the pipeline.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orders.map((ord) => (
              <motion.div
                key={ord.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fabf37]/5 rounded-full blur-2xl group-hover:bg-[#fabf37]/10 transition-colors" />

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{ord.id}</p>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-[8px] text-zinc-400 font-bold uppercase">{ord.type}</span>
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mt-1">{ord.product}</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-bold">Client: {ord.client}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-transparent ${ord.status === 'Pending Review' ? 'bg-blue-500/10 text-blue-500' :
                      ord.status === 'In Production' ? 'bg-[#fabf37]/10 text-[#fabf37]' :
                        ord.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          'bg-white/5 text-zinc-400'
                    }`}>{ord.status}</span>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
                    <span>Production Progress</span>
                    <span className="text-white">{ord.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ord.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${ord.status === 'Completed' ? 'bg-emerald-500' : 'bg-[#fabf37]'}`}
                    />
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <div className="flex-1 p-3 rounded-2xl bg-black/30">
                    <p className="text-[9px] text-zinc-500 font-bold uppercase mb-1">Quantity</p>
                    <p className="text-sm font-black text-white">{ord.qty}</p>
                  </div>
                  <div className="flex-1 p-3 rounded-2xl bg-black/30">
                    <p className="text-[9px] text-zinc-500 font-bold uppercase mb-1">Deadline</p>
                    <p className="text-sm font-black text-white">{ord.date}</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#fabf37] transition-all flex items-center justify-center gap-2 relative z-10">
                  Open Production Node <ArrowUpRight className="size-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </ViewContainer>
  );
}
