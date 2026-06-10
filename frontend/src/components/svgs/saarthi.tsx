import React from "react";

/**
 * Saarthi – Minimal, professional, flat vector guide character.
 * Used sparingly: welcome, success, empty states, help.
 * NOT a bouncing mascot. A calm, trustworthy presence.
 */
export function SaarthiGuide({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="16" y="36" width="32" height="24" rx="8" fill="#2E7D32" />
      {/* Head */}
      <circle cx="32" cy="24" r="14" fill="#D7CCC8" />
      {/* Hair/Turban — subtle */}
      <path d="M18 20 Q32 8 46 20" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Eyes — simple dots */}
      <circle cx="27" cy="25" r="2" fill="#1F2937" />
      <circle cx="37" cy="25" r="2" fill="#1F2937" />
      {/* Subtle smile */}
      <path d="M27 30 Q32 35 37 30" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
