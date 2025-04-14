import express from 'express';
import ProductController from '../Controllers/ProductController.js';


const router = express.Router();

router.get('/products', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductbyID);
router.get('productCount', ProductController.getProductsCount)
router.post('/addproduct', ProductController.addProduct);
router.delete('/deleteproduct', )

export default router;
