import mongoose from "mongoose";
import { createClient } from "redis";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI ?? "");
};

export const client = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 15219,
  },
});

export const redisClientConnect = async () => {
  await client.connect().catch((error) => {
    throw new Error(error);
  });
};
