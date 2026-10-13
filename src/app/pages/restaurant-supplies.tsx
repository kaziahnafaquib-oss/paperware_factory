import image_370cc946765f24fecd2241c5798febf3f636cf5e from 'figma:asset/370cc946765f24fecd2241c5798febf3f636cf5e.webp';
import image_44417efdbf939eba86a583d08d358bb76989e3cd from 'figma:asset/44417efdbf939eba86a583d08d358bb76989e3cd.webp';
import image_ee1e96d0bd347161979763a2b2031584e134c4d4 from 'figma:asset/ee1e96d0bd347161979763a2b2031584e134c4d4.webp';
import image_9a9c9fa960f9122b0d888aba39bcd4994971b7ae from 'figma:asset/9a9c9fa960f9122b0d888aba39bcd4994971b7ae.webp';
import React from "react";
import { motion } from "motion/react";
import { 
  Utensils, Box, ShoppingBag, CircleCheck as CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Thermometer, Droplets,
  Pizza, Sandwich, Cake, Drumstick, Candy,
  Layers, IceCream, Coffee, FileText
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Truck } from "lucide-react";
import { TopSellingProducts } from "../components/TopSellingProducts";
import { SocialMediaFeed } from "../components/SocialMediaFeed";

const products = [
  { name: "FOOD BOX", desc: "Grease-resistant industrial grade food containers.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1567570671796-c8fed5eb1e7d?auto=format&q=75&w=1600", price: "8.50", icon: Box },
  { name: "CHOWMEIN BOX", desc: "Leak-proof boxes with specialized thermal coating.", category: "Restaurant Packaging", image: image_370cc946765f24fecd2241c5798febf3f636cf5e, price: "6.20", icon: Utensils },
  { name: "MEAT BOX", desc: "Heavy-duty boxes for raw and processed meats.", category: "Restaurant Packaging", image: image_44417efdbf939eba86a583d08d358bb76989e3cd, price: "12.00", icon: Drumstick },
  { name: "SANDWICH BOX", desc: "Clear-window display boxes for freshness.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1560340841-eefc7aa04432?auto=format&q=75&w=1600", price: "5.50", icon: Sandwich },
  { name: "BURGER BOX", desc: "Ventilated boxes to maintain crispness.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1744842854127-2d948d9ea673?auto=format&q=75&w=1600", price: "7.00", icon: Sandwich },
  { name: "PIZZA BOX", desc: "Triple-layer corrugated heat-retention boxes.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1689793600363-31a3eb87b462?auto=format&q=75&w=1600", price: "15.00", icon: Pizza },
  { name: "CAKE BOX", desc: "Premium handle-integrated pastry packaging.", category: "Restaurant Packaging", image: image_ee1e96d0bd347161979763a2b2031584e134c4d4, price: "18.50", icon: Cake },
  { name: "SWEET BOX", desc: "Traditional and luxury boxes with foil stamping.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1607940471713-a9376f150a0d?auto=format&q=75&w=1600", price: "25.00", icon: Candy },
  { name: "FRIES BOX", desc: "Oil-resistant scoop cups for crispy fries.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&q=75&w=1600", price: "4.00", icon: Box },
  { name: "SHAWARMA BOX", desc: "Easy-tear open boxes for wraps and rolls.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1529006557810-274bc9344389?auto=format&q=75&w=1600", price: "5.00", icon: Utensils },
  { name: "WAFFLE BOX & TRAY", desc: "Sturdy trays for waffles and toppings.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1562519990-50eb51e28292?auto=format&q=75&w=1600", price: "6.50", icon: Layers },
  { name: "WEDGES CONE", desc: "Conical holders for potato wedges and snacks.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1610444585193-470557e491c1?auto=format&q=75&w=1600", price: "3.50", icon: IceCream },
  { name: "ICE CREAM CONE", desc: "Protective sleeves for ice cream cones.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&q=75&w=1600", price: "2.00", icon: IceCream },
  { name: "SUGAR SACHET", desc: "Custom branded sugar and seasoning sachets.", category: "Restaurant Packaging", image: image_9a9c9fa960f9122b0d888aba39bcd4994971b7ae, price: "0.50", icon: Coffee },
  { name: "TABLE MAT", desc: "Disposable paper table mats with branding.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1575424909138-70b05d80c092?auto=format&q=75&w=1600", price: "1.00", icon: FileText },
  { name: "CARRY BAG", desc: "Durable kraft paper bags for takeaway.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1668012509229-782623ba3306?auto=format&q=75&w=1600", price: "3.00", icon: ShoppingBag },
  { name: "FOOD MENU", desc: "High-quality printed disposable or reusable menus.", category: "Restaurant Packaging", image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&q=75&w=1600", price: "4.50", icon: FileText },
];

export function RestaurantSuppliesPage({ onProductClick }: { onProductClick: (p: any) => void }) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-24 font-['Poppins',sans-serif]">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="size-2 rounded-full bg-[#fabf37]" />
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Food-Grade Packaging Solutions</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            Restaurant <br /> <span className="text-zinc-300">Supplies</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            Our food packaging is engineered for the modern culinary industry. Leak-proof, heat-retaining, and 100% sustainable materials that keep your food as fresh as it was in the kitchen.
          </p>
        </div>
      </section>

      {/* Tech Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Thermometer className="size-8" />, title: "Heat Retention", desc: "Keeps food hot for up to 45 minutes." },
            { icon: <Droplets className="size-8" />, title: "Grease Proof", desc: "Specialized coating prevents oil leakage." },
            { icon: <ShieldCheck className="size-8" />, title: "FDA Approved", desc: "100% food-safe virgin pulp materials." },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="p-10 bg-white border border-black/5 rounded-[40px] shadow-sm group hover:shadow-xl transition-all duration-300"
            >
              <div className="size-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 text-[#fabf37] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="text-xl font-black uppercase mb-4 text-black">{item.title}</h4>
              <p className="text-zinc-500 font-bold text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onProductClick(p)}
              className="group bg-white rounded-[40px] border border-black/5 hover:border-[#fabf37] hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <div className="size-12 rounded-xl bg-zinc-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all">
                     <p.icon className="size-5" />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-zinc-100 rounded-full text-[rgb(0,0,0)]">{p.category}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-black">{p.name}</h3>
                <p className="text-zinc-500 font-bold text-xs mb-6 leading-relaxed line-clamp-2">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    Order Now <ArrowRight className="size-4" />
                  </button>
                  <Zap className="size-4 text-[#fabf37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Delivery Promotion Banner */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-[#fabf37] rounded-[60px] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Truck className="size-64 text-black" /></div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">Express <br /> Food-Pack</h2>
            <p className="text-black/60 font-bold text-lg max-w-md">Need packaging urgently for your restaurant? We dispatch within 12-24 hours for standard sizes.</p>
          </div>
          <div className="lg:w-1/2 flex justify-end">
            <button className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Start Express Order</button>
          </div>
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />
      <SocialMediaFeed />

      {/* Industrial Banner */}
      <section className="bg-black py-32 relative overflow-hidden rounded-[80px] mx-4">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Utensils className="size-64 text-[#fabf37]" /></div>
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Scale Your <span className="text-[#fabf37]">Chain</span>
            </h2>
            <p className="text-zinc-500 font-bold text-xl leading-relaxed">
              Supporting global food chains with consistent high-volume supply. Our manufacturing lines run 24/7 to ensure your packaging never stops.
            </p>
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="space-y-2">
                <p className="text-3xl font-black text-white">10M+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Boxes Monthly</p>
              </div>
              <div className="w-px h-16 bg-white/10 hidden md:block" />
              <div className="space-y-2">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Biodegradable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}