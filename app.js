// look for a file in node_modules called express and give variable express the value of all that code in file express
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log("Default Route")
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})