import type { Metadata } from "next";
import "./globals.css";
import { Rajdhani } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rajdhani.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}