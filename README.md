
# Spice Rack: Smart Recipe Suggestion App

## Team Members
- Revanth Varshan S  
- Pranesh S  
- Nithin Prasath

---
## Video Demo
https://github.com/user-attachments/assets/be17a0e8-ba89-4df2-8f37-0798e95ff84b

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Problem Statement](#problem-statement)  
3. [Proposed Solution](#proposed-solution)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [File Structure](#file-structure)  
7. [Dataset](#dataset)  
8. [License](#license)  

---

## Project Overview
Spice Rack is a **Smart Recipe Suggestion App** designed to assist users in creating delicious meals using ingredients they already have. The app helps users minimize food waste, inspire creativity in the kitchen, and simplify meal preparation. Users can input available ingredients, and the app suggests recipes with step-by-step cooking instructions tailored to their needs and preferences.

---

## Problem Statement
In today's fast-paced world, households often encounter these challenges:
- **Food Waste**: Ingredients often expire before being used.  
- **Limited Recipe Options**: Difficulty finding recipes matching available ingredients.  
- **Lack of Cooking Guidance**: Beginners may struggle with meal preparation.  

### Solution
Spice Rack provides a user-friendly platform to:  
- Suggest recipes based on available ingredients.  
- Reduce food waste through efficient planning.  
- Empower users with detailed cooking instructions.

---

## Proposed Solution
The core features of Spice Rack include:  
- **Dynamic Match Score Algorithm**: Suggests recipes based on ingredient relevance.  
- **Integrated Grocery Assistance**: Links to grocery delivery platforms or stores.  
- **User-Centric Design**: Filters for dietary needs, cuisines, and cooking time.  
- **AI-Powered Dashboard**: Offers nutritional insights, calorie tracking, and trends.  
- **Weekly Inventory Management**: Dynamic meal plans with real-time updates.

---

## Installation
Follow these steps to set up Spice Rack:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nithinprasath21/Smart_Recipe_Suggester.git
   cd Smart_Recipe_Suggester
   ```

2. **Install dependencies**:  
   - Frontend:  
     ```bash
     cd frontend
     npm install
     ```  
   - Backend:  
     ```bash
     cd ../backend
     npm install
     ```  

3. **Set up environment variables**:  
   - In the backend directory, create a `.env` file:
     ```
     MONGODB_URI=your_mongodb_connection_string_here
     ```

4. **Run the application**:  
   - Start the backend server:  
     ```bash
     cd backend
     node index.js
     ```  
   - Start the frontend application:  
     ```bash
     cd ../frontend
     npm start
     ```

---

## Usage
1. Open your browser and go to `http://localhost:3000`.  
2. Enter the ingredients you have in the search bar.  
3. Select ingredients from the suggestions or press Enter to add them.  
4. Click "Search Recipes" to view suggestions.  
5. Use filters to narrow down recipes by cooking time or cuisine.

---

## File Structure
```
Smart_Recipe_Suggester/
├── backend/
│   ├── models/
│   │   └── Recipe.js
│   ├── routes/
│   │   ├── ingredients.js
│   │   └── search.js
│   ├── .env
│   ├── index.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── FilterComponent.js
    │   │   ├── IngredientSearch.js
    │   │   └── RecipeCard.js
    │   ├── styles/
    │   │   └── styles.css
    │   └── App.js
    └── package.json
```

---

## Dataset
The dataset for this application can be downloaded [here](#).  
After downloading, import it into your MongoDB database using MongoDB Compass or the command line.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 
