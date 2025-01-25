import React from 'react';
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer'; // Import Footer component
import IngredientSearch from './components/IngredientSearch'; // Import IngredientSearch component

function App() {
    return (
        <div>
            <Navbar /> {/* Render the Navbar */}
            <IngredientSearch /> {/* Render the Ingredient Search functionality */}
            <Footer /> {/* Render the Footer */}
        </div>
    );
}

export default App;