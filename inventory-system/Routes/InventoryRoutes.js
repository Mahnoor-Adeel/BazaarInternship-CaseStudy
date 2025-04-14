import express from 'express';
import InventoryController from '../Controllers/InventoryController.js';


const router = express.Router();

router.get('/inventory/product/:id', InventoryController.getInventoryByProductId);
router.get('/inventory/sku/:id', InventoryController.getInventoryBySKUId);
router.get('/inventory/category/:category', InventoryController.getInventoryByCategory);

export default router;
