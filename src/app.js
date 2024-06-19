const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const carRoutes = require('./routes/carRoutes');
const config = require('./configs/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cars', carRoutes);

const PORT = config.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
