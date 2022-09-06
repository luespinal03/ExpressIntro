// look for a file in node_modules called express and give variable express the value of all that code in file express
const express = require('express')

// initialize the Server and Port
const app = express()
const port = 3000

// Define the default server route (aka "/") for our server
app.get('/', (req, res) => {
    console.log("Default Route")
    res.send('Hello World!')
})

app.get('/hello-class', (req, res) => {
    console.log("Hello Class Route")
    res.send('Hello Class!')
})
// Finally, run the server
app.listen(port, () => {
    // Console.log app listening on port when the server is running
    console.log(`Example app listening on port ${port}`)
})