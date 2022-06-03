const express = require("express")
const htmlRoutes = require("./routes/htmlRoutes")
const app = express();

//uses the PORT that heroku uses, OR defaults to 3001
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use('/', htmlRoutes)








app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))