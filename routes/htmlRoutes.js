const path = require("path");
const router = require("express").Router();

//serve our HTML files

//serve our notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
