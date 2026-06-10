"use client";
import { Database, ShieldAlert, Upload, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-white/90">System Administration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-400"/> Qdrant Vector Sync</h2>
          <p className="text-white/50 mb-4">Re-index all government scheme PDFs from MyScheme into Qdrant embeddings.</p>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors">Start Full Re-index</button>
        </div>
        <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-green-400"/> Scheme PDF Upload</h2>
          <p className="text-white/50 mb-4">Upload new government gazettes to dynamically update eligibility rules.</p>
          <button className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg font-medium transition-colors">Upload Document</button>
        </div>
        <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-400"/> Audit Logs & PII</h2>
          <p className="text-white/50 mb-4">View redaction metrics and raw system access logs.</p>
          <button className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg font-medium transition-colors">View Logs</button>
        </div>
        <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-gray-400"/> Global Config</h2>
          <p className="text-white/50 mb-4">Manage rate limits, agent orchestration routes, and API fallbacks.</p>
          <button className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg font-medium transition-colors">Configure</button>
        </div>
      </div>
    </div>
  );
}
