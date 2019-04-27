const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
let mongoose = require("mongoose");
let db = require("./models/Books");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googleBooks";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/api/books", function(req, res) {
  db.find({})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
});

app.post("/api/books", function(req, res) {
  db.create(req.body)
      .then(function() {
          res.json({status: 'success'});
      })
      .catch(function(err) {
          console.log(err);
      });
});

app.delete('/api/books/:id', function (req, res) {
  db.deleteOne({_id: req.params.id})
      .then((books) => {
          res.json(books);
      })
      .catch((err) => {
          console.log(err);
      });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
