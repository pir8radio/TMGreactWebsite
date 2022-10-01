import { Address } from "@signumjs/core";
import { selectWalletPublicKey } from "@/app/states/appState";
import { useAppSelector } from "@/states/hooks";

export const useAccount = () => {
  const publicKey = useAppSelector(selectWalletPublicKey);
  let address: Address | null = null;

  try {
    address = publicKey ? Address.fromPublicKey(publicKey) : null;
  } catch (e) {
    address = null;
  }

  return {
    accountId: address?.getNumericId(),
    publicKey: address?.getPublicKey(),
  };
};
