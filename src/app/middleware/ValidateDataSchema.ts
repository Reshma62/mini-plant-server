import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const ValidateDataSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await schema.parseAsync({ body, cookies: req.cookies });
      next();
    } catch (err) {
      next(err);
    }
  };
};
