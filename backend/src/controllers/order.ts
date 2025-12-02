import { NextFunction, Request, Response } from 'express';
import Order from '../models/order';
import { orderRequestMapper } from '../dto/order';
import HttpStatus from '../utils/httpStatus';

export const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  return Order.create(body)
    .then((el) => {
      res.status(HttpStatus.Created).send(
        orderRequestMapper(el),
      );
    }).catch(next);
};
