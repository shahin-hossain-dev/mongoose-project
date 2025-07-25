import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
const requestValidator = (validationSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //zod schema validation
      // এখানে  controller এ req যাওয়ার আগে validate করা হয়েছে। যদি error হয় তাহলে global errorHandler কাছে পাঠানো হবে।
      await validationSchema.parseAsync({
        body: req.body,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default requestValidator;
