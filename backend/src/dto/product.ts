import { Types } from 'mongoose';
import { IProduct, IProductImg } from '../models/product';

export type TWithId<T = never> = T & {_id: Types.ObjectId};

interface ResponseProductImgDTO {
  fileName: String,
  originalName: String
}

interface ResponseProductDTO {
  _id: String,
  title: String,
  description: String,
  image: ResponseProductImgDTO,
  category: String,
  price: number
}

interface ResponseProductsDTO {
  total: Number,
  items: Array<ResponseProductDTO>
}

const productImgMapper = (product: IProductImg): ResponseProductImgDTO => ({
  fileName: product.fileName,
  originalName: product.originalName,
});

export const productMapper = (product: TWithId<IProduct>): ResponseProductDTO => ({
  _id: product._id.toString(),
  title: product.title,
  description: product.description,
  image: productImgMapper(product.image),
  category: product.category,
  price: product.price,
});

export const productsMapper = (products: Array<TWithId<IProduct>>): ResponseProductsDTO => ({
  total: products.length,
  items: products.map((el) => productMapper(el)),
});
