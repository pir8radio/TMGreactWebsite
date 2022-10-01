import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AttachmentMessage } from "@signumjs/core";
import { Amount } from "@signumjs/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLedger } from "@/app/hooks/useLedger";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAccount } from "@/app/hooks/useAccount";
import { useExtensionWallet } from "@/app/hooks/useExtensionWallet";
import { changeMinerIntensitySchema } from "../validation/schemas";
import { ChangeMinerIntensity } from "../validation/types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputAdornment from "@mui/material/InputAdornment";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  minerAt: string;
  handleClose: () => void;
}

export const ChangeIntensityDialog = ({ minerAt, handleClose }: Props) => {
  const { publicKey } = useAccount();
  const { showError, showSuccess } = useSnackbar();
  const wallet = useExtensionWallet();
  const ledger = useLedger();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeMinerIntensity>({
    mode: "onChange",
    resolver: yupResolver(changeMinerIntensitySchema),
    defaultValues: { intensity: "0.32", amount: "0.5" },
  });

  const onSubmit: SubmitHandler<ChangeMinerIntensity> = async (data) => {
    if (!ledger) return null;

    const amountPlanck = Amount.fromSigna(data.amount).getPlanck();
    const feePlanck = Amount.fromSigna(0.02).getPlanck();

    const attachment = new AttachmentMessage({
      message: data.intensity,
      messageIsText: true,
    });

    try {
      const { unsignedTransactionBytes } =
        await ledger.transaction.sendAmountToSingleRecipient({
          amountPlanck,
          attachment,
          senderPublicKey: String(publicKey),
          recipientId: minerAt,
          feePlanck,
        });

      window.dispatchEvent(new Event("wallet-sign-start"));
      await wallet.confirm(unsignedTransactionBytes);

      handleClose();

      showSuccess(
        "Transaction broadcasted!. The Intensity will be updated between 8 minutes and 1 hour 😊"
      );
    } catch (e: any) {
      showError(e.message);
      handleClose();
    } finally {
      window.dispatchEvent(new Event("wallet-sign-end"));
    }
  };

  let intensityFieldError = errors.intensity?.message;
  let amountFieldError = errors.amount?.message;

  const lockSubmit = intensityFieldError || amountFieldError;

  return (
    <Dialog open onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Enter the new intensity</DialogTitle>

        <DialogContent>
          <DialogContentText fontWeight={700}>
            The new intensity must be greater or equal to 0.32
          </DialogContentText>

          <Controller
            name="intensity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                autoComplete="off"
                label="Enter the intensity"
                variant="outlined"
                color="secondary"
                sx={{ my: 2 }}
                helperText={intensityFieldError}
                error={!!intensityFieldError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">SIGNA</InputAdornment>
                  ),
                }}
                inputProps={{ inputMode: "numeric" }}
              />
            )}
          />

          <DialogContentText fontWeight={700}>
            Enter the additional amount to add.
          </DialogContentText>

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                autoComplete="off"
                label="Enter the amount"
                variant="outlined"
                color="secondary"
                sx={{ my: 2 }}
                helperText={amountFieldError || "Minimum value is 0.5 Signa"}
                error={!!amountFieldError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">SIGNA</InputAdornment>
                  ),
                }}
                inputProps={{ inputMode: "numeric" }}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={!!lockSubmit}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
