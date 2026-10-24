import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elite Gestão",
  description: "Gestão de centros de formação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}