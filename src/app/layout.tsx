import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#17100a",
  width: "device-width",
  initialScale: 1,
};

const SITE = "https://more-than-perfect.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title:
    "More Than Perfect · Barber Shop in South Orange, NJ · 5.0 across 164 cuts",
  description:
    "A barber shop on South Orange Avenue with a perfect record: 5.0 stars across 164 reviews. Fades, line ups, beards, hot towel shaves, afros and kids' cuts, seven days a week from six in the morning. Book the chair.",
  keywords: [
    "barber shop South Orange NJ",
    "fade haircut South Orange",
    "edge up taper South Orange",
    "kids haircut South Orange Avenue",
    "black barber shop 07079",
    "More Than Perfect barber",
  ],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: {
    title: "More Than Perfect · Barber Shop in South Orange",
    description:
      "164 cuts on the books. Not one below five stars. Fades, tapers, edge ups, shaves and kids' cuts on South Orange Avenue, open from six every morning.",
    url: SITE,
    siteName: "More Than Perfect",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "More Than Perfect Barber Shop, South Orange NJ",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "More Than Perfect · Barber Shop in South Orange",
    description: "164 cuts on the books. Not one below five stars.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=tanker@400&f[]=general-sans@400,500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
        />
        <style>{`
          :root {
            --font-display: "Tanker";
            --font-body: "General Sans";
          }
        `}</style>
      </head>
      <body>
        {/* Arm scroll reveals before hydration (no flash) but only when the tab
            is visible and motion is allowed, so content is never stranded
            invisible (DESIGN_LESSONS 06-03). */}
        <Script id="reveal-arm" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.visibilityState!=='hidden'){d.classList.add('reveal-armed');}}catch(e){}try{setTimeout(function(){document.documentElement.classList.add('reveal-done');},2500);}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
