import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file
import RecipeCard from './RecipeCard'; // Import RecipeCard component
import RecipeModal from './RecipeModal'; // Import RecipeModal component
import spicelogo from './spicelogo.png'; // Import spice logo image

function IngredientSearch() {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // For displaying selected recipe details
    const [page, setPage] = useState(1); // Track current page for loading more recipes

    // Fetch suggestions from the backend
    const fetchSuggestions = async (query) => {
        if (query.length < 1) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/ingredients?q=${query}`);
            setSuggestions(response.data.slice(0, 7)); // Limit to 7 suggestions
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        fetchSuggestions(value); // Fetch suggestions as user types
    };

    // Handle selecting an ingredient from suggestions
    const handleSelectSuggestion = (ingredient) => {
        if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
        setInputValue(''); // Clear input box
        setSuggestions([]); // Clear suggestions dropdown
    };

    // Handle "Enter" key press to add the typed ingredient
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            handleSelectSuggestion(inputValue.trim());
            e.preventDefault(); // Prevent form submission or default behavior
        }
    };

    // Search for recipes containing selected ingredients
    const handleSearchRecipes = async () => {
        if (selectedIngredients.length === 0) return;

        try {
            const response = await axios.post('http://localhost:5000/api/recipes/search', { 
                ingredients: selectedIngredients,
                page,
                limit: 12 // Load 12 recipes initially
            });
            setRecipes(response.data);
            setPage(1); // Reset page to 1 when new search is initiated
        } catch (error) {
            console.error('Error searching recipes:', error);
        }
    };

    // Load more recipes when button is clicked
    const handleLoadMoreRecipes = async () => {
        if (selectedIngredients.length === 0) return;

        try {
            const nextPage = page + 1; // Increment page number for next request
            const response = await axios.post('http://localhost:5000/api/recipes/search', { 
                ingredients: selectedIngredients,
                page: nextPage,
                limit: 12 // Load 12 more recipes each time
            });

            if (response.data.length > 0) {
                setRecipes(prevRecipes => [...prevRecipes, ...response.data]); // Append new recipes to existing ones
                setPage(nextPage); // Update current page state
            }
        } catch (error) {
            console.error('Error loading more recipes:', error);
        }
    };

   // Handle selecting a recipe to view details
   const handleSelectRecipe = (recipe) => {
       setSelectedRecipe(recipe);
   };

   // Close recipe details modal
   const closeRecipeDetails = () => {
       setSelectedRecipe(null);
   };

   // Remove an ingredient from selected ingredients
   const handleRemoveIngredient = (ingredientToRemove) => {
       setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove));
   };

   return (
       <div>
           {/* Logo centered above the search bar */}
           <div style={{ textAlign: 'center', marginTop: '20px' }}>
               <img src={spicelogo} alt="Spice Rack Logo" className="logo" /> {/* Centered logo */}
           </div>
           <div className="ingredient-search-container">
               <input 
                   type="text" 
                   value={inputValue} 
                   onChange={handleInputChange} 
                   onKeyDown={handleKeyPress} 
                   placeholder="Type an ingredient"
                   className="search-bar"
               />
               
               {suggestions.length > 0 && (
                   <ul className="suggestions-list">
                       {suggestions.map((suggestion, index) => (
                           <li 
                               key={index} 
                               className="suggestion-item"
                               onClick={() => handleSelectSuggestion(suggestion)}
                           >
                               {suggestion}
                               <button className="add-button">+</button> {/* Button to add ingredient */}
                           </li>
                       ))}
                   </ul>
               )}

               {selectedIngredients.length > 0 && (
                   <div className="selected-ingredients-container">
                       <h3>Selected Ingredients:</h3>
                       <div className="selected-ingredients">
                           {selectedIngredients.map((ingredient, index) => (
                               <span key={index} className="selected-ingredient">
                                   {ingredient}
                                   <button onClick={() => handleRemoveIngredient(ingredient)} className="remove-button">x</button>
                               </span>
                           ))}
                       </div>
                       {/* Search Button aligned below selected ingredients */}
                       <button onClick={handleSearchRecipes} className="search-button">Search Recipes ⌕</button>
                   </div>
               )}

               {/* Display Recipes */}
               {recipes.length > 0 && (
                   <div className="recipe-grid">
                       {recipes.map((recipe, index) => (
                           <RecipeCard 
                               key={index} 
                               recipe={recipe} 
                               onClick={() => handleSelectRecipe(recipe)} 
                           />
                       ))}
                   </div>
               )}

               {/* Load More Button */}
               {recipes.length > 0 && (
                   <button onClick={handleLoadMoreRecipes} className="load-button">
                       Load More ↯
                   </button>
               )}

               {/* Recipe Details Modal */}
               {selectedRecipe && (
                   <RecipeModal recipe={selectedRecipe} onClose={closeRecipeDetails} />
               )}
           </div>
       </div>
   );
}

export default IngredientSearch;