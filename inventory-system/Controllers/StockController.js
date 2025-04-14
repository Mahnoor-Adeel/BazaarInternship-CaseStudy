import db from '../connect.js';
import {
    listStockLogbyProductId, 
    listStockLogbySKUId, 
    createLogEntry, 
    listStockLogByDate,
    listStockLogByProductAndDate
} from '../Models/StockModel.js';

async function getStockLogBySKUId(req, res) {
    try{
        const skuId = req.params.id;
        const stock = await listStockLogbySKUId(db, skuId);
        if (!stock) {
            return res.status(404).json({ message: "Stock log not found" });
        }
        res.json(stock);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function getStockLogByProductId(req, res) {
    try{
        const productId = req.params.id;
        const stock = await listStockLogbyProductId(db, productId);
        if (!stock) {
            return res.status(404).json({ message: "Stock log not found" });
        }
        res.json(stock);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function addLogEntry(req, res) {
    try{
        
        const entry = {
            skuId: req.body.skuId,
            action: req.body.action,
            quantity: req.body.quantity,
            actionDate: req.body.actionDate,
            comment: req.body.comment
        };

        const result = await createLogEntry(db, entry);  
        if (result && result.id) {
            res.status(201).json({
                message: 'Log entry added successfully',
                logId: result.id
            });
        } else {
            res.status(400).json({
                error: 'Failed to add entry.'
            });
        }
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

async function getStockLogByDate(req, res) {
    const { startDate, endDate } = req.query;

    try {
        const logs = await listStockLogByDate(db, startDate, endDate);
        res.json(logs);
    } 
    catch (err) {
        console.error("Error fetching stock log by date:", err.message);
        res.status(500).json({ message: err.message });
    }
}

export async function getStockLogByProductandDate(req, res) {
    const productId = req.params.id;
    const { startDate, endDate } = req.query;

    try {
        const logs = await listStockLogByProductAndDate(db, productId, startDate, endDate || null);
        res.json(logs);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default {
    getStockLogByProductId,
    getStockLogBySKUId,
    addLogEntry,
    getStockLogByDate,
    getStockLogByProductandDate
};