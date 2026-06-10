"use client";
import { motion } from "framer-motion";
import {
  Users, TrendingUp, Globe, Clock, BarChart3,
  CheckCircle2, Zap, Play, Languages
} from "lucide-react";

export default function JudgeDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2" }}>
      {/* Header */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #E5E7EB",
        padding: "20px 32px"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.02em" }}>
              Saarthi AI — Impact Dashboard
            </h1>
            <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
              Live platform performance and citizen engagement metrics
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 100, background: "#E8F5E9",
            color: "#2E7D32", fontSize: 13, fontWeight: 600
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2E7D32", display: "inline-block" }} />
            System Live
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px" }}>
        {/* ── Metrics Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
          <MetricCard icon={<TrendingUp size={20} />} label="Benefits Unlocked" value="₹6,26,000" color="#2E7D32" bg="#E8F5E9" />
          <MetricCard icon={<Users size={20} />} label="Citizens Assisted" value="12,450" color="#1565C0" bg="#E3F2FD" />
          <MetricCard icon={<CheckCircle2 size={20} />} label="Schemes Matched" value="8,902" color="#F9A825" bg="#FFF8E1" />
          <MetricCard icon={<Clock size={20} />} label="Avg. Discovery Time" value="1m 45s" color="#6D4C41" bg="#EFEBE9" />
          <MetricCard icon={<Languages size={20} />} label="Languages Used" value="13" color="#7B1FA2" bg="#F3E5F5" />
          <MetricCard icon={<Zap size={20} />} label="Completion Rate" value="94.2%" color="#00695C" bg="#E0F2F1" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          {/* ── Multilingual Demo Personas ── */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", marginBottom: 16 }}>
              Interactive Demo Personas
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <PersonaCard name="Ramesh Kumar" role="Farmer" lang="Hindi" income="₹45,000/yr" />
              <PersonaCard name="Sunita Devi" role="Woman HoH" lang="Tamil" income="₹30,000/yr" />
              <PersonaCard name="Arjun Singh" role="Gig Worker" lang="Bengali" income="₹1,20,000/yr" />
              <PersonaCard name="Priya Sharma" role="Student" lang="Marathi" income="₹60,000/yr" />
              <PersonaCard name="Kallu Yadav" role="Farmer" lang="Bhojpuri" income="₹35,000/yr" />
              <PersonaCard name="Meera Bai" role="Homemaker" lang="Gujarati" income="₹28,000/yr" />
            </div>
          </div>

          {/* ── AI Confidence + Language Breakdown ── */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", marginBottom: 16 }}>
              AI Confidence
            </h2>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <ConfidenceBar label="Eligibility Logic" value={98} />
              <ConfidenceBar label="Document OCR" value={82} />
              <ConfidenceBar label="Translation Accuracy" value={94} />
              <ConfidenceBar label="Voice Recognition" value={91} />
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", marginBottom: 16 }}>
              Language Usage
            </h2>
            <div className="card" style={{ padding: 24 }}>
              <LangRow name="Hindi" pct={38} color="#2E7D32" />
              <LangRow name="Bengali" pct={18} color="#1565C0" />
              <LangRow name="Tamil" pct={14} color="#F9A825" />
              <LangRow name="Bhojpuri" pct={11} color="#6D4C41" />
              <LangRow name="Marathi" pct={9} color="#7B1FA2" />
              <LangRow name="Others" pct={10} color="#9CA3AF" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, color, bg }: {
  icon: React.ReactNode; label: string; value: string; color: string; bg: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card"
      style={{ padding: "20px 24px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>{label}</span>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: bg,
          display: "flex", alignItems: "center", justifyContent: "center", color
        }}>
          {icon}
        </div>
      </div>
      <p style={{ fontSize: 28, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.02em" }}>{value}</p>
    </motion.div>
  );
}

function PersonaCard({ name, role, lang, income }: {
  name: string; role: string; lang: string; income: string;
}) {
  return (
    <div className="card" style={{ padding: "18px 20px", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#1F2937" }}>{name}</p>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{role} · {lang}</p>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: "#E8F5E9",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#2E7D32"
        }}>
          <Play size={14} />
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#9CA3AF" }}>Income: {income}</p>
    </div>
  );
}

function ConfidenceBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#2E7D32" }}>{value}%</span>
      </div>
      <div className="progress-track" style={{ height: 8 }}>
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
}

function LangRow({ name, pct, color }: { name: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#1F2937" }}>{name}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>{pct}%</span>
      </div>
      <div className="progress-track" style={{ height: 6 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
          style={{ height: "100%", borderRadius: 100, background: color }}
        />
      </div>
    </div>
  );
}
