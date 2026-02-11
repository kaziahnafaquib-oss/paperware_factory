import { useEffect, useRef } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionPlayerProps {
    events: any[];
    onClose: () => void;
    metadata?: any;
}

export function SessionPlayer({ events, onClose, metadata }: SessionPlayerProps) {
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (playerRef.current && events.length > 0) {
            // Clear existing content
            playerRef.current.innerHTML = '';

            try {
                new rrwebPlayer({
                    target: playerRef.current,
                    props: {
                        events,
                        autoPlay: true,
                        width: 1024,
                        height: 576,
                    },
                });
            } catch (error) {
                console.error('Failed to initialize rrweb-player:', error);
            }
        }
    }, [events]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
        >
            <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">
                            Session Replay: {metadata?.userId || 'Unknown User'}
                        </h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                            Started: {metadata?.timestamp ? new Date(metadata.timestamp).toLocaleString() : 'N/A'} •
                            Duration: {metadata?.duration ? `${metadata.duration}s` : 'N/A'} •
                            Device: {metadata?.userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Player Container */}
                <div className="flex-1 bg-black flex items-center justify-center p-4 overflow-hidden">
                    <div ref={playerRef} className="rounded-xl overflow-hidden shadow-2xl" />
                </div>
            </div>
        </motion.div>
    );
}
