"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParty } from "@/hooks/useParty";

import { Input } from "@/components/ui/input";

export default function JoinParty() {
  const router = useRouter();
  const { setPartyPIN, PIN_LENGTH, isValidPartyPin, doesPartyPinExist } =
    useParty();
  const [inputPIN, setInputPIN] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePaste = (text: string) => {
    const numbers = text.replace(/\D/g, "").slice(0, PIN_LENGTH);
    setInputPIN(numbers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, PIN_LENGTH);
    setInputPIN(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isJoining && isValidPartyPin(inputPIN)) {
      validateAndJoin();
    }
  };

  const validateAndJoin = async () => {
    try {
      setIsJoining(true);
      setError(null);

      const isValid = await doesPartyPinExist(inputPIN);
      if (!isValid) {
        setError("Invalid PIN");
        return;
      }

      setPartyPIN(inputPIN);
      router.push(`/party`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#0F1015] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-screen-sm mx-auto flex flex-col gap-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-[#22C55E] hover:bg-[#1A1A1D] transition-colors w-fit border-0 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card className="bg-[#1A1A1D] border-0 p-6 rounded-xl">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold text-white">Join Party</h1>

            <div className="flex flex-col gap-2">
              <label className="text-white text-xl">Enter Party PIN:</label>

              <Input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputPIN}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData.getData("text");
                  handlePaste(text);
                }}
                placeholder="00000000"
                disabled={isJoining}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                aria-label="Party PIN input"
                maxLength={PIN_LENGTH}
                className="w-full h-full bg-[#0F1015] text-[#22C55E] placeholder:text-gray-600 caret-[#22C55E] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  fontSize: "2.5rem",
                  textAlign: "center",
                  letterSpacing: "0.75rem",
                }}
              />

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <Button
              disabled={isJoining || !isValidPartyPin(inputPIN)}
              onClick={validateAndJoin}
              className="h-14 px-8 text-lg bg-[#22C55E] hover:bg-[#1ea34d] text-white rounded-full w-full text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PartyPopper className="mr-2 h-5 w-5" />
              {isJoining ? "Joining..." : "Join Party"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
