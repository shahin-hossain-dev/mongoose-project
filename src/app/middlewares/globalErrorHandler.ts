import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorStatusCode = 500;
  const message = error.message || 'Something Went Wrong';

  res.status(errorStatusCode).json({
    success: false,
    message,
    error,
  });
  next();
};

export default globalErrorHandler;
