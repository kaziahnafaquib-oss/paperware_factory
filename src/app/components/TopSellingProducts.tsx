import React from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgSticker from "figma:asset/083092191c09807406b3ab9369303938adea8ea5.png";
import imgTissueBox from "figma:asset/942d624f3eeb9f40ef2152028a1d1e2e73a4d226.png";

const defaultProducts = [
  { id: 1, name: "8oz Paper Cup", category: "Paper Cups", image: "https://images.unsplash.com/photo-1517031330214-9b0c33b8c73c?auto=format&fit=crop&w=500&q=80", desc: "Classic hot/cold beverage solution.", specs: [{ label: "Capacity", value: "8oz, 12oz, 16oz" }] },
  { id: 2, name: "Burger Box", category: "Restaurant Supplies", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=80", desc: "Grease-proof ventilated design.", specs: [{ label: "Material", value: "Eco-Kraft" }] },
  { id: 3, name: "Kraft Carry Bag", category: "Packaging", image: "https://images.unsplash.com/photo-1668012509229-782623ba3306?auto=format&fit=crop&w=500&q=80", desc: "Premium textured carry bag.", specs: [{ label: "Finish", value: "Matte UV" }] },
  { id: 4, name: "Product Brochure", category: "Marketing", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80", desc: "High-finish brand literature.", specs: [{ label: "Paper", value: "170 GSM Art" }] },
  { id: 5, name: "Pharma Box", category: "Pharma", image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?auto=format&fit=crop&w=500&q=80", desc: "Sterile grade drug packaging.", specs: [{ label: "Safety", value: "SGS Verified" }] },
  { id: 6, name: "Custom Stickers", category: "Branding", image: imgSticker, desc: "Die-cut vinyl stickers.", specs: [{ label: "Material", value: "Vinyl" }] },
  { id: 7, name: "Tissue Box", category: "Personal Care", image: imgTissueBox, desc: "Custom branded facial tissue packaging.", specs: [{ label: "Capacity", value: "100 Pulls" }] },
];

export function TopSellingProducts({ 
  onProductClick,
  products 
}: { 
  onProductClick?: (p: any) => void,
  products?: any[]
}) {
  const displayProducts = products?.length ? products : defaultProducts;

  return (
    <div className="mb-8 container mx-auto px-4">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-[#fabf37] rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Inventory</span>
          </div>
          <motion.h2 
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[rgb(51,51,51)]"
          >
            Top Selling Products
          </motion.h2>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-6 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
        >
          {[...displayProducts, ...displayProducts].map((product, idx) => (
            <motion.div 
              key={`${product.id}-${idx}`}
              whileHover={{ scale: 0.98, y: -5 }}
              className="w-[280px] md:w-[320px] shrink-0 group rounded-[32px] p-5 border border-black/5 hover:border-[#fabf37]/50 hover:shadow-xl transition-all duration-500 flex flex-col gap-5 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f4e6cc 0%, #faf5eb 50%, #ffffff 100%)'
              }}
            >
              <div className="h-40 rounded-[24px] overflow-hidden bg-white/80 border border-black/5 relative flex items-center justify-center">
                <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                <div className="absolute top-3 left-3 bg-black text-[#fabf37] px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest">
                  {product.category}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-tighter line-clamp-1 text-[rgb(0,0,0)]">{product.name}</h3>
                <p className="text-zinc-600 text-[10px] font-bold leading-relaxed line-clamp-2">
                  {product.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-black/5 mt-auto">
                 <button 
                   onClick={() => onProductClick?.(product)}
                   className="flex-1 bg-black text-white px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all"
                 >
                   View Specs
                 </button>
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     onProductClick?.(product);
                   }}
                   aria-label={`View ${product.name} and add it to your quote`}
                   className="size-10 bg-[#fabf37] rounded-xl flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg"
                 >
                   <Plus className="size-4" aria-hidden="true" />
                 </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}