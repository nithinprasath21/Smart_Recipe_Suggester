const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Fetch unique ingredients from recipes based on user input
router.get('/', async (req, res) => {
    const query = req.query.q; // Get the query parameter from the request
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        // Fetch all recipes
        const recipes = await Recipe.find({});
        const ingredientsSet = new Set();

        recipes.forEach(recipe => {
            const ingredients = recipe['Cleaned-Ingredients'].split(',');
            ingredients.forEach(ingredient => {
                const words = ingredient.trim().toLowerCase().split(' '); // Tokenize ingredient into words
                // Check if any word starts with the query
                if (words.some(word => word.startsWith(query.toLowerCase()))) {
                    ingredientsSet.add(ingredient.trim());
                }
            });
        });

        const matchingIngredients = Array.from(ingredientsSet);
        res.json(matchingIngredients); // Return matching ingredients as an array
    } catch (error) {
        console.error("Error in /api/ingredients:", error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
