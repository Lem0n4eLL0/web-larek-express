import mongoose from 'mongoose';
import { celebrate, Joi, Segments } from 'celebrate';
import { PRODUCT_CATEGORIES } from '../models/product';
import { PAYMENT_TYPES } from '../models/order';

export const validateProductId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectId validation'),
  }),
});

export const validateBodyProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string(),
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object({
      fileName: Joi.string().min(1).required(),
      originalName: Joi.string().min(1).required(),
    }).required(),
    category: Joi.string()
      .valid(...PRODUCT_CATEGORIES)
      .required(),
    price: Joi.number().min(0).required(),
  }),
});

export const validateBodyOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string()
      .valid(...PAYMENT_TYPES)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().min(1).required(),
    total: Joi.number().min(0).required(),
    items: Joi.array()
      .items(
        Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error('any.invalid');
            }
            return value;
          }, 'ObjectId validation'),
      )
      .min(1)
      .required(),
  }),
});
