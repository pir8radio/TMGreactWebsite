import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appSlice } from "@/app/states/appState";

export const store = configureStore({
  reducer: {
    appState: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
