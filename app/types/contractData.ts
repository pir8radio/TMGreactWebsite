// Picker contract data

interface ContractData {
  signumBlockHeight: number;
  at: string;
  atRS: string;
  balanceNQT: string;
  processedDeadlines: string;
  currentHeight: string;
  bestMiner: string;
  bestDeadline: string;
  lastOverallMiningFactor: string;
  lastWinnerAccountId: string;
  lastWinnerAccountName: string;
  lastWinnerDeadline: string;
  lastSignumBlockForged: string;
  forgedTokenCurrentBlock: string;
}

export const DefaultContractData: ContractData = {
  signumBlockHeight: 0,
  at: "",
  atRS: "",
  balanceNQT: "",
  processedDeadlines: "",
  currentHeight: "",
  bestMiner: "",
  bestDeadline: "",
  lastOverallMiningFactor: "",
  lastWinnerAccountId: "",
  lastWinnerAccountName: "",
  lastWinnerDeadline: "",
  lastSignumBlockForged: "",
  forgedTokenCurrentBlock: "",
};

// For better readability we use name constants
export enum PickerContractDataIndex {
  bestDeadline = 22,
  bestMiner = 23,
  lastOverallMiningFactor = 25,
  processedDeadlines = 26,
  currentHeight = 27,
  lastWinnerAccountId = 28,
  lastWinnerDeadline = 29,
  lastSignumBlockForged = 32,
  forgedTokenCurrentBlock = 33,
}

export enum MinerContractDataIndex {
  intensity = 18,
}
