import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a2342 0%, #000d22 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#0f9d8a",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: "30px", fontWeight: 700, color: "white" }}>
              GeneMatch <span style={{ color: "#2bb7e8", marginLeft: "8px" }}>Health</span>
            </div>
            <div style={{ display: "flex", fontSize: "16px", letterSpacing: "4px", color: "#94a3b8" }}>
              HEALTH CIC
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "52px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: "980px",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#c3d0e0",
            marginTop: "28px",
            maxWidth: "900px",
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
