import { Router } from 'express';
import { validateBodyProduct, validateProductId } from '../middlewares/validators';
import { createProduct, getProduct, getProducts } from '../controllers/product';

const route = Router();

route.get('/', getProducts);

route.get('/:id', validateProductId, getProduct);

route.post('/', validateBodyProduct, createProduct);

// route.patch("/:id", updateProduct);

// route.delete("/:id", deleteProduct);

export default route;
