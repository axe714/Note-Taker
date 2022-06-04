const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uuid = require("../helpers/uuid");

//get our notes from the db
router.get("/api/notes", (req, res) => {
  const notes = fs.readFileSync(path.join(process.cwd(), "db/db.json"));
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
    //turns newSaves back into a string
    JSON.stringify(newSaves),
    res.json(newSaves)
  );
});

//DELETES notes inside the DB json file
router.delete("/api/notes/:id", (req, res) => {
  const currentSaves = fs.readFileSync(path.join(process.cwd(), "db/db.json"));
  const parsedSaves = JSON.parse(currentSaves);
  //have to use the .filter method in array to filter out the note that matches the id
  //read this as: for every note in the parsedSaves array, if the id of the note is NOT equal to the id of the req.params.id
  //then keep it in the array, otherwise DELETE the note
  const newSaves = parsedSaves.filter((note) => note.id !== req.params.id);
  fs.writeFileSync(
    path.join(process.cwd(), "db/db.json"),
    JSON.stringify(newSaves),
    res.json(newSaves)
  );
  console.log(`You just did a ${req.method} request!`);
});

module.exports = router;
