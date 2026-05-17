import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DealDrop - Smart Price Tracker";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const siteName = "DealDrop";
const headline = "Track price drops before they sell out.";
const subtext =
  "Price tracking, instant alerts, and a clean watchlist for smarter shopping.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #0b0b0b 0%, #1a120f 45%, #FA5D19 100%)",
          color: "#fff7f2",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              width: "auto",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.08)",
              padding: "10px 18px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 0.6,
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 76,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            {headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              maxWidth: 680,
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(255,247,242,0.88)",
            }}
          >
            {subtext}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
              fontSize: 22,
              color: "rgba(255,247,242,0.8)",
            }}
          >
            <span>deal tracking</span>
            <span>email alerts</span>
            <span>price history</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
