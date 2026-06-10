"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SaarthiGuide } from "@/components/svgs/saarthi";
import { ArrowRight, Mic, Shield, FileCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ── Header ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "#2E7D32",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>S</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#1F2937" }}>Saarthi AI</span>
        </div>
        <LanguageSwitcher />
      </header>

      {/* ── Hero ── */}
      <main style={{ flex: 1, padding: "40px 24px 32px", display: "flex", flexDirection: "column" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <SaarthiGuide className="w-12 h-12" />
            <p style={{ fontSize: 14, color: "#6B7280", fontWeight: 500, lineHeight: 1.5 }}>
              {t.mascot_greeting}
            </p>
          </div>

          <h1 style={{
            fontSize: 28, fontWeight: 800, color: "#1F2937",
            lineHeight: 1.3, marginBottom: 12, letterSpacing: "-0.02em"
          }}>
            {t.hero_title}
          </h1>

          <p style={{
            fontSize: 16, color: "#6B7280", lineHeight: 1.6,
            marginBottom: 40, fontWeight: 400
          }}>
            {t.hero_subtitle}
          </p>
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}
        >
          <Link href="/discovery" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%", padding: "16px 24px", fontSize: 16, borderRadius: 14 }}>
              {t.cta_start}
              <ArrowRight size={18} />
            </button>
          </Link>
          <button className="btn-secondary" style={{ width: "100%", padding: "16px 24px", borderRadius: 14 }}>
            <Mic size={18} style={{ color: "#2E7D32" }} />
            {t.cta_voice}
          </button>
        </motion.div>

        {/* ── Trust Indicators ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <TrustItem icon={<Shield size={20} />} title="Zero Hallucination" desc="Deterministic eligibility backed by official government data." />
          <TrustItem icon={<FileCheck size={20} />} title="Document Ready" desc="AI-powered verification ensures you have everything before you apply." />
          <TrustItem icon={<Zap size={20} />} title="2 Minute Discovery" desc="Answer a few questions. Discover all schemes you qualify for." />
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        padding: "16px 24px", textAlign: "center", fontSize: 12,
        color: "#9CA3AF", borderTop: "1px solid #E5E7EB"
      }}>
        Built for NSS IIT Roorkee Challenge 1.1
      </footer>
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card" style={{ padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: "#E8F5E9",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#2E7D32", flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 15, color: "#1F2937", marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}
