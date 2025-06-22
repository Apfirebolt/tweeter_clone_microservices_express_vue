# Vue Dino App

A simple dinosaur info app to show dino data in form of table using ag-grid and related libraries.

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Table of Contents
1. [Project Briefing](#project-briefing)
2. [Technologies Used](#technologies-used)
3. [Screenshots](#screenshots)
4. [Updates](#updates)
5. [Thank You](#thank-you)

## Project Briefing
Vue Dino App is a simple and interactive application built using Vue 3 and Vite. The app demonstrates modern front-end development practices and serves as a starting point for developers exploring Vue 3's `<script setup>` syntax.

I wanted to test ag-grid community edition for Vue so that is how this project came into existence. Ag-grid makes it easy to sort and filter by individual columns in a table. Below is the sample code used from ag-grid library to display dinosaurs in tabular format, sorting is enabled on all columns plus there is custom theme.

On grid ready is the function triggered to change the default styles of ag-grid when it becomes part of the DOM.

## Technologies Used
- Vue 3
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

## Writing Test cases

Test cases are written using Vitest framework. Install the related dependencies for the testing framework and tweak vite config settings.

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
  server: {
    port: 8080
  }
})
```

## Screenshots

Only one screenshot is added, it is from the homepage and shows the tabular view of Dinosaur.

![Dinosaur Table View](./screenshots/1.png)

## Updates
- **v1.0.0**: Initial release with basic functionality.
- **v1.1.0**: Added new features and improved performance.

## Thank You
Thank you for exploring the Vue Dino App! Feel free to contribute or provide feedback to help improve the project. If you liked this project consider giving it a ⭐

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
