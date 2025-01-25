// src/components/Navbar.js

import React, { useState } from 'react';
import axios from 'axios';
import './Navbar.css'; // Import CSS for Navbar
import spicerack from './sr.png'; // Import spice logo image

const Navbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        if (query.length < 1) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5500/api/recipes/suggestions?q=${query}`);
            setSuggestions(response.data.slice(0, 5)); // Limit to top 5 suggestions
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        fetchSuggestions(e.target.value);
    };

    const handleSuggestionClick = (recipeName) => {
        console.log(`Selected recipe: ${recipeName}`);
        setSearchInput(recipeName); // Set input to selected recipe name
        setSuggestions([]); // Clear suggestions
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={spicerack} alt="SpiceRack Logo" className="nlogo" />
                <span className="navbar-title">SpiceRack</span>
            </div>
            <div className="navbar-search">
                <input 
                    type="text" 
                    value={searchInput} 
                    onChange={handleSearchChange} 
                    placeholder="Search for recipes..." 
                    className="search-bar"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion.TranslatedRecipeName)}>
                                {suggestion.TranslatedRecipeName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="sign-in-button">Sign Out</button>
        </nav>
    );
};

export default Navbar;
