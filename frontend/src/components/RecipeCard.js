// src/components/RecipeCard.js

import React from 'react';
import CircularProgress from './CircularProgress'; // Import Circular Progress component

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div className="recipe-container" onClick={onClick}>
            {/* Top Row for Image */}
            <div className="recipe-image">
                <img src={recipe['image-url']} alt={recipe.TranslatedRecipeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Bottom Row for Name and Progress Bar */}
            <div className="recipe-name-progress">
                {/* Recipe Name */}
                <div className="recipe-name">
                    <h4>{recipe.TranslatedRecipeName}</h4>
                </div>

                {/* Circular Progress Bar */}
                <div className="progress-container">
                    <CircularProgress percentage={(recipe.matchCount / recipe.totalCount) * 100} />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
