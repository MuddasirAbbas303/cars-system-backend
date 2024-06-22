const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./configs/config');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors());

mongoose.connect(config.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cars', carRoutes);

const PORT = config.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
