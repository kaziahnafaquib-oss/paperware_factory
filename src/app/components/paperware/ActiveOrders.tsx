import { memo, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ChevronRight, Download } from 'lucide-react';
import { toast } from 'sonner';
import { orders } from './data';
import { useLanguage } from '../../context/LanguageContext';

interface ActiveOrdersProps {
  onViewAll: () => void;
  onSelectOrder: (order: any) => void;
}

export const ActiveOrders = memo(function ActiveOrders({ onViewAll, onSelectOrder }: ActiveOrdersProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-[40px] md:rounded-[60px] border border-black/5 shadow-sm overflow-hidden">
      <div className="p-6 md:p-10 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/30">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight">{t('portal_active_shipments')}</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewAll}
          className="px-4 md:px-6 py-2 md:py-3 bg-black text-white rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 md:gap-2 hover:bg-[#fabf37] hover:text-black transition-all shadow-lg"
        >
          {t('portal_view_all')} <ChevronRight className="size-3 md:size-4" />
        </motion.button>
      </div>
      <motion.div
        className="divide-y divide-zinc-100"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {orders.map((order, i) => (
          <motion.div
            key={i}
            layout
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ backgroundColor: "rgba(250, 250, 250, 0.8)" }}
            onClick={() => onSelectOrder(order)}
            className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 group cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="size-12 md:size-16 rounded-2xl md:rounded-3xl bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors group-hover:shadow-md">
                <Truck className={`size-6 md:size-8 ${order.status === 'Delivered' ? 'text-emerald-500' : 'text-zinc-400'}`} />
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">{order.id}</p>
                <p className="text-base md:text-xl font-black uppercase tracking-tight">{order.item}</p>
              </div>
            </div>

            <div className="flex-1 max-w-xs w-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest">{order.status}</span>
                <span className="text-[9px] font-black">{order.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${order.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className={`h-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-[#fabf37]'}`}
                />
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ scale: 1.1, opacity: 1, x: 0 }}
              onClick={(e: MouseEvent) => { e.stopPropagation(); toast.success(`Downloading documentation for ${order.id}`); }}
              className="p-4 rounded-2xl border border-black/5 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-[#fabf37]"
            >
              <Download className="size-5" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});