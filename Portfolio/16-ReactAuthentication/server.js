const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const data = require("./data.js");
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookie());

const secretkey = process.env.SECRET_KEY;

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));

const mongoUrl = "mongodb://127.0.0.1:27017/comments";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    movie: String,
    author: String,
    comment: String,
  });
  commentSchema.set("strictQuery", true);

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
});
userSchema.set("strictQuery", true);

const Comment = new mongoose.model("Comment", commentSchema);
const User = new mongoose.model("User", userSchema);

app.get("/", (req, res)=>{
    console.log(req.cookies);
    res.send(data);
});

// const example = {
//     movie: "The phantom menace",
//     author: "Yo",
//     comment: "Me gusto mucho :)",
// };

// Comment.collection.insertOne(example);

app.route("/comments/:title")
.get(async(req, res)=>{
    var movieName = req.params.title;
    const comments = await Comment.find({movie:movieName});
    res.send(comments);
})
.post(async(req, res)=>{
    var movie = req.body.movie;
    var author = req.body.author;
    var comment = req.body.comment;
    const entry = {
        movie: movie,
        author: author,
        comment: comment,
    };
    Comment.collection.insertOne(entry);
    var movieName = req.params.title;
    const comments = await Comment.find({movie:movieName});
    res.send(comments);
});

app.post("/login", async(req, res)=>{
    const {name, password} = req.body;
    try{
        const user = await User.findOne({user: name});
        if(user && user.password == password){
            const token = jwt.sign({name:user.user}, secretkey, {expiresIn:"8h"});
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, 
                sameSite: 'strict',
                maxAge: 8 * 60 * 60 * 1000,
            });
            res.cookie('name', name, {
                httpOnly: false,
                secure: false, 
                sameSite: 'strict',
                maxAge: 8 * 60 * 60 * 1000,
            });
        }
        else{
            return res.status(400).json({ error: "Username doesn't exist or the password is incorrect." });
        }
    }
    catch(error){
        res.send("Internal server error");
    }
});

app.post("/register", async(req, res)=>{
    const {name, password} = req.body;

    const existingUser = await User.collection.findOne({ user: name });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

    const user = {
        user: name,
        password: password,
    };
    User.collection.insertOne(user);

    const token = jwt.sign({ id: user.user }, secretkey, { expiresIn: "8h" });
    res.json({token, name:user.user});
})

app.listen(3500, ()=>{
    console.log("Listening to port 3500");
});