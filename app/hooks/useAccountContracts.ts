import { useMemo } from "react";
import { Amount } from "@signumjs/util";
import { useLedger } from "@/app/hooks/useLedger";
import { useAccount } from "@/app/hooks/useAccount";

import useSWR from "swr";

export const useAccountContracts = () => {
  const { publicKey, accountId } = useAccount();
  const ledger = useLedger();

  const { data } = useSWR(
    `accountMiner${accountId}`,
    async () => {
      if (!ledger || !publicKey || !accountId) return undefined;
      const account = await ledger.contract.getContractsByAccount({
        accountId,
        machineCodeHash: "5817622329198284865",
      });

      return account.ats;
    },
    {
      dedupingInterval: 10_000,
      refreshInterval: 30_000,
    }
  );

  const accountMinerContract = useMemo(() => {
    if (!data || !data.length) return undefined;

    const globalContract = data[0];

    const globalContractPrice = Number(
      Amount.fromPlanck(globalContract.balanceNQT).getSigna()
    );

    let selectedContract: any = undefined;

    // Find the contract with the highest balance
    data.forEach((contract) => {
      const accountContractPrice = Number(
        Amount.fromPlanck(contract.balanceNQT).getSigna()
      );

      if (accountContractPrice > globalContractPrice) {
        selectedContract = contract;
      }
    });

    return selectedContract || globalContract;
  }, [data]);

  return accountMinerContract;
};
