import db from '../connect.js';
import {
    listInventorybyProductId, 
    listInventorybySKUId, 
    listInventorybyCategory
} from '../Models/InventoryModel.js';

async function getInventoryBySKUId(req, res) {
    try{
        const skuId = req.params.id;
        const inventory = await listInventorybySKUId(db, skuId);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        res.json(inventory);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function getInventoryByProductId(req, res) {
    try{
        const productId = req.params.id;
        const inventory = await listInventorybyProductId(db, productId);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        res.json(inventory);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function getInventoryByCategory(req, res) {
    try{
        const categoryId = req.params.category;
        const inventory = await listInventorybyCategory(db, categoryId);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        res.json(inventory);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

export default {
    getInventoryByProductId,
    getInventoryBySKUId,
    getInventoryByCategory
};