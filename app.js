// look for a file in node_modules called 'express' and give variable express the value of all that code in file 'express'
const express = require('express')
const bodyParser = require('body-parser')
// initialize the Server and Port
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// Global scope variables so that all routes can gain access to them
let queryParamFirstName = null
let queryParamLastName = null
// let favoriteMovieList = []
let newMovie = null

// For the assignment, make sure favoriteMovieList is in the global scope
// const favoriteMovieList = [] 

const favoriteMovieList = [{
    title: "Star Wars",
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "The Avengers",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "Dead Pool",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}]
const today = new Date()

/*

CONST (can be anything changed just not repointed to a different location)

LET (used to re-assign the pointer location of the box)
*/

// Define the default server route (aka "/") for our server
app.get('/', (req, res) => {
    console.log("Default Route")
    const myName = 'Luis Espinal'
    const todayFormatted = today.toLocaleDateString()
    res.send(`My name is ${myName}. Today is: ${todayFormatted}`)
})

// An example route for sending a simple string
// app.get('/hello-class', (req, res) => {
//     console.log("Hello Class Route")
//     res.send('Hello Class!')
// })

// app.get('/list-movies', (req, res) => {
//     console.log("Favorite Movie Route")
//     let movieString = favoriteMovieList.join(', ')
//     res.send(`${movieString}`)
// })

// This route will get the user's info from the query params and assign those values to the global variables
// Example url: http://localhost:4000/save-user-info?firstName=Timmy&lastName=Turner
app.post('/save-user-info', (req, res) => {
    console.log("Save User Info Route")
    // req.query is an object containing key/value pairs of the query params entered into the url after the ?
    console.log(req.query)

    // These lines are getting the firstName and lastName query param values from req.query
    queryParamFirstName = req.query.firstName
    queryParamLastName = req.query.lastName
    // This res.send() will always send the user info since queryParamFirstName and queryParamLastName are in this route handler function scope
    res.send(`New User Info Saved`)
})

app.post('/show-user-info', (req, res) => {
    console.log('Show User Info Route')
    // This route will only work AFTER /save-user-info has been ran
    res.send(`User Info => ${queryParamFirstName} ${queryParamLastName}`)
})

// app.get('/add-movie', (req, res) => {
//     // localhost:3000/add-movie?newMovie=Terminator
//     console.log('add movie route')
//     newMovie = req.query.newMovie
//     console.log(newMovie)
//     favoriteMovieList.push(newMovie)
//     console.log(favoriteMovieList)
//     movieString = favoriteMovieList.join(', ')
//     console.log(req.query)
//     res.send('Saved New movie')
// })



// Create

//  Post a new movie into the movies array
app.post("/new-movie", (req, res) => {
    // We'll use 
    console.log("POST to /new-movie")
    console.log("req.body", req.body)

    const newMovie = {
        title: "",
        starRating: 0,
        isRecommended: false,
        createdAt: new Date(),
        lastModified: new Date()
    }

    newMovie.title = req.body.title
    newMovie.starRating = req.body.starRating


    if (req.body.title === undefined) {
        // Should trigger when req.body.isRecommended is undefined
        console.log("title is not defined")
        res.json({
            success: false,
            message: "title is required"
        })
        return;
    } else {
        newMovie.title = req.body.title
    }



    if (req.body.starRating === undefined) {
        // Should trigger when req.body.isRecommended is undefined
        console.log("starRating is not defined")
        res.json({
            success: false,
            message: "starRating is required"
        })
        return;
    } else {
        newMovie.starRating = req.body.starRating
    }



    if (req.body.isRecommended === undefined) {
        // Should trigger when req.body.isRecommended is undefined
        console.log("isRecommended is not defined")
        res.json({
            success: false,
            message: "isRecommended is required"
        })
        return;
    } else {
        newMovie.isRecommended = req.body.isRecommended
    }

    console.log("newMovie", newMovie)

    favoriteMovieList.push(newMovie)
    res.json({
        success: true
    })
})



// Read


// Get all the movies in our movie list
app.get("/all-movies", (req, res) => {
    // res.send only sends strings. From now on, we want to use re.json to send JSON objects or JS arrays
    console.log("GET to /all-movies")
    res.json(favoriteMovieList)
})



// Update


app.put("/update-movie/:titleToUpdate", (req, res) => {
    // We have a route parameter /:titleToUpdate to specify which movie to update
    // The value of this route parameter will come through the req.params object
    console.log("PUT to /update-movie")
    console.log("req params ", req.params)

    const titleToUpdate = req.params.titleToUpdate
    // const newTitle = req.body.newTitle

    const originalMovie = favoriteMovieList.findIndex() // We need to find the original movie in our movie array so that we can keep the original values that we dont want to modify. Hint: we need to use .findIndex()

    const updatedMovie = {
        title: "",
        starRating: 0,
        isRecommended: false,
        lastModified: new Date()
    }

    if (req.body.title) {
        updatedMovie.title = req.body.title
    }
    if (req.body.starRating) {
        updatedMovie.starRating = req.body.starRating
    }
    if (req.body.isRecommended) {
        updatedMovie.isRecommended = req.body.isRecommended
    }

    return;

    console.log(titleToUpdate)
    console.log(newTitle)

    console.log("favoriteMovieList before", favoriteMovieList)
    // In order to update the movie title we are targeting, first we find the index of the movie title in the array
    const indexOfMovie = favoriteMovieList.indexOf(titleToUpdate)
    console.log(indexOfMovie)

    // overwrites the value of favoriteMovieList at indexOfMovie with newTitle
    favoriteMovieList[indexOfMovie] = newTitle
    console.log(favoriteMovieList)

    res.json({
        success: true
    })
})


// Delete

app.delete("/delete-movie/:titleToDelete", (req, res) => {

    //This is t he title of the movie we want to find in the mopvies array and delete
    console.log("DELETE to /delete-movie")
    const titleToDelete = req.params.titleToDelete
    //find the inddex of the movie in the movie list
    const indexOfMovie = favoriteMovieList.indexOf(titleToDelete)
    console.log(indexOfMovie)

    if (indexOfMovie < 0) {
        // if the movie was not found in the array, respond with hasBeenDeleted: false and return so that no code underneath executes
        res.json({
            hasBeenDeleted: false
        })
        return;
    }

    console.log("Before Delete", favoriteMovieList)
    //remove the movie title from the array at the index
    favoriteMovieList.splice(indexOfMovie, 1)
    console.log("After Delete", favoriteMovieList)
    res.json({
        hasBeenDeleted: true
    })
})



// Finally, run the server
app.listen(port, () => {
    // Console.log app listening on port when the server is running
    console.log(`Example app listening on port ${port}`)
})