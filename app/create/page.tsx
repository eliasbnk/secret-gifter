"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useParty } from "@/hooks/useParty";

const switchStyles = `
  .switch-custom[data-state="checked"] {
    background-color: #22C55E !important;
  }
  .switch-custom[data-state="unchecked"] {
    background-color: #6b7280 !important;
  }
`;

export default function CreateParty() {
  const router = useRouter();
  const { partyPIN, createPartyPIN } = useParty();
  const [maxParticipants, setMaxParticipants] = useState("10");
  const [enableExclusions, setEnableExclusions] = useState(false);
  const [enableWishlists, setEnableWishlists] = useState(false);
  const [enableTrades, setEnableTrades] = useState(false);
  const [isCreating, setCreating] = useState(false);

  const handleCreate = () => {
    if (!partyPIN) {
      createPartyPIN();
    }
    setCreating(true);
    // const partyConfig = {
    //   partyPIN,
    //   maxParticipants: parseInt(maxParticipants),
    //   enableExclusions,
    //   enableWishlists,
    //   enableTrades,
    // };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    router.push(`/share`);
  };

  return (
    <>
      <style>{switchStyles}</style>
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
              <h1 className="text-4xl font-semibold text-white">
                Party Settings
              </h1>

              {/* Participant Limit */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-xl">Max Participants:</label>
                <Select
                  value={maxParticipants}
                  onValueChange={setMaxParticipants}
                >
                  <SelectTrigger className="bg-[#0F1015] border-0 text-white font-bold text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-white  bg-[#6b7280] border-0">
                    {[5, 10, 15, 25, 50, 75, 100].map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className=" text-lg font-bold hover:text-black"
                      >
                        {num} people
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-white text-xl">
                    Enable Exclusions:
                  </label>
                  <Switch
                    className="switch-custom text-xl"
                    checked={enableExclusions}
                    onCheckedChange={setEnableExclusions}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-white text-xl">
                    Enable Wishlists:
                  </label>
                  <Switch
                    className="switch-custom text-xl"
                    checked={enableWishlists}
                    onCheckedChange={setEnableWishlists}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-white text-xl">Enable Trades:</label>
                  <Switch
                    className="switch-custom text-xl"
                    checked={enableTrades}
                    onCheckedChange={setEnableTrades}
                  />
                </div>
              </div>

              <Button
                disabled={isCreating}
                onClick={handleCreate}
                className="h-14 px-8 text-lg bg-[#22C55E] hover:bg-[#1ea34d] text-white rounded-full w-full text-2xl"
              >
                <Gift className="mr-2 h-5 w-5" />
                Start Party
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
