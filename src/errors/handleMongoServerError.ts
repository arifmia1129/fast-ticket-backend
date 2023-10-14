import mongoose from "mongoose";
import { ErrorMessage } from "../interfaces/error.interface";

const handleMongoServerError = (err: mongoose.Error): ErrorMessage[] => {
  const errors: ErrorMessage[] = [];

  if (err instanceof mongoose.mongo.MongoServerError) {
    const fieldValues = Object.entries(err.keyValue);

    fieldValues.forEach(([field, value]) => {
      errors.push({
        path: field,
        message: `${value} is already taken as ${field} value`,
      });
    });
  }

  return errors;
};

export default handleMongoServerError;
