const express = require("express");
const app = express();
var names = []
var tasks = []
var error = null;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.route("/")
.get((req, res)=>{
    res.render(__dirname + "/html/index.html", {error, names, tasks});
})
.post((req, res)=>{
    res.send("Respuesta");
});

app.route("/greet")
.get( (req, res)=>{
    var name = req.query.name;
    //console.log(name);
    names.push(name);
    error = null;
    res.redirect("/");
})
.put((req,res)=>{
    var name = req.query.name;
    names.push(name);
    const data = {
        names: names
    };
    res.write(JSON.stringify(data));
    res.end();
});


app.route("/task")
//This method is to send the info to Postman
.get((req, res)=>{
    const data = {
        tasks: tasks
    };
    var info = JSON.stringify(data);
    res.write(info);
    res.end();
})
//This method is when the user registers a new task
.post( (req,res)=>{
    var task = req.body.task;
    tasks.push(task);
    error = null;
    res.redirect("/");
});

//This method is to delete a task
app.get("/delete", (req,res)=>{
    var index = req.query.source;
    tasks.splice(index, 1);
    error = null;
    res.redirect("/")
    //console.log(index);
});

//This method is to make a task go up
app.get("/up", (req,res)=>{
    var index = Number(req.query.source);
    arrows(index, -1);
    error = null;
    res.redirect("/");
});

//This method is to make a task go down
app.get("/down", (req,res)=>{
    var index = Number(req.query.source);
    arrows(index, 1);
    error = null;
    res.redirect("/");
});

//This method is a personalized salute for each name
app.get("/wazzup", (req,res)=>{
    var index = req.query.source;
    if(index > names.length || index < 0){
        error = "That name doesn't exist. Try with another";
        res.redirect("/");
    }
    else{
        res.render(__dirname + "/html/wazzup.html", {name: names[index]});
    }
    
    //console.log(index);
});

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
});

function arrows(index, sum){
    var tam = tasks.length;
    var element = tasks.splice(index, 1);
    var newTasks = [];
    var det = 0;
    if(sum>0){
        det = tam-1;
    }
    
    for(var i=0; i<tam; i++){
        if(index == det && i == det){
            newTasks.push(element);
        }
        else if(i == (index+sum) ){
            newTasks.push(element);
        }
        else{
            newTasks.push(tasks.shift());
        }
    }
    tasks = newTasks;
}