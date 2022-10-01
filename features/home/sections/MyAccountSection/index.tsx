import { useAccountBalance } from "@/app/hooks/useAccountBalance";
import { formatAmount } from "@/app/utils/formatAmount";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const MyAccountSection = () => {
  const { availableBalance, tmgAvailableBalance } = useAccountBalance();

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
        My Account
      </Typography>

      <Grid container>
        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Available Balance
            </Typography>

            <Typography fontWeight={700} color="primary">
              {formatAmount(availableBalance.getSigna() || 0)} SIGNA
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={500} color="textSecondary">
              Available TMG
            </Typography>

            <Typography fontWeight={700} color="primary">
              {formatAmount(tmgAvailableBalance || 0)} TMG
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
