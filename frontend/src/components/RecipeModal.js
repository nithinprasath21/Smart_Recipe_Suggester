// src/components/RecipeModal.js

import React from 'react';
import mealIcon from './meal.svg'; // Adjust path as necessary
import linkIcon from './link.svg'; // Adjust path as necessary

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null; // If no recipe is selected, return null

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose} style={closeButtonStyle}>✖</button>
                <h2 style={headingStyle}>{recipe.TranslatedRecipeName}</h2>
                
                <div style={contentStyle}>
                    <div style={imageColumnStyle}>
                        <img 
                            src={recipe['image-url']} 
                            alt={recipe.TranslatedRecipeName} 
                            style={imageStyle} 
                        />
                    </div>
                    <div style={infoColumnStyle}>
                        <div style={cookingTimeContainer}>
                            <img src={mealIcon} alt="Cooking Time" style={iconStyle} />
                            <span style={cookingTimeText}>{recipe.TotalTimeInMins} minutes</span>
                        </div>
                        <p style={{ textAlign: 'left' }}><strong style={recipeHeadingStyle}>Required Ingredients:</strong></p>
                        <ul style={ingredientListStyle}>
                            {recipe['Cleaned-Ingredients'].split(',').map((ingredient, index) => (
                                <li key={index}>{ingredient.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h3 style={recipeHeadingStyle}>
                    Cooking Instructions 
                    <a href={recipe.URL} target="_blank" rel="noopener noreferrer">
                        <img src={linkIcon} alt="Link" style={iconStyle} />
                    </a>
                </h3>
                <ol style={procedureListStyle}>
                    {recipe.TranslatedInstructions.split('\n').map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>

                {recipe.youtubeLink && (
                    <div style={videoContainerStyle}>
                        <iframe 
                            width="100%" 
                            height="200" 
                            src={`https://www.youtube.com/embed/${recipe.youtubeLink}`} 
                            title="YouTube video" 
                            frameBorder="0" 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles for the modal and overlay
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it sits above other content
    overflow: 'hidden', // Hide scrollbar
};

const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '80%', // Set width as a percentage of the viewport
    maxWidth: '100%', // Maximum width for larger screens
    maxHeight: '80vh', // Maximum height to keep it within view
    overflowY: 'auto', // Allow scrolling if content is too tall
    position: 'relative'
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    color: '#f44336', // Red color for close button
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
};

const headingStyle = {
    textAlign: 'left', // Align heading to the left
};

const contentStyle = {
    display: 'flex',
};

const imageColumnStyle = {
    flexBasis: '60%', // Left column for image
};

const infoColumnStyle = {
    flexBasis: '40%', // Right column for cooking time and ingredients
    paddingLeft: '10px', // Space between image and info
    backgroundColor: '#dcdbdb', // Light grey background
    borderRadius: '10px', // Rounded edges
};

const imageStyle = {
    width: '90%', // Standardize image width
    height: 'auto', // Maintain aspect ratio
};

const cookingTimeContainer = {
    display: 'flex',
    alignItems: 'center', // Align items vertically centered
    paddingTop: '10px', // Add padding around cooking time
    textAlign: 'left', // Align text to the left
};

const cookingTimeText = {
    marginLeft: '5px', // Space between icon and text
};

const iconStyle = {
    marginLeft: '5px',
    width: '24px', // Standard icon size
    height: '24px', // Standard icon size
};

const recipeHeadingStyle = {
    fontSize: '30px', // Larger font size for recipe heading
    marginTop: '20px', // Space above "Recipe"
};

const ingredientListStyle = {
    listStyleType: 'disc', // Bullet points for ingredients
    textAlign: 'left', // Align text to the left
    paddingLeft: '20px', // Optional: Add padding for better visibility of bullet points
};

const procedureListStyle = {
    marginTop: '10px', // Space above procedure list
    textAlign: 'left', // Align text to the left
};

const videoContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Center the video iframe
};

export default RecipeModal;