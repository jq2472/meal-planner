let recommendations = {
    fetchRecommendations: function (val) {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + val)
            .then((response) => {
                if (!response.ok) {
                    alert("No data found.");
                    throw new Error("No data found.");
                }
                return response.json();
            })
            .then((data) => this.display(data.meals[0]));
    },

    display: function (meal) {
         //unhide weather display
         document.querySelector(".recommendation").classList.remove("loading");

        const { strMeal, strMealThumb, strYoutube } = meal;

        const foodElement = document.querySelector(".food");
        const imgElement = document.querySelector("#showcase"); // Changed selector to use ID
        imgElement.src = strMealThumb; // Use .src to set the image source
        
        const linkElement = document.querySelector("a#tutorial");

        foodElement.textContent = strMeal;
        linkElement.textContent = strYoutube;

        // Displaying ingredients and measures
        const ingredientsList = document.querySelector(".needs");
        ingredientsList.innerHTML = ""; // Clear the previous list

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                const ingredientItem = document.createElement("li");
                ingredientItem.textContent = `${ingredient} - ${measure}`;
                ingredientsList.appendChild(ingredientItem);
            } else {
                break;
            }
        }
    },

    // Getting recommendations
    search: function (food) {
        this.fetchRecommendations(food);
    },
};

// User input
document.querySelector(".search-button").addEventListener("click", function () {
    const searchBar = document.querySelector(".search-bar");
    recommendations.search(searchBar.value);
});

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            recommendations.search(searchBar.value);
        }
    });
});

recommendations.search(pizza);