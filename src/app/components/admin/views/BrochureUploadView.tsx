import { ChangeEvent, useEffect, useState } from 'react';
import { Upload, FileText, Check, AlertCircle, Loader2, Link as LinkIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "../../../../../utils/supabase/info";
import { supabase } from "../../../lib/supabaseClient";

export function BrochureUploadView() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentBrochure();
  }, []);

  const fetchCurrentBrochure = async () => {
    try {
      // Fetch the current brochure URL from KV store via server
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/brochure/url`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          setCurrentUrl(data.url);
        }
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `brochure-${Date.now()}.pdf`;

      // 1. Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('brochures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brochures')
        .getPublicUrl(fileName);

      // 3. Update State
      setCurrentUrl(publicUrl);
      setFile(null);

      // 4. Update the global configuration via API
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/brochure/update-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ url: publicUrl })
      });

      toast.success("Brochure uploaded and published successfully!");

    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Brochure Management</h2>
        <p className="text-zinc-500 font-medium">Upload and manage the digital product catalog (PDF).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Card */}
        <div className="bg-black border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37]">
              <Upload className="size-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Upload New</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Select a PDF file</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-[#fabf37]/50 transition-colors bg-white/5">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="brochure-upload"
            />
            <label htmlFor="brochure-upload" className="cursor-pointer flex flex-col items-center gap-4 w-full">
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="size-12 text-[#fabf37]" />
                  <p className="text-sm font-bold text-white text-center break-all">{file.name}</p>
                  <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <>
                  <div className="size-16 rounded-full bg-zinc-900 flex items-center justify-center">
                    <Upload className="size-8 text-zinc-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white">Click to browse</p>
                    <p className="text-xs text-zinc-500 mt-1">PDF files only, max 10MB</p>
                  </div>
                </>
              )}
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${!file || uploading
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-[#fabf37] text-black hover:bg-[#fabf37]/90 hover:scale-[1.02]"
              }`}
          >
            {uploading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="size-4" />
                <span>Publish Brochure</span>
              </>
            )}
          </button>
        </div>

        {/* Current Brochure Card */}
        <div className="bg-black border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <FileText className="size-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Current Version</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Live on website</p>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="size-8 text-zinc-700 animate-spin" />
            </div>
          ) : currentUrl ? (
            <div className="flex-1 flex flex-col gap-4">
              <div className="aspect-[3/4] w-full bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center relative group overflow-hidden">
                <FileText className="size-20 text-zinc-800 group-hover:text-zinc-700 transition-colors" />
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-6">
                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-white text-black rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    Preview PDF
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-green-500 uppercase">Active</span>
                </div>
                <p className="text-[10px] text-zinc-500 break-all font-mono line-clamp-2">{currentUrl}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
              <AlertCircle className="size-12 mb-4 opacity-50" />
              <p className="text-sm font-bold">No brochure found</p>
              <p className="text-xs mt-1">Upload a file to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}