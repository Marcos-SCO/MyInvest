import { Redis } from "ioredis";

import config from "@/config";

const { redisCredentials } = config;

// const redis = new Redis(redisCredentials.REDIS_URL as string);
const redis = new Redis({
  port: Number(redisCredentials.REDIS_PORT),
  host: redisCredentials.REDIS_HOSTNAME,
  password: redisCredentials.REDIS_PASSWORD
});

export async function getValue(key: string): Promise<object | undefined> {
  const value = await redis.get(key);
  if (!value) return;

  return JSON.stringify(value) as unknown as object;
}

export async function setValue(key: string, value: string | number | boolean | object): Promise<void> {

  await redis.set(key, JSON.stringify(value));
}