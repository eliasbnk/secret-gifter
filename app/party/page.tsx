"use client";
import React, { useEffect } from "react";
import { useParty } from "@/hooks/useParty";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PartyPage() {
  const router = useRouter();
  const { partyPIN } = useParty();

  useEffect(() => {
    if (!partyPIN) {
      router.push("/");
    }
  }, [partyPIN, router]);

  if (!partyPIN) {
    return null;
  }

  return (
    <div className="min-h-screen w-screen bg-[#0F1015] text-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-white w-12 h-12" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
