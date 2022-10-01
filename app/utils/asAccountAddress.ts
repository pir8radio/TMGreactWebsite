import { config } from "../contexts/AppContext";
import { Address, AddressPrefix } from "@signumjs/core";

export const asAccountAddress = (accountId: string): Address => {
  const Prefix = config.IsTestnet
    ? AddressPrefix.TestNet
    : AddressPrefix.MainNet;
  return Address.create(accountId, Prefix);
};
