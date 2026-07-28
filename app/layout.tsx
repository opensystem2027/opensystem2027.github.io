import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "International Workshop on the GKLS equation and beyond";
const description =
  "A focused international workshop on non-Markovian quantum dynamics, open quantum systems, quantum information, statistical physics, and related fields, held at RIKEN Wako Campus.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "International Workshop on Non-Markovian Quantum Dynamics",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1536,
          height: 1024,
          alt: `${title} — 7–8 March 2027 (tentative), RIKEN Wako Campus`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
