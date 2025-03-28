import mongoose from "mongoose";
import { createClient } from "redis";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI ?? "");
};

export const client = createClient({
  username: "default",
  password: '2fvx4cjEmt1mrRq47lhGcYKh7PLHR0BM',
  socket: {
    host: 'redis-15219.c84.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 15219,
  },
});

export const redisClientConnect = async () => {
  await client.connect().catch((error) => {
    throw new Error(error);
  });
};
