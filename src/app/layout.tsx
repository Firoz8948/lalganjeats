import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Lalganjeats — Coming Soon",
  description: "Fresh food from your village, delivered to your door. Launching soon in Lalganj.",
  keywords: "Lalganj, food delivery, lalganjeats, lalganj eats, village food",
  openGraph: {
    title: "Lalganjeats — Coming Soon",
    description: "Fresh food from your village, delivered to your door.",
    url: "https://lalganjeats.com",
    siteName: "Lalganjeats",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
