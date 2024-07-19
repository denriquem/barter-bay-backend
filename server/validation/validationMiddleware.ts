import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import * as yup from "yup";

export const validateSchema =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                return res.status(400).json({ errors: err.errors });
            }
            next(err);
        }
    };
