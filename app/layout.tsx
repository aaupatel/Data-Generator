import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import AuthProvider from "@/components/providers/next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Generator",
  description:
    "Generate sample data for MySQL, PostgreSQL, Oracle, MongoDB, CSV, JSON and Excel formats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      {/* <script src="https://checkout.razorpay.com/v1/checkout.js" async></script> */}
      <body className={inter.className}>
        <main className="min-h-screen gradient-bg">
          <AuthProvider>{children}</AuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
