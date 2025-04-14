import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

// Function to create Database for the store
function createStoreDatabase(storeName) {
    const dbFilePath = `./${storeName}.db`; 

    // Open connection to the database
    const db = new sql3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.log('Error connecting to DB:', err.message);
            return;
        }
        console.log(`Connected to ${storeName} DB successfully.`);

        createTables(db)
            .then(() => {
                console.log('Tables created successfully.');
            })
            .catch((err) => {
                console.error("Error creating tables:", err);
                db.close();
            });
    });

    // Function to create tables for the store
    function createTables(db) {
        return new Promise((resolve, reject) => {
            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS SUPPLIERS (
                    SUPPLIER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    SUPPLIER_NAME TEXT NOT NULL,
                    CONTACT_NAME TEXT NOT NULL,
                    CONTACT_EMAIL TEXT NOT NULL,
                    PHONE_NUMBER TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS PRODUCTS (
                    PRODUCT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    PRODUCT_NAME TEXT NOT NULL,
                    PRODUCT_BRAND TEXT NOT NULL,
                    CATEGORY_ID TEXT NOT NULL,
                    SUPPLIER_ID INTEGER,
                    IS_DELETED INTEGER DEFAULT 0,
                    FOREIGN KEY (SUPPLIER_ID) REFERENCES SUPPLIERS(SUPPLIER_ID) ON DELETE SET NULL
                );

                CREATE TABLE IF NOT EXISTS SKUS (
                    SKU_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    PRODUCT_ID INTEGER NOT NULL,
                    SKU_NAME TEXT NOT NULL,
                    SIZE TEXT NOT NULL,
                    COST_PRICE DECIMAL(10, 2) NOT NULL,
                    SELLING_PRICE DECIMAL(10, 2) NOT NULL,
                    IS_DELETED INTEGER DEFAULT 0,
                    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(PRODUCT_ID)
                );

                CREATE TABLE IF NOT EXISTS INVENTORY (
                    SKU_ID INTEGER PRIMARY KEY,
                    QUANTITY_IN_STOCK INTEGER DEFAULT 0,
                    MIN_STOCK_LEVEL INTEGER NOT NULL,
                    LAST_RESTOCKED TIMESTAMP NOT NULL,
                    FOREIGN KEY (SKU_ID) REFERENCES SKUS(SKU_ID)
                );

                CREATE TABLE IF NOT EXISTS STOCK_LOG(
                    LOG_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    SKU_ID INTEGER NOT NULL,
                    ACTION TEXT CHECK(ACTION IN ('SOLD', 'STOCKED', 'RESTOCKED', 'REMOVED')) NOT NULL,
                    QUANTITY INTEGER NOT NULL,
                    ACTION_DATE TIMESTAMP NOT NULL,
                    COMMENT TEXT,
                    FOREIGN KEY (SKU_ID) REFERENCES SKUS(SKU_ID)
                );
            `;

            db.exec(createTableSQL, (err) => {
                if (err) {
                    reject("Error creating tables: " + err.message);
                } else {
                    resolve();
                }
            });
        });
    }
}

createStoreDatabase('store_1');
createStoreDatabase('store_2');
createStoreDatabase('store_3');
createStoreDatabase('store_4');
