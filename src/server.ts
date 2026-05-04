import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";
import app from "./app";
import { seedAdmin } from "./seed";

let server: Server | null = null;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🛢 Database connected successfully');

    // Seed Initial Admin
    await seedAdmin();

    server = app.listen(config.port, () => {
      console.log(`Hisab Nikash Pro app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection is detected, shutting down server...`, error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`uncaughtException is detected, shutting down server...`);
  process.exit(1);
});
