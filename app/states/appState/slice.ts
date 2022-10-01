import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExtensionWalletError } from "@signumjs/wallets";

export type SnackBarState = {
  show?: boolean;
  label: string;
  severity: "" | "error" | "warning" | "info" | "success";
};

export interface AppState {
  isOpenShareModal: boolean;
  snackBar: SnackBarState;
  isWalletConnected: boolean;
  isOpenSidebar: boolean;
  isOpenWalletSetupModal: boolean;
  isOpenWalletWrongNetworkModal: boolean;
  isOpenSignTransactionModal: boolean;
  walletNodeHost: string;
  walletPublicKey: string;
  walletError?: ExtensionWalletError;
}

const initialState: AppState = {
  isOpenShareModal: false,
  snackBar: { show: false, label: "", severity: "" },
  isWalletConnected: false,
  isOpenSidebar: false,
  isOpenWalletSetupModal: false,
  isOpenWalletWrongNetworkModal: false,
  isOpenSignTransactionModal: false,
  walletNodeHost: "",
  walletPublicKey: "",
  walletError: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsOpenShareModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenShareModal = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackBarState>) => {
      state.snackBar = action.payload;
    },
    setIsWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
    setIsOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
    setWalletSetupModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWalletSetupModal = action.payload;
    },
    setWalletWrongNetworkModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWalletWrongNetworkModal = action.payload;
    },
    setSignTransactionModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenSignTransactionModal = action.payload;
    },
    setWalletNodeHost: (state, action: PayloadAction<string>) => {
      state.walletNodeHost = action.payload;
    },
    setWalletPublicKey: (state, action: PayloadAction<string>) => {
      state.walletPublicKey = action.payload;
    },
    setWalletError: (state, action: PayloadAction<ExtensionWalletError>) => {
      state.walletError = action.payload;
    },
  },
});

export const { actions } = appSlice;
