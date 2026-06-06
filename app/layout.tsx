import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Soho Farm | Premium Hilltop Agricultural Land",
  description:
    "100 acre premium gated community agricultural land in the Roha-Alibaug region with mountain views, infrastructure, and helicopter site visit experience."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
