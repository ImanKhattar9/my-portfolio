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
};

const RootLayout: React.FC = () => {
  return (
    <html lang="en">
      <head>
        <title>Iman Khattar - Web Developer</title>
        <meta name="description" content="Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Tags for LinkedIn, Facebook, etc. */}
        <meta property="og:title" content="Iman Khattar - Web Developer" />
        <meta property="og:description" content="Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites." />
         <meta property="og:image" content="https://www.imankhattar.com/logo.png" />
         <meta property="og:url" content="https://www.imankhattar.com" />
         <meta property="og:type" content="website" />
         <meta property="og:site_name" content="Iman Khattar Portfolio" />

        {/* Optional: Twitter Card for completeness */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iman Khattar - Web Developer" />
        <meta name="twitter:description" content="Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites." />
        <meta name="twitter:image" content="https://www.imankhattar.com/logo.png" />
      </head>
      <body className="bg-gray-500/40">
        <HorizontalScrollWrapper>
          {/* Home */}
          <div>
            <Header />
            <Home />
          </div>

          {/* About */}
          <div>
            <AboutMe />
          </div>
        </HorizontalScrollWrapper>

        {/* Vertical scroll sections */}
        <div className="flex flex-col">
          <section><Projects /></section>
          <section><Knowledge /></section>
          <section><Contact /></section>
        </div>

        {/* Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
