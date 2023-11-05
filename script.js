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

    // Function to update the ingredients list
    updateIngredientsList: function (ingredientsList, meal) {
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
    
      display: function (meal) {
        // Unhide recommendation display
        document.querySelector(".recommendation").classList.remove("loading");
    
        const { strMeal, strMealThumb, strYoutube, strInstructions } = meal;
    
        const foodElement = document.querySelector(".food");
        const imgElement = document.querySelector("#showcase"); // Changed selector to use ID
        imgElement.src = strMealThumb; // Use .src to set the image source
    
        const linkElement = document.querySelector("a#tutorial");
        linkElement.href = strYoutube; // Set the href attribute to the YouTube link
        linkElement.textContent = "Watch on YouTube"; // Change the link text if needed
    
        foodElement.textContent = strMeal;
    
        // Displaying ingredients and measures
        const ingredientsList = document.getElementById("needs"); // Use getElementById to select by ID
        this.updateIngredientsList(ingredientsList, meal);

        //preparation instructions
        document.querySelector("button#forward.navigation").addEventListener("click", function () {
            document.querySelector(".card2").classList.remove("idle");
        });
        const instructions = document.querySelector(".card2 .body");
        instructions.textContent = strInstructions;
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

document.querySelector("button#back.navigation").addEventListener("click", function () {
    document.querySelector(".card2").classList.add("idle");
});





