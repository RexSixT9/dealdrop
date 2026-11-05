import { ImageResponse } from "next/og";
import { getGuide } from "@/constants/guides";

export const alt = "DealDrop price tracking guide";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const title = guide?.title ?? "Price tracking guides";
  const readingTime = guide ? `${guide.readingTime} min read` : "DealDrop";

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
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.08)",
              padding: "10px 18px",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.6,
            }}
          >
            DealDrop Guides
          </div>
          <div
            style={{
              maxWidth: 980,
              fontSize: title.length > 62 ? 56 : 68,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            fontSize: 24,
            color: "rgba(255,247,242,0.82)",
          }}
        >
          <span>{readingTime}</span>
          <span>deals.r6t9.space/guides</span>
        </div>
      </div>
    ),
    size,
  );
}
