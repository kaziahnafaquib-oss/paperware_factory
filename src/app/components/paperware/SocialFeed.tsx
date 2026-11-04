import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BrandBadge, type BrandKey } from './brand-icons';
import imgTakeaway from '@/assets/products/takeaway-food-box.webp';
import imgGiftBags from '@/assets/products/gift-bags.webp';
import imgCookie from '@/assets/products/cookie-boxes.webp';
import imgChowmein from '@/assets/products/chowmein-boxes.webp';
import { useLanguage } from "../../context/LanguageContext";

// No fabricated posts: each card links to a real Paperware profile and shows a real product photo.
const profiles = [
    { platform: "Facebook", brand: "facebook" as BrandKey, url: "https://www.facebook.com/paperwarefactory", handle: "facebook.com/paperwarefactory", image: imgTakeaway },
    { platform: "Instagram", brand: "instagram" as BrandKey, url: "https://www.instagram.com/paperware_factory/", handle: "instagram.com/paperware_factory", image: imgGiftBags },
    { platform: "LinkedIn", brand: "linkedin" as BrandKey, url: "https://www.linkedin.com/company/paperwarefactory/", handle: "linkedin.com/company/paperwarefactory", image: imgCookie },
    { platform: "TikTok", brand: "tiktok" as BrandKey, url: "https://www.tiktok.com/@paperwarefactory", handle: "tiktok.com/@paperwarefactory", image: imgChowmein },
];

export const SocialFeed = React.memo(function SocialFeed() {
  const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <div className="px-2">
                <h3 className="text-xl font-black uppercase tracking-tight">{t("socialfeed_find_us_online")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {profiles.map((p) => (
                    <motion.a
                        key={p.platform}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="group block bg-white rounded-[32px] border border-black/5 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
                    >
                        <div className="aspect-video w-full bg-zinc-100 relative overflow-hidden">
                            <img loading="lazy" src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <BrandBadge brand={p.brand} className="absolute top-3 left-3 size-9 rounded-full ring-2 ring-white/80" iconClass="size-4" />
                        </div>
                        <div className="p-4 bg-[#fabf37] flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-widest text-black">{t(p.platform)}</p>
                                <p className="text-[9px] font-bold text-black/70 truncate">{t(p.handle)}</p>
                            </div>
                            <ArrowRight className="size-4 text-black shrink-0" />
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
});
