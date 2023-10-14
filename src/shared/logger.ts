import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import config from "../config";

const { combine } = format;

// Custom timestamp format function
const customTimestamp = format(info => {
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  info.timestamp = timestamp;
  return info;
});

export const infoLogger = createLogger({
  level: "info",
  format: combine(customTimestamp(), format.json()),
  transports: [
    config.env === "production"
      ? new DailyRotateFile({
          filename: path.join(
            process.cwd(),
            "logs",
            "winston",
            "success",
            "%DATE%.log",
          ),
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        })
      : new transports.Console(),
  ],
});

export const errorLogger = createLogger({
  level: "error",
  format: combine(customTimestamp(), format.json()),
  transports: [
    config.env === "production"
      ? new DailyRotateFile({
          filename: path.join(
            process.cwd(),
            "logs",
            "winston",
            "error",
            "%DATE%.log",
          ),
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        })
      : new transports.Console(),
  ],
});
