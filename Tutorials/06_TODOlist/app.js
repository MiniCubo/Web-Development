const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const encrypt = require("mongoose-encryption");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const secret = process.env.secret;

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var error = "";

mongoose.connect("mongodb://localhost:27017/tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({item: {type: String, required:true}});
taskSchema.plugin(encrypt, {secret: secret});
const workTask = mongoose.model("Work", taskSchema);
const dayTask = mongoose.model("Day", taskSchema);

var items = [];
var workItems = [];

app.get("/", (req, res) => {
  const day = date.getDate();
  dayTask.find({}).then((tasks)=>{
    items = tasks;
    res.render("list", { listTitle: day, newListItems: items, error});
  });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    const task = new workTask({ item });
    task.save().then(()=>{
      workTask.find({}).then((tasks)=>{
        workItems = tasks;
        res.redirect("/work");
      });
    }).catch((err)=>{
      res.redirect("/work");
    });
  } else {
    const task = new dayTask({ item });
    task.save().then(()=>{
      dayTask.find({}).then((tasks)=>{
        items = tasks;
        res.redirect("/");
      });
    }).catch((err)=>{
      res.redirect("/");
    });
}});

app.get("/work", (req, res) => {
  workTask.find({}).then((tasks)=>{
    workItems = tasks;
    res.render("list", { listTitle: "Work List", newListItems: workItems, error});
  });
  
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/work/delete", (req, res)=>{
  var id = req.query.id;
  workTask.deleteOne({_id: id}).then(()=>{
    console.log("Successfully deleted");
    res.redirect("/work");
  });
})

app.post("/day/delete", (req, res)=>{
  var id = req.query.id;
  dayTask.deleteOne({_id: id}).then(()=>{
    console.log("Successfully deleted");
    res.redirect("/");
  });
})

app.get("/deleteCollection", (req, res)=>{
  workTask.collection.drop();
  dayTask.collection.drop();
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
