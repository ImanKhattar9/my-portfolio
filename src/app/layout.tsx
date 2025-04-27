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
    description: "Portfolio of Iman Khattar, a creative web developer specializing in modern and animated websites.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <html lang="en">
        <body className="bg-gray-500/40">
          <HorizontalScrollWrapper>
            {/* Home Section */}
            <div>
              <Header />
              <Home />
            </div>
            {/* AboutMe Section */}
            <div>
              <AboutMe />
            </div>
          </HorizontalScrollWrapper>

          {/* Vertical scroll part */}
          <div className="flex flex-col">
          <section className="w-screen min-h-screen flex-shrink-0 snap-start ">
            <Projects />
          </section>
            <section className="w-screen h-screen flex-shrink-0 snap-start overflow-hidden">
            <Knowledge />
            </section>
            <section className="w-screen h-screen flex-shrink-0 snap-start overflow-hidden">
            <Contact />
            </section>
          </div>
        </body>
      </html>
    );
  }
