import { useEffect } from "react";
import MainLayout from "~/layouts/MainLayout";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "~/styles/globals.scss";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
