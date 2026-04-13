// Dark Mode/ Light Mode

// Grabbing the dark mode from the html

const darkModebtn = document.getElementById("dark-mode-btn");

//   Checking If the user already picked theme and localstorage saves the data in the browser
const currentTheme = localStorage.getItem("theme");

// If a saved theme is saved then its apply autimatically on the load of the page
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  //If  saved theme is dark then update button to match
  if (currentTheme === "dark") {
    darkModebtn.innerHTML = "Light Mode";
  }
}
// Click on the dark mode button
darkModebtn.addEventListener("click", () => {
  // Theme is currently Active
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme"); // removing theme
    darkModebtn.innerHTML = "Dark Mode"; // Update button text

    localStorage.setItem("theme", "light"); // save
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    darkModebtn.innerHTML = "Light Mode";
    localStorage.setItem("theme", "dark");
  }
});

// Country List And Search Logic//

// Div container for what country will be displayed
const countryListContainer = document.getElementById("country-container");

// search bar input
const searchInput = document.getElementById("search-input");

// Region dropwon
const filteRegionDropdown = document.getElementById("region-filter");

// Array will hold all countries fetched from Api
// Stored here so they can be filtered with out a new api call
let allCountries = [];

//Re-run the filter function everytime the user types in box
searchInput.addEventListener("input", updateCountryResults);

//Re-run the  filter function everytime the user picks a differnt region
filteRegionDropdown.addEventListener("change", updateCountryResults);



//Should Read the search bar  value Lowercase and remove spaces in the search bar
function getSearchInput() {
  return searchInput.value.toLowerCase().trim(); // converts everything to lowercase
}



//Purpose to read which region the user picked 
// Gets the value in the region dropdown
function getFilterInput() {
  return filteRegionDropdown.value; // Empty if none is selected
}



// Searches the country by list by name
function searchResults(countryData, searchQuery) {
  // Country data  full array of countries to search through
  // and Searchquery the letters or words the user typed in search bar

  return countryData.filter((item) => 
    item.name.common.toLowerCase().includes(searchQuery),
  // Get the ountry name from API Data  and check if it contain what the user typed
  );
}




// Purpose to 
// Filter the country list by the regions
function filterResults(countryData, filterOption) {
  // country data array of countries
  //Filter option the region the users picks from the drop down
  return countryData.filter((item) =>
    item.region.toLowerCase().includes(filterOption.toLowerCase().trim()),
  );
}

// Main function that runs every time the user types in the search bar or pick region

function updateCountryResults() {
  const searchTerm = getSearchInput(); // user picked
  const selectedFilter = getFilterInput(); // region Picked
  // Full county list down by region
  const filteredResults = filterResults(allCountries, selectedFilter);

  // Narrow down those regions result by search term
  const searchTermResults = searchResults(filteredResults, searchTerm);

  // final results should render thekm as cards on the page
  displayCountries(searchTermResults);
}

// Fetch all country data and kicks off the display country data //

async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
    ); // Stores Whatever comes back
    console.log(response.status);

    // If Api returns an error status thoww so catch can handle it
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    // Con vert raw reesponse into a ussable javascript array
    const data = await response.json();

    // Store the data in the all countries array so it can be filtered without new api calls
    allCountries = data;

    // Display all countries on the page when it first loads
    displayCountries(data);
  } catch (error) {
    // Show message if the Api fails to load the data for some reason
    countryListContainer.innerHTML =
      "<p>Failed to load countries. Please try again later.</p>";
    console.error("Error fetching countries:", error);
  }
}

// Takes filtered searched array and renders card to the page
function displayCountries(countriesData) {
  // clears cards that was on the page
  countryListContainer.innerHTML = "";

  //loop through every country in the array
  countriesData.forEach((country) => {
    // Create a new button element in the dom
    const countryItem = document.createElement("button");

    countryItem.classList.add("country-item");

    //Real data value directy into the Html
    countryItem.innerHTML = `
        <img src = '${country.flags.png}' alt  = 'Flag of ${country.name.common}'>
        <div class = 'country-quick-info'>
        <h2 class = 'country-name'> ${country.name.common}</h2>
        <p><strong>Population</strong>: ${country.population.toLocaleString()}</p>
        <p><strong>Region</strong>: ${country.region}</p>
        <p><strong>Capital</strong>: ${country.capital?.[0] || "N/A"}</p>
        </div>
        
        `;

    // hide the country list container and show the country details container when a country is clicked
    countryItem.addEventListener("click", () => {
      // Hide the country list container
      countryListContainer.style.display = "none";

      // Show the country details container
      document
        .getElementById("country-details-container")
        .classList.add("show");

      displayCountryDetails(country); // Pass the clicked country data to the details function
    });

    countryListContainer.appendChild(countryItem); // Add the new country card to the page
  });
}

// Display  Country Detaails //
function displayCountryDetails(selectedCountry) {
  const countryDetailsContainer = document.getElementById(
    "country-details-container",
  );

  countryDetailsContainer.innerHTML = `
    <button id = 'back-button' class="back-button">
    <i class='ri-arrow-left-line'></i> Back </button>
    <div class = 'country-details-wrapper'>
        <img src = '${selectedCountry.flags.png}' alt  = 'Flag of ${selectedCountry.name.common}'>
        <div class = 'detailed-info'>
        <h2 class = 'country-name'> ${selectedCountry.name.common}</h2>
        <p><strong>Population</strong>: ${selectedCountry.population.toLocaleString()}</p>
        <p><strong>Region</strong>: ${selectedCountry.region}</p>
        <p><strong>Capital</strong>: ${selectedCountry.capital?.[0] || "N/A"}</p>
        </div>

    </div>`;

  // Add event listener to the back button to return to the country list view
  document.getElementById('back-button').addEventListener('click', () => {
    // show country list container
    countryListContainer.style.display = '';
    // hide country details
    countryDetailsContainer.classList.remove('show');
    //Clear Details
    countryDetailsContainer.innerHTML = '';
  });
}


// Start The APP
fetchCountries();
