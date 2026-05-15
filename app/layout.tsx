import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mmHeadline = localFont({
  src: "../public/fonts/MMHeadlineProWebTT-Regular_subset.woff2",
  variable: "--font-headline",
  display: "swap",
});

const notoSans = localFont({
  src: [
    { path: "../public/fonts/noto-sans-display-v10-latin-400.woff2", weight: "400" },
    { path: "../public/fonts/noto-sans-display-v10-latin-600.woff2", weight: "600" },
    { path: "../public/fonts/noto-sans-display-v10-latin-700.woff2", weight: "700" },
  ],
  variable: "--font-sans",
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
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
