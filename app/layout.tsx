import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anu Maria Antony | Singer, Performer & Content Creator",
  description:
    "I am Anu Maria Antony, a passionate singer and Nursing graduate whose musical journey is rooted in faith, creativity, and heartfelt expression.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
