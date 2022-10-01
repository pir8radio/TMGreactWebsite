import { ContractDataView } from "@signumjs/contracts";
import { useLedger } from "@/app/hooks/useLedger";
import {
  DefaultContractData,
  PickerContractDataIndex,
} from "@/app/types/contractData";

import useSWR from "swr";

export const useContractData = () => {
  const ledger = useLedger();

  const { data } = useSWR(
    ledger ? "pickerData" : undefined,
    async () => {
      if (!ledger) return undefined;

      const contract = await ledger.contract.getContract(
        "18339269626061634110"
      );

      const blockChainStatus = await ledger.network.getBlockchainStatus();
      const signumBlockHeight = blockChainStatus.numberOfBlocks;

      const { at, atRS, balanceNQT } = contract;

      // Contract Variables
      const contractDataView = new ContractDataView(contract);

      const processedDeadlines = contractDataView.getVariableAsDecimal(
        PickerContractDataIndex.processedDeadlines
      );

      const currentHeight = contractDataView.getVariableAsDecimal(
        PickerContractDataIndex.currentHeight
      );

      const bestMiner = contractDataView.getVariableAsDecimal(
        PickerContractDataIndex.bestMiner
      );

      const bestDeadline = Math.log2(
        Number(
          contractDataView.getVariableAsDecimal(
            PickerContractDataIndex.bestDeadline
          )
        )
      ).toFixed(2);

      const contractLastOverallMiningFactor = Number(
        contractDataView.getVariableAsDecimal(
          PickerContractDataIndex.lastOverallMiningFactor
        )
      );

      const formattedOverallMiningFactor = (
        (contractLastOverallMiningFactor / 100000000) *
        0.32
      ).toFixed(2);

      const lastWinnerAccountId = contractDataView.getVariableAsDecimal(
        PickerContractDataIndex.lastWinnerAccountId
      );

      const lastWinnerAccountName = await ledger.account
        .getAccount({
          accountId: lastWinnerAccountId,
        })
        .then((response) => response.name || "");

      const lastWinnerDeadline = Math.log2(
        Number(
          contractDataView.getVariableAsDecimal(
            PickerContractDataIndex.lastWinnerDeadline
          )
        )
      ).toFixed(2);

      const lastSignumBlockForged = contractDataView.getVariableAsDecimal(
        PickerContractDataIndex.lastSignumBlockForged
      );

      const forgedTokenCurrentBlock = contractDataView.getVariableAsDecimal(
        PickerContractDataIndex.forgedTokenCurrentBlock
      );

      return {
        at,
        atRS,
        balanceNQT,
        processedDeadlines,
        currentHeight,
        bestMiner,
        bestDeadline,
        signumBlockHeight,
        lastOverallMiningFactor: formattedOverallMiningFactor,
        lastWinnerAccountId,
        lastWinnerAccountName,
        lastWinnerDeadline,
        lastSignumBlockForged,
        forgedTokenCurrentBlock,
      };
    },
    {
      dedupingInterval: 10_000,
      refreshInterval: 30_000,
    }
  );

  return data || DefaultContractData;
};
