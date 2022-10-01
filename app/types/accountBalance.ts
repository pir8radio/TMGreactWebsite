import { Amount } from "@signumjs/util";

export interface AccountBalance {
  totalBalance: Amount;
  availableBalance: Amount;
  tmgAvailableBalance: string;
}

export const InitialAccountBalance: AccountBalance = {
  totalBalance: Amount.Zero(),
  availableBalance: Amount.Zero(),
  tmgAvailableBalance: "",
};
