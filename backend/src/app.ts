import express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import productRouter from './routes/product'
import orderRouter from './routes/order'
import mongoose from 'mongoose';
import { AppError, ErrorResponse } from './utils/errors';
import { errorLogger, requestLogger } from './middlewares/logger';

dotenv.config();

const {PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek'} = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/product", productRouter);
app.use("/order", orderRouter);

// Exeption handler
app.use(errorLogger);
app.use((err: any, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  const respErr: ErrorResponse = {
    message: "Unexpected server error"
  };
  if(err instanceof AppError) {
    respErr.message = err.message;
    res.status(err.statusCode).send(respErr);
  } else {
    res.status(500).send(respErr);
  }
});

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
  console.log(DB_ADDRESS);
})


