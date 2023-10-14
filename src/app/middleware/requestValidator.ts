import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const requestValidator = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default requestValidator;
