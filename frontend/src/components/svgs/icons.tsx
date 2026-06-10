import React from "react";

export function FarmerSVG({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#2E7D32" fillOpacity="0.1" />
      <circle cx="50" cy="45" r="25" fill="#D7CCC8" />
      <path d="M 10 35 Q 50 5 90 35 Z" fill="#8D6E63" />
      <circle cx="40" cy="45" r="3" fill="#4E342E" />
      <circle cx="60" cy="45" r="3" fill="#4E342E" />
      <path d="M 40 55 Q 50 65 60 55" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 25 100 Q 50 70 75 100 Z" fill="#2E7D32" />
    </svg>
  );
}

export function WomanSVG({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#FFC107" fillOpacity="0.1" />
      <circle cx="50" cy="45" r="25" fill="#D7CCC8" />
      {/* Bindi */}
      <circle cx="50" cy="35" r="2" fill="#E53935" />
      <circle cx="40" cy="45" r="3" fill="#4E342E" />
      <circle cx="60" cy="45" r="3" fill="#4E342E" />
      <path d="M 40 55 Q 50 65 60 55" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 25 100 Q 50 70 75 100 Z" fill="#FF5252" />
    </svg>
  );
}

export function WalletSVG({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="30" width="70" height="50" rx="10" fill="#FFC107" />
      <rect x="65" y="45" width="20" height="20" rx="5" fill="#4E342E" />
      {/* Coins popping out */}
      <circle cx="30" cy="20" r="8" fill="#FFCA28" stroke="#FFB300" strokeWidth="2" />
      <text x="30" y="24" fontSize="10" fill="#4E342E" textAnchor="middle" fontWeight="bold">₹</text>
      <circle cx="50" cy="10" r="10" fill="#FFCA28" stroke="#FFB300" strokeWidth="2" />
      <text x="50" y="14" fontSize="12" fill="#4E342E" textAnchor="middle" fontWeight="bold">₹</text>
      <circle cx="70" cy="20" r="8" fill="#FFCA28" stroke="#FFB300" strokeWidth="2" />
      <text x="70" y="24" fontSize="10" fill="#4E342E" textAnchor="middle" fontWeight="bold">₹</text>
    </svg>
  );
}
