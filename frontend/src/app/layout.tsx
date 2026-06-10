import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saarthi AI | Multilingual Welfare Copilot",
  description: "Your digital copilot for discovering and applying to government welfare schemes. Voice-first, intelligent, and proactive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen selection:bg-indigo-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
