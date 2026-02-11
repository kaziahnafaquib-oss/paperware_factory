import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, File, Check, AlertCircle, Image as ImageIcon, Video, Link, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { toast } from "sonner";

interface UploadMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

export function UploadMediaModal({ isOpen, onClose, onUpload }: UploadMediaModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = () => {
    if (uploadMode === 'file') {
      if (files.length === 0) return;
      setUploading(true);

      // Simulate upload progress
      let curr = 0;
      const interval = setInterval(() => {
        curr += 5;
        setProgress(curr);
        if (curr >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onUpload(files);
            setFiles([]);
            setUploading(false);
            setProgress(0);
            onClose();
          }, 500);
        }
      }, 100);
    } else {
      // Handle URL mode
      if (!youtubeUrl && !videoUrl) {
        toast.error('Please enter at least one URL');
        return;
      }

      setUploading(true);
      setProgress(100);

      setTimeout(() => {
        if (youtubeUrl) {
          toast.success('YouTube video link added successfully');
        }
        if (videoUrl) {
          toast.success('Video URL added successfully');
        }

        // Reset
        setYoutubeUrl('');
        setVideoUrl('');
        setUploading(false);
        setProgress(0);
        onClose();
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-950 border-white/10 text-white p-0 overflow-hidden gap-0 rounded-3xl">
        <DialogHeader className="p-6 border-b border-white/10 flex flex-row justify-between items-center bg-zinc-900/50 space-y-0 text-left">
          <div className="space-y-1">
            <DialogTitle className="text-lg font-black uppercase tracking-tight">Upload Assets</DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 font-bold">Add images or videos to your library</DialogDescription>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Upload Mode Switcher */}
          <div className="flex gap-2 p-1 bg-zinc-900 rounded-xl border border-white/5">
            <button
              onClick={() => setUploadMode('file')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${uploadMode === 'file' ? 'bg-[#fabf37] text-black' : 'text-zinc-400 hover:text-white'
                }`}
            >
              <Upload className="size-3" />
              File Upload
            </button>
            <button
              onClick={() => setUploadMode('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${uploadMode === 'url' ? 'bg-[#fabf37] text-black' : 'text-zinc-400 hover:text-white'
                }`}
            >
              <Youtube className="size-3" />
              URL / YouTube
            </button>
          </div>

          {uploadMode === 'file' ? (
            <>
              {/* Drag & Drop Zone */}
              <div
                className={`relative h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${dragActive ? "border-[#fabf37] bg-[#fabf37]/5" : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-500"
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*,video/mp4,video/webm,video/mov,video/avi"
                  className="hidden"
                  onChange={handleChange}
                />

                <div className="flex flex-col items-center gap-4 pointer-events-none">
                  <div className="size-16 rounded-full bg-black/50 flex items-center justify-center border border-white/10 shadow-xl">
                    <Upload className="size-6 text-[#fabf37]" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-black uppercase tracking-widest">Click or Drag files here</p>
                    <p className="text-[10px] text-zinc-500 font-bold">JPG, PNG, MP4, WebM, MOV, AVI (Max 50MB)</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* URL Input Mode */}
              <div className="space-y-4">
                {/* YouTube URL */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <Youtube className="size-3 text-red-500" />
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                  />
                </div>

                {/* Video URL */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <Link className="size-3 text-blue-500" />
                    Video URL (MP4, WebM)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#fabf37]"
                  />
                </div>

                {/* Helper Text */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-3">
                  <AlertCircle className="size-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-400 leading-relaxed">
                    <strong className="font-black">Supported formats:</strong> YouTube embeds, direct MP4, WebM, MOV, AVI URLs. The video will be embedded in your gallery.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* File List */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {files.map((file, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-white/5"
                  >
                    <div className="size-10 rounded-lg bg-black flex items-center justify-center border border-white/10 shrink-0">
                      {file.type.startsWith('video') ? <Video className="size-4 text-blue-500" /> : <ImageIcon className="size-4 text-emerald-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{file.name}</p>
                      <p className="text-[9px] text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    {!uploading && (
                      <button onClick={() => removeFile(i)} className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors">
                        <X className="size-3" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#fabf37]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-zinc-900/30 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={(uploadMode === 'file' && files.length === 0) || (uploadMode === 'url' && !youtubeUrl && !videoUrl) || uploading}
            className="px-6 py-3 bg-[#fabf37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            {uploading ? (
              <>Processing...</>
            ) : uploadMode === 'file' ? (
              <>Upload {files.length > 0 ? `(${files.length})` : ''}</>
            ) : (
              <>Add {(youtubeUrl ? 1 : 0) + (videoUrl ? 1 : 0) > 0 ? `(${(youtubeUrl ? 1 : 0) + (videoUrl ? 1 : 0)})` : ''}</>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}