import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "汽车百科 - 全面的汽车知识平台",
  description: "涵盖全球各大汽车品牌、车系和车型的详细参数与历史。搜索品牌、车系、车型，了解汽车发展历史。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
