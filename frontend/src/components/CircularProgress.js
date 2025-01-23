// src/components/CircularProgress.js

import React from 'react';

const CircularProgress = ({ percentage }) => {
    // Calculate the stroke color based on percentage
    let strokeColor;
    if (percentage >= 70) {
        strokeColor = '#4caf50'; // Green for >=70%
    } else if (percentage >= 30) {
        strokeColor = '#ffeb3b'; // Yellow for >=30% and <70%
    } else {
        strokeColor = '#f44336'; // Red for <30%
    }

    // Calculate the circumference of the circle
    const radius = 23; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle

    // Calculate the offset based on the percentage
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width="50" height="50">
            <circle cx="25" cy="25" r={radius} stroke="#ccc" strokeWidth="4" fill="none" />
            <circle 
                cx="25" 
                cy="25" 
                r={radius} 
                stroke={strokeColor} 
                strokeWidth="4" 
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`} 
                strokeDashoffset={offset} // Set offset to create dynamic filling effect
            />
            <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" strokeWidth="1px"
                  dy=".3em">{Math.round(percentage)}%</text>
        </svg>
    );
};

export default CircularProgress;