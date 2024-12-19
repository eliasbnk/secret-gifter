"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, PartyPopper, FileX, Globe, Trash2, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParty } from "@/hooks/useParty";

export default function Home() {
  const router = useRouter();
  const { setPIN_LENGTH } = useParty();

  useEffect(() => {
    setPIN_LENGTH(8);
  }, [setPIN_LENGTH]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#0F1015] text-white overflow-x-hidden flex justify-center items-center">
      <div className="container mx-auto h-full flex flex-col justify-center px-4 py-8 md:py-12">
        {/* Main Content Container */}
        <div className="flex flex-col gap-6 md:gap-8 items-center">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-7xl font-bold leading-tight">Secret Gifter</h1>
            <div className="flex flex-wrap justify-center gap-2 text-lg xs:text-xl sm:text-2xl lg:text-3xl text-gray-400 font-medium">
              <span>Unlimited.</span>
              <span className="text-[#22C55E]">Christmas.</span>
              <span className="text-[#E75A55]">Joy.</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row justify-center gap-4 w-full max-w-md">
            <Button
              onClick={() => router.push("/create")}
              className="h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg bg-[#E75A55] hover:bg-[#d54f4a] text-white rounded-full flex-1"
            >
              <Gift className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Create Party
            </Button>

            <Button
              onClick={() => router.push("/join")}
              className="h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg bg-[#1A1A1D] text-[#22C55E] rounded-full border-2 border-[#22C55E] hover:bg-[#22C55E]/10 flex-1"
            >
              <PartyPopper className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Join Party
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            {[
              {
                icon: <FileX className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />,
                text: "Paper Not Required",
              },
              {
                icon: (
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-[#22C55E]" />
                ),
                text: "Join From Anywhere",
              },
              {
                icon: (
                  <Shuffle className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF9800]" />
                ),
                text: "Fair Assignments",
              },
              {
                icon: (
                  <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#E75A55]" />
                ),
                text: "Data Wiped Instantly",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1A1A1D] rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[120px]"
              >
                {feature.icon}
                <h2 className="font-semibold text-base sm:text-lg">
                  {feature.text}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
