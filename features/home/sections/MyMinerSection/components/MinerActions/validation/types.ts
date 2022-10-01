// Every type consists of possible parameters needed for executing basic miner operations

export type AddSignaToMiner = {
  amount: string;
};

export type ChangeMinerIntensity = {
  intensity: string;
  amount: string;
};
