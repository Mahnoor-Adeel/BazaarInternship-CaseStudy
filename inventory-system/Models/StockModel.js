//Get Stock Log by ProductId
export async function listStockLogbyProductId(db, id) {
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
            db.all('SELECT * FROM STOCK_LOG INNER JOIN SKUS ON STOCK_LOG.SKU_ID = SKUS.SKU_ID WHERE SKUS.PRODUCT_ID = ? AND SKUS.IS_DELETED = 0', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return Stock Log.", err.message);
        throw err;  
    }
};

//Get Stock Log by SKUId
export async function listStockLogbySKUId(db, id) {
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
            db.all('SELECT * FROM STOCK_LOG INNER JOIN SKUS ON STOCK_LOG.SKU_ID = SKUS.SKU_ID WHERE SKUS.SKU_ID = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);  
                } else {
                    resolve(rows);  
                }
            });
        });

        return result;  
    } catch (err) {
        console.log("Can't return Stock Log.", err.message);
        throw err;  
    }
};

//Add new log entry
export async function createLogEntry(db, entry) {
    try {
        console.log(entry.skuId);
        await new Promise((resolve, reject) => {
            db.get(
                'SELECT IS_DELETED FROM SKUS WHERE SKU_ID = ?',
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (!row) {
                        reject(new Error('SKU not found.'));
                    } else if (row.IS_DELETED) {
                        reject(new Error('SKU is deleted.'));
                    } else {
                        resolve();
                    }
                }
            );
        });

        
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        
        const insertSql = `
            INSERT INTO STOCK_LOG (SKU_ID, ACTION, QUANTITY, ACTION_DATE, COMMENT)
            VALUES (?, ?, ?, ?, ?)
        `;
        const logResult = await new Promise((resolve, reject) => {
            db.run(
                insertSql,
                [entry.skuId, entry.action, entry.quantity, entry.actionDate, entry.comment],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                }
            );
        });

       
        const updateSql = `
            UPDATE INVENTORY
            SET QUANTITY_IN_STOCK = QUANTITY_IN_STOCK ${
                entry.action === 'STOCKED' || entry.action === 'RESTOCKED' ? '+' : '-'
            } ?
            WHERE SKU_ID = ?
        `;
        await new Promise((resolve, reject) => {
            db.run(
                updateSql,
                [entry.quantity, entry.skuId],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

       
        await new Promise((resolve, reject) => {
            db.run('COMMIT', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        return logResult;

    } catch (err) {
        // If something goes wrong, rollback the transaction
        await new Promise((resolve) => {
            db.run('ROLLBACK', () => resolve());
        });

        console.log("Can't add new log entry or update inventory:", err.message);
        throw err;
    }
}

export async function listStockLogByDate(db, startDate, endDate) {
    return new Promise((resolve, reject) => {
        const sql = endDate
            ? `SELECT * FROM STOCK_LOG WHERE DATE(ACTION_DATE) BETWEEN DATE(?) AND DATE(?)`
            : `SELECT * FROM STOCK_LOG WHERE DATE(ACTION_DATE) = DATE(?)`;

        const params = endDate ? [startDate, endDate] : [startDate];

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export async function listStockLogByProductAndDate(db, productId, startDate, endDate) {
    return new Promise((resolve, reject) => {
        // First check if the product exists and is not deleted
        db.get(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = ? AND IS_DELETED = 0`, [productId], (err, product) => {
            if (err) {
                return reject(err);
            }
            if (!product) {
                return reject(new Error('Product not found or deleted.'));
            }

            const sql = endDate
                ? `SELECT STOCK_LOG.* FROM STOCK_LOG
                   INNER JOIN SKUS ON STOCK_LOG.SKU_ID = SKUS.SKU_ID
                   WHERE SKUS.PRODUCT_ID = ? AND DATE(ACTION_DATE) BETWEEN DATE(?) AND DATE(?)`
                : `SELECT STOCK_LOG.* FROM STOCK_LOG
                   INNER JOIN SKUS ON STOCK_LOG.SKU_ID = SKUS.SKU_ID
                   WHERE SKUS.PRODUCT_ID = ? AND DATE(ACTION_DATE) = DATE(?)`;

            const params = endDate ? [productId, startDate, endDate] : [productId, startDate];

            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
}
