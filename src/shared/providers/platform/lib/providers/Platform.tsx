import { createContext, ReactNode, useContext } from "react";

type TPlatform = "anty" | "server";

const PlatformContext = createContext<TPlatform>("server");

const PlatformProvider = ({
  platform,
  children,
}: {
  platform: TPlatform;
  children: ReactNode;
}) => {
  return (
    <PlatformContext.Provider value={platform}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatformContext = () => useContext(PlatformContext);

export default PlatformProvider;
