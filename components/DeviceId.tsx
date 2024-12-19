"use client";
import { useEffect, useCallback } from "react";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";

export default function DeviceId() {
  const generateAndSetDeviceId = useCallback(() => {
    const newDeviceId = nanoid(64);

    Cookies.set("deviceId", newDeviceId, {
      expires: 1,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return newDeviceId;
  }, []);

  useEffect(() => {
    const existingDeviceId = Cookies.get("deviceId");
    if (!existingDeviceId) {
      generateAndSetDeviceId();
    }
  }, [generateAndSetDeviceId]);

  return null;
}
