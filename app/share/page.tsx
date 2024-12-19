"use client";
import React, { useEffect } from "react";
import { SharePartyClient } from "./share-client";
import { useParty } from "@/hooks/useParty";
import { useRouter } from "next/navigation";

export default function SharePartyPage() {
  const router = useRouter();
  const { partyPIN } = useParty();

  useEffect(() => {
    if (!partyPIN) {
      router.push("/");
    }
  }, [partyPIN, router]);

  if (!partyPIN) {
    return null; // Consider showing a loading state here
  }

  return <SharePartyClient partyPIN={partyPIN} />;
}
