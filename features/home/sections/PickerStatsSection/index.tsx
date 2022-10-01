import { Amount } from "@signumjs/util";
import { useContractData } from "@/app/hooks/useContractData";
import { formatAmount } from "@/app/utils/formatAmount";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const PickerStatsSection = () => {
  const { balanceNQT, processedDeadlines } = useContractData();

  const pickerAvailableBalance = Number(
    balanceNQT ? Amount.fromPlanck(balanceNQT).getSigna() : 0
  );

  const pickerProcessedDeadlines = Number(processedDeadlines || 0);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      py={3}
      px={2}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Typography variant="h5" fontWeight={500} gutterBottom>
        Picker Stats
      </Typography>

      <Grid container>
        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Current Balance
            </Typography>
            <Typography fontWeight={700}>
              {formatAmount(pickerAvailableBalance)} SIGNA
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Processed deadlines since genesis
            </Typography>

            <Typography fontWeight={700}>
              {formatAmount(pickerProcessedDeadlines)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
