const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ingredientRoutes = require('./routes/ingredients');
const searchRoutes = require('./routes/search'); // Import search routes
const cuisineRoutes = require('./routes/cuisines'); // Import cuisine routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', searchRoutes); // Use search routes
app.use('/api/cuisines', cuisineRoutes); // Use cuisine routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});