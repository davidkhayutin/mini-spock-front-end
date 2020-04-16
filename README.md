This project is designed to demonstrate end to end UI functionality in a React App
This app makes api calls to https://baby-spock.herokuapp.com/ which is a headless CMS
built in Strapi and hosted on Heroku

This project uses Cypress to display ui actions and their results
Cypress allows for useful end to end testing as well as integration testing and unit testing

React comes with its own standard testing library which is similar to Enzyme.

There are multiple ways to test in depth react components, their state, props, and 
expected functionality with user interaction


## How To Use 

1. Clone this repo and run NPM Install
2. Once all the dependencies have installed run NPM run start
3. when your server is running, it should open on http://localhost:3000/
4. in a separate terminal window, run the scrip NPM run cypress - this will open up a cypress directory with a list of the available tests/
5. select a test you would like to view - it should open in a separate browser (if server is not on this   will not work)
6. Use refresh button to watch test run in full

