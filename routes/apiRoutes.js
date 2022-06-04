const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uuid = require("../helpers/uuid");

//get our notes from the db
router.get("/api/notes", (req, res) => {
  const notes = fs.readFileSync("./db/db.json", "utf8");
  const parsedNotes = JSON.parse(notes);
  res.json(parsedNotes);
  console.log(parsedNotes);
});

//POSTS inside the DB json file
router.post("/api/notes", (req, res) => {
  //we have to use process.cwd (CWD stands for current working directory)
  const currentSaves = fs.readFileSync(path.join(process.cwd(), "db/db.json"));
  //parse the current saves to JSON
  const parsedSaves = JSON.parse(currentSaves);
  console.log(parsedSaves);
  //reads whats INSIDE the new saves and adds on top of whats inside the current saves
  const newSaves = [
    ...parsedSaves,
    {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    },
  ];

  fs.writeFileSync(
    path.join(process.cwd(), "db/db.json"),
    JSON.stringify(newSaves),
    res.json(newSaves)
  );
});

module.exports = router;
