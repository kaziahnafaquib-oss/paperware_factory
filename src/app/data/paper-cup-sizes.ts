/**
 * Paper cup size attributes.
 * Source: owner Google Sheet "Products" → tab "Paper Cup Attributes" (2 Nov 2026).
 * Public columns only: internal BOM numbers, poly/carton codes and process
 * timings are deliberately left out. Dimensions in mm, paper in GSM.
 */
export type CupWall = "single" | "double" | "ripple" | "double-pe";

export type CupSize = {
  id: number;
  /** Display size, e.g. "250 ML", "8 OZ". */
  size: string;
  /** Owner's sheet name, e.g. "Single Wall Hot Cups". */
  name: string;
  wall: CupWall;
  use: "Hot" | "Cold" | "Hot & Cold";
  /** Forming line variant where the sheet distinguishes one. */
  variant?: "Auto" | "Manual";
  upperMm: number;
  lowerMm: number;
  heightMm: number;
  /** Single-wall / inner-wall paper GSM options offered for this size. */
  gsm: number[];
  /** Outer (double / ripple) wall paper GSM, when applicable. */
  outerGsm?: number;
  pe: "Single PE" | "Double PE";
  /** Minimum order quantity in pieces. */
  moq: number;
  /** Image key into the pictures map (filled once the sheet pictures are exported). */
  image?: string;
};

const S = (
  id: number, size: string, name: string, wall: CupWall, use: CupSize["use"],
  upperMm: number, lowerMm: number, heightMm: number, gsm: number[], pe: CupSize["pe"], moq: number,
  extra: Partial<CupSize> = {},
): CupSize => ({ id, size, name, wall, use, upperMm, lowerMm, heightMm, gsm, pe, moq, ...extra });

export const PAPER_CUP_SIZES: CupSize[] = [
  S(1, "100 ML", "Single Wall Hot Cups", "single", "Hot", 58.6, 42, 59.67, [165, 190], "Single PE", 600, { image: "1-100-ml-single.jpg" }),
  S(2, "120 ML", "Single Wall Hot Cups", "single", "Hot", 62.3, 45, 61.03, [165, 190], "Single PE", 6000, { variant: "Auto" }),
  S(3, "120 ML", "Single Wall Hot Cups", "single", "Hot", 67.65, 52, 56.54, [165, 190], "Single PE", 6000, { variant: "Manual", image: "3-120-ml-single-manual.jpg" }),
  S(4, "150 ML", "Single Wall Hot Cups", "single", "Hot", 63.9, 45, 73.02, [165, 190], "Single PE", 5500, { variant: "Auto", image: "4-150-ml-single-auto.jpg" }),
  S(5, "150 ML", "Single Wall Hot Cups", "single", "Hot", 69.76, 52, 63.65, [165, 190], "Single PE", 4500, { variant: "Manual", image: "5-150-ml-single-manual.jpg" }),
  S(6, "200 ML", "Single Wall Hot Cups", "single", "Hot", 72.49, 52, 75.8, [165, 190], "Single PE", 400, { image: "6-200-ml-single.jpg" }),
  S(7, "200 ML", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 72.49, 52, 75.8, [190], "Single PE", 4000, { outerGsm: 300 }),
  S(8, "210 ML", "Single Wall Hot Cups", "single", "Hot", 71.49, 52, 78.53, [165, 190], "Single PE", 4000),
  S(9, "210 ML", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 71.49, 52, 78.53, [190], "Single PE", 4000, { outerGsm: 300 }),
  S(10, "250 ML", "Single Wall Hot Cups", "single", "Hot", 74.94, 52, 89.49, [165, 190, 220, 250], "Single PE", 200, { image: "10-250-ml-single.jpg" }),
  S(11, "250 ML", "Double PE Cold Cups", "double-pe", "Cold", 74.94, 52, 89.49, [220, 250], "Double PE", 2000),
  S(12, "250 ML", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 74.94, 52, 89.49, [165, 190, 220, 250], "Single PE", 2000, { outerGsm: 300, image: "12-250-ml-double.jpg" }),
  S(13, "250 ML", "Ripple Wall Hot & Cold Cups", "ripple", "Hot & Cold", 74.94, 52, 89.49, [165, 190, 220, 250], "Single PE", 2000, { outerGsm: 300, image: "13-250-ml-ripple.jpg" }),
  S(14, "350 ML", "Single Wall Hot Cups", "single", "Hot", 78.93, 52, 140.35, [190, 220, 250, 300, 320, 350], "Single PE", 130, { image: "14-350-ml-single.jpg" }),
  S(15, "350 ML", "Double PE Cold Cups", "double-pe", "Cold", 78.93, 52, 140.35, [210, 220, 250, 300], "Double PE", 130, { image: "15-350-ml-double-pe.jpg" }),
  S(16, "350 ML", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 78.93, 52, 140.35, [190, 220, 250, 300, 320, 350], "Single PE", 1300, { outerGsm: 300, image: "16-350-ml-double.jpg" }),
  S(17, "350 ML", "Ripple Wall Hot & Cold Cups", "ripple", "Hot & Cold", 78.93, 52, 140.35, [190, 220, 250, 300, 320, 350], "Single PE", 1300, { outerGsm: 300, image: "17-350-ml-ripple.jpg" }),
  S(18, "8 OZ", "Single Wall Hot Cups", "single", "Hot", 79.1, 55, 87.4, [220, 250, 300, 320, 350], "Single PE", 140, { image: "18-8-oz-single.jpg" }),
  S(19, "8 OZ", "Double PE Cold Cups", "double-pe", "Cold", 79.1, 55, 87.4, [210, 220, 250, 300], "Double PE", 1400),
  S(20, "8 OZ", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 79.1, 55, 87.4, [220, 250, 300, 320, 350], "Single PE", 1150, { outerGsm: 300, image: "20-8-oz-double.jpg" }),
  S(21, "8 OZ", "Ripple Wall Hot & Cold Cups", "ripple", "Hot & Cold", 79.1, 55, 87.4, [220, 250, 300, 320, 350], "Single PE", 1150, { outerGsm: 300, image: "21-8-oz-ripple.jpg" }),
  S(22, "12 OZ", "Single Wall Hot Cups", "single", "Hot", 89, 58, 120.33, [220, 250, 300, 320, 350], "Single PE", 132, { image: "22-12-oz-single.jpg" }),
  S(23, "12 OZ", "Double PE Cold Cups", "double-pe", "Cold", 89, 58, 120.33, [210, 220, 250, 300], "Double PE", 1300),
  S(24, "12 OZ", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 89, 58, 120.33, [220, 250, 300, 320, 350], "Single PE", 735, { outerGsm: 300, image: "24-12-oz-double.jpg" }),
  S(25, "12 OZ", "Ripple Wall Hot & Cold Cups", "ripple", "Hot & Cold", 89, 58, 120.33, [220, 250, 300, 320, 350], "Single PE", 735, { outerGsm: 300, image: "25-12-oz-ripple.jpg" }),
  S(26, "16 OZ", "Single Wall Hot Cups", "single", "Hot", 88, 58, 138.37, [225, 250, 300, 320, 350], "Single PE", 108, { image: "26-16-oz-single.jpg" }),
  S(27, "16 OZ", "Double PE Cold Cups", "double-pe", "Cold", 88, 58, 138.37, [210, 220, 250, 300], "Double PE", 1080),
  S(28, "16 OZ", "Double Wall Hot & Cold Cups", "double", "Hot & Cold", 88, 58, 138.37, [225, 250, 300, 320, 350], "Single PE", 540, { outerGsm: 300 }),
  S(29, "16 OZ", "Ripple Wall Hot Cups", "ripple", "Hot", 89, 59, 138.37, [225, 250, 300, 320, 350], "Single PE", 540, { outerGsm: 300, image: "29-16-oz-ripple.jpg" }),
];

export const cupSizesByWall = (wall: CupWall) => PAPER_CUP_SIZES.filter((c) => c.wall === wall);
