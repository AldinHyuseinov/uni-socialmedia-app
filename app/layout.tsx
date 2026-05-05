import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Stud SU | Начало",
  description: "Социален сайт за студенти и преподаватели",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className}`}>
      <body className="flex flex-col min-h-screen bg-brand-primary">
        <div className="absolute top-20 left-10 opacity-20 text-5xl">🌸</div>
        <div className="absolute bottom-20 right-20 opacity-20 text-5xl">📘</div>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
