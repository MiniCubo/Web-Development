const express = require("express");
const app = express();
const mongoose = require("mongoose");
const data = require("./data.js");
const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const mongoUrl = "mongodb://127.0.0.1:27017/comments";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    movie: String,
    author: String,
    comment: String,
  });
  commentSchema.set("strictQuery", true);

const Comment = new mongoose.model("Comment", commentSchema);
app.get("/", (req, res)=>{
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

app.listen(3500, ()=>{
    console.log("Listening to port 3500");
});