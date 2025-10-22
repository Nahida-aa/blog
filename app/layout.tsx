import type { Metadata } from "next";
import "./globals.css";
// import localFont from "next/font/local";
// import { SpeedInsights } from '@vercel/speed-insights/next'
// import Footer from '@/components/layout/footer';
// import { baseUrl } from '@/lib/sitemap';
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
// import { GoogleAnalytics
//   // , GoogleTagManager
// } from "@next/third-parties/google"
// import { ParticleBackground } from "@/components/3d/ParticleBackground";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl } from "@/app/config";
import { HeroUIProvider } from "@heroui/react";
import { CLientProvider } from "@/components/providers/client.provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL(baseUrl),
  title: {
    default: "aa's blog",
    template: "%s | aa's blog",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const headersList = await headers()
  // console.log(`src/app/[...slug]/layout.tsx: `)
  // const headerEntries = []
  // headersList.forEach((value, key) => {
  //   headerEntries.push(`${key}: ${value}`)
  // })

  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <script src="/vscode/Comet.js" />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          // defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CLientProvider>
            {/* <SessionProvider> */}
            {children}
            {/* <SpeedInsights /> */}
            {/* <ParticleBackground /> */}
            <Toaster />
            {/* </SessionProvider> */}
          </CLientProvider>
        </ThemeProvider>
        {/* {process.env.GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />} */}
      </body>
    </html>
  );
}
