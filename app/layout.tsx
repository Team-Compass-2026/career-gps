import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Career GPS - Find Your Direction",
  description:
    "A Personalised Career Companion that stays with you until you reach the milestone. We stay with you until you do it.",
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