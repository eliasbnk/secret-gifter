import { useContext } from "react";
import { PartyContext, type PartyContextType } from "@/contexts";

export const useParty = (): PartyContextType => {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error("useParty must be used within a PartyProvider");
  }
  return context;
};
