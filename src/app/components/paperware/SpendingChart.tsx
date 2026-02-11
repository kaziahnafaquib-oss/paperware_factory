import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface SpendingChartProps {
  data: { month: string; amount: number }[];
}

export default function SpendingChart({ data }: SpendingChartProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-8 md:p-10 rounded-[40px] md:rounded-[60px] border border-black/5 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('portal_spending_overview')}</h3>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">{t('portal_spending_desc')}</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-4 py-2 bg-black text-[#fabf37] rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">{t('chart_6m')}</motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-4 py-2 bg-zinc-100 text-zinc-400 hover:text-black rounded-full text-[9px] font-black uppercase tracking-widest transition-colors">{t('chart_1y')}</motion.button>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 900 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 900 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: 'none', padding: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}
              itemStyle={{ color: '#fabf37', fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '4px' }}
              cursor={{ stroke: '#fabf37', strokeWidth: 2 }}
              animationDuration={500}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#fabf37"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}