"use server";

import { redisClient } from "./redis-client";

export async function isValidPin(pin: string): Promise<boolean> {
  try {
    const result = await redisClient.sismember("party:pin", pin);
    return result === 1;
  } catch (error) {
    console.error("Error checking pin validity:", error);
    throw error;
  }
}

export async function isUniquePin(pin: string): Promise<boolean> {
  try {
    const result = await redisClient.sismember("party:pin", pin);
    return result === 0;
  } catch (error) {
    console.error("Error checking pin uniqueness:", error);
    throw error;
  }
}

export async function getPartyPins(): Promise<string[]> {
  try {
    const result = await redisClient.smembers("party:pin");
    return result;
  } catch (error) {
    console.error("Error checking pin uniqueness:", error);
    throw error;
  }
}

export async function addPartyPin(pin: string): Promise<boolean> {
  try {
    const result = await redisClient.sadd("party:pin", pin);
    return result === 1;
  } catch (error) {
    console.error("Error creating party pin:", error);
    throw error;
  }
}
