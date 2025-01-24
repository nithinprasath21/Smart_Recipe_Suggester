// src/components/RecipeCard.js

import React from 'react';
import CircularProgress from './CircularProgress'; // Import Circular Progress component

const RecipeCard = ({ recipe, onClick, selectedIngredients }) => {
    const cleanedIngredients = recipe['Cleaned-Ingredients'].split(',').map(ingredient => ingredient.trim());
    const availableCount = cleanedIngredients.filter(ingredient => selectedIngredients.includes(ingredient)).length;

    return (
        <div
            className="recipe-container"
            onClick={onClick}
            style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                overflow: 'hidden',
                height: '300px', // Fixed height
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff', // White background for recipe cards
            }}
        >
            {/* Top Row for Image */}
            <div
                className="recipe-image"
                style={{
                    height: '60%', // Top row for image
                }}
            >
                <img
                    src={recipe['image-url']}
                    alt={recipe.TranslatedRecipeName}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Cover image without distortion
                    }}
                />
            </div>

            {/* Bottom Row for Name and Progress Bar */}
            <div
                className="recipe-name-progress"
                style={{
                    height: '40%', // Bottom row for name and progress bar
                    display: 'flex',
                    flexDirection: 'row', // Keep name and progress bar side by side
                    alignItems: 'center',
                    padding: '10px', // Padding inside the bottom section
                }}
            >
                {/* Recipe Name */}
                <div
                    className="recipe-name"
                    style={{
                        flexGrow: 1, // Take up remaining space in the row
                        paddingRight: '10px', // Add spacing between name and progress bar
                        overflow: 'hidden', // Prevent overflow of text
                        display: 'flex',
                        flexDirection: 'column', // Stack name and subtitle vertically
                    }}
                >
                    <h4
                        style={{
                            margin: 0,
                            fontSize: '16px', // Adjust font size to fit within the container
                            lineHeight: 1.2, // Line height for better spacing
                            whiteSpace: 'nowrap', // Prevent wrapping of long text
                            overflow: 'hidden', // Hide overflowing text
                            textOverflow: 'ellipsis', // Add ellipsis (...) for overflowing text
                        }}
                    >
                        {recipe.TranslatedRecipeName}
                    </h4>
                    {/* Subtitle for available ingredients */}
                    <p
                        style={{
                            margin: 0,
                            fontStyle: 'italic',
                            fontSize: '14px', // Slightly smaller font size for subtitle
                            lineHeight: 1.2, // Line height for better spacing
                            whiteSpace: 'nowrap', // Prevent wrapping of long text
                            overflow: 'hidden', // Hide overflowing text
                            textOverflow: 'ellipsis', // Add ellipsis (...) for overflowing text
                        }}
                    >
                        {availableCount === cleanedIngredients.length 
                            ? `You have all ${cleanedIngredients.length} ingredients` 
                            : `You have ${availableCount} out of ${cleanedIngredients.length} ingredients`}
                    </p>
                </div>

                {/* Circular Progress Bar */}
                <div
                    className="progress-container"
                    style={{
                        width: '30%', // Fixed width for progress bar container
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress percentage={(recipe.matchCount / recipe.totalCount) * 100} />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
