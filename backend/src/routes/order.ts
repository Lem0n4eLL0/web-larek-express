import { Router } from 'express';
import { validateBodyOrder } from '../middlewares/validators';
import { createOrder } from '../controllers/order';

const route = Router();

route.post('/', validateBodyOrder, createOrder);

export default route;
