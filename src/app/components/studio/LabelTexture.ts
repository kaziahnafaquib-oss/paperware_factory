import * as THREE from "three";
import { isDarkHex } from "./MaterialPresets";

export interface LabelOptions {
  logo: string | null;
  logoScale: number;
  text: string;
  fontFamily: string;
  finish: string;
  paperColor: string;
  /** "cup" wraps around a cone (wide canvas); "box" is a lid panel. */
  kind: "cup" | "box";
}

export interface LabelTextures {
  map: THREE.CanvasTexture;
  bump: THREE.CanvasTexture | null;
  dispose: () => void;
}

const SIZES = { cup: [2048, 1024], box: [1024, 896] } as const;

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawGrain(ctx: CanvasRenderingContext2D, w: number, h: number, strength: number) {
  // Cheap procedural paper grain: sparse random dots + horizontal fibre lines.
  ctx.save();
  ctx.globalAlpha = strength;
  for (let i = 0; i < (w * h) / 900; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    ctx.fillStyle = Math.random() > 0.5 ? "#000" : "#fff";
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  ctx.globalAlpha = strength * 0.6;
  ctx.fillStyle = "#000";
  for (let i = 0; i < h / 7; i++) {
    const y = Math.random() * h;
    ctx.fillRect(0, y, w, 1);
  }
  ctx.restore();
}

function goldGradient(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, "#8a6a1a");
  g.addColorStop(0.35, "#f5d774");
  g.addColorStop(0.55, "#fabf37");
  g.addColorStop(0.8, "#b8891c");
  g.addColorStop(1, "#f1dc8f");
  return g;
}

/** Builds the artwork (map) and, for Embossed, a bump mask. Caller must call dispose(). */
export async function createLabelTextures(opts: LabelOptions): Promise<LabelTextures> {
  const [w, h] = SIZES[opts.kind];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const dark = isDarkHex(opts.paperColor);
  const ink = dark ? "#f6f1e6" : "#121212";

  // Base paper + grain.
  ctx.fillStyle = opts.paperColor;
  ctx.fillRect(0, 0, w, h);
  drawGrain(ctx, w, h, dark ? 0.05 : 0.07);

  // Artwork mask canvas (for emboss bump) drawn in parallel.
  const mask = document.createElement("canvas");
  mask.width = w;
  mask.height = h;
  const mctx = mask.getContext("2d")!;
  mctx.fillStyle = "#808080";
  mctx.fillRect(0, 0, w, h);

  // Layout: centre of the printable panel.
  const cx = w / 2;
  const scale = Math.max(0.2, Math.min(2.5, opts.logoScale / 100));
  const baseLogoW = opts.kind === "cup" ? w * 0.22 : w * 0.42;
  const logoW = baseLogoW * scale;
  let cursorY = opts.kind === "cup" ? h * 0.26 : h * 0.22;

  const img = opts.logo ? await loadImage(opts.logo) : null;
  if (img && img.naturalWidth > 0) {
    const ratio = img.naturalHeight / img.naturalWidth;
    const lw = Math.min(logoW, w * 0.9);
    const lh = lw * ratio;
    const ly = cursorY;
    if (opts.finish === "Gold Foil") {
      // Foil look: logo silhouette filled with gold gradient.
      const off = document.createElement("canvas");
      off.width = Math.ceil(lw);
      off.height = Math.ceil(lh);
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, lw, lh);
      octx.globalCompositeOperation = "source-in";
      octx.fillStyle = goldGradient(octx, 0, 0, lw, lh);
      octx.fillRect(0, 0, lw, lh);
      ctx.drawImage(off, cx - lw / 2, ly);
    } else {
      ctx.drawImage(img, cx - lw / 2, ly, lw, lh);
    }
    mctx.drawImage(img, cx - lw / 2, ly, lw, lh);
    cursorY = ly + lh + h * 0.05;
  } else {
    cursorY = opts.kind === "cup" ? h * 0.4 : h * 0.36;
  }

  // Brand text.
  const label = (opts.text || "").trim();
  if (label) {
    const fontPx = Math.round((opts.kind === "cup" ? h * 0.1 : h * 0.12) * Math.min(1.4, Math.max(0.7, scale)));
    const font = `900 ${fontPx}px "${opts.fontFamily || "Inter"}", "Inter", system-ui, sans-serif`;
    try {
      if ((document as any).fonts?.load) await (document as any).fonts.load(font, label);
    } catch {
      /* best effort */
    }
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    // Letter-spacing via manual draw to mirror the SVG mockup's tight tracking.
    (ctx as any).letterSpacing = "-0.02em";
    const maxW = w * (opts.kind === "cup" ? 0.42 : 0.84);
    let drawFont = font;
    while (ctx.measureText(label.toUpperCase()).width > maxW && parseInt(drawFont) > 24) {
      const px = parseInt(drawFont) - 4;
      drawFont = `900 ${px}px "${opts.fontFamily || "Inter"}", "Inter", system-ui, sans-serif`;
      ctx.font = drawFont;
    }
    if (opts.finish === "Gold Foil") {
      const tw = ctx.measureText(label.toUpperCase()).width;
      ctx.fillStyle = goldGradient(ctx, cx - tw / 2, cursorY, tw, fontPx);
    } else {
      ctx.fillStyle = ink;
    }
    ctx.fillText(label.toUpperCase(), cx, cursorY);
    mctx.font = ctx.font;
    mctx.textAlign = "center";
    mctx.textBaseline = "top";
    mctx.fillStyle = "#ffffff";
    mctx.fillText(label.toUpperCase(), cx, cursorY);
  }

  if (opts.kind === "cup") {
    // Side seam: slight shadow + crisp edge at u = 0 (where the lathe starts).
    const seam = ctx.createLinearGradient(0, 0, 28, 0);
    seam.addColorStop(0, "rgba(0,0,0,0.28)");
    seam.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = seam;
    ctx.fillRect(0, 0, 28, h);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, 0, 3, h);
    // Lightly ghost the overlap edge on the far side too.
    const seam2 = ctx.createLinearGradient(w - 14, 0, w, 0);
    seam2.addColorStop(0, "rgba(255,255,255,0)");
    seam2.addColorStop(1, "rgba(255,255,255,0.18)");
    ctx.fillStyle = seam2;
    ctx.fillRect(w - 14, 0, 14, h);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  map.wrapS = THREE.ClampToEdgeWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;
  map.needsUpdate = true;

  let bump: THREE.CanvasTexture | null = null;
  if (opts.finish === "Embossed") {
    bump = new THREE.CanvasTexture(mask);
    bump.needsUpdate = true;
  }

  return {
    map,
    bump,
    dispose: () => {
      map.dispose();
      bump?.dispose();
    },
  };
}
