// look for a file in node_modules called express and give variable express the value of all that code in file express
const express = require('express')

// initialize the Server and Port
const app = express()
const port = 3000

// Global scope variables so that all routes can gain access to them
let queryParamFirstName = null
let queryParamLastName = null
let favoriteMovieList = []
let newMovie = null

// For the assignment, make sure favoriteMovieList is in the global scope
// const favoriteMovieList = [] 

favoriteMovieList = ["Star Wars", "The Avengers", "A random movie"]
const today = new Date()

// Define the default server route (aka "/") for our server
app.get('/', (req, res) => {
    console.log("Default Route")
    res.send(`My name is Luis Espinal. Today is: ${today}`)
})

// An example route for sending a simple string
app.get('/hello-class', (req, res) => {
    console.log("Hello Class Route")
    res.send('Hello Class!')
})

app.get('/favorite-movies', (req, res) => {
    console.log("Favorite Movie Route")
    let movieString = favoriteMovieList.join(', ')
    res.send(`${movieString}`)
})

// This route will get the user's info from the query params and assign those values to the global variables
// Example url: http://localhost:4000/save-user-info?firstName=Timmy&lastName=Turner
app.get('/save-user-info', (req, res) => {
    console.log("Search Route")
    // req.query is an object containing key/value pairs of the query params entered into the url after the ?
    console.log(req.query)

    // These lines are getting the firstName and lastName query param values from req.query
    queryParamFirstName = req.query.firstName
    queryParamLastName = req.query.lastName
    // This res.send() will always send the user info since queryParamFirstName and queryParamLastName are in this route handler function scope
    res.send(`New User Info Saved`)
})

app.get('/show-user-info', (req, res) => {
    console.log('show user info route')
    // This route will only work AFTER /save-user-info has been run
    res.send(`User Info => ${queryParamFirstName} ${queryParamLastName}`)
})

app.get('/add-movie', (req, res) => {
    console.log('add movie route')
    newMovie = req.query.newMovie
    console.log(newMovie)
    favoriteMovieList.push(newMovie)
    // console.log(favoriteMovieList)
    movieString = favoriteMovieList.join(', ')
    console.log(req.query)
    res.send('Saved New movie')
})

// Finally, run the server
app.listen(port, () => {
    // Console.log app listening on port when the server is running
    console.log(`Example app listening on port ${port}`)
})