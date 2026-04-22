import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

interface OgProps {
  title: string;
  subtitle?: string;
  tag?: string;
}

export function renderOgImage({ title, subtitle, tag }: OgProps): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#F5F3EE",
          color: "#0B0B0C",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
            NANFENG ARCHITECTS
          </span>
          {tag ? (
            <span
              style={{
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#E25822",
              }}
            >
              {tag}
            </span>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 40 ? 72 : 96,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 28, color: "#555", maxWidth: 900 }}>{subtitle}</div>
          ) : null}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
