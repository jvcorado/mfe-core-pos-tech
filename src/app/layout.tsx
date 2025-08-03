import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CommunicationProvider } from "@/context/CommunicationContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bytebank",
  description: "Bytebank - Seu banco digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CommunicationProvider>{children}</CommunicationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
