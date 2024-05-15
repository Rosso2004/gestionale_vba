const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const resourceTypeRoutes = require('./routes/resourceTypeRoutes');
const resourceFunctionRoutes = require('./routes/resourceFunctionRoutes');
const customerSupplierRoutes = require('./routes/customerSupplierRoutes');
const orderStatusRoutes = require('./routes/orderStatusRoutes');
const orderTypesRoutes = require('./routes/orderTypesRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(cookieParser());
app.use(express.json());

app.use('/api', userRoutes, resourceTypeRoutes, resourceFunctionRoutes, customerSupplierRoutes, orderStatusRoutes, orderTypesRoutes, orderRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});