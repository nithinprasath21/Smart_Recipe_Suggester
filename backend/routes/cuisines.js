// backend/routes/cuisines.js

const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Endpoint to get cuisine suggestions based on a query
router.get('/', async (req, res) => {
    const { q } = req.query; // Get the query parameter

    try {
        // Fetch all recipes and extract unique cuisines
        const recipes = await Recipe.find({});
        const cuisines = recipes.map(recipe => recipe.Cuisine).filter(Boolean); // Get cuisines and filter out null/undefined
        const uniqueCuisines = [...new Set(cuisines)]; // Get unique cuisines

        // Filter cuisines based on the query
        const filteredCuisines = uniqueCuisines.filter(cuisine => 
            cuisine.toLowerCase().includes(q.toLowerCase())
        );

        res.json(filteredCuisines); // Return filtered cuisines
    } catch (error) {
        console.error("Error in /api/cuisines:", error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;