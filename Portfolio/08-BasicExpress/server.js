const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded ({ extended : true}))

app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.route("/")
.get((req, res)=>{
    res.render(__dirname + "/index.ejs", {bmi: ""})
})
.post((req, res)=>{
   var w = Number(req.body.weight)
   var h = Number(req.body.height)
   var bmi = w/Math.pow((h),2)
   bmi = Math.round(bmi * 100) / 100
   res.render(__dirname + "/index.ejs", {bmi: bmi})
})

app.listen(3000, ()=>{
    console.log("Listening to port 3000")
})