import type { Metadata, Viewport } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import { HeroUIProvider } from "@heroui/system";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toscana Foundation | Empowering Communities",
  description:
    "Empowering people with the resources, opportunities, and support they need to build stronger futures.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/icon.png",
  },

  openGraph: {
    title: "Villa Toscana Foundation",
    description:
      "Empowering people with the resources, opportunities, and support they need to build stronger futures.",
    images: [{ url: "/icon.png", width: 512, height: 512 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Villa Toscana Foundation",
    description: "Empowering communities through resources, education, and opportunity.",
    images: ["/icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
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
        className={`${fredoka.variable} ${plusJakarta.variable} font-sans antialiased min-h-screen bg-zinc-50 text-zinc-900`}
      >
        <QueryProvider>
          <HeroUIProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </HeroUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
