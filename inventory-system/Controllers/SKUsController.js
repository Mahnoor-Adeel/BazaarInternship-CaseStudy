import db from '../connect.js';
import {
    listSKUsByProductId, 
    listSKUsBySKUId, 
    listSKUsCount,
    listAvgSellingPriceByProductId, 
    listAvgCostPriceByProductId
} from '../Models/SKUsModel.js';

async function getSKUsBySKUId(req, res) {
    try{
        console.log(db);
        const skuId = req.params.id;
        const skus = await listSKUsBySKUId(db, skuId);
        if (!skus) {
            return res.status(404).json({ message: "SKUs not found" });
        }
        res.json(skus);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function getSKUsByProductId(req, res) {
    try{
        const productId = req.params.id;
        const skus = await listSKUsByProductId(db, productId);
        if (!skus) {
            return res.status(404).json({ message: "SKUs not found" });
        }
        res.json(skus);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function getSKUsCount(req, res) {
    try{
        
        const counts = await listSKUsCount(db);
        if (!counts) {
            return res.status(404).json({ message: "SKUs count not found" });
        }
        res.json(counts);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function getAverageSellingPriceByProductId(req, res) {
    try{
        const productId = req.params.id;
        const avgPrice = await listAvgSellingPriceByProductId(db, productId);
        if(!avgPrice) {
            return res.status(404).json({message: "Avg Price not found."});
        }
        res.json(avgPrice);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

async function getAverageCostPriceByProductId(req, res) {
    try{
        const productId = req.params.id;
        const avgPrice = await listAvgCostPriceByProductId(db, productId);
        if(!avgPrice) {
            return res.status(404).json({message: "Avg Price not found."});
        }
        res.json(avgPrice);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

export default {
    getSKUsByProductId, 
    getSKUsBySKUId,
    getSKUsCount,
    getAverageSellingPriceByProductId,
    getAverageCostPriceByProductId
};

