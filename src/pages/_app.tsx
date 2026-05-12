import { type AppType } from "next/dist/shared/lib/utils";
import { useState, useEffect } from "react";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SectionDots from "@/components/SectionDots";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      <div lang={"en"} className={dmSans.className}>
        <div
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: ready ? "auto" : "none",
          }}
        >
          <ScrollProgressBar />
          <SectionDots />
          <ThemeSwitcher />
        </div>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
