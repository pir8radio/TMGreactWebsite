import { useRouter } from "next/router";
import { Fragment, FC, ReactNode, useEffect } from "react";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { config } from "@/app/contexts/AppContext";
import { AppInitializer } from "../AppInitializer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SetupWalletModal } from "./components/Modals/SetupWalletModal";
import { SignTransactionModal } from "./components/Modals/SignTransactionModal";
import { WalletWrongNetworkModal } from "./components/Modals/WalletWrongNetworkModal";

import AppSnackBar from "./components/AppSnackBar";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, easing: "ease", speed: 400 });

    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, []);

  return (
    <Fragment>
      <AppInitializer />
      <AppSnackBar />
      <Sidebar />

      <SetupWalletModal />
      <SignTransactionModal />
      <WalletWrongNetworkModal />

      <SEOMetaTags
        title="The Mining Game"
        description="A competition game where the contract that sends the best deadline wins a TMG token 😀"
        keywords="Mining Game, Signum Blockchain, Smart Contracts"
        imgUrl={config.CanonicalUrl + "/TMG_OG.jpg"}
        canonical={config.CanonicalUrl + router.asPath}
      />

      <Header />
      {children}
    </Fragment>
  );
};

export default Layout;
