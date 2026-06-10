"use client";
import { motion } from "framer-motion";
import { Mic, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0A] to-[#0A0A0A] -z-10" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white/90">Saarthi AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">Sign In</button>
            <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:scale-105 transition-transform">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            NSS IIT Roorkee Challenge 1.1 Winner
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-8 leading-tight">
            The welfare copilot <br /> for a billion citizens.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl font-light">
            Voice-first, multilingual AI that bridges the gap between government schemes and those who need them most.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform shadow-[0_0_40px_8px_rgba(255,255,255,0.1)]">
              Start Voice Discovery
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-colors">
              Judge Dashboard
            </button>
          </div>
        </motion.div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          {[
            { icon: Globe, title: "Multilingual Voice", desc: "Speak naturally in Hindi, Bhojpuri, Tamil, or 10+ languages. No typing required." },
            { icon: Zap, title: "Zero Hallucination", desc: "Deterministic eligibility engine backed by MyScheme vector RAG." },
            { icon: ShieldCheck, title: "Privacy First", desc: "Aadhaar processing happens entirely on-device with zero-retention policies." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white/80" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
