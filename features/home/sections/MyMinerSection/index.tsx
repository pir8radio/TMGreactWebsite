import { useMemo } from "react";
import { Amount } from "@signumjs/util";
import { ContractDataView } from "@signumjs/contracts";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useLedger } from "@/app/hooks/useLedger";
import { useAccount } from "@/app/hooks/useAccount";
import { useAccountContracts } from "@/app/hooks/useAccountContracts";
import { useExtensionWallet } from "@/app/hooks/useExtensionWallet";
import { formatAmount } from "@/app/utils/formatAmount";
import { MinerContractDataIndex } from "@/app/types/contractData";
import { MinerActions } from "./components/MinerActions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import AlertTitle from "@mui/material/AlertTitle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

export const MyMinerSection = () => {
  const { publicKey } = useAccount();
  const { showError, showSuccess } = useSnackbar();
  const accountMinerContract = useAccountContracts();
  const ledger = useLedger();
  const wallet = useExtensionWallet();

  const deployMiner = async () => {
    if (!ledger || !publicKey) return null;

    const feePlanck = Amount.fromPlanck("10000000").getPlanck();
    const activationAmountPlanck = Amount.fromPlanck("50000000").getPlanck();

    const MinerContractArgs = {
      senderPublicKey: publicKey,
      feePlanck,
      activationAmountPlanck,
      description: "TMG miner contract for The Mining Game",
      name: "TMGminer",
      referencedTransactionHash:
        "f0c36f552dec58799a21eb30004c9bdd35512f04977cc1a74f06030992a1499f",
      data: [
        "0",
        "0",
        "0",
        "1",
        "100000000",
        "0",
        "18339269626061634110",
        "32000000",
        "8",
        "10",
        "15",
        "16",
        "32",
        "46",
        "48",
        "57",
        "255",
        "100000000",
        "0",
        "0",
        "0",
        "22",
      ],
    };

    try {
      const { unsignedTransactionBytes } =
        await ledger.contract.publishContractByReference(MinerContractArgs);

      window.dispatchEvent(new Event("wallet-sign-start"));
      await wallet.confirm(unsignedTransactionBytes);

      showSuccess(
        "Transaction broadcasted!. Your miner is being deployed, please wait 8 minutes! ☑️"
      );
    } catch (e: any) {
      showError(e.message);
    } finally {
      window.dispatchEvent(new Event("wallet-sign-end"));
    }
  };

  const accountMinerContractDataView = useMemo(() => {
    if (!accountMinerContract) return undefined;
    return new ContractDataView(accountMinerContract);
  }, [accountMinerContract]);

  let currentMinerBalance = 0;
  let currentMinerIntensity = 0;
  let currentMinerRemainingHours = 0;

  if (accountMinerContractDataView) {
    currentMinerBalance = Number(
      Amount.fromPlanck(accountMinerContract.balanceNQT).getSigna()
    );

    currentMinerIntensity = Number(
      Amount.fromPlanck(
        accountMinerContractDataView.getVariableAsDecimal(
          MinerContractDataIndex.intensity
        )
      ).getSigna()
    );

    currentMinerRemainingHours =
      currentMinerBalance / currentMinerIntensity || 0;
  }

  if (!accountMinerContractDataView) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        py={3}
        px={2}
      >
        <Typography variant="h5" fontWeight={500} gutterBottom>
          My Miner
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Info</AlertTitle>

          <Typography>
            This account does not have a miner deployed...
            <strong>You must deploy one!</strong>
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 1 }}
            startIcon={<AddCircleIcon />}
            onClick={deployMiner}
          >
            Deploy Now!
          </Button>
        </Alert>

        <Typography variant="body2" color="textSecondary">
          If you recently deployed a miner, please wait 8 minutes...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      py={3}
      px={2}
    >
      <Typography variant="h5" fontWeight={500} gutterBottom>
        My Miner
      </Typography>

      <Grid container rowSpacing={1}>
        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Smart Contract
            </Typography>

            <Typography fontWeight={700} color="primary">
              {accountMinerContract.atRS}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Available Balance
            </Typography>

            <Typography fontWeight={700} color="primary">
              {formatAmount(currentMinerBalance)} SIGNA
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Current mining intensity
            </Typography>

            <Typography fontWeight={700} color="primary">
              {formatAmount(currentMinerIntensity)} SIGNA
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={500} color="textSecondary">
              Good for:
            </Typography>

            <Typography
              fontWeight={700}
              color={
                currentMinerRemainingHours < 2 ? "error.main" : "info.main"
              }
            >
              {formatAmount(currentMinerRemainingHours.toFixed(2))} hours
            </Typography>

            {currentMinerRemainingHours > 24 && (
              <Typography
                fontWeight={700}
                variant="body2"
                color="textSecondary"
              >
                ({formatAmount((currentMinerRemainingHours / 24).toFixed(2))}{" "}
                days)
              </Typography>
            )}
          </Stack>
        </Grid>

        {currentMinerBalance > 0 && currentMinerBalance < 1 && (
          <Chip
            label="Once the miner runs out of funds, it will be stopped automatically"
            color="warning"
            sx={{ borderRadius: 1, mt: 2 }}
            icon={<PauseCircleFilledIcon />}
          />
        )}

        <MinerActions
          minerAt={accountMinerContract.at}
          minerRs={accountMinerContract.atRS}
        />
      </Grid>
    </Box>
  );
};
