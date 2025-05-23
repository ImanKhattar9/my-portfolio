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

const RootLayout: React.FC = () => {
  return (
    <html lang="en">
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
