import React from 'react';
import { motion } from 'motion/react';
import { Globe, Camera, Briefcase, Play, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const SocialFeed = React.memo(function SocialFeed() {
    const posts = [
        { platform: "Facebook", icon: Globe, color: "bg-blue-600", content: "New sustainable packaging line launched! #EcoFriendly", date: "2h ago", likes: "1.2k", image: "https://images.unsplash.com/photo-1567570671796-c8fed5eb1e7d?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "Instagram", icon: Camera, color: "bg-pink-600", content: "Behind the scenes at our new production facility. 🏭✨", date: "5h ago", likes: "856", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "LinkedIn", icon: Briefcase, color: "bg-blue-700", content: "Paperware announces strategic partnership with Global Logistics.", date: "1d ago", likes: "450", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "YouTube", icon: Play, color: "bg-red-600", content: "How it's made: Custom Kraft Boxes (Full Documentary)", date: "2d ago", likes: "3.4k", image: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=400", type: "video" },
        { platform: "Twitter", icon: MessageSquare, color: "bg-black", content: "Big thanks to Paperware for the amazing rush order support! 🙌", date: "3h ago", likes: "289", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "Instagram", icon: Camera, color: "bg-pink-600", content: "Which design do you prefer? A or B? Vote in comments! 👇", date: "6h ago", likes: "2.1k", image: "https://images.unsplash.com/photo-1610187224249-1c5aa1841c2c?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "TikTok", icon: Play, color: "bg-black", content: "Packing 50k orders in 30 seconds! 📦⚡ #ASMR", date: "12h ago", likes: "15.4k", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400", type: "video" },
        { platform: "LinkedIn", icon: Briefcase, color: "bg-blue-700", content: "We are proud to announce we are now 100% Carbon Neutral. 🌿", date: "2d ago", likes: "890", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "Facebook", icon: Globe, color: "bg-blue-600", content: "Join us at the International Packaging Expo 2026! Booth #404.", date: "3d ago", likes: "340", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=400", type: "image" },
        { platform: "YouTube", icon: Play, color: "bg-red-600", content: "Client Success Story: The Burger Joint Franchise Expansion", date: "1w ago", likes: "5.2k", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400", type: "video" }
    ];

    const duplicatedPosts = [...posts, ...posts];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black uppercase tracking-tight">Social Updates</h3>
                <div className="flex items-center gap-2">
                        <motion.button whileHover={{ scale: 1.2, rotate: 10 }} onClick={() => window.open('https://facebook.com', '_blank')} className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-transform"><Globe className="size-4" /></motion.button>
                        <motion.button whileHover={{ scale: 1.2, rotate: -10 }} onClick={() => window.open('https://instagram.com', '_blank')} className="size-8 rounded-full bg-pink-600 text-white flex items-center justify-center transition-transform"><Camera className="size-4" /></motion.button>
                        <motion.button whileHover={{ scale: 1.2, rotate: 10 }} onClick={() => window.open('https://linkedin.com', '_blank')} className="size-8 rounded-full bg-blue-700 text-white flex items-center justify-center transition-transform"><Briefcase className="size-4" /></motion.button>
                        <motion.button whileHover={{ scale: 1.2, rotate: -10 }} onClick={() => window.open('https://youtube.com', '_blank')} className="size-8 rounded-full bg-red-600 text-white flex items-center justify-center transition-transform"><Play className="size-4" /></motion.button>
                </div>
            </div>
            <div className="overflow-hidden relative pb-6 group">
                <motion.div 
                    className="flex gap-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        duration: 40, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatType: "loop" 
                    }}
                    style={{ width: "fit-content" }}
                >
                    {duplicatedPosts.map((post, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="min-w-[300px] md:min-w-[350px] bg-white p-4 rounded-[32px] border border-black/5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
                    >
                        <div className="flex items-center gap-3 mb-4 px-2 pt-2">
                            <div className={`size-8 rounded-full ${post.color} flex items-center justify-center text-white`}>
                                <post.icon className="size-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest">{post.platform}</p>
                                <p className="text-[9px] text-zinc-400 font-bold">{post.date}</p>
                            </div>
                        </div>
                        
                        {/* Media Preview */}
                        <div className="aspect-video w-full bg-zinc-100 rounded-2xl mb-4 overflow-hidden relative group-hover:opacity-90 transition-opacity">
                            <ImageWithFallback src={post.image} alt="Social content" className="w-full h-full object-cover" />
                            {post.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                                    <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-lg">
                                        <Play className="size-4 text-white fill-white ml-0.5" />
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black uppercase text-white tracking-wider">
                                {post.type === 'video' ? 'Watch' : 'View'}
                            </div>
                        </div>

                        <p className="text-xs font-bold leading-relaxed mb-4 line-clamp-2 px-2 flex-1">{post.content}</p>
                        <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 group-hover:text-[#fabf37] transition-colors uppercase tracking-widest px-2 pb-2">
                            <span className="size-1.5 rounded-full bg-zinc-200 group-hover:bg-[#fabf37]" />
                            {post.likes} Likes
                        </div>
                    </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
});