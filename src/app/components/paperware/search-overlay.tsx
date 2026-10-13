import React from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, TrendingUp, Clock, ArrowRight, HelpCircle, Package, Globe, Zap } from "lucide-react";
import { toast } from "sonner";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: any) => void;
  onPageChange: (page: string) => void;
}

const SUGGESTIONS = [
  "Double Wall Paper Cup",
  "Biodegradable Food Box",
  "Custom Printed Envelopes",
  "Eco-friendly Carry Bags",
  "Pharmaceutical Packaging",
  "Restaurant Takeaway Kits"
];

const TRENDING_CATEGORIES = [
  { name: "Coffee Solutions", id: "papercups", icon: <Zap className="size-4" /> },
  { name: "Office Stationery", id: "office-stationary", icon: <Package className="size-4" /> },
  { name: "Eco Packaging", id: "sustainability", icon: <Globe className="size-4" /> }
];

const SEARCHABLE_PRODUCTS = [
  { name: "Double Wall Paper Cup", category: "Paper Cups", desc: "Insulated 8oz, 12oz, 16oz cups." },
  { name: "Single Wall Paper Cup", category: "Paper Cups", desc: "Standard 4oz, 7oz, 8oz cups." },
  { name: "Ripple Cup", category: "Paper Cups", desc: "Premium textured grip cups." },
  { name: "Burger Box", category: "Restaurant Supplies", desc: "Oil-resistant cardboard box." },
  { name: "Sandwich Box", category: "Restaurant Supplies", desc: "Clear window sandwich packaging." },
  { name: "Business Card", category: "Office Stationery", desc: "Premium 300gsm cards." },
  { name: "Envelope", category: "Office Stationery", desc: "Custom branded DL/C4 envelopes." },
  { name: "Eco Carry Bag", category: "Marketing Materials", desc: "Strong kraft paper bags." },
  { name: "Medicine Box", category: "Pharmaceutical", desc: "High-precision pharma packaging." }
];

export function SearchOverlay({ isOpen, onClose, onSelectProduct, onPageChange }: SearchOverlayProps) {
  useEscapeKey(isOpen, onClose);
  const [query, setQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<string[]>(["Paper Cup 8oz", "Burger Box"]);

  const filteredResults = query.length > 1 
    ? SEARCHABLE_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleHelp = () => {
    toast.info("AI Search Assistant", {
      description: "Try searching for product names, categories, or specific packaging solutions like 'Coffee Cups' or 'Kraft Bags'.",
      duration: 5000,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search products and pages"
          className="fixed inset-0 z-[3000] bg-zinc-950/95 backdrop-blur-3xl flex flex-col font-['Poppins',sans-serif]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-12 bg-transparent border-b border-white/5">
            <div className="flex items-center gap-4 md:gap-8 flex-1 max-w-6xl mx-auto w-full">
              <Search className="size-10 md:size-16 text-[#fabf37] shrink-0" />
              <input 
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS"
                className="w-full bg-transparent py-4 text-xl sm:text-2xl md:text-6xl font-[900] uppercase tracking-tighter sm:tracking-normal text-white focus:outline-none placeholder:text-zinc-800 caret-white"
              />
            </div>
            <button 
              onClick={onClose}
              className="p-4 text-zinc-500 hover:text-white transition-all duration-300"
            >
              <X className="size-10 md:size-16 stroke-[1.5]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div className="max-w-5xl mx-auto w-full p-8 md:p-12 space-y-16">
              
              {/* Search Results */}
              <AnimatePresence>
                {query.length > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#fabf37]">Results ({filteredResults.length})</h3>
                      <button onClick={() => setQuery("")} className="text-[10px] font-black uppercase text-white/30 hover:text-white transition-colors">Clear Search</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredResults.length > 0 ? filteredResults.map((product) => (
                        <button
                          key={product.name}
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                            setRecentSearches(prev => [product.name, ...prev.filter(s => s !== product.name)].slice(0, 5));
                          }}
                          className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-[#fabf37] group transition-all text-left"
                        >
                          <div className="size-12 rounded-2xl bg-black flex items-center justify-center text-[#fabf37] group-hover:bg-white group-hover:text-black transition-colors">
                            <Package className="size-6" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-white group-hover:text-black uppercase tracking-tight">{product.name}</h4>
                            <p className="text-[10px] font-bold text-white/40 group-hover:text-black/60 uppercase tracking-widest">{product.category}</p>
                          </div>
                          <ArrowRight className="size-5 ml-auto text-white/20 group-hover:text-black -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                        </button>
                      )) : (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                          <p className="text-xs font-black uppercase tracking-[0.4em] text-white/10 italic">No products matched your search</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Grid Layout for Suggestions & Trending */}
              <div className="grid md:grid-cols-2 gap-16">
                {/* Suggestions */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="size-5 text-[#fabf37]" />
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Suggested Search</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/60 hover:bg-[#fabf37] hover:text-black hover:border-[#fabf37] transition-all flex items-center gap-2 group"
                      >
                        {s}
                        <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="size-5 text-[#fabf37]" />
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Recent Searches</h3>
                    </div>
                    {recentSearches.length > 0 && (
                      <button onClick={handleClearRecent} className="text-[10px] font-black uppercase text-white/20 hover:text-[#fabf37] transition-colors">Clear All</button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {recentSearches.length > 0 ? recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestionClick(s)}
                        className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-sm font-bold text-white/80">{s}</span>
                        <ArrowRight className="size-4 text-white/20 group-hover:text-[#fabf37] transition-colors" />
                      </button>
                    )) : (
                      <p className="text-xs font-bold text-white/10 italic uppercase tracking-widest">No recent history</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Trending Categories */}
              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 text-center">Trending Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {TRENDING_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onPageChange(cat.id);
                        onClose();
                      }}
                      className="group relative h-32 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-[32px] overflow-hidden flex flex-col items-center justify-center gap-4 hover:border-[#fabf37]/50 transition-all"
                    >
                      <div className="size-12 rounded-2xl bg-black flex items-center justify-center text-[#fabf37] border border-white/10 group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                        {cat.name}
                      </span>
                      {/* Decorative background element */}
                      <div className="absolute top-0 right-0 size-24 bg-[#fabf37]/5 rounded-full blur-3xl -translate-y-12 translate-x-12 group-hover:bg-[#fabf37]/10 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Help */}
          <div className="p-12 flex justify-end">
            <button 
              onClick={handleHelp}
              className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-all"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Search Help?</span>
              <div className="size-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#fabf37] group-hover:border-[#fabf37]/30 transition-all">
                <HelpCircle className="size-4" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}