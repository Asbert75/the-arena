const database = require("./mongo");

const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'build/')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/characters/get/:accountId", (req, res) => {
    database.getCharacters(req.params.accountId, (characters) => {
        res.send(characters);
    });
});

app.delete("/characters/delete/:uid", (req, res) => {
    database.deleteCharacter(req.params.uid, () => {
        res.send({"status": "Character deleted"});
    });
});

app.post("/characters/save", (req, res) => {
    let data = req.body;

    database.saveCharacter(data, () => {
        res.send({"status": "Character saved"});
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log("Listening to port", PORT);
});
