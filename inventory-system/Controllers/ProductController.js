import db from '../connect.js';
import { 
    listAllProducts, 
    listProductbyID, 
    createProduct,
    listProductsCount
} from '../Models/ProductModel.js';

async function getAllProducts(req, res) {
    try{
        const products = await listAllProducts(db);
        res.json(products);
    }    
    catch(err){
        res.status(500).json({ error: err.message });
    }
}
async function getProductbyID(req, res) {
    try{
        const productId = req.params.id;
        const product = await listProductbyID(db, productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }    
    catch(err){
        res.status(500).json({ error: err.message });
    }
}
async function addProduct(req, res) {
    try{
        const product = {
            name: req.body.name,
            brand: req.body.brand,
            categoryId: req.body.categoryId,
            supplierId: req.body.supplierId,
            costPrice: req.body.costPrice,
            sellingPrice: req.body.sellingPrice
        };

        const result = await createProduct(db, product);  
        if (result && result.id) {
            res.status(201).json({
                message: 'Product added successfully',
                productId: result.id  // Send the product ID in the response
            });
        } else {
            res.status(400).json({
                error: 'Failed to create product'
            });
        }
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

async function getProductsCount(req, res) {
    try{
        
        const counts = await listProductsCount(db);
        if (!counts) {
            return res.status(404).json({ message: "Productss count not found" });
        }
        res.json(counts);

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }    
}

async function removeProductdetails(params) {
    
}
export default {
    getAllProducts, 
    getProductbyID,
    addProduct,
    getProductsCount
};