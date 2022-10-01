import { useContractData } from "@/app/hooks/useContractData";
import { formatAmount } from "@/app/utils/formatAmount";
import { asRSAddress } from "@/app/utils/asRSAddress";
import { KpiCard } from "./components/KpiCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const HeightInfoSection = () => {
  const {
    currentHeight,
    bestDeadline,
    signumBlockHeight,
    bestMiner,
    lastOverallMiningFactor,
    lastWinnerAccountId,
    lastWinnerAccountName,
    lastWinnerDeadline,
    lastSignumBlockForged,
  } = useContractData();

  const isLoadingData = !currentHeight;

  let bestMinerLabel = "None submitted";
  if (bestMiner !== "0") {
    bestMinerLabel = asRSAddress(bestMiner) || "";
  }

  return (
    <Box display="flex" flexDirection="column" color="white">
      <Box p={2} sx={{ bgcolor: "primary.main" }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Current Height Info
        </Typography>

        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item xs={6}>
            <KpiCard
              title="TMG Height"
              value={"#" + formatAmount(currentHeight)}
              isLoading={isLoadingData}
            />
          </Grid>

          <Grid item xs={6}>
            <KpiCard
              title="Best deadline"
              value={formatAmount(bestDeadline) + " bits"}
              isLoading={isLoadingData}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <KpiCard
              title="Best miner"
              value={bestMinerLabel}
              isLoading={isLoadingData}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <KpiCard
              title="Signum Block Height"
              value={"#" + formatAmount(signumBlockHeight)}
              isLoading={isLoadingData}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        p={2}
        sx={{
          bgcolor: "#262932",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Last Height Info
        </Typography>

        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item xs={12} md={6}>
            <KpiCard
              title="Overall mining intensity (Difficulty)"
              value={formatAmount(lastOverallMiningFactor) + " Signa"}
              isLoading={isLoadingData}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <KpiCard
              title="Signum Block Height"
              value={"#" + formatAmount(lastSignumBlockForged)}
              isLoading={isLoadingData}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <KpiCard
              title="Winner deadline"
              secondaryValue="Winner on previous round"
              value={formatAmount(lastWinnerDeadline) + " bits"}
              isLoading={isLoadingData}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <KpiCard
              title="Winner account"
              value={asRSAddress(lastWinnerAccountId) || ""}
              secondaryValue={lastWinnerAccountName}
              isLoading={isLoadingData}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
