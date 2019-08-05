//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// VARIABLES
var menu = {
    imageFile: [],
    pelapor: [],
    laporan: []
};
// END OF VARIABLES

// READ FILES
fs.readFile('menu.json','utf8',function (err,data) {
    if (err) {
        console.log(err);
    } else {
        menu = JSON.parse(data);
    }
});
// END OF READ FILES

// HOME PAGE
app.get("/",function(req,res) {
    res.render("index",{menu:menu});
});
// END OF HOME PAGE

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
