import "../styles/globals.css";
import "../public/fonts/panchang/css/panchang.css";
import "../public/fonts/inter/css/inter.css";
import "../public/fonts/weathericons/weather-icons.min.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Arnold Rozon &middot; Engineering &amp; Design</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
