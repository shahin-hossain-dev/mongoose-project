import { NextFunction, Request, RequestHandler, Response } from 'express';

//req, res, next ৩টা type এক সাথে define করার জন্য express এর built in RequestHandler type function আছে।
// তাহলে আলাদা আলাদা করে parameter type দিতে হবে না।

//catchAsync Higher Order function
// এ function use করা হবে try-catch block repeatation কমানের জন্য

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
