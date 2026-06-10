"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Wheat, Wrench, Store, GraduationCap, Home,
  CheckCircle2
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  farmer: <Wheat size={24} />,
  worker: <Wrench size={24} />,
  business: <Store size={24} />,
  student: <GraduationCap size={24} />,
  homemaker: <Home size={24} />,
};

export default function DiscoveryPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const questions = [
    {
      title: t.discovery_occupation,
      options: [
        { key: "farmer", label: t.discovery_farmer, icon: "farmer" },
        { key: "worker", label: t.discovery_worker, icon: "worker" },
        { key: "business", label: t.discovery_business, icon: "business" },
        { key: "student", label: t.discovery_student, icon: "student" },
      ],
    },
    {
      title: t.discovery_land_question,
      options: [
        { key: "yes", label: t.discovery_land_yes, icon: "farmer" },
        { key: "no", label: t.discovery_land_no, icon: "homemaker" },
      ],
    },
  ];

  const totalSteps = questions.length + 1; // +1 for success
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB"
      }}>
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#1F2937" }}
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <Link href="/" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#1F2937", textDecoration: "none" }}>
            <ArrowLeft size={20} />
          </Link>
        )}

        <div style={{ flex: 1, margin: "0 16px" }}>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <LanguageSwitcher />
      </header>

      {/* Content */}
      <main style={{ flex: 1, padding: "32px 24px", display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: "#2E7D32", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {step + 1} / {questions.length}
              </p>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1F2937", marginBottom: 32, lineHeight: 1.3 }}>
                {questions[step].title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setStep(step + 1)}
                    className="option-card"
                    style={{
                      padding: "18px 20px", display: "flex", alignItems: "center",
                      gap: 16, width: "100%", textAlign: "left",
                      fontSize: 16, fontWeight: 500, color: "#1F2937"
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: "#F3F4F6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#6D4C41", flexShrink: 0
                    }}>
                      {ICONS[opt.icon] || <Wheat size={24} />}
                    </div>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 20, background: "#E8F5E9",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24, color: "#2E7D32"
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1F2937", marginBottom: 8 }}>
                {t.discovery_great_news}
              </h2>
              <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 40, lineHeight: 1.6 }}>
                {t.discovery_found_schemes}
              </p>

              <Link href="/wallet" style={{ textDecoration: "none", width: "100%" }}>
                <button className="btn-primary" style={{ width: "100%", padding: "16px 24px", fontSize: 16, borderRadius: 14 }}>
                  {t.discovery_view_benefits}
                  <ArrowRight size={18} />
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
