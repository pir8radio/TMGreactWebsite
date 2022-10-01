import type { NextPage } from "next";
import { TitleSection } from "@/app/components/TitleSection";
import { DeadlinesSection } from "./sections/DeadlinesSection";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";

export const RecentDeadlines: NextPage = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <TitleSection title="Recent deadlines" />
      </Grid>

      <Grid item xs={12}>
        <Box maxWidth={1000} px={2} mx="auto">
          <DeadlinesSection />
        </Box>
      </Grid>
    </Grid>
  );
};
