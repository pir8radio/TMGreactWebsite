import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Amount } from "@signumjs/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLedger } from "@/app/hooks/useLedger";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAccount } from "@/app/hooks/useAccount";
import { useExtensionWallet } from "@/app/hooks/useExtensionWallet";
import { addSignaToMinerSchema } from "../validation/schemas";
import { AddSignaToMiner } from "../validation/types";

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

export const AddMinerDialog = ({ minerAt, handleClose }: Props) => {
  const { publicKey } = useAccount();
  const { showError, showSuccess } = useSnackbar();
  const wallet = useExtensionWallet();
  const ledger = useLedger();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSignaToMiner>({
    mode: "onChange",
    resolver: yupResolver(addSignaToMinerSchema),
    defaultValues: { amount: "" },
  });

  const onSubmit: SubmitHandler<AddSignaToMiner> = async (data) => {
    if (!ledger) return null;

    const amountPlanck = Amount.fromSigna(data.amount).getPlanck();
    const feePlanck = Amount.fromSigna(0.02).getPlanck();

    try {
      const { unsignedTransactionBytes } =
        await ledger.transaction.sendAmountToSingleRecipient({
          amountPlanck,
          senderPublicKey: String(publicKey),
          recipientId: minerAt,
          feePlanck,
        });

      window.dispatchEvent(new Event("wallet-sign-start"));
      await wallet.confirm(unsignedTransactionBytes);

      handleClose();

      showSuccess(
        "Transaction broadcasted!. The Balance will be added in 8 minutes 😊"
      );
    } catch (e: any) {
      showError(e.message);
      handleClose();
    } finally {
      window.dispatchEvent(new Event("wallet-sign-end"));
    }
  };

  let amountFieldError = errors.amount?.message;

  return (
    <Dialog open onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Signa to Miner</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter how much Signa you want to send to your TMG miner
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
                helperText={amountFieldError}
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

          <Button
            type="submit"
            variant="contained"
            disabled={!!amountFieldError}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
