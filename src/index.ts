import { config } from "dotenv";
import app from "./app";
import { connectDB, redisClientConnect } from "./db/db";

config({ path: "./.env" });

connectDB()
  .then(async () => {
    await redisClientConnect().then(() => {
      app.listen(8080, () => console.log("Server listening on port 8080"));
    });
  })
  .catch((error) => console.log(error.message));
