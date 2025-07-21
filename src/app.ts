/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// use all application routes here
app.use('/api/v1', router);

//test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//globalErrorHandler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
