"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParty } from "@/hooks/useParty";

export function SharePartyClient({ partyPIN }: { partyPIN: string }) {
  const router = useRouter();
  const { PIN_LENGTH } = useParty();

  const [copied, setCopied] = useState(false);

  const copyPartyPIN = async () => {
    try {
      // Try the modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(partyPIN);
      } else {
        // Fallback for iOS devices
        const textArea = document.createElement("textarea");
        textArea.value = partyPIN;
        textArea.style.position = "fixed"; // Avoid scrolling
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          document.body.removeChild(textArea);
        } catch (err) {
          console.error("Fallback copy failed:", err);
          document.body.removeChild(textArea);
          throw err;
        }
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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

        <Card className="bg-[#1A1A1D] border-0 p-6 rounded-xl text-center">
          <div className="flex flex-col items-center gap-6">
            <PartyPopper className="w-16 h-16 text-[#22C55E]" />

            <h1 className="text-6xl font-semibold text-white">
              Party Created!
            </h1>

            <p className="text-gray-300 text-lg">
              Join the party using this PIN
            </p>

            <div
              className="bg-[#0F1015] p-5 rounded-lg flex items-center justify-center w-full max-w-md relative cursor-pointer hover:bg-[#1A1A1D] transition-all"
              onClick={copyPartyPIN}
            >
              <input
                type="text"
                value={partyPIN}
                readOnly
                className="opacity-0 absolute inset-0 w-full cursor-pointer"
              />
              <div className="flex text-[#22C55E] font-mono text-5xl tracking-widest pointer-events-none">
                {partyPIN.slice(0, Math.floor(PIN_LENGTH / 2))}
                <div className="w-8" />
                {partyPIN.slice(Math.floor(PIN_LENGTH / 2), PIN_LENGTH)}
              </div>
              {copied && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
                  Copied!
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
