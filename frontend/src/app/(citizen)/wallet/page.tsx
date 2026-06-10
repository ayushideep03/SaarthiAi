"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SaarthiGuide } from "@/components/svgs/saarthi";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertCircle,
  FileText, Landmark, MapPin, CreditCard
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WalletPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB"
      }}>
        <Link href="/discovery" style={{ color: "#1F2937", padding: 8 }}>
          <ArrowLeft size={20} />
        </Link>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#1F2937" }}>
          {t.common_schemes}
        </span>
        <LanguageSwitcher />
      </header>

      <main style={{ flex: 1, padding: "24px" }}>
        {/* ── Welfare Wallet: The Hero Moment ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
            borderRadius: 20, padding: "32px 24px", marginBottom: 24,
            color: "#fff", position: "relative", overflow: "hidden"
          }}
        >
          {/* Subtle pattern overlay */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: 120, height: 120,
            borderRadius: "0 0 0 100%", background: "rgba(255,255,255,0.06)"
          }} />

          <p style={{ fontSize: 14, fontWeight: 500, opacity: 0.85, marginBottom: 8 }}>
            {t.wallet_unlock}
          </p>
          <AnimatedCounter target={626000} />
          <p style={{ fontSize: 15, opacity: 0.8, marginTop: 8 }}>
            {t.wallet_family}
          </p>
        </motion.div>

        {/* ── Eligible Schemes ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 16 }}>
            Eligible Schemes
          </h3>

          <SchemeCard
            name="PM-KISAN"
            benefit="₹6,000/year"
            score={96}
            docs={3}
            status="ready"
          />
          <SchemeCard
            name="Ayushman Bharat"
            benefit="₹5,00,000 cover"
            score={92}
            docs={2}
            status="ready"
          />
          <SchemeCard
            name="MGNREGA"
            benefit="₹1,20,000/year"
            score={88}
            docs={4}
            status="docs_needed"
          />
        </motion.div>

        {/* ── Document Readiness ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{ marginTop: 32 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1F2937" }}>
              Document Readiness
            </h3>
            <span className="badge badge-success">82%</span>
          </div>

          <div className="progress-track" style={{ marginBottom: 20 }}>
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          <DocItem icon={<FileText size={18} />} name={t.doc_aadhaar} status="verified" />
          <DocItem icon={<Landmark size={18} />} name={t.doc_bank} status="verified" />
          <DocItem icon={<MapPin size={18} />} name={t.doc_land} status="missing" />
          <DocItem icon={<CreditCard size={18} />} name={t.doc_ration} status="verified" />
        </motion.div>

        {/* ── Mascot CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="card"
          style={{ padding: "16px 20px", marginTop: 32, display: "flex", alignItems: "center", gap: 16 }}
        >
          <SaarthiGuide className="w-10 h-10" />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginBottom: 2 }}>
              {t.mascot_docs_missing}
            </p>
          </div>
          <ArrowRight size={18} style={{ color: "#9CA3AF" }} />
        </motion.div>
      </main>
    </div>
  );
}

/* ── Animated Counter ── */
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <p style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
      ₹{count.toLocaleString("en-IN")}
    </p>
  );
}

/* ── Scheme Card ── */
function SchemeCard({ name, benefit, score, docs, status }: {
  name: string; benefit: string; score: number; docs: number; status: "ready" | "docs_needed";
}) {
  return (
    <div className="card" style={{ padding: "18px 20px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#1F2937" }}>{name}</p>
          <p style={{ fontSize: 14, color: "#6B7280", marginTop: 2 }}>{benefit}</p>
        </div>
        <span className={status === "ready" ? "badge badge-success" : "badge badge-warning"}>
          {status === "ready" ? "Ready" : "Docs needed"}
        </span>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 2 }}>Eligibility</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#2E7D32" }}>{score}%</p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 2 }}>Documents</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#1F2937" }}>{docs}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Document Item ── */
function DocItem({ icon, name, status }: {
  icon: React.ReactNode; name: string; status: "verified" | "missing";
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 0", borderBottom: "1px solid #F3F4F6"
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: status === "verified" ? "#E8F5E9" : "#FFF3E0",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: status === "verified" ? "#2E7D32" : "#E65100",
        flexShrink: 0
      }}>
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "#1F2937" }}>{name}</span>
      {status === "verified" ? (
        <CheckCircle2 size={20} style={{ color: "#43A047" }} />
      ) : (
        <AlertCircle size={20} style={{ color: "#F59E0B" }} />
      )}
    </div>
  );
}
