import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";
import app from "./app";
import { seedAdmin } from "./seed";
let server: Server | null = null;

async function main() {
  try {
    await mongoose.connect(config.database_url as string, { timeoutMS: 5000 });
    console.log("✅ DB connected");

    await seedAdmin();

    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

  } catch (err) {
    console.log("❌ DB connection error:", err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`unhandledRejection on is detected, shutting down server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`uncaughtException on is detected, shutting down server`);
  process.exit(1);
});