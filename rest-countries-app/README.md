# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)


**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview





### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid


**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Somthing I learned New Was the Theme switcher It too me a couple of youtube videos and alot of debugging.

To see how you can add code snippets, see below:

```html
    <button id="dark-mode-btn" class="dark-mode-btn">Dark Mode</button>
```
```css
.dark-mode-btn {
  background: #1e3a8a;
  color: var(--text-primary);
  border-radius: var(--border-radius);
  font-family: "rubik", sans-serif;
  font-weight: 650;
  font-size: medium;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
```
```js
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

```


### Continued development

I wanna get better at plannig my project as far as What features I want on my app or styling the app 

### Useful resources

https://developer.mozilla.org/en-US/

https://prismic.io/blog/css-menus#21-sticky-navigation-with-glass-effect

https://www.youtube.com/watch?v=ucCisTmIUfU

### AI Collaboration



- Claude, 
-  debugging, generating boilerplate, brainstorming solutions



## Reflection Questions

This project I built a Countries APP  using javascript  that fetches live data from the rest countries Api. During the process I stumbled across alot of problems that made Want to walk away from the project. I ran across several bugs that taught me alot. I broke my code a couple of times by redeclaring a function inside of another function.

The biggest takaway learning how to debug my own code more carefully and gave me a better understandinf of async JavaScript  along with Api fetching and Dom Manipulation.
