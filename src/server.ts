import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";
import app from "./app";
import { seedAdmin } from "./seed";

let server: Server;

async function main() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(config.database_url as string);
      console.log('🛢 Database connected successfully');

      // Seed Initial Admin
      seedAdmin().catch(err => console.log('Seeding error:', err));
    }

    // Only listen if not in production (Vercel handles production listening)
    if (process.env.NODE_ENV !== 'production') {
      server = app.listen(config.port, () => {
        console.log(`Hisab Nikash Pro app is listening on port ${config.port}`);
      });
    }
  } catch (err) {
    console.log('❌ Database connection error:', err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});

export default app;
