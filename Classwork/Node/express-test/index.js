const express = require("express");
const app = express();

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.route("/")
    .get((req,res) =>{
        res.render("home", {bmi: 0});
    })
    .post((req, res)=>{
        var weight = req.body.w;
        var height = req.body.h;
        var bmi = weight/((height/100)*(height/100));
        res.render("home", {bmi : bmi})
    });

app.get("/", (req, res) =>{
    res.send("<h2>Hello World</h2><hr><p>This is just the index </p>");
});

app.get("/about", (req, res) =>{
    res.send("<h1>I am Alvaro Samuel</h1>");
});
app.route("/bmi")
    .get( (req, res)=>{
        res.sendFile(__dirname + "/public/html/index.html");
    })
    .post( (req, res)=>{
        var weight = req.body.w;
        var height = req.body.h;
        var bmi = weight/((height/100)*(height/100));
        res.send("Your BMI is "+ bmi);
    });

app.get("/more", (req,res)=>{
    res.send("More");
});

app.listen(3000, (req, res)=>{
    console.log("Server started in port 3000");
});