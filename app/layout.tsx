import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AuthProvider from "./auth/provider";
import QueryClientProvider from "./QueryClientProvider";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryClientProvider>
          <AuthProvider>
            <Theme>
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
