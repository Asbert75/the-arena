const data = {
    user: "arenaUser",
    pass: "arenaPass1"
};
const Client = require("mongodb").MongoClient;
const url = `mongodb://${data.user}:${data.pass}@ds161224.mlab.com:61224/the-arena`;

const database = {
    saveCharacter(character, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err);
                return true;
            }

            let collection = client.db("the-arena").collection("characters");

            collection.updateOne({ uid: character.uid}, 
                { $set: { 
                    class: character.class, 
                    coins: character.coins,
                    level: character.level,
                    experience: character.experience,
                    spells: character.spells,
                    equipment: character.equipment,
                    name: character.name,
                    accountId: character.accountId,
                    uid: character.uid,
                    champion: character.champion
                }}, 
                {upsert: true}, (err, res) => {
                if(err) console.log(err);
                else callback();
                client.close();
            });
        });
    },
    deleteCharacter(uid, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err);
                return true;
            }

            let collection = client.db("the-arena").collection("characters");

            collection.deleteOne({ uid }, (err, res) => {
                if(err) console.log(err);
                else callback();
                client.close();
            });
        });
    },
    getCharacters(id, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err);
                return true;
            }

            let collection = client.db("the-arena").collection("characters");

            collection.find({accountId: id}).toArray((err, docs) => {
                if(err) console.log(err);
                else callback(docs);
                client.close();
            });
        });
    },
    getChampions(callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err);
                return true;
            }

            let collection = client.db("the-arena").collection("champions");

            collection.find({}).toArray((err, docs) => {
                if(err) console.log(err);
                else callback(docs);
                client.close();
            });
        })
    },
    saveChampion(character, callback) {
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                console.log(err);
                return true;
            }

            let collection = client.db("the-arena").collection("champions");

            let date = new Date();
            let killDate = "" + date.getFullYear() + "-" + ("0" + date.getMonth()+1).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + date.getHours() + ":" + date.getMinutes();

            collection.updateOne({uid: character.uid}, 
                { $setOnInsert: { 
                    class: character.class,
                    level: character.level,
                    name: character.name,
                    accountId: character.accountId,
                    date: killDate
                }}, 
                {upsert: true}, (err, res) => {
                if(err) console.log(err);
                else callback();
                client.close();
            });
        });
    }
}

module.exports = database
