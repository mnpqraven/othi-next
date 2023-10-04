import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./Providers";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Merriweather_Sans } from "next/font/google";
import "@/app/globals.css";
import { CommandCenter } from "@/components/commandcenter/CommandCenter";

const inter = Merriweather_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Othi",
  description: "Othi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Toaster />
          <CommandCenter />
          {children}
        </Providers>
      </body>
    </html>
  );
}
