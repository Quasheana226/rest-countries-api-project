

// Dark Mode/ Light Mode


// Grabbing the dark mode from the html 

const darkModebtn = document.getElementById('dark-mode-btn')

//   Checking If the user already picked theme and localstorage saves the data in the browser
const currentTheme = localStorage.getItem('theme')

// If a saved theme is saved then its apply autimatically on the load of the page 
if( currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme)

    //If  saved theme is dark then update button to match
    if(currentTheme === 'dark'){
        darkModebtn.innerHTML = 'Light Mode'
    }

}
// Click on the dark mode button
darkModebtn.addEventListener('click', () => {
    
    // Theme is currently Active 
    const currentTheme = document.documentElement.getAttribute('data-theme')

    
    if(currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme') // removing theme
        darkModebtn.innerHTML = 'Dark mode'.  // Update button text

        localStorage.setItem('theme', 'light') // save 
    } else {
        document.documentElement.setAttribute('data-theme', 'dark')
        darkModebtn.innerHTML = 'Light Mode'
        localStorage.setItem('theme', 'dark')
    }
})
// Country List And Search Logic

// Div container for what country will be displayed 
 const  countryListContainer = document.getElementById('country-container')

 // search bar input 
 const searchInput = document.getElementById('region-input')

 // Region dropwon
 const filteRegionDropdown = document.getElementById('search-filter')

 // Array will hold all countries fetched from Api
// Stored here so they can be filtered with out a new api call
 let allCountries = []


 //Re-run the filter function everytime the user types in box 
 searchInput.addEventListener('input', updateCountryResults)

 //Re-run the  filter function everytime the user picks a differnt region
 filteRegionDropdown.addEventListener('change', updateCountryResults)


 //Should Read the search bar  value Lowercase and remove spaces in the search bar 
 function getsearchInput() {
    return searchInput.value.toLowerCase().trim()
 }
// Gets the value in the region dropdown
 function getFilterInput(){
    return filteRegionDropdown.value // Empty if none is selected
 }


 // Searches the country by list by name 
 function searchResults(countryData, searchQuery){ // Country data  full array of countries to search through 
 // and Searchquery the letters or words the user typed in search bar 

    return countryData.filter(item => item.name.toLowerCase().includes(searchQuery))
 }


 // Filter the country list by the regions 
 function filterResults(countryData, filterOption){// country data array of countries 
    //Filter option
    return countryData.filter(item => item.region.toLowerCase().includes(filterOption.toLowerCase().trim()) )
 }

function updateCountryResults(){
    const searchTerm = getSearchInput()
    const selectedFilter = getFilterInput()

    const filteredResults = filterResults(allCountries, selectedFilter)
    const searchTermResults = searchResults(filteredResults, searchTerm)
    
}