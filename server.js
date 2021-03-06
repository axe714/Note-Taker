const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const path = require('path')
const app = express();

//uses the PORT that heroku uses, OR defaults to 3001
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", htmlRoutes);
app.use("/", apiRoutes);

app.listen(PORT, () =>
  console.log(`Listening on PORT ${PORT}. View it on http://localhost:${PORT}`)
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})
