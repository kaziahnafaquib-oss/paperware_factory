import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

// No customer names or logos are shown: client identities are confidential.
// Only the verified audience statement is displayed.
export function Clients() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-black uppercase tracking-tight">
            {t('clients')}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-[#fabf37] text-black rounded-3xl px-8 py-14 md:px-16 text-center"
        >
          <p className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.05]">
            {t("clients_trusted_by_caf_s_restaurants")}
          </p>
        </motion.div>

        <div className="mt-12 text-center">
          <button className="px-10 py-3 border-2 border-black rounded-md font-bold uppercase text-sm hover:bg-black hover:text-white transition-all">
            {t('explore_products')} →
          </button>
        </div>
      </div>
    </section>
  );
}
