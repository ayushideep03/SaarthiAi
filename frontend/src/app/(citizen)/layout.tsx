import React from "react";

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#FAF7F2" }}>
      {children}
    </div>
  );
}
