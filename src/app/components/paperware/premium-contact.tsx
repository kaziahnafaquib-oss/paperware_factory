import { FormEvent, useState } from 'react';
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface PremiumContactProps {
  onSubmit?: (data: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function PremiumContact({ onSubmit }: PremiumContactProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@paperwarefactory.com",
      href: "mailto:info@paperwarefactory.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1711-234567",
      href: "tel:+8801711234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Display Centre: 65 Begum Bazar, Agrani Bank Lane, Dhaka",
      href: "https://maps.google.com"
    }
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] mix-blend-soft-light opacity-40" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(250,191,55,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(250,191,55,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(250,191,55,0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(250,191,55,0.4)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16 max-w-3xl mx-auto">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            {/* Header */}
            <div className="space-y-4 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fabf37]/10 border border-[#fabf37]/20"
              >
                <Sparkles className="size-4 text-[#fabf37]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#fabf37]">
                  {t('get_in_touch_tag')}
                </span>
              </motion.div>

              <motion.h2
                initial={{ scale: 0.9, rotateX: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotateX: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black text-black leading-tight"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ x: -8, scale: 1.05, rotateY: -5 }}
                  style={{
                    transform: "translateZ(40px)",
                    textShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {t('lets_create')}
                </motion.span>
                <br />
                <motion.span
                  className="text-[#fabf37] inline-block"
                  whileHover={{ x: 8, scale: 1.08, rotateY: 5 }}
                  style={{
                    transform: "translateZ(60px)",
                    textShadow: "3px 3px 20px rgba(250, 191, 55, 0.4)"
                  }}
                >
                  {t('something_amazing')}
                </motion.span>
              </motion.h2>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
                {t('contact_desc_premium')}
              </p>
            </div>

            {/* Contact Button */}
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#fabf37] text-zinc-900 font-black text-lg rounded-full hover:bg-[#e5ad2f] transition-all shadow-lg shadow-[#fabf37]/25 group"
            >
              <span>{t('contact_us_btn')}</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}