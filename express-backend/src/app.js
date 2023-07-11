const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const resourceRoutes = require('./routes/resourceTypeRoutes')
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', userRoutes, resourceRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});