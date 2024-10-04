const express = require("express");
const app = express();

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.route("/")
    .get((req,res) =>{
        var name = "Gabriel";
        var bmi = 0;
        var shoppingList = ["eggs", "milk", "apples"];
        var students = [{
            "id": 1321,
            "name": "Luisa",
            "lastname": "Fernandez",
            "DOB": "22/11/2001"
        },{
            "id": 2321,
            "name": "Maria",
            "lastname": "Luisa",
            "DOB": "22/02/1999"
        },{
            "id": 3323,
            "name": "Ramón",
            "lastname": "Fernandez",
            "DOB": "03/02/1997"
        }];
        res.render("home", {name, bmi, shoppingList, students});
    })
    .post((req, res)=>{
        var weight = req.body.w;
        var height = req.body.h;
        var bmi = Math.round(100*weight/((height/100)*(height/100)))/100;
        var name = "Gabriel";
        var shoppingList = ["eggs", "milk", "apples"];
        var students = [{
            "id": 1321,
            "name": "Luisa",
            "lastname": "Fernandez",
            "DOB": "22/11/2001"
        },{
            "id": 2321,
            "name": "Maria",
            "lastname": "Luisa",
            "DOB": "22/02/1999"
        },{
            "id": 3323,
            "name": "Ramón",
            "lastname": "Fernandez",
            "DOB": "03/02/1997"
        }];
        res.render("home", {bmi, name, shoppingList, students});
    });


app.get("/about", (req, res) =>{
    res.render("about", {});
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