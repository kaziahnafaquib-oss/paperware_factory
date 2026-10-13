import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// Logo assets - Using placeholder images for reliability
const imgAlArabian = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&w=400&h=200&fit=crop&q=75";
const imgBengalClassic = "https://images.unsplash.com/photo-1597318130878-5a2c275eb9e6?auto=format&w=400&h=200&fit=crop&q=75";
const imgCafeZ = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&w=400&h=200&fit=crop&q=75";
const imgCoffeeAvenue = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&h=200&fit=crop&q=75";
const imgCrimsonCup = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&w=400&h=200&fit=crop&q=75";
const imgDhakaiKhana = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&w=400&h=200&fit=crop&q=75";
const imgAbdulMonem = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&w=400&h=200&fit=crop&q=75";
const imgWalton = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=400&h=200&fit=crop&q=75";
const imgNovatek = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&w=400&h=200&fit=crop&q=75";
const imgMgi = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&w=400&h=200&fit=crop&q=75";
const imgIcddrb = "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&w=400&h=200&fit=crop&q=75";
const imgFresh = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&w=400&h=200&fit=crop&q=75";

import { useLanguage } from "../../context/LanguageContext";

const clients = [
  imgAlArabian, imgBengalClassic, imgCafeZ, imgCoffeeAvenue, imgCrimsonCup, imgDhakaiKhana,
  imgAbdulMonem, imgWalton, imgNovatek, imgMgi, imgIcddrb, imgFresh
];

export function Clients() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-black uppercase tracking-tight">
            {t('clients')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 max-w-6xl mx-auto">
          {clients.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <ImageWithFallback src={logo} alt={`Client ${i}`} className="max-h-16 w-auto object-contain" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-10 py-3 border-2 border-black rounded-md font-bold uppercase text-sm hover:bg-black hover:text-white transition-all">
            {t('explore_products')} →
          </button>
        </div>
      </div>
    </section>
  );
}