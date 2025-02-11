import type { Metadata } from "next";
import "@/styles/globals.css";
// import localFont from "next/font/local";
// import { SpeedInsights } from '@vercel/speed-insights/next'
// import Footer from '@/components/layout/footer';
import { baseUrl } from '@/lib/sitemap';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleAnalytics
  // , GoogleTagManager 
} from "@next/third-parties/google"
import { SessionProvider } from "next-auth/react";
import { ParticleBackground } from "@/components/3d/ParticleBackground";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster  } from "@/components/ui/sonner"
import { UIProvider } from "@/components/providers/HeroUIProvider";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "aa's Blog",
    template: "%s | aa's Blog",
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // const headersList = await headers()
  // console.log(`src/app/[...slug]/layout.tsx: `)
  // const headerEntries = []
  // headersList.forEach((value, key) => {
  //   headerEntries.push(`${key}: ${value}`)
  // })

  return (
    <html
      lang="en"
      className={cx()}
      suppressHydrationWarning
    >
      {/* <head>
        <script src="/vscode/Comet.js" />
      </head> */}
      <body className="antialiased mio-scroll">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // defaultTheme="light"
          enableSystem={false}
          // enableSystem
          disableTransitionOnChange
        >
          <UIProvider>
            <SessionProvider>
              <main>
                {children}
                {/* <SpeedInsights /> */}
              {/* <ParticleBackground /> */}
              </main>
              <Toaster />
              <SonnerToaster />
            </SessionProvider>
          </UIProvider>
        </ThemeProvider>
        {process.env.GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />}
      </body>
    </html>
  );
}