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
  { code: "ENG", label: "British" },
  { code: "SPA", label: "Spanish" },
  { code: "GER", label: "German" },
  { code: "FRA", label: "French" },
  { code: "MEX", label: "Mexican" },
  { code: "AUS", label: "Australian" },
  { code: "FIN", label: "Finnish" },
  { code: "NET", label: "Dutch" },
  { code: "CAN", label: "Canadian" },
  { code: "MON", label: "Monegasque" },
  { code: "THA", label: "Thai" },
  { code: "JAP", label: "Japanese" },
  { code: "CHI", label: "Chinese" },
  { code: "USA", label: "American" },
  { code: "DEN", label: "Danish" },
  { code: "AUS", label: "Austrian"},
  { code: "SWZ", label: "Swiss"},
  { code: "ITA", label: "Italian"},
  { code: "NAA", label: "N/A"}
];

async function saveTeams(){
  var teams = []
  const readable = fs.createReadStream(__dirname + "/public/data/f1_constructors_2024.csv").pipe(csv.parse({skipRows:1}));
  await Team.deleteMany({});
  readable.on("data", (data)=>{
    const team = {
      id: Number(data[0]),
      name: data[1],
      nationality: data[2],
      url: data[3]
    };
    teams.push(team);
  }).on("end",async ()=>{
    await Team.insertMany(teams).then((value) => {
      //console.log("Teams saved");
    }).catch((e)=>{
      console.error(`Error: ${e}`);
    });
});
}

async function saveDrivers(){
  var d = []
  const readable = fs.createReadStream(__dirname + "/public/data/f1_drivers_2024.csv").pipe(csv.parse({skipRows:1}));
  await Driver.deleteMany({});
  for await (const data of readable) {
    try {
      var team = await Team.findOne({name: data[data.length-1]});
      const driver = {
        num: Number(data[0]),
        code: data[1],
        forename: data[2],
        surname: data[3],
        dob: new Date(data[4]),
        nationality: data[5],
        url: data[6],
        team: team
      };
      d.push(driver);
    } catch (err) {
      console.error(`Error processing driver: ${data[1]} - ${err}`);
    }
  }
  try {
    await Driver.insertMany(d);
    //console.log("Drivers saved");
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}

var drivers;
var teams;
var Edit = 999999;
var entriesInitialized = false;
var editTeam = 100;

async function checkDriversAndTeams() {
  try {
    drivers = await Driver.find({});
    teams = await Team.find({});
    entriesInitialized = true;
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }
}

var driverList = true;

app.use(async (req, res, next) => {
  if(!entriesInitialized){
  try {
    await saveTeams();
    next();
  } catch (err) {
    console.error("Error saving teams:", err);
  }
}
else next()
}, async (req, res, next) => {
  if (!entriesInitialized){
    try {
      await saveDrivers();
      next();
    } catch (err) {
      console.error("Error saving drivers:", err);
    }
  }else next()
}, async (req, res, next) => {
  if(!entriesInitialized){
    try {
      await checkDriversAndTeams();
      next();
    } catch (err) {
      console.error("Error checking drivers:", err);
    }
  } else next()
}
);

app.get("/", (req, res) => {
  res.render("index", {driverList, drivers, countries, teams, Edit, editTeam});
});

app.get("/edit/:code", (req, res)=>{
  var code = req.params.code;
  Edit = code;
  res.redirect("/");
});

app.get("/toggleTable", (req, res)=>{
  driverList = !driverList;
  res.redirect("/");
})

app.get("/editTeam/:id", (req, res)=>{
  var id = req.params.id;
  editTeam = id;
  res.redirect("/");
});

app.post("/confirmEditDriver/:id", async (req, res) => {
  try {
    var id = Number(req.params.id);
    Edit = 999999;

    var code = req.body.code;
    var forename = req.body.fname;
    var surname = req.body.sname;
    var dob = new Date(req.body.dob);  
    var nationality = req.body.nation;
    var url = req.body.url;
    var teamId = req.body.team;

    var team = await Team.findOne({ id: teamId });

    await Driver.findOneAndUpdate({ num: id }, {
      num: id,
      code: code,
      forename: forename,
      surname: surname,
      dob: dob,
      nationality: nationality,
      url: url,
      team: team
    }, { new: true });

    //console.log("Driver updated");
    await checkDriversAndTeams();
    res.redirect("/");
  } catch (err) {
    console.error(`Error updating the driver: ${err}`);
    res.redirect("/");
  }
});

app.post("/confirmEditTeam/:id", async (req, res) => {
  try {
    var id = Number(req.params.id);
    editTeam = 999999;

    var name = req.body.name;
    var nationality = req.body.nation;
    var url = req.body.url;

    await Team.findOneAndUpdate({ id: id }, {
      id: id,
      name: name,
      nationality: nationality,
      url: url,
    }, { new: true });

    //console.log("Driver updated");
    await checkDriversAndTeams();
    res.redirect("/");
  } catch (err) {
    console.error(`Error updating the team: ${err}`);
    res.redirect("/");
  }
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
