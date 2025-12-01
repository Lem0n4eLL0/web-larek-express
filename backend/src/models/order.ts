import mongoose, { Schema } from 'mongoose';

export const PAYMENT_TYPES = ['card', 'online'] as const;
export type IPaymentType = typeof PAYMENT_TYPES[number];

type Email = String;
type Phone = String;
type Address = String;

export interface TOrder {
  payment: IPaymentType,
  email: Email,
  phone: Phone,
  address: Address,
  total: Number,
  items: Array<String>, // id товара
}

const orderSchema = new Schema<TOrder>({
  payment: {
    type: String,
    enum: PAYMENT_TYPES,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative'],
  },
  items: [{
    type: String,
    required: true,
  }],
});

export default mongoose.model<TOrder>('order', orderSchema);
