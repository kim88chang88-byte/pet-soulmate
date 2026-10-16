import type { Metadata } from "next";
import { Comfortaa, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const comfortaa = Comfortaa({ variable: "--font-comfortaa", subsets: ["latin"] });
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "냥멍 궁합 — 나와 딱 맞는 반려동물 찾기",
  description: "MBTI와 라이프스타일로 알아보는 반려동물 궁합 테스트",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${comfortaa.variable} ${quicksand.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
