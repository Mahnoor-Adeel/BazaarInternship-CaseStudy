import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './Routes/ProductRoutes.js';
import skusRoutes from './Routes/SKUsRoutes.js';
import inventoryRoutes from './Routes/InventoryRoutes.js';
import stockRoutes from './Routes/StockRoutes.js';
import authRoutes from './Routes/AuthRoutes.js';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Connected");
});

app.listen(3000, (err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log('Listening on port 3000.');

});

app.use("/api", productRoutes);
app.use("/api", skusRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", stockRoutes);
app.use("/api", authRoutes);

app.use(express.static('public'));