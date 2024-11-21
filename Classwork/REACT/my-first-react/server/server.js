const express = require("express");
const app = express();
const PORT = 3500;

app.get("/", (req, res)=>{
    res.send("Server is up");
});

const validUsers = ["Adam", "Bob", "Carl"];

app.post("/login", (req, res)=>{
    var user = req.body.user;
    let authorization = {
        user:user,
        status: "Unauthorized",
        statusCode: -1,
    }
    if(validUsers.includes(user)){
        authorization.status = "Authorized";
        authorization.statusCode = 1;
    }
    res.json(authorization);
});

app.listen(PORT, ()=>{
    console.log(`Listening to Port: ${PORT}`);
})