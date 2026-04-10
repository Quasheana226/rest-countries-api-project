

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

 
 const searchInput = document.getElementById('region-input')

 const filteRegionDropdown = document.getElementById('search-filter')

 let allCountries = []

 searchInput.addEventListener('input', updateCountryResults)
 filteRegionDropdown.addEventListener('change', updateCountryResults)

 function getsearchInput() {
    return searchInput.value.toLowerCase().trim()
 }

 function getFilteInput(){
    return filteRegionDropdown.value
 }