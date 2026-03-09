import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ClawsBag — Agent 技能包市场",
  description:
    "你的 Agent 缺的不是智能，是真正能用的场景。来这里，找到你行业的技能包，一键装进你的 Agent。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@700;900&family=DM+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${dmMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
