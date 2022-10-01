import { useState } from "react";
import { AddMinerDialog } from "./Dialogs/AddMiner";
import { CancelMinerDialog } from "./Dialogs/CancelMiner";
import { ChangeIntensityDialog } from "./Dialogs/ChangeIntensity";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  minerAt: string;
  minerRs: string;
}

export const MinerActions = ({ minerAt, minerRs }: Props) => {
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const openAddDialog = () => setIsOpenAddDialog(true);
  const closeAddDialog = () => setIsOpenAddDialog(false);

  const [isOpenIntensityDialog, setIsOpenIntensityDialog] = useState(false);
  const openIntensityDialog = () => setIsOpenIntensityDialog(true);
  const closeIntensityDialog = () => setIsOpenIntensityDialog(false);

  const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);
  const openCancelDialog = () => setIsOpenCancelDialog(true);
  const closeCancelDialog = () => setIsOpenCancelDialog(false);

  return (
    <Grid item container justifyContent="flex-start" spacing={2} mt={1}>
      {isOpenAddDialog && (
        <AddMinerDialog minerAt={minerAt} handleClose={closeAddDialog} />
      )}

      {isOpenIntensityDialog && (
        <ChangeIntensityDialog
          minerAt={minerAt}
          handleClose={closeIntensityDialog}
        />
      )}

      {isOpenCancelDialog && (
        <CancelMinerDialog
          minerAt={minerAt}
          minerRs={minerRs}
          handleClose={closeCancelDialog}
        />
      )}

      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={openAddDialog}
        >
          Add Funds
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<ChangeCircleIcon />}
          onClick={openIntensityDialog}
        >
          Change Intensity
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<CancelIcon />}
          onClick={openCancelDialog}
        >
          Stop Miner
        </Button>
      </Grid>
    </Grid>
  );
};
