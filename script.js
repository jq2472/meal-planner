let recommendations = {
    fetchRecommendations: async function (val) {
        const foodElement = document.querySelector(".food");
        foodElement.textContent = val;
        
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
          );
    
          if (!response.ok) {
            alert("No Meals found.");
            throw new Error("No Meals found.");
          }
    
          const data = await response.json();
          return data.meals;
        } catch (error) {
          // Handle any errors here
          console.error(error);
          return null; // You can return an empty array or handle the error as needed
        }
    },

    displayRecommendations: function (data) {

        const input = document.querySelector(".search-bar");
        const title = document.querySelector(".food");
        const img = document.querySelector(".showcase");
        const ingred = document.querySelector(".ingredients");

        const { strMeal, strMealThumb, strInstructions } = meal;
        title.textContent = strMeal;
        img.style.backgroundImage = `url(${strMealThumb})`;
        info.textContent = strInstructions;

        const ingredients = [];
  
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                );
            } else {
                break;
            }
      }

      const html = `
        <span>${ingredients
        .map((ing) => `<li class="ing">${ing}</li>`)
        .join("")}</span>
      `;
    },

    //getting recs
    search: function (food) {
        this.fetchRecommendations(food);
    },
  };
  
  //user input
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

  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        recommendations.search();
      }
    });
  
    //test
    recommendations.fetchRecommendations("Chicken");
