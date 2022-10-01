import { Amount, ChainValue } from "@signumjs/util";
import { useLedger } from "@/app/hooks/useLedger";
import { useAccount } from "@/app/hooks/useAccount";
import { InitialAccountBalance } from "@/app/types/accountBalance";

import useSWR from "swr";

export const useAccountBalance = () => {
  const { publicKey, accountId } = useAccount();
  const ledger = useLedger();

  const { data } = useSWR(
    `accountBalance${accountId}`,
    async () => {
      if (!ledger || !publicKey || !accountId) return undefined;

      const account = await ledger.account.getAccount({
        accountId,
        includeCommittedAmount: true,
      });

      let tmgAvailableBalance = "0";

      if (account.assetBalances) {
        account.assetBalances.forEach((asset) => {
          if (asset.asset == "11955007191311588286") {
            tmgAvailableBalance = ChainValue.create(2)
              .setAtomic(asset.balanceQNT)
              .getCompound();
          }
        });
      }

      return {
        totalBalance: Amount.fromPlanck(account.balanceNQT || "0"),
        availableBalance: Amount.fromPlanck(
          account.unconfirmedBalanceNQT || "0"
        ),
        tmgAvailableBalance,
      };
    },
    {
      dedupingInterval: 10_000,
      refreshInterval: 30_000,
    }
  );

  return data || InitialAccountBalance;
};
