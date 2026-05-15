import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
