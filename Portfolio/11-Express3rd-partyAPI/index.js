const express = require("express");
const app = express();

require('dotenv').config();

const https = require("https");

const apiKey = process.env.API_KEY;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.route("/") 
.get((req, res)=>{
    res.render(__dirname + "/index.html");
})
.post((req, res)=>{
    var city = req.body.cityName;

    var lat;
    var lon;
    var country;
    var temp;
    var description;

    const urlEncoding = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    var information = "";

    https.get(urlEncoding, (response) =>{
        response.on("data", (chunk)=>{
            information += chunk;
        })
        response.on("end", () => {

            var data = JSON.parse(information);
            lat = data[0].lat;
            lon = data[0].lon;
            country = data[0].country;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            var weather = https.request(url, (response)=>{
                if(response.statusCode === 200){
                    response.on("data", (data)=>{
                        var info = JSON.parse(data);
                        temp = info.main.temp;
                        //console.log(info);
                        description = info.weather[0].description;
                        var icon = info.weather[0].icon;
                        var imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
                        res.render(__dirname + "/response.html", {nameCity:city, image:imageurl, description: description, temp:Math.round((temp-273.16)*100)/100});
                    });
                    response.on("error", (e)=>{
                        console.error("Error", e);
                    });
                }
                else{
                    res.render(__dirname + "/response.html", {nameCity:"", image:"", description: description,temp:""});
                    console.error("Error");
                }
            });
            weather.end();
        })
        response.on("error",(error) => console.error('Error:', error)); 
    });
    
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});