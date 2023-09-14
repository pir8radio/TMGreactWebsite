import { FC, createContext } from "react";
import { isMobile } from "react-device-detect";
import { DeeplinkableWallet, GenericExtensionWallet } from "@signumjs/wallets";

import isClientSide from "@/app/utils/isClientSide";

export interface AppContextType {
  IsClientSide: boolean;
  IsMobile: boolean;
  CanonicalUrl: string;
  Fetcher: any;
  DAppName: string;
  IsTestnet: boolean;
  Wallet: {
    Extension: GenericExtensionWallet;
    Deeplink: DeeplinkableWallet;
  };
  Ledger: {
    Network: string;
    Explorer: string;
    DefaultNode: string;
  };
}

const fetcher = async <JSON = any,>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | null> => {
  try {
    const res = await fetch(input, init);
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
  } catch (e) {}
  return null;
};

const toBoolean = (v: string): boolean => v.toLowerCase() === "true";
const IsTestnet = toBoolean(
  process.env.NEXT_PUBLIC_SIGNUM_IS_TESTNET || "false"
);

export const config: AppContextType = {
  IsMobile: isMobile,
  IsClientSide: isClientSide(),
  CanonicalUrl: "https://tmg.notallmine.net",
  Fetcher: fetcher,
  DAppName: "The Mining Game",
  IsTestnet,
  Wallet: {
    Extension: new GenericExtensionWallet(),
    Deeplink: new DeeplinkableWallet({ openInBrowser: true }),
  },
  Ledger: {
    Network: process.env.NEXT_PUBLIC_SIGNUM_NETWORK || "Signum",
    Explorer: "https://explorer.notallmine.net",
    DefaultNode: "https://europe3.signum.network",
  },
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};
