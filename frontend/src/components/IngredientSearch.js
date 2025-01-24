import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file
import RecipeCard from './RecipeCard'; // Import RecipeCard component
import RecipeModal from './RecipeModal'; // Import RecipeModal component
import spicelogo from './spicelogo.png'; // Import spice logo image

function IngredientSearch() {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);//--------------
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);//--------------
    const [selectedRecipe, setSelectedRecipe] = useState(null); // For displaying selected recipe details
    const [page, setPage] = useState(1); // Track current page for loading more recipes
    const [filterValue, setFilterValue] = useState(''); // State for filter input
    const [showFilter, setShowFilter] = useState(false); // State to control filter visibility//--------------
    const [cuisineSuggestions, setCuisineSuggestions] = useState([]); // State for cuisine suggestions//--------------

    // Fetch suggestions from the backend for ingredients
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

    // Fetch cuisine suggestions from the backend
    const fetchCuisineSuggestions = async (query) => {
        if (query.length < 1) {
            setCuisineSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/cuisines?q=${query}`);
            setCuisineSuggestions(response.data.slice(0, 7)); // Limit to 7 suggestions
        } catch (error) {
            console.error('Error fetching cuisine suggestions:', error);
        }
    };

    // Handle input change for ingredient search
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        fetchSuggestions(value); // Fetch ingredient suggestions as user types
    };

    // Handle input change for filter search
    const handleFilterInputChange = (e) => {
        const value = e.target.value;
        setFilterValue(value);
        fetchCuisineSuggestions(value); // Fetch cuisine suggestions as user types
    };

    // Handle selecting an ingredient from suggestions
    const handleSelectSuggestion = (ingredient) => {
        if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
        setInputValue(''); // Clear input box
        setSuggestions([]); // Clear suggestions dropdown
    };

    // Handle selecting a cuisine from suggestions
    const handleSelectCuisineSuggestion = (cuisine) => {
        setFilterValue(cuisine); // Set filter value to selected cuisine
        setCuisineSuggestions([]); // Clear cuisine suggestions
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
            setShowFilter(true); // Show filter options after search
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

    // Remove an ingredient from selected ingredients without triggering a search
    const handleRemoveIngredient = (ingredientToRemove) => {
        const updatedIngredients = selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove);
        setSelectedIngredients(updatedIngredients);

        // If no ingredients left after removal, clear recipes and hide filter options
        if (updatedIngredients.length === 0) {
            setRecipes([]); // Clear recipes when no ingredients are selected
            setPage(1);     // Reset page number for future searches
            setShowFilter(false); // Hide filter options when no ingredients are selected
        }
    };

    // Handle filtering recipes based on TotalTimeInMins and Cuisine
    const handleFilterRecipes = async () => {
        if (!filterValue || selectedIngredients.length === 0) return;

        try {
            const response = await axios.post('http://localhost:5000/api/recipes/filter', { 
                ingredients: selectedIngredients,
                totalTime: filterValue, // This can be a number or a cuisine string
                cuisine: filterValue, // Send cuisine as a separate field
                page,
                limit: 12 
            });
            setRecipes(response.data);
            setPage(1); 
        } catch (error) {
            console.error('Error filtering recipes:', error);
        }
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

                        {/* Show filter options after search */}
                        {showFilter && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <input 
                                    type="text" 
                                    value={filterValue} 
                                    onChange={handleFilterInputChange} 
                                    placeholder="Filter by time or cuisine"
                                    className="filter-input" 
                                    style={{
                                        width: '200px', // Set a fixed width for consistency
                                        padding: '10px', // Padding for better appearance
                                        borderRadius: '25px', // Rounded edges
                                        border: '1px solid #ccc', // Light gray border
                                        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
                                        marginRight: '5px' // Space between input and button
                                    }}
                                />
                                {/* {cuisineSuggestions.length > 0 && (
                                    <ul className="suggestions-list" style={{
                                        position: 'absolute', // Position it absolutely
                                        zIndex: 1000, // Ensure it appears above other elements
                                        width: '200px', // Match the width of the filter input
                                        marginTop: '5px', // Space between input and dropdown
                                        padding: '0', // Remove default padding
                                        listStyleType: 'none', // Remove bullet points
                                        border: '1px solid #ccc', // Light gray border for dropdown
                                        borderRadius: '5px', // Rounded edges for dropdown
                                        backgroundColor: 'white', // White background for dropdown
                                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Shadow effect for dropdown
                                    }}>
                                        {cuisineSuggestions.map((cuisine, index) => (
                                            <li 
                                                key={index} 
                                                className="suggestion-item"
                                                onClick={() => handleSelectCuisineSuggestion(cuisine)}
                                                style={{
                                                    padding: '10px', // Padding for each item
                                                    cursor: 'pointer', // Pointer cursor on hover
                                                }}
                                            >
                                                {cuisine}
                                            </li>
                                        ))}
                                    </ul>
                                )} */}
                                <button 
                                    onClick={handleFilterRecipes} 
                                    className="filter-button" 
                                    style={{
                                        backgroundColor: '#007bff', // Bootstrap primary color
                                        color: 'white', // White text color
                                        fontWeight: 'bold', // Bold text
                                        padding: '10px 15px', // Padding for size
                                        borderRadius: '25px', // Rounded edges
                                        border: 'none', // No border
                                        cursor: 'pointer', // Pointer cursor on hover
                                        height: '40px' // Match height with input field
                                    }}
                                >
                                    Filter
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Display Recipes */}
                {recipes.length > 0 && (
                    <div className="recipe-grid">
                        {recipes.map((recipe, index) => (
                            recipe.matchCount > 0 && ( // Only display recipes with a match score greater than 0%
                                <RecipeCard 
                                    key={index} 
                                    recipe={recipe} 
                                    onClick={() => handleSelectRecipe(recipe)}
                                    selectedIngredients={selectedIngredients}
                                />
                            )
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {recipes.length > 0 && recipes.some(recipe => recipe.matchCount > 0) && ( 
                    <button onClick={handleLoadMoreRecipes} className="load-button">
                        Load More ↯
                    </button>
                )}

                {/* Recipe Details Modal */}
                {selectedRecipe && (
                    <RecipeModal 
                        recipe={selectedRecipe} 
                        onClose={closeRecipeDetails} 
                        selectedIngredients={selectedIngredients} 
                    />
                )}
            </div>
        </div>
    );
}

export default IngredientSearch;