import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Jost,
  Hind_Siliguri as FontBengali,
} from "next/font/google";

export const fontBengali = FontBengali({
  subsets: ["latin"],
  weight: ["700", "600", "500", "400", "300"],
});

export const fontJost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
