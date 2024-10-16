import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";

// import Footer from '@/components/layout/footer';
import { baseUrl } from '@/lib/sitemap';
import { ThemeProvider } from "@/components/provider/theme-provider";

const geistSans = localFont({
  // src: "../../public/fonts/GeistVF.woff",
  src: "../../public/fonts/XiaolaiMonoSC-Regular.ttf",
  variable: "--font-geist-sans",
  // weight: "100 900",
});
const geistMono = localFont({
  // src: "../../public/fonts/GeistMonoVF.woff",
  src: "../../public/fonts/XiaolaiMonoSC-Regular.ttf",
  variable: "--font-geist-mono",
  // weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {


  return (
    <html
      lang="en"
      className={cx(
        geistSans.variable,
        geistMono.variable
      )}
      // suppressHydrationWarning
    >
      {/* <head>
        <script src="/vscode/Comet.js" />
      </head> */}
      <body className="antialiased mio-scroll">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}