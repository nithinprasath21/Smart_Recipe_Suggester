const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    TranslatedRecipeName: { type: String, required: true },
    TranslatedIngredients: { type: String },
    TotalTimeInMins: { type: Number },
    Cuisine: { type: String },
    TranslatedInstructions: { type: String },
    URL: { type: String },
    'Cleaned-Ingredients': { type: String },
    'image-url': { type: String },
    youtubeLink: { type: String }, // Add this line for YouTube links
});

module.exports = mongoose.model('Recipe', recipeSchema);
