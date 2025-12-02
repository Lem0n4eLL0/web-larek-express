import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { CelebrateError } from 'celebrate';
import routes from './routes';
import { AppError, ErrorResponse } from './utils/errors';
import { errorLogger, requestLogger } from './middlewares/logger';

dotenv.config();

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/', routes);

// Exeption handler
app.use(errorLogger);
app.use((err: any, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
  const respErr: ErrorResponse = {
    message: 'Unexpected server error',
  };
  if (err instanceof AppError) {
    respErr.message = err.message;
    return res.status(err.statusCode).send(respErr);
  }
  if (err instanceof CelebrateError) {
    const joiError = err.details.get('body') || err.details.get('params') || err.details.get('query');
    respErr.message = joiError?.message || 'Invalid request data';
    return res.status(400).send(respErr);
  }
  return res.status(500).send(respErr);
});

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
  console.log(DB_ADDRESS);
});
