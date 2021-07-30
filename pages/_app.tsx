// Styles
import "../styles/variables.css";
import "../styles/animations.css";
import "../styles/globals.css";
import "highlight.js/styles/atom-one-dark.css";
import "nprogress/nprogress.css";
// Fonts
import "../public/fonts/panchang/css/panchang.css";
import "../public/fonts/inter/css/inter.css";
import "../public/fonts/weathericons/weather-icons.min.css";
import "../public/fonts/ibm-plex-mono/css/ibm-plex-mono.css";
// Deps
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
// Components
import MainLayout from "../components/Layouts/MainLayout";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const LIGHT = "light";
export const DARK = "dark";
export const ThemeContext = React.createContext<string>(null);

function MyApp({ Component, pageProps }) {
  const [currentDisplayMode, setCurrentDisplayMode] = useState<string>(null);
  const router = useRouter();

  // Handle progress bar
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const routeChangeStart = () => NProgress.start();
    const routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);
    router.events.on("routeChangeComplete", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  });

  // Handle display mode toggle
  function toggleDisplayMode() {
    const currentDisplaySetting =
      document.documentElement.getAttribute("data-display");

    if (currentDisplaySetting === LIGHT) {
      document.documentElement.setAttribute("data-display", DARK);
      localStorage.setItem("theme", DARK);
      setCurrentDisplayMode(DARK);
    } else {
      document.documentElement.setAttribute("data-display", LIGHT);
      localStorage.setItem("theme", LIGHT);
      setCurrentDisplayMode(LIGHT);
    }
  }

  // Handle loading display mode
  function loadDisplayMode() {
    const currentDisplaySetting = localStorage.getItem("theme");

    if (currentDisplaySetting) {
      document.documentElement.setAttribute(
        "data-display",
        currentDisplaySetting
      );

      setCurrentDisplayMode(currentDisplaySetting);
    } else {
      localStorage.setItem("theme", DARK);
      setCurrentDisplayMode(DARK);
    }
  }

  useEffect(() => {
    loadDisplayMode();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Arnold Rozon &middot; Engineering &amp; Design</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Header
        currentDisplayMode={currentDisplayMode}
        handleDisplayModeToggle={toggleDisplayMode}
      />
      <ThemeContext.Provider value={currentDisplayMode}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
      <Footer />
    </MainLayout>
  );
}

export default MyApp;
