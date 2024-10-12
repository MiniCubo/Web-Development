const express = require("express");
const app = express();
const https = require("https");
const formData = require("form-data");

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

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
var joke = "";
var found = "";

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something went wrong");
}); 

app.route("/")
    .get((req,res) =>{
        var name = "Gabriel";
        var bmi = 0;
        
        res.render("home", {name, bmi, shoppingList, students, joke, found});
    })
    .post((req, res)=>{
        var weight = req.body.w;
        var height = req.body.h;
        var bmi = Math.round(100*weight/((height/100)*(height/100)))/100;
        var name = "Gabriel";
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

app.post("/add", (req, res)=>{
    var newItem = req.body.item;
    shoppingList.push(newItem);
    res.redirect("/");
});

app.get("/delete/:id/:author", (req, res)=>{
    var index = req.params.id;
    console.log(req.params.author);
    delete shoppingList[index];
    res.redirect("/");
});

app.get("/joke", (req, res)=>{
    var info = "";
    const url = "https://v2.jokeapi.dev/joke/Dark";
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            info += data;
        })
        .on("end", ()=>{
            joke = JSON.parse(info);
            res.redirect("/");
        })
        .on("error", (e)=>{
            res.send("no");
        })
    })
});

app.post("/check", (req, res)=>{
    var word = req.body.word;
    const url = "https://api.toys/api/check_dictionary"
    var form_data = new formData();
    form_data.append("text", word);
    const options = {
        method : "POST",
        headers: form_data.getHeaders()
    };
    var sRequest = https.request(url, options, (response)=>{
        var data = "";
        response.on("data", (chunk)=>{
            data += chunk;
        })
        .on("end", ()=>{
            found = JSON.parse(data);
            res.redirect("/");
        })
        .on("error", (e)=>{
            console.error(`Got an error: ${e.message}`);
            res.redirect("/");
        });
    });
    form_data.pipe(sRequest);

})

app.listen(3000, (req, res)=>{
    console.log("Server started in port 3000");
});