const path = request('path')
const router = require("express").Router()

//serve our HTML files
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// serves our homepage 

module.exports = router