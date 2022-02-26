//Server code

//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

//setup middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get method
app.get("/", (req, res) => {
  res.send("Secret api stuff.");
});

//post method
app.post("/image", (req, res) => {
  const currentImage = req.body.image;
  res.send("Posting image.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
