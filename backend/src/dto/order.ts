import { TOrder } from '../models/order';
import { TWithId } from './product';

export interface CreateOrderResponse {
  _id: String,
  total: Number
}

export const orderRequestMapper = (order: TWithId<TOrder>): CreateOrderResponse => ({
  _id: order._id.toString(),
  total: order.total,
});
