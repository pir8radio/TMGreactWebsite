import type { NextPage } from "next";
import { TitleSection } from "@/app/components/TitleSection";
import { MediaCard } from "./components/MediaCard";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const TmgEcosystem: NextPage = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12} mb={4}>
        <TitleSection title="TMG Ecosystem" />
      </Grid>

      <Grid item xs={12}>
        <Box maxWidth={1000} px={2} mx="auto">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <MediaCard
                title="TMG Liquidity Pool"
                description="Buy and sell TMG tokens."
                imgUrl="/assets/tmgGreyBanner.png"
                siteUrl="https://deleterium.info/tmg-pool/"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MediaCard
                title="Wheel of Signa"
                description="A smart contract lottery game which will randomly spin the wheel for wining Signa and burn overage TMG"
                imgUrl="/assets/WoSBanner.png"
                siteUrl="https://wos.notallmine.net/"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MediaCard
                title="TMG Cup 2022"
                description="Collect, trade, give away these commemorative token flags! Also win a prize if you hold the token of the soccer Cup champion 2022 in Qatar"
                imgUrl="/assets/tmgCupBanner.png"
                siteUrl="https://deleterium.info/tmg-cup/"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
