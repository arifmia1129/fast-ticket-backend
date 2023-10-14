import mongoose from "mongoose";
import { ErrorMessage } from "../interfaces/error.interface";

const handleCastError = (err: mongoose.Error.CastError): ErrorMessage[] => {
  return [
    {
      path: err.path,
      message: "Provided an invalid id",
    },
  ];
};

export default handleCastError;
