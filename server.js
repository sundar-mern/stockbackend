const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/stockmgmtdb').then(() => console.log('Connected to MongoDB!'));
mongoose.connect('mongodb+srv://sundarrvsn:sundarpass@cluster0.ppibles.mongodb.net/stockmgmtdb?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Connected to MongoDB!'))



// Import routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const salesRoutes = require('./routes/salesRoutes');
const purchaseitemroutes = require('./routes/purchaseItemsRoutes');
const salesitemroutes = require('./routes/salesItemsRoutes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', supplierRoutes);
app.use('/api', customerRoutes);
app.use('/api', productRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', salesRoutes);
app.use('/api', salesitemroutes);
app.use('/api', purchaseitemroutes);

// Start server
app.listen(9000, () => {
    console.log("Node Server is running")
});
