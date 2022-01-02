// Dependencies
// =============================================================
const express = require("express");
// Import the 'path' module
const path = require("path");
const dbJson = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes
// =============================================================

// Update the home route to return `index.html`
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("", (req, res) => {
  console.log("in the slash route");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", function (error, dbData) {
    if (error) {
      return console.log(error);
    }
    console.log(dbData);
    return res.json(dbData);
  });
});

// app.get('/api/characters/:character', (req, res) => {
//   const chosen = req.params.character;

//   console.log(chosen);

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  console.log("in the post route");
  fs.readFile("./db/db.json", "utf8", function (error, dbData) {
    if (error) {
      return console.log(error);
    }
    var parsedDbData = JSON.parse(dbData);

    console.log(dbData);
    console.log(dbData.length);
    parsedDbData.push(req.body);
    console.log(parsedDbData);

    fs.writeFile("./db/db.json", JSON.stringify(parsedDbData), (err) => {
      if (err) throw new Error(err);
    });
    res.json(parsedDbData);
  });
  // console.log(newNote);

  // characters.push();
});

app.get("*", (req, res) => {
  console.log("console log 99");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.delete('/api/notes/:id', (req, res) => {
 const deletNote = (req.params.id);
    res.json(notes);

    // fs.writeFile("./db/db.json", JSON.stringify(deleteDbData), (err) => {
    //   if (err) throw new Error(err);
    // });
    // res.json(deleteDbData);
  });

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
