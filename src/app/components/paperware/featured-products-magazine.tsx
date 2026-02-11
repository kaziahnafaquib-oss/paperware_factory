import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ShoppingBasket as BasketIcon } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface FeaturedProductsMagazineProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function FeaturedProductsMagazine({ products, onProductClick }: FeaturedProductsMagazineProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Hero Featured Product - Full Width Visual */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="group cursor-pointer"
        onClick={() => onProductClick(products[0])}
      >
        <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-zinc-900 shadow-2xl">
          {/* Background Image with Parallax Effect */}
          <motion.div 
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent z-10" />
            <ImageWithFallback 
              src={products[0]?.image} 
              className="w-full h-full object-cover opacity-40 mix-blend-lighten"
              alt={products[0]?.name}
            />
          </motion.div>

          {/* Noise & Gradient Effects */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light z-10" />
          <motion.div 
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, rgba(250,191,55,0.3) 0%, transparent 60%)',
                'radial-gradient(circle at 80% 50%, rgba(250,191,55,0.3) 0%, transparent 60%)',
                'radial-gradient(circle at 20% 50%, rgba(250,191,55,0.3) 0%, transparent 60%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 z-10"
          />

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-16">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fabf37] text-zinc-900 border-2 border-[#fabf37]/50">
                  <Zap className="size-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Featured Hero</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">{products[0]?.category}</p>
                  <h3 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight max-w-2xl">
                    {products[0]?.name}
                  </h3>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 45 }}
                whileTap={{ scale: 0.9 }}
                className="size-16 md:size-20 rounded-2xl bg-white text-zinc-900 flex items-center justify-center shadow-2xl hover:bg-[#fabf37] transition-colors"
              >
                <BasketIcon className="size-6 md:size-8" />
              </motion.button>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="size-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">In Stock</span>
                  </div>
                  <div className="h-6 w-px bg-white/20" />
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Premium Quality</span>
                </div>
                <p className="text-zinc-300 text-base max-w-xl leading-relaxed">
                  Our flagship eco-friendly packaging solution designed for excellence
                </p>
              </div>

              <motion.div
                whileHover={{ x: 10 }}
                className="hidden md:flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest"
              >
                Explore Details <ArrowRight className="size-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Grid of Products - Staggered Magazine Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(1, 7).map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className={`group cursor-pointer ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            onClick={() => onProductClick(product)}
          >
            <div className={`h-full bg-white rounded-[2rem] overflow-hidden border border-zinc-200 shadow-lg hover:shadow-2xl hover:border-[#fabf37]/50 transition-all duration-500 ${idx === 0 ? 'p-10' : 'p-6'}`}>
              {idx === 0 ? (
                /* Large Spotlight Card */
                <div className="h-full flex flex-col justify-between min-h-[400px]">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-white">
                          <div className="size-1.5 bg-[#fabf37] rounded-full animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Spotlight</span>
                        </div>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{product.category}</p>
                        <h3 className="text-2xl md:text-4xl font-black text-zinc-900 group-hover:text-[#fabf37] transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-[#fabf37]/10 rounded-3xl blur-3xl" />
                      <ImageWithFallback 
                        src={product.image} 
                        className="relative w-full h-[250px] md:h-[300px] object-contain mix-blend-multiply"
                        alt={product.name}
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-4 pt-6 border-t-2 border-zinc-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-600">
                        <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold uppercase">Available Now</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="size-12 rounded-full bg-zinc-900 text-white flex items-center justify-center group-hover:bg-[#fabf37] transition-colors shadow-lg"
                      >
                        <BasketIcon className="size-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular Grid Cards */
                <div className="h-full flex flex-col justify-between min-h-[320px]">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 px-3 py-1 bg-zinc-50 rounded-full">
                        {product.category}
                      </div>
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        className="size-8 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-[#fabf37]/10 transition-colors"
                      >
                        <ArrowRight className="size-4 text-zinc-400 group-hover:text-[#fabf37]" />
                      </motion.div>
                    </div>

                    <h3 className="text-lg md:text-xl font-black text-zinc-900 group-hover:text-[#fabf37] transition-colors leading-tight pr-4">
                      {product.name}
                    </h3>

                    <motion.div
                      whileHover={{ y: -10, scale: 1.1 }}
                      className="py-6"
                    >
                      <ImageWithFallback 
                        src={product.image} 
                        className="w-full h-[150px] md:h-[180px] object-contain mix-blend-multiply"
                        alt={product.name}
                      />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-1.5">
                      <div className="size-1.5 bg-green-500 rounded-full" />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Ready</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="size-9 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center group-hover:bg-[#fabf37] group-hover:text-white transition-colors"
                    >
                      <BasketIcon className="size-4" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}