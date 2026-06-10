"use client";
import { useState } from "react";
import { useLanguage, LANGUAGES } from "@/i18n/provider";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="btn-secondary"
        style={{ padding: "8px 16px", fontSize: 14 }}
        aria-label={t.common_language}
      >
        <Globe size={16} style={{ color: "#6B7280" }} />
        <span>{current?.nameNative || "हिन्दी"}</span>
        <ChevronDown size={14} style={{ color: "#6B7280" }} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              zIndex: 50,
              width: 280,
              maxHeight: 360,
              overflowY: "auto",
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 14,
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              padding: 8,
            }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLocale(lang.code); setOpen(false); }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 15,
                  fontWeight: locale === lang.code ? 700 : 500,
                  background: locale === lang.code ? "#E8F5E9" : "transparent",
                  color: locale === lang.code ? "#2E7D32" : "#1F2937",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (locale !== lang.code) (e.target as HTMLElement).style.background = "#F9FAFB";
                }}
                onMouseLeave={(e) => {
                  if (locale !== lang.code) (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                <span>{lang.nameNative}</span>
                <span style={{ fontSize: 13, color: "#9CA3AF" }}>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
