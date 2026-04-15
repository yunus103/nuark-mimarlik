import type { Metadata } from "next";
import { DM_Sans, Michroma } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${michroma.variable} font-sans`}>{children}</body>
    </html>
  );
}
