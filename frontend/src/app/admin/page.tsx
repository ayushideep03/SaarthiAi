"use client";
import { Database, Upload, ShieldAlert, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2" }}>
      <header style={{
        background: "#fff", borderBottom: "1px solid #E5E7EB",
        padding: "20px 32px"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1F2937" }}>System Administration</h1>
          <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Manage RAG indexes, schemes, and security.</p>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          <AdminCard
            icon={<Database size={22} />}
            color="#1565C0" bg="#E3F2FD"
            title="Qdrant Vector Sync"
            desc="Re-index all government scheme PDFs from MyScheme into multilingual Qdrant embeddings."
            action="Start Full Re-index"
            primary
          />
          <AdminCard
            icon={<Upload size={22} />}
            color="#2E7D32" bg="#E8F5E9"
            title="Scheme PDF Upload"
            desc="Upload new government gazettes to dynamically update eligibility rules and RAG corpus."
            action="Upload Document"
          />
          <AdminCard
            icon={<ShieldAlert size={22} />}
            color="#C62828" bg="#FFEBEE"
            title="Audit Logs & PII"
            desc="View Aadhaar redaction metrics, access logs, and compliance reports."
            action="View Logs"
          />
          <AdminCard
            icon={<Settings size={22} />}
            color="#6D4C41" bg="#EFEBE9"
            title="Global Configuration"
            desc="Manage rate limits, agent orchestration routes, language models, and API fallbacks."
            action="Configure"
          />
        </div>
      </main>
    </div>
  );
}

function AdminCard({ icon, color, bg, title, desc, action, primary }: {
  icon: React.ReactNode; color: string; bg: string;
  title: string; desc: string; action: string; primary?: boolean;
}) {
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        color, marginBottom: 20
      }}>
        {icon}
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginBottom: 24 }}>{desc}</p>
      <button
        className={primary ? "btn-primary" : "btn-secondary"}
        style={{ padding: "12px 20px", width: "100%", borderRadius: 12 }}
      >
        {action}
      </button>
    </div>
  );
}
