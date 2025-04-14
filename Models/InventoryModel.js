//Get Inventory by ProductId
export async function listInventorybyProductId(db, id) {
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
            db.all('SELECT * FROM INVENTORY INNER JOIN SKUS ON INVENTORY.SKU_ID=SKUS.SKU_ID WHERE SKUS.PRODUCT_ID = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return Inventory.", err.message);
        throw err;  
    }
};

//Get Inventory by SKUId
export async function listInventorybySKUId(db, id) {
    try {
        const skuExists = await new Promise((resolve, reject) => {
            db.get(
                'SELECT IS_DELETED FROM SKUS WHERE SKU_ID = ?',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (!row) {
                        reject(new Error('SKU not found.'));
                    } else if (row.IS_DELETED) {
                        reject(new Error('SKU is deleted.'));
                    } else {
                        resolve(true);
                    }
                }
            );
        });

        const result = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM INVENTORY WHERE SKU_ID = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return Inventory.", err.message);
        throw err;  
    }
};

//Get Inventory by Category
export async function listInventorybyCategory(db, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM INVENTORY INNER JOIN SKUS ON INVENTORY.SKU_ID=SKUS.SKU_ID INNER JOIN PRODUCTS ON SKUS.PRODUCT_ID=PRODUCTS.PRODUCT_ID WHERE LOWER(PRODUCTS.CATEGORY_ID) = LOWER(?) AND PRODUCTS.IS_DELETED=0', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return Inventory.", err.message);
        throw err;  
    }
};