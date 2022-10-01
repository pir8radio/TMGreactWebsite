import type { NextPage } from "next";
import { TitleSection } from "@/app/components/TitleSection";
import { QuestionsSection } from "./sections/QuestionsSection";

import Grid from "@mui/material/Grid";

export const Faq: NextPage = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <TitleSection title="Frequently Asked Questions" />
      </Grid>

      <Grid
        item
        xs={12}
        p={2}
        minHeight="80vh"
        sx={{
          bgcolor: "#262932",
        }}
      >
        <QuestionsSection />
      </Grid>
    </Grid>
  );
};
