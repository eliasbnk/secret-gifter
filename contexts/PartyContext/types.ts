import { type ReactNode } from "react";
import { type z } from "zod";

export interface PartyContextType {
  partyPIN: string;
  setPartyPIN: React.Dispatch<React.SetStateAction<string>>;
  PIN_LENGTH: number;
  setPIN_LENGTH: React.Dispatch<React.SetStateAction<number>>;
  partyPINSchema: z.ZodString;
  createPartyPIN: () => Promise<void>;
  isValidPartyPin: (pin: string) => boolean;
  doesPartyPinExist: (pin: string) => Promise<boolean>;
}

export interface PartyProviderProps {
  children: ReactNode;
}
