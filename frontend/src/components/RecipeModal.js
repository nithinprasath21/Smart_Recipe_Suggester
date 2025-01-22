// src/components/RecipeModal.js

import React from 'react';

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null; // If no recipe is selected, return null

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose} style={closeButtonStyle}>✖</button>
                <h2>{recipe.TranslatedRecipeName}</h2>
                <img src={recipe['image-url']} alt={recipe.TranslatedRecipeName} style={{ width: '100%', height: 'auto' }} />
                <p><strong>Required Ingredients:</strong> {recipe['Cleaned-Ingredients']}</p>
                <p><strong>Cooking Time:</strong> {recipe.TotalTimeInMins} minutes</p>
                <p><strong>Instructions:</strong> {recipe.TranslatedInstructions}</p>
                {/* YouTube iframe - Placeholder for YouTube video link */}
                {recipe.youtubeLink && (
                    <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${recipe.youtubeLink}`} title="YouTube video" frameBorder="0" allowFullScreen></iframe>
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
    zIndex: 1000 // Ensure it sits above other content
};

const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '80%', // Set width as a percentage of the viewport
    maxWidth: '600px', // Maximum width for larger screens
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

export default RecipeModal;
