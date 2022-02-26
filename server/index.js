//Server
//import libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

//define constants
const app = express();
const port = 3001;

//setup middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//image storage
const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, (Date.now() + file.originalname).toString());
  },
});

//image upload
const imageUpload = multer({ storage: imageStorage });

//use static folders
app.use(express.static(__dirname + "/public"));
app.use("/images", express.static("images"));

//get method
app.get("/", (req, res) => {
  res.send("Secret api stuff.");
});

//post method
app.post(
  "/image",
  imageUpload.single("image"),
  (req, res) => {
    console.log(JSON.stringify(req.file));
    res.send("Files uploaded successfully");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
