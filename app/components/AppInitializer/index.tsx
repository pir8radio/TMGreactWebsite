import { useAppContext } from "@/app/hooks/useAppContext";
import { WalletInitializer } from "./WalletInitializer";

export const AppInitializer = () => {
  const { IsClientSide } = useAppContext();

  if (!IsClientSide) return null;

  return (
    <>
      <WalletInitializer />
    </>
  );
};
