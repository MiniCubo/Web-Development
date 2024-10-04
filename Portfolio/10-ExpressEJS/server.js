const express = require("express");
const app = express();
const https = require("https");

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.set('views', __dirname+'/views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name = "";

app.get("/", (req, res) => {
  name = "";
  res.sendFile(__dirname+"/public/html/index.html");
});

app.route("/login")
.get((req, res)=>{
  if(!name){
    name = req.query.name;
  }
  if(name){
    res.render("home", {name, posts});
  }
  else{
    res.redirect("/");
  }
  //res.send(`<h1>Hello ${name}</h1> <p>Security level: GET</p>`);
})
.post((req, res)=>{
  if(!name){
    name = req.body.name2;
  }
  if(name){
    res.render("home", {name, posts});
  }
  else{
    res.redirect("/");
  }
  //res.send(`<h1>Hello ${name}</h1> <p>Security level: POST</p>`);
});

app.post("/post", (req, res)=>{
  var title = req.body.title;
  var content = req.body.content;
  const data = {
    title:title,
    content: content,
    author: name
  };
  posts.push(data);
  res.redirect("/login");
});

app.get("/readMore", (req,res)=>{
  var index = req.query.id;
  res.render("post", {title:posts[index].title, content:posts[index].content, index});
});

app.post("/editPost", (req, res)=>{
  var title = req.body.title;
  var content = req.body.content;
  var author = name;
  var index = req.query.id;

  posts[index].title = title;
  posts[index].content = content;
  posts[index].author = author;
  res.redirect("/login");
});
app.get("/deletePost", (req, res)=>{
  var i = req.query.id;
  var newPosts = []
  posts.forEach((element, index)=>{
    if(index != i){
      newPosts.push(element);
    }
  });
  posts = newPosts;
  res.redirect("/login");
});
app.listen(4000, (err) => {
  console.log("Listening on port 4000");
});
