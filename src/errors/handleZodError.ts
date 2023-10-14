import { ErrorMessage } from "../interfaces/error.interface";
import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  const errors: ErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return errors;
};

export default handleZodError;
