const express = require("express");
const app = express();
const path = require("path");

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
