import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import AboutMe from "@/components/Aboutme";
import Contact from "@/components/Contact";
import Header from "@/components/header";
import Home from "@/components/Home";
import { Knowledge } from "@/components/Knowledge";
import Projects from "@/components/Projects";
import "./globals.css";
import HorizontalScrollWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Iman Khattar - Web Developer",
  description:
    "Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Iman Khattar - Web Developer",
    description: "Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites.",
    url: "https://www.imankhattar.com",
    siteName: "Iman Khattar Portfolio",
    images: [
      {
        url: "https://www.imankhattar.com/logo.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iman Khattar - Web Developer",
    description: "Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites.",
    images: ["https://www.imankhattar.com/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Search Console verification tag */}
        <meta name="google-site-verification" content="hHeDX1Pn5KjLU0MRuBUn657z91QcjFipu50JStLuMWw" />
        <title>Iman Khattar - Web Developer</title>
        <meta name="description" content="Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content="Iman Khattar - Web Developer" />
        <meta property="og:description" content="Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites." />
        <meta property="og:image" content="https://www.imankhattar.com/logo.png" />
        <meta property="og:url" content="https://www.imankhattar.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Iman Khattar Portfolio" />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iman Khattar - Web Developer" />
        <meta name="twitter:description" content="Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites." />
        <meta name="twitter:image" content="https://www.imankhattar.com/logo.png" />
      </head>
      <body className="bg-gray-500/40">
        <HorizontalScrollWrapper>
          <div>
            <Header />
            <Home />
          </div>
          <div>
            <AboutMe />
          </div>
        </HorizontalScrollWrapper>

        <div className="flex flex-col">
          <section><Projects /></section>
          <section><Knowledge /></section>
          <section><Contact /></section>
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
