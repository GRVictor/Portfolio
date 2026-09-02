import { ImageResponse } from "next/og";

import { personalInfo } from "@/config/site";

export const alt = `${personalInfo.name} | ${personalInfo.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#111311",
          color: "#f4f6f2",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", fontSize: 24, gap: 18 }}>
          <div
            style={{
              alignItems: "center",
              background: "#e1f3e5",
              borderRadius: 14,
              color: "#1c3f25",
              display: "flex",
              fontFamily: "monospace",
              height: 52,
              justifyContent: "center",
              width: 62,
            }}
          >
            {"</>"}
          </div>
          <span>{personalInfo.brand}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#9ba39b", fontFamily: "monospace", fontSize: 22 }}>{personalInfo.role}</div>
          <div style={{ fontSize: 72, fontWeight: 650, letterSpacing: "-3px", lineHeight: 1.02, maxWidth: 980 }}>
            Software escalable para operaciones reales.
          </div>
        </div>
        <div style={{ color: "#9ba39b", display: "flex", fontSize: 21, justifyContent: "space-between" }}>
          <span>{personalInfo.location}</span>
          <span>Interfaz / API / Datos</span>
        </div>
      </div>
    ),
    size,
  );
}
