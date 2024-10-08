const express = require("express");
const app = express();
const mongoose = require("mongoose");

const fs = require("fs");
const csv = require("fast-csv");
const { elements } = require("chart.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

async function saveTeams(){
  const readable = fs.createReadStream(__dirname + "/public/data/f1_constructors_2024.csv").pipe(csv.parse({skipRows:1}));
  readable.on("data", (data)=>{
      readable.pause();
      teamEntry(data, readable);
});
}

async function teamEntry(data, readable){
  return new Promise(async() => {
    const scuderia = new Team({
      id: Number(data[0]),
      name: data[1],
      nationality: data[2],
      url: data[3]
    });
    /*Team.exists({ name:data[1] }).then((entryExists)=>{
      if (!entryExists) {
        scuderia.save();
      }*/
    await scuderia.save();
    readable.resume();
    });
  }

async function saveDrivers(){
  const readable = fs.createReadStream(__dirname + "/public/data/f1_drivers_2024.csv").pipe(csv.parse({skipRows:1}));
  readable.on("data", (data)=>{
      readable.pause();
      driverEntry(data, readable);
    });
}

function driverEntry(data, readable){
  return new Promise( async (resolve)=>{
    await Team.findOne({name: data[data.length-1]}).then(async (team)=>{
      const driver = new Driver({
        num: Number(data[0]),
        code: data[1],
        forename: data[2],
        surname: data[3],
        dob: new Date(data[4]),
        nationality: data[5],
        url: data[6],
        team: team
      });
     /* Driver.exists({ code:data[1] }).then((entryExists)=>{
        if (!entryExists) {
          driver.save();
        }*/
      await driver.save();
      readable.resume();
      });
    });
  }


var drivers;
var tempdrivers = [];
var addrivers = [];
var deldrivers = [];

async function checkDrivers() {
  try {
    tempdrivers = await Driver.find({});
    tempdrivers.forEach((element)=>{
      if(addrivers.includes(element)){
        deldrivers.push(element._id);
      }
      else{
        addrivers.push(element);
      }
    });
    drivers = addrivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }
}

function deleteEntries(array){
  deldrivers.forEach((element)=>{
    Driver.deleteOne({_id:element});
  });
}

async function db(){
  await saveTeams();
  await saveDrivers();
  await checkDrivers();
}


function restartDb(){
  Driver.collection.drop();
  Team.collection.drop();
} 

function a(){
  restartDb();
}

// a();
db();

var driverList = true;

app.get("/", (req, res) => {
  deleteEntries();
  res.render("index", {driverList:driverList, drivers:drivers});
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
