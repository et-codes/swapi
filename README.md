# Star Wars Character API Search App

_Use this app to browse the vital statistics of your favorite Star Wars characters. Or Jar Jar Binks. It's up to you!_

Try the live app on [Heroku](https://radiant-basin-32050.herokuapp.com/).

![Large Screenshot](src/assets/screenshot-lg.png)

Use the navigation controls on the bottom to go page-by-page, or search for characters using the search bar.

![Search Screenshot](src/assets/screenshot-search.png)

The app is also mobile-friendly.

![Mobile Screenshot](src/assets/screenshot-xs.png)

## Project Info

This app was built with **React** functional components, and styling was done using **React-Bootstrap**. **Axios** is used to request data from the [swapi.dev](https://swapi.dev) Star Wars API.

I implemented caching of the API calls, saving each URL and its response into a map. Each time there is a new API call, the cache is checked first, and if the URL has not been saved, the app will request the data from the API. The cache contents are also saved to local storage, and will be loaded into memory if the last cache update is no more than 72 hours old.

**Author:** Eric Thornton | [LinkedIn](https://www.linkedin.com/in/ethornton/)
