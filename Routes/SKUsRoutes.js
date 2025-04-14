import express from 'express';
import SKUsController from '../Controllers/SKUsController.js';

const router = express.Router();

router.get('/skus/product/:id', SKUsController.getSKUsByProductId);
router.get('/skus/:id', SKUsController.getSKUsBySKUId);
// router.get('/skus/count', SKUsController.getSKUsCount);
router.get('/skuCount', SKUsController.getSKUsCount);
router.get('/product/avgSellingPrice/:id', SKUsController.getAverageSellingPriceByProductId);
router.get('/product/avgCostPrice/:id', SKUsController.getAverageCostPriceByProductId);

export default router;
