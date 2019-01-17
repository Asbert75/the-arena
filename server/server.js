const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser')

//const users = require("./users.js")
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'build/')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get("/api/users", (req, res) => {
//   users.getAll(function(getAllUsers) {
//     res.send(getAllUsers);
//   })
// })

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log("Listening to port", PORT)
})
