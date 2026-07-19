import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Festiviya | Premium Website Design Studio",
  description: "Festiviya creates premium corporate websites for ambitious businesses, with strategy, design, development and hosting included.",
};

export const viewport = {
  themeColor: "#FCFAF8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
