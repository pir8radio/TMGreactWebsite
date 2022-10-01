import { useMemo } from "react";
import { LedgerClientFactory } from "@signumjs/core";
import { useAppSelector } from "@/states/hooks";
import { selectWalletNodeHost } from "@/app/states/appState";
import { useExtensionWallet } from "@/app/hooks/useExtensionWallet";
import { config } from "@/app/contexts/AppContext";

export const useLedger = () => {
  const wallet = useExtensionWallet();
  const nodeHost = useAppSelector(selectWalletNodeHost);

  return useMemo(() => {
    if (!wallet) return null;

    const selectedNode = nodeHost || config.Ledger.DefaultNode;

    return LedgerClientFactory.createClient({ nodeHost: selectedNode });
  }, [nodeHost, wallet]);
};
