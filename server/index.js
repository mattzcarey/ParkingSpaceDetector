//Server
//import libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql");
const config = require("./config.js");

//define constants
const app = express();
const port = 3001;

//Secret database stuff
const db = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

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

//post images method
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

//post number of spaces - if computation done on esp
app.post("/sendspaces", (req, res) => {
  //grab values from request
  const cameraid = req.body.cameraid;
  const freespaces = req.body.freespaces;
  console.log("Request to insert: " + freespaces + " at " + cameraid);
  //form the query
  const sqlInsert =
    "INSERT INTO parkingTable (cameraid, freespaces) VALUES (?, ?);";
  //execute query
  db.query(sqlInsert, [cameraid, freespaces], (err, result) => {
    console.log(result + ":" + err);
  });
  res.send("Success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
