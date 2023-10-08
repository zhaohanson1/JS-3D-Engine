const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);
// create "middleware"
var logger = morgan("combined", { stream: accessLogStream });

// create a write stream (in append mode)
var browserLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/browser.log"),
  { flags: "a" }
);
browserLogStream.on("finish", () => {
  console.log("Write operation complete.");
});

browserLogStream.on("error", (err) => {
  console.error("Error writing to the file:", err);
});

const app = express();
app.use(logger);
// Configure bodyParser to parse JSON data
app.use(bodyParser.json());
// Set up static asset serving for the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Create a POST endpoint to receive data and write it to an error logger
app.post("/log-error", (req, res) => {
  const errorData = req.body.error;

  // Write error data to a log file
  browserLogStream.write(JSON.stringify(errorData) + "\n", "utf8", (err) => {
    if (err) {
      console.error("Error writing to error log:", err);
      res.status(500).send("Error writing to error log");
    } else {
      console.log("Error logged:", errorData);
      res.status(200).send("Error logged successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
