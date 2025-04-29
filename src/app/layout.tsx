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
};

const RootLayout: React.FC = () => {
  return (
    <html lang="en">
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

{/* Normal vertical scroll after About */}
<div className="flex flex-col">
  <section><Projects /></section>
  <section><Knowledge /></section>
  <section><Contact /></section>
</div>


        {/* Vercel Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
