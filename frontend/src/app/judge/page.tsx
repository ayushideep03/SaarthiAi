"use client";
import { motion } from "framer-motion";
import { Users, FileCheck, Languages, Zap, LineChart, Shield, Play } from "lucide-react";

export default function JudgeDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Judge Command Center
          </h1>
          <p className="text-white/50 mt-1">Live platform metrics & interactive demo personas</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Live
          </div>
        </div>
      </header>

      {/* High-Level Metrics (Impact Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard title="Welfare Value Unlocked" value="₹6,26,000" icon={LineChart} color="text-emerald-400" />
        <MetricCard title="Citizens Assisted" value="12,450" icon={Users} color="text-blue-400" />
        <MetricCard title="Documents Verified" value="8,902" icon={FileCheck} color="text-indigo-400" />
        <MetricCard title="Avg. Discovery Time" value="1m 45s" icon={Zap} color="text-amber-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Demo Personas Area */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Live Demo Personas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PersonaCard 
              name="Ramesh Kumar" role="Farmer, Bihar"
              details="Income: ₹45,000/yr | Documents: Aadhaar, Land Record"
            />
            <PersonaCard 
              name="Sunita Devi" role="Woman Head of Household, UP"
              details="Income: ₹30,000/yr | Documents: Aadhaar, Ration Card"
            />
            <PersonaCard 
              name="Arjun Singh" role="Gig Worker, Maharashtra"
              details="Income: ₹1,20,000/yr | Documents: Aadhaar, Bank Passbook"
            />
          </div>
          
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-lg mb-4 text-white/80">Interactive Workflow Timeline</h3>
            {/* Citizen Journey Timeline Placeholder */}
            <div className="flex justify-between items-center relative py-4">
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/10 -z-10"></div>
              {["Profile", "Eligibility", "Docs", "Ready"].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? 'bg-indigo-500' : 'bg-white/10'}`}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-white/50">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Confidence & Welfare Wallet Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 backdrop-blur-md">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" /> AI Confidence Panel
            </h3>
            <div className="space-y-4">
              <ConfidenceRow label="Eligibility Logic" value={98} />
              <ConfidenceRow label="Document OCR" value={82} />
              <ConfidenceRow label="Translation Accuracy" value={94} />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-lg mb-4">Languages Actively Used</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-white/70"><span>Hindi</span><span>45%</span></div>
              <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full w-[45%]"></div></div>
              <div className="flex justify-between text-sm text-white/70 mt-2"><span>Bhojpuri</span><span>25%</span></div>
              <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full w-[25%]"></div></div>
              <div className="flex justify-between text-sm text-white/70 mt-2"><span>Marathi</span><span>15%</span></div>
              <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-pink-500 h-1.5 rounded-full w-[15%]"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white/60 font-medium text-sm">{title}</h3>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
    </motion.div>
  );
}

function PersonaCard({ name, role, details }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all cursor-pointer group">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">{name}</h4>
        <button className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-4 h-4 ml-0.5" />
        </button>
      </div>
      <p className="text-sm text-white/80 mb-1">{role}</p>
      <p className="text-xs text-white/40">{details}</p>
    </div>
  );
}

function ConfidenceRow({ label, value }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/80">{label}</span>
        <span className="text-indigo-400 font-medium">{value}%</span>
      </div>
      <div className="w-full bg-black/40 rounded-full h-2">
        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
