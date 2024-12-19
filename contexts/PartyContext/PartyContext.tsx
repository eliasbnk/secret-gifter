"use client";
import React, { createContext, useCallback, useRef, useState } from "react";
import { type PartyProviderProps, type PartyContextType } from "./types";
import { z } from "zod";
import { customAlphabet } from "nanoid";
import { addPartyPin, getPartyPins, isValidPin } from "@/lib/redis/party-pins";

export const PartyContext = createContext<PartyContextType>({
  partyPIN: "",
  setPartyPIN: () => {},
  PIN_LENGTH: 8,
  setPIN_LENGTH: () => {},
  partyPINSchema: z
    .string()
    .regex(/^\d{8}$/, "Party PIN must be exactly 8 numbers"),
  createPartyPIN: async () => {},
  isValidPartyPin: () => false,
  doesPartyPinExist: async () => false,
});

export const PartyProvider: React.FC<PartyProviderProps> = ({ children }) => {
  const [partyPIN, setPartyPIN] = useState<string>("");
  const [PIN_LENGTH, setPIN_LENGTH] = useState<number>(8);
  const isCreatingRef = useRef(false);

  const partyPINSchema = z
    .string()
    .regex(
      new RegExp(`^\\d{${PIN_LENGTH}}$`),
      `Party PIN must be exactly ${PIN_LENGTH} numbers`,
    );

  const nanoid = customAlphabet("1234567890", PIN_LENGTH);

  const createPartyPIN = useCallback(async () => {
    // Use ref instead of state to prevent race conditions
    if (isCreatingRef.current || partyPIN) return;

    isCreatingRef.current = true;

    try {
      let newPin: string;
      let isUnique = false;
      const partyPins = await getPartyPins();
      do {
        newPin = nanoid();
        isUnique = !partyPins.includes(newPin);
      } while (!isUnique);

      if (!partyPIN) {
        await addPartyPin(newPin);
        setPartyPIN(newPin);
      }
    } finally {
      isCreatingRef.current = false;
    }
  }, [nanoid, partyPIN]);

  const isValidPartyPin = (inputPIN: string) => {
    try {
      partyPINSchema.parse(inputPIN);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return false;
      }
      return false;
    }
  };

  const doesPartyPinExist = async (inputPIN: string) => {
    try {
      if (!isValidPartyPin(inputPIN)) return false;
      return await isValidPin(inputPIN);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return false;
      }
      throw err;
    }
  };

  return (
    <PartyContext.Provider
      value={{
        partyPIN,
        setPartyPIN,
        PIN_LENGTH,
        setPIN_LENGTH,
        partyPINSchema,
        createPartyPIN,
        isValidPartyPin,
        doesPartyPinExist,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};
