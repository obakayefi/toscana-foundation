import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { HeroUIProvider } from "@heroui/system";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toscana Foundation | Empowering Communities",
  description: "Empowering people with the resources, opportunities, and support they need to build stronger futures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${inter.variable} font-sans antialiased min-h-screen bg-zinc-50 text-zinc-900`}
      >
        <HeroUIProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </HeroUIProvider>
      </body>
    </html>
  );
}
