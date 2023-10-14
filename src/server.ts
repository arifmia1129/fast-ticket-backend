import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, infoLogger } from "./shared/logger";
import { Server } from "http";

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(config.db_url as string);
    infoLogger.info("Successfully connected to database");

    server = app.listen(config.port, () => {
      infoLogger.info(`Application is listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Failed to connect database", error);
  }
}

startServer();

process.on("uncaughtException", err => {
  if (server) {
    server.close(() => {
      errorLogger.error(err);
      process.exit(1);
    });
  } else {
    errorLogger.error(err);
    process.exit(1);
  }
});

process.on("unhandledRejection", err => {
  if (server) {
    server.close(() => {
      errorLogger.error(err);
      process.exit(1);
    });
  } else {
    errorLogger.error(err);
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  infoLogger.info("SIGTERM received");
  process.exit(0);
});
