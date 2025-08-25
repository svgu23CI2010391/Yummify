let reciepData = {};
let recipeText = document.getElementById("your_recipe_h3");

function getData() {
    fetch("./mockData.json")
        .then((res) => res.json())
        .then((data) => {
            console.log({ data });
            reciepData = { ...data };
            fillAutoComplete();
        })
        .catch((err) => {
            console.log({ err });
        });
}

const clearSearch = document.getElementById("clear-search");
clearSearch.addEventListener("click", () => {
    const searchInput = document.querySelector(".search-input");
    searchInput.value = "";
    fillAutoComplete();
});

getData();

function fillAutoComplete() {
    const datalist = document.getElementById("recipe-categories");
    datalist.innerHTML = "";
    const featuredRecipes = document.getElementById("featuredRecipes");
    featuredRecipes.innerHTML = "";

    const heading = document.createElement("h3");
    featuredRecipes.appendChild(heading);

    const searchInput = document.querySelector(".search-input");

    Object.keys(reciepData).forEach((recipe) => {
        const option = document.createElement("option");
        option.value = recipe;
        datalist.appendChild(option);

        const category = document.createElement("li");
        category.classList.add("recipe-item");
        category.addEventListener("click", () => {
            searchInput.value = recipe;
            handleKeyPress({ key: "Enter" });
        });
        category.textContent =
            recipe.substring(0, 1).toUpperCase() + recipe.substring(1);
        featuredRecipes.appendChild(category);
    });
}

// function filterRecipes() {
//     const searchInput = document.querySelector('.search-input');
//     const searchResults = document.getElementById('searchResults');
//     const featuredRecipes = document.getElementById('featuredRecipes');

//     // Clear previous search results
//     searchResults.innerHTML = '';

//     const searchTerm = searchInput.value.toLowerCase();

//     // Filter recipes based on the search term
//     for (let i = 0; i < featuredRecipes.children.length; i++) {
//         const recipe = featuredRecipes.children[i].textContent.toLowerCase();

//         if (recipe.includes(searchTerm)) {
//             const listItem = document.createElement('li');
//             listItem.textContent = featuredRecipes.children[i].textContent;
//             searchResults.appendChild(listItem);
//         }
//     }
// }

function handleKeyPress(event) {
    if (event.key === "Enter") {
        const searchInput = document.querySelector(".search-input");
        console.log("Entered text:", searchInput.value);
        const searchText = searchInput.value.toLowerCase();

        if (Object.keys(reciepData).includes(searchText)) {
            console.log("Data is : ", reciepData[searchText]);
            // Get the 'featuredRecipes' ul element
            const featuredRecipesList =
                document.getElementById("featuredRecipes");

            // Clear previous list items
            featuredRecipesList.innerHTML = "";

            // Render each recipe as a list item
            reciepData[searchText].forEach((recipe) => {
                const listItem = document.createElement("li");
                listItem.textContent = recipe.name;
                listItem.classList.add("recipe-item");
                listItem.addEventListener("click", () => {
                    // Display the selected recipe details in the 'searchResults' section
                    displayRecipeDetails(recipe);
                    recipeText.innerHTML =
                        "Here is your recipe for : " + recipe.name;
                });
                featuredRecipesList.appendChild(listItem);
            });
        } else {
            alert("we dont have this recipe in the menu");
        }
        // You can perform additional actions here if needed
    }
}

function displayRecipeDetails(recipe) {
    // Get the 'searchResults' ul element
    const searchResultsList = document.getElementById("searchResults");

    // Clear previous list items
    searchResultsList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.classList.add("recipe-item-details");

    const recipeName = document.createElement("div");
    recipeName.classList.add("recipe-name");
    // recipeName.innerHTML = `<h4> ${recipe.name} </h4>`;

    const recipeServe = document.createElement("div");
    recipeServe.classList.add("recipe-serve");
    recipeServe.textContent = `Serve: ${recipe.serve}`;

    // Additional rendering for ingredients
    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("recipe-details");

    recipe.ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement("li");
        ingredientItem.classList.add("ingredient-item");
        ingredientItem.textContent = `${ingredient[0]} ${ingredient[1]}`;
        ingredientsList.appendChild(ingredientItem);
    });

    listItem.appendChild(recipeName);
    listItem.appendChild(recipeServe);
    listItem.appendChild(ingredientsList);

    searchResultsList.appendChild(listItem);
    setImage(recipe.image_link);
}

function renderRecipes(recipeList, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    recipeList.forEach((recipe) => {
        const listItem = document.createElement("li");
        listItem.className = "recipe-item";
        listItem.innerHTML = `
            <img src="bookmark.png" alt="Bookmark" class="bookmark-icon" ${
                recipe.bookmarked ? 'style="opacity: 1;"' : ""
            }>
            <div class="recipe-details">
                <h4 class="recipe-name">${recipe.name}</h4>
                <p class="recipe-serve">Serve: ${recipe.serve}</p>
                <ul class="ingredient-list">
                    ${recipe.ingredients
                        .map(
                            (ingredient) =>
                                `<li>${ingredient[0]} ${ingredient[1]}</li>`,
                        )
                        .join("")}
                </ul>
            </div>
        `;
        listItem
            .querySelector(".bookmark-icon")
            .addEventListener("click", () => toggleBookmark(recipe, listItem));

        container.appendChild(listItem);
    });
}

// Jay code
function setImage(url) {
    console.log(url);
    var recipe_image = document.getElementById("recipe_image");
    recipe_image.src = url;
}
