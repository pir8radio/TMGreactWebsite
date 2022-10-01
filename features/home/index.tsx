import type { NextPage } from "next";
import { useAppSelector } from "@/states/hooks";
import { selectIsWalletConnected } from "@/app/states/appState";
import { WelcomeSection } from "./sections/WelcomeSection";
import { HeightInfoSection } from "./sections/HeightInfoSection";
import { PickerStatsSection } from "./sections/PickerStatsSection";
import { MyAccountSection } from "./sections/MyAccountSection";
import { MyMinerSection } from "./sections/MyMinerSection";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";

export const Home: NextPage = () => {
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <WelcomeSection />
      </Grid>

      <Grid container direction="row" mx="auto" maxWidth={1600}>
        <Grid item xs={12} md={6}>
          <PickerStatsSection />

          {isWalletConnected && <MyAccountSection />}

          {isWalletConnected && <MyMinerSection />}

          {!isWalletConnected && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Info</AlertTitle>
              In order to manage your TMG Miner{" "}
              <strong> You need to connect your Signum account.</strong>
            </Alert>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <HeightInfoSection />
        </Grid>
      </Grid>
    </Grid>
  );
};
