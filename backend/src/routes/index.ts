import {
  Router, NextFunction, Request, Response,
} from 'express';
import productRouter from './product';
import orderRouter from './order';
import { NotFoundError } from '../utils/errors';

const router = Router();

router.use('/product', productRouter);
router.use('/order', orderRouter);

router.use((_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError()));

export default router;
