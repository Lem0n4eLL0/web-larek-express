import mongoose, { Schema } from 'mongoose';

export const PRODUCT_CATEGORIES = ['другое', 'софт-скил', 'дополнительное', 'кнопка', 'хард-скил'] as const;
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export interface IProductImg {
  fileName: String,
  originalName: String
}

export interface IProduct {
  title: String,
  description: String,
  image: IProductImg,
  category: ProductCategory,
  price: number
}

const productImgSchema = new Schema<IProductImg>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  image: productImgSchema,
  category: {
    type: String,
    enum: PRODUCT_CATEGORIES,
    required: true,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
