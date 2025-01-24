// backend/routes/search.js

const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Search for recipes containing selected ingredients with pagination
router.post('/search', async (req, res) => {
    const { ingredients, page = 1, limit = 10 } = req.body; // Default to page 1 and limit 10

    try {
        const recipes = await Recipe.find({});
        
        // Prepare an array to hold matching recipes with their match counts
        const matchedRecipes = recipes.map(recipe => {
            const cleanedIngredients = recipe['Cleaned-Ingredients'].split(',').map(ing => ing.trim());
            const matchCount = ingredients.filter(ing => cleanedIngredients.includes(ing)).length;

            return {
                ...recipe.toObject(),
                matchCount,
                totalCount: cleanedIngredients.length,
                matchPercentage: (matchCount / cleanedIngredients.length) * 100, // Calculate match percentage
            };
        });

        // Sort recipes by match percentage in descending order
        const sortedRecipes = matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

        // Paginate results
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedRecipes = sortedRecipes.slice(startIndex, endIndex);

        res.json(paginatedRecipes); // Return paginated matching recipes
    } catch (error) {
        console.error("Error in /api/recipes/search:", error.message);
        res.status(500).send(error.message);
    }
});

// New endpoint for filtering recipes based on total time and cuisine
router.post('/filter', async (req, res) => {
    const { ingredients, totalTime, cuisine, page = 1, limit = 10 } = req.body; // Default to page 1 and limit 10

    try {
        const query = {};

        // Filter by TotalTimeInMins if totalTime is a number
        if (!isNaN(totalTime)) {
            query.TotalTimeInMins = { $lte: parseInt(totalTime) }; // Less than or equal to totalTime
        }

        // Filter by Cuisine if provided
        if (cuisine) {
            query.Cuisine = { $regex: cuisine, $options: 'i' }; // Case-insensitive match
        }

        // Fetch recipes that match the query
        const recipes = await Recipe.find(query);

        // Prepare an array to hold matching recipes with their match counts
        const matchedRecipes = recipes.map(recipe => {
            const cleanedIngredients = recipe['Cleaned-Ingredients'].split(',').map(ing => ing.trim());
            const matchCount = ingredients.filter(ing => cleanedIngredients.includes(ing)).length;

            return {
                ...recipe.toObject(),
                matchCount,
                totalCount: cleanedIngredients.length,
                matchPercentage: (matchCount / cleanedIngredients.length) * 100, // Calculate match percentage
            };
        });

        // Sort recipes by match percentage in descending order
        const sortedRecipes = matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

        // Paginate results
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedRecipes = sortedRecipes.slice(startIndex, endIndex);

        res.json(paginatedRecipes); // Return paginated matching recipes
    } catch (error) {
        console.error("Error in /api/recipes/filter:", error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;