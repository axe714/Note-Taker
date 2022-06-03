const router = require("express").Router()
const path = require("path")
const fs = require("fs")
const uuid = require("../helpers/uuid")

//POSTS inside the DB json file
router.post("/notes", (req, res) => {
    //we have to use process.cwd (CWD stands for current working directory)
    const currentSaves = fs.readFileSync(path.join(process.cwd(), "db/db.json"))

    //reads whats INSIDE the new saves and adds on top of whats inside the current saves
    const newSaves = [...currentSaves, { title: req.body.title, text: req.body.text, id: uuid() }]

    fs.writeFileSync(path.join(process.cwd(), "db/db.json"), json.stringfy(newSaves))
})

module.exports = router
