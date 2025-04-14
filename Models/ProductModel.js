//Get All Products
export async function listAllProducts(db) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM PRODUCTS', [], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return products.", err.message);
        throw err;  
    }
};

//Get Product By ID
export async function listProductbyID(db, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM PRODUCTS WHERE PRODUCT_ID = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return products.", err.message);
        throw err;  
    }
};

//Add new Product
export async function createProduct(db, product) {
    try{
        const sql = `INSERT INTO PRODUCTS (PRODUCT_NAME, PRODUCT_BRAND, CATEGORY_ID, SUPPLIER_ID, COST_PRICE, SELLING_PRICE) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await new Promise((resolve, reject) => {
                           
            db.run(sql, [product.name, product.brand, product.categoryId, product.supplierId, product.costPrice, product.sellingPrice], 
                function(err) {
                    if (err) {
                        reject(err); 
                    } else {
                        resolve({ id: this.lastID });  
                    }
                }
            );
        });
        return result;
        
    }
    catch(err){
        console.log("Can't create new product", err.message);
        throw err;
    }
};

//Get Products count
export async function listProductsCount(db) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.all('SELECT CATEGORY_ID, COUNT(PRODUCT_ID) AS PRODUCTS_COUNT FROM PRODUCTS WHERE IS_DELETED=0 GROUP BY CATEGORY_ID', [], (err, rows) => {
                if (err) {                    
                    reject(err);
                } else {                    
                    resolve(rows);
                }
            });
        });

        if (result.length === 0) {
            console.log('No categories found.');
        }

        return result;
    } catch (err) {
        console.log("Can't return Products count.", err.message);
        throw err;
    }
}


