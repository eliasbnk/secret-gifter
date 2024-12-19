import { PartyProvider } from "@/contexts/PartyContext";
import { type ContextProvidersProps } from "@/contexts/types";
import React from "react";

export const ContextProviders: React.FC<ContextProvidersProps> = ({
  children,
}) => {
  return <PartyProvider>{children}</PartyProvider>;
};
