import express from 'express';
import StockController from '../Controllers/StockController.js';


const router = express.Router();

router.get('/stock/product/:id', StockController.getStockLogByProductId);
router.get('/stock/sku/:id', StockController.getStockLogBySKUId);
router.post('/addLogEntry', StockController.addLogEntry);
router.get('/stockLog/date', async (req, res) => {
    const startDate = req.query.startDate;

    if (!startDate) {
        return res.status(400).json({ message: "startDate is required." });
    }

    try {
        const logs = await StockController.getStockLogByDate(req, res);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/stockLog/date/product/:id', async (req, res) => {
    const startDate = req.query.startDate;

    if (!startDate) {
        return res.status(400).json({ message: "startDate is required." });
    }

    try {
        const logs = await StockController.getStockLogByProductandDate(req, res);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
