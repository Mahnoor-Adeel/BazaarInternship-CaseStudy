import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

// Connect to the database
const db = new sql3.Database('./stage1.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Connected to DB successfully.');

    // Create tables
    createTables()
        .then(() => {
            console.log('Tables created successfully.');

            // // Insert data
            // insertData()
            //     .then(() => {
            //         console.log('Data inserted successfully.');
            //     })
            //     .catch((err) => {
            //         console.error("Error inserting data:", err);
            //         db.close();
            //     });
        })
        .catch((err) => {
            console.error("Error creating tables:", err);
            db.close();
        });
}

// Function to create tables
function createTables() {
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

// Function to insert data into tables
function insertData() {
    return new Promise((resolve, reject) => {
        const insertDataSQL = `
            INSERT INTO SUPPLIERS (SUPPLIER_NAME, CONTACT_NAME, CONTACT_EMAIL, PHONE_NUMBER)
            VALUES 
            ('ABC Suppliers', 'John Doe', 'john@abc.com', '123-456-7890'),
            ('XYZ Distributors', 'Jane Smith', 'jane@xyz.com', '098-765-4321');

            INSERT INTO PRODUCTS (PRODUCT_NAME, PRODUCT_BRAND, CATEGORY_ID, SUPPLIER_ID)
            VALUES
            ('Tea', 'Lipton', 'Beverages', 1),
            ('Milk', 'Olpers', 'Dairy', 1),
            ('Cooking Oil', 'Dalda', 'Oils', 2),
            ('Sugar', 'Shahtaj', 'Groceries', 2),
            ('Flour', 'Shahtaj', 'Groceries', 2);

            INSERT INTO SKUS (PRODUCT_ID, SKU_NAME, SIZE, COST_PRICE, SELLING_PRICE)
            VALUES
            (1, 'Standard Tea', '0.5kg', 5.00, 10.00),
            (1, 'Standard Tea', '1kg', 8.00, 15.00),
            (2, 'Milk Bottle', '1L', 30.00, 45.00),
            (3, 'Cooking Oil', '1L', 60.00, 90.00),
            (4, 'Sugar Pack', '1kg', 40.00, 60.00),
            (5, 'Flour Pack', '1kg', 20.00, 35.00);

            INSERT INTO INVENTORY (SKU_ID, QUANTITY_IN_STOCK, MIN_STOCK_LEVEL, LAST_RESTOCKED)
            VALUES
            (1, 100, 15, '2025-04-01 08:00:00'),
            (2, 50, 15, '2025-04-01 09:00:00'),
            (3, 200, 20, '2025-04-01 10:00:00'),
            (4, 150, 15, '2025-04-01 11:00:00'),
            (5, 50, 15, '2025-04-01 12:00:00'),
            (6, 75, 15, '2025-04-01 13:00:00');

            INSERT INTO STOCK_LOG (SKU_ID, ACTION, QUANTITY, ACTION_DATE, COMMENT)
            VALUES
            (1, 'STOCKED', 100, '2025-04-01 08:00:00', 'Stocked 0.5kg Tea Pack'),
            (2, 'STOCKED', 50, '2025-04-01 09:00:00', 'Stocked 1kg Tea Pack'),
            (3, 'STOCKED', 200, '2025-04-01 10:00:00', 'Stocked Milk Bottle'),
            (4, 'STOCKED', 150, '2025-04-01 11:00:00', 'Stocked Cooking Oil'),
            (5, 'STOCKED', 50, '2025-04-01 12:00:00', 'Stocked Sugar Pack'),
            (6, 'STOCKED', 75, '2025-04-01 13:00:00', 'Stocked Flour Pack');
        `;

        db.exec(insertDataSQL, (err) => {
            if (err) {
                reject("Error inserting data: " + err.message);
            } else {
                resolve();
            }
        });
    });
}

export default db;
