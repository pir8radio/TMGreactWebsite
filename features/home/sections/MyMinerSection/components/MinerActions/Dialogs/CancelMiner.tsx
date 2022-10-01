import { AttachmentMessage } from "@signumjs/core";
import { Amount } from "@signumjs/util";
import { useLedger } from "@/app/hooks/useLedger";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAccount } from "@/app/hooks/useAccount";
import { useExtensionWallet } from "@/app/hooks/useExtensionWallet";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  minerAt: string;
  minerRs: string;
  handleClose: () => void;
}

export const CancelMinerDialog = ({ minerAt, minerRs, handleClose }: Props) => {
  const { publicKey } = useAccount();
  const { showError, showSuccess } = useSnackbar();
  const wallet = useExtensionWallet();
  const ledger = useLedger();

  const stopMiner = async () => {
    if (!ledger) return null;

    const amountPlanck = Amount.fromSigna(0.5).getPlanck();
    const feePlanck = Amount.fromSigna(0.02).getPlanck();

    const attachment = new AttachmentMessage({
      message: "stop",
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
        "Transaction broadcasted!. Refund can take up to one hour. 👍"
      );
    } catch (e: any) {
      showError(e.message);
      handleClose();
    } finally {
      window.dispatchEvent(new Event("wallet-sign-end"));
    }
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Stop/cancel miner</DialogTitle>

      <DialogContent>
        <DialogContentText fontWeight={500}>
          You will order the miner contract {minerRs} to stop mining and send
          all balance back to you. This transaction costs 0.5 Signa + Network
          Fees.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="contained" color="error" onClick={stopMiner}>
          Yes, stop the miner
        </Button>
      </DialogActions>
    </Dialog>
  );
};
