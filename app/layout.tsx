import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Career GPS — Find Your Direction",
    template: "%s | Career GPS",
  },
  description:
    "A Personalised Career Companion that stays with you until you reach the milestone. We stay with you until you do it.",
  applicationName: "Career GPS",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Career GPS — Find Your Direction",
    description:
      "A Personalised Career Companion that stays with you until you reach the milestone.",
    type: "website",
    siteName: "Career GPS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career GPS — Find Your Direction",
    description:
      "A Personalised Career Companion that stays with you until you reach the milestone.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563EB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}