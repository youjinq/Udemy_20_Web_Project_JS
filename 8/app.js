const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealsEl = document.getElementById("single-meal");

// **************************************{FUNCTION}***********************************************
// search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // clear single meals if there is
  single_mealsEl.innerHTML = "";

  // get search term
  const term = search.value;

  // check for empty

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2> Search results for "${term}":</h2>`;

        if (data.meals == null) {
          resultHeading.innerHTML = `<h2> There ae no search results for "${term}". Try again!</h2>`;
        } else {
          // one option one by for each, another is map, but have to return as string
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal"> 
                    <img src="${meal.strMealThumb}"/>
                    <div class="meal-info" data-mealID= "${meal.idMeal}">
                         <h3>${meal.strMeal}</h3>
                    </div>
                </div>`
            )
            .join("");

          console.log(mealsEl);
        }
      });

    // clear search text
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// fetch meal by ID /single meal

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDoM(meal);
    });
}

// add meal to Dom

function addMealToDoM(meal) {
  const ingredients = [];

  // because obtained api is weird - it follow number, therefore use for loop
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
      // console.log(ingredients);
    } else {
      break;
    }
  }

  single_mealsEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>    
        <img src="${meal.strMealThumb}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>Meal Category : ${meal.strCategory}</p>` : ""}    
            ${meal.strArea ? `<p> Meal Area:${meal.strCategory}</p>` : ""}        
        </div>

        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join("")}

            </ul>
        </div>

    </div>
    `;
}

//Fetch random meal from API

function getrandomMeal(){

    // clear meals and heading

    mealsEl.innerHTML="";
    resultHeading.innerHTML="";


    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>{
        const meal =data.meals[0];
        
        addMealToDoM(meal);   
    })
}


// **************************************{EVENT LISTENERS}***********************************************

submit.addEventListener("submit", searchMeal);

random.addEventListener("click", getrandomMeal);


mealsEl.addEventListener("click", (e) => {
  // go through all child element in all path and find
  const mealInfo = e.path.find((item) => {
    // find the child element that has class
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
