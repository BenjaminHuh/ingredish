const express = require('express');
const app = express(); 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');

const passport = require("passport");
const path = require("path");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Conneced to MongoDB successfully"))
  .catch(err => console.log(err));


const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");
const keywords = require("./routes/api/keywords");


app.use("/api/recipes", recipes);
app.use("/api/users", users);
app.use("/api/keywords", keywords);

// prepare for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// connect to mongoDB


app.use(passport.initialize());
require("./config/passport")(passport);






// listen to :5000 for backend
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));




app.get("/", (req, res) => res.send("App"));