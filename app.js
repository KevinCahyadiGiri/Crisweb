//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");
const mime = require("mime");
var storage = multer.diskStorage({
    destination: __dirname + '/public/images',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
});
var upload = multer({ storage: storage });

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// VARIABLES
var menu = {
    imagename: [],
    nama: []
};
// END OF VARIABLES

// READ AND WRITE FILES
function readFileFunc() {
    fs.readFile('database/menu.json','utf8',function (err,data) {
        if (err) {
            console.log(err);
        } else {
            menu = JSON.parse(data);
        }
    });
}

function writeFileFunc() {
    var json = JSON.stringify(menu);
    fs.writeFile('database/menu.json',json,'utf8',function(req,res) {
        console.log(json);
    });
}

// END OF READ AND WRITE FILES

// HOME PAGE
app.get("/",function(req,res) {
    readFileFunc();
    res.render("index",{menu:menu});
});
// END OF HOME PAGE

// ADD MENU
app.get("/addmenu",function(req,res) {
    res.render("addmenu");
});
app.post("/addmenu",upload.single('photo'), (req,res) => {
    menu.imagename.push(req.file.filename);
    menu.nama.push(req.body.nama);
    console.log(req.file);
    writeFileFunc();
    res.redirect("/");
});
// END OF ADD MENU

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
