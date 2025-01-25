// src/components/Footer.js

import React, { useEffect, useState } from 'react';
import './Footer.css'; // Import CSS for Footer

const quotes = [
    "One cannot think well, love well, sleep well if one has not dined well. – Virginia Woolf",
    "Food is symbolic of love when words are inadequate. – Alan D. Wolfelt",
    "People who love to eat are always the best people. – Julia Child",
    "You don’t need a silver fork to eat good food. – Paul Prudhomme",
    "Good food is the foundation of genuine happiness. – Auguste Escoffier",
    "Laughter is brightest where food is best. – Irish Proverb",
    "First we eat, then we do everything else. – M.F.K. Fisher",
    "A recipe has no soul. You, as the cook, must bring soul to the recipe. – Thomas Keller"
];

const Footer = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <footer className="footer">
            <div className="scrolling-text">
                <span className="quote">{quotes[currentQuoteIndex]}</span>
            </div>
        </footer>
    );
};

export default Footer;
