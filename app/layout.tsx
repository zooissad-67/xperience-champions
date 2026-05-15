import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Display } from "next/font/google";
import "./globals.css";

const mmHeadline = localFont({
  src: "./fonts/MMHeadlineProWebTT-Regular_subset.woff2",
  variable: "--font-mm",
  display: "swap",
});

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xperience Champions",
  description: "My customer, my responsibility — MediaMarkt Saturn FY26/27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${mmHeadline.variable} ${notoSans.variable} h-full`}>
      <body className={`${notoSans.className} min-h-full flex flex-col antialiased`}>{children}</body>
    </html>
  );
}
