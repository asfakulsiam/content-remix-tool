import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "./providers";
import ClientWrapper from "./ClientWrapper";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Content Remix Tool",
  description: "Transform your content into multiple engaging formats with AI",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  generator: "Asfakkul Islam Siam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* Only render ClientWrapper in production */}
          {process.env.NODE_ENV === "production" && <ClientWrapper />}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
