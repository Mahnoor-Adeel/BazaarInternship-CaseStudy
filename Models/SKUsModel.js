//Get SKUs by ProductId
export async function listSKUsByProductId(db, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM SKUS WHERE PRODUCT_ID = ? AND IS_DELETED = 0', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return SKUs.", err.message);
        throw err;  
    }
};

//Get SKUs by SKUId
export async function listSKUsBySKUId(db, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM SKUS WHERE SKU_ID = ? AND IS_DELETED = 0', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return SKUs.", err.message);
        throw err;  
    }
};

//Get SKUs count
export async function listSKUsCount(db) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT PRODUCT_ID, COUNT(SKU_ID) AS SKU_COUNT FROM SKUS WHERE IS_DELETED=0 GROUP BY PRODUCT_ID', [], (err, rows) => {
                if (err) {                    
                    reject(err);
                } else {                    
                    resolve(rows);
                }
            });
        });

        if (result.length === 0) {
            console.log('No SKUs found.');
        }

        return result;
    } catch (err) {
        console.log("Can't return SKUs count.", err.message);
        throw err;
    }
}

//Get Avg Selling Price by ProductId
export async function listAvgSellingPriceByProductId(db, id) {
    try {
        const productExists = await new Promise((resolve, reject) => {
            db.get(
                'SELECT IS_DELETED FROM PRODUCTS WHERE PRODUCT_ID = ?',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (!row) {
                        reject(new Error('Product not found.'));
                    } else if (row.IS_DELETED) {
                        reject(new Error('Product is deleted.'));
                    } else {
                        resolve(true);
                    }
                }
            );
        });
        const result = await new Promise((resolve, reject) => {
            db.get(
                'SELECT AVG(SELLING_PRICE) AS AVG_SELLING_PRICE FROM SKUS WHERE PRODUCT_ID = ? AND IS_DELETED = 0',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row ? row.AVG_SELLING_PRICE : 0);  
                    }
                }
            );
        });

        return result;
    } catch (err) {
        console.log("Can't return Avg Price.", err.message);
        throw err;
    }
}

//Get Avg Cost Price by ProductId
export async function listAvgCostPriceByProductId(db, id) {
    try {
        const productExists = await new Promise((resolve, reject) => {
            db.get(
                'SELECT IS_DELETED FROM PRODUCTS WHERE PRODUCT_ID = ?',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (!row) {
                        reject(new Error('Product not found.'));
                    } else if (row.IS_DELETED) {
                        reject(new Error('Product is deleted.'));
                    } else {
                        resolve(true);
                    }
                }
            );
        });
        const result = await new Promise((resolve, reject) => {
            db.get(
                'SELECT AVG(COST_PRICE) AS AVG_COST_PRICE FROM SKUS WHERE PRODUCT_ID = ? AND IS_DELETED = 0',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row ? row.AVG_COST_PRICE : 0);  
                    }
                }
            );
        });

        return result;
    } catch (err) {
        console.log("Can't return Avg Price.", err.message);
        throw err;
    }
}
