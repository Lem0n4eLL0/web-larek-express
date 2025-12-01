import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import { productMapper, productsMapper } from '../dto/product';
import { ConflictError, NotFoundError } from '../utils/errors';

export const getProducts = (_: Request, res: Response, next: NextFunction) => Product.find({})
  .then((el) => res.status(200).send(
    productsMapper(el),
  ))
  .catch(next);

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Product.findById(id)
    .then((el) => {
      if (!el) throw new NotFoundError('Product not found');
      return res.status(200).send(
        productMapper(el),
      );
    })
    .catch(next);
};

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  return Product.create(body)
    .then((el) => {
      res.status(201).send(
        productMapper(el),
      );
    }).catch((e) => {
      if (e.code === 11000) {
        const field = Object.keys(e.keyPattern || {})[0] || 'field';
        return next(new ConflictError(`${field} field uniqueness error`));
      }
      return next(e);
    });
};

// export const updateProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;
//   const body = req.body;
//   return Product.findByIdAndUpdate(
//     id,
//     { $set: body },
//     { new: true, runValidators: true }
//   ).then(el => {
//     if(!el) throw new NotFoundError("Product not found");
//     res.status(200).json(
//       productMapper(el)
//     );
//   }).catch(next);
// };

// export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params;

//   return Product.findByIdAndDelete(id)
//     .then(del => {
//       if(!del) throw new NotFoundError("Product not found");
//       res.status(204).send();
//     })
//     .catch(next);
// };
