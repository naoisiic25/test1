const searchInput = document.querySelector("#search-input");
const suggestionsList = document.querySelector("#suggestions-list");

const suggestions = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];

function displaySuggestions() {
    const inputValue = searchInput.value.trim();
    suggestionsList.innerHTML = "";

    // if (inputValue) {
    //     suggestionsList.classList.add("show");
    // } else {
    //     suggestionsList.classList.remove("show");
    // }

    for (let i = 0; i < suggestions.length; i++) {
        if (suggestions[i].toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion");
            suggestion.textContent = suggestions[i];
            suggestionsList.appendChild(suggestion);
        }
    }

    const suggestionItems = suggestionsList.querySelectorAll(".suggestion");
    suggestionItems.forEach((item) => {
        item.addEventListener("click", () => {
            suggestionsList.display=none;
            searchInput.value = item.textContent;
        });
    });
}
document.addEventListener("click", (event) => {
    const isClickInsideSearchContainer = searchInput.contains(event.target);
    const isClickInsideSuggestionsList = suggestionsList.contains(event.target);

    if (!isClickInsideSearchContainer && !isClickInsideSuggestionsList) {
        suggestionsList.classList.remove("show");
    }
});

searchInput.addEventListener("input", displaySuggestions);
