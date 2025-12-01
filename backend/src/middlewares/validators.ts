import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import mongoose from 'mongoose';
import { BadRequestError } from '../utils/errors';
import { PRODUCT_CATEGORIES } from '../models/product';
import { PAYMENT_TYPES } from '../models/order';

export const validateProductId = (req: Request, _: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new BadRequestError('Invalid product ID'));
  }
  return next();
};

export const validateBodyProduct = (req: Request, _: Response, next: NextFunction) => {
  const {
    title, image, category, price,
  } = req.body;

  if (!title) {
    return next(new BadRequestError('Title required'));
  }
  if (title.length < 2) {
    return next(new BadRequestError('The name must contain at least 2 characters'));
  }
  if (title.length > 30) {
    return next(new BadRequestError('The name must not exceed 30 characters'));
  }

  if (!image || typeof image !== 'object') {
    return next(new BadRequestError('Image required'));
  }
  if (!image.fileName || !validator.isLength(image.fileName, { min: 1 })) {
    return next(new BadRequestError('Image file name required'));
  }
  if (!image.originalName || !validator.isLength(image.originalName, { min: 1 })) {
    return next(new BadRequestError('The original file name is required'));
  }

  if (!category) {
    return next(new BadRequestError('Category required'));
  }
  if (!PRODUCT_CATEGORIES.includes(category)) {
    return next(new BadRequestError('Incorrect category'));
  }

  if (typeof title !== 'string' || !validator.isFloat(price.toString(), { min: 0 })) {
    return next(new BadRequestError('Invalid price'));
  }

  return next();
};

export const validateBodyOrder = (req: Request, _: Response, next: NextFunction) => {
  const {
    payment, email, phone, address, total, items,
  } = req.body;

  if (payment === null) return next(new BadRequestError('Payment is required'));
  if (email === null) return next(new BadRequestError('Email is required'));
  if (phone === null) return next(new BadRequestError('Phone is required'));
  if (address === null) return next(new BadRequestError('Address is required'));
  if (total === null) return next(new BadRequestError('Total is required'));
  if (!Array.isArray(items)) return next(new BadRequestError('Items must be an array'));

  if (!PAYMENT_TYPES.includes(payment)) {
    return next(new BadRequestError(`Invalid payment: "${payment}"`));
  }

  if (typeof email !== 'string' || !validator.isEmail(email)) {
    return next(new BadRequestError(`Invalid email: "${email}"`));
  }

  if (typeof phone !== 'string') {
    return next(new BadRequestError(`Invalid phone: "${phone}"`));
  }

  if (typeof address !== 'string' || address.trim().length === 0) {
    return next(new BadRequestError(`Invalid address: "${address}"`));
  }

  if (typeof total !== 'number') {
    return next(new BadRequestError('Total field must be a number'));
  }
  if (total <= 0) {
    return next(new BadRequestError(`Invalid total: "${total}"`));
  }

  if (items.length === 0) {
    return next(new BadRequestError('Items array must not be empty'));
  }

  const invalidId = items.find((id) => typeof id !== 'string' || id.trim().length === 0 || !mongoose.Types.ObjectId.isValid(id));

  if (invalidId !== undefined) {
    return next(new BadRequestError(`Invalid id on order items: "${invalidId}"`));
  }

  return next();
};
