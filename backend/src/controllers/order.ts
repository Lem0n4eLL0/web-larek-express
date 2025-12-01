import { NextFunction, Request, Response } from 'express';
import Order from '../models/order';
import { orderRequestMapper } from '../dto/order';

export const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  return Order.create(body)
    .then((el) => {
      res.status(201).send(
        orderRequestMapper(el),
      );
    }).catch(next);
};
