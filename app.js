const express = require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const { time } = require("console");
const { title } = require("process");
mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser:true});
mongoose.connect("mongodb+srv://jsamaan:amaan123@cluster0.vz55wc0.mongodb.net/jsamaan?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true });
const app=express();
const myhome="Hey, this is my homepage, so I have to say something about myself. Sometimes it is hard to introduce yourself because you know yourself so well that you do not know where to start with. Let me give a try to see what kind of image you have about me through my self-description. I hope that my impression about myself and your impression about me are not so different. Here it goes.";
const myselfbreif="I am a person who is positive about every aspect of life. There are many things I like to do, to see, and to experience. I like to read, I like to write; I like to think, I like to dream; I like to talk, I like to listen. I like to see the sunrise in the morning, I like to see the moonlight at night; I like to feel the music flowing on my face, I like to smell the wind coming from the ocean. I like to look at the clouds in the sky with a blank mind, I like to do thought experiment when I cannot sleep in the middle of the night. I like flowers in spring, rain in summer, leaves in autumn, and snow in winter. I like to sleep early, I like to get up late; I like to be alone, I like to be surrounded by people. I like countrys peace, I like metropolis noise; I like the beautiful west lake in Hangzhou, I like the flat cornfield in Champaign. I like delicious food and comfortable shoes; I like good books and romantic movies. I like the land and the nature, I like people. And, I like to laugh.";
const mycontact="6006466047 is my own number you can call me or email me on given Gmail ID-- amaaniqbal3k@gmail.com";



const BlogItems = mongoose.Schema({
  title:String,
  para:String
});

const BlogItem = mongoose.model("BlogItem", BlogItems);


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




app.set("view engine", "ejs");

app.get("/", function(req,res){
  BlogItem.find({ }, function(err, founditem){
    res.render("list", {home:"Home", mybreif:myhome, post:founditem});
  })


});
app.get("/about", function(req,res){
    res.render("about", {mybreif:myselfbreif});
});
app.get("/contact", function(req,res){
    res.render("contact", {mybreif:mycontact});
});
app.get("/compose", function(req,res){
    res.render("compose");
});
app.post("/compose", function(req,res){
  var post = {
    data: req.body.title,
    data2: req.body.post
  };
    
        const item = new BlogItem({
          title:post.data,
          para:post.data2
        });
        item.save();


    res.redirect("/");
})


app.get("/:upper", function(req,res){
      var up=req.params.upper;
      BlogItem.find({title:up }, function(err, founditem){
          
        res.render("list", {home:"",mybreif:"", post:founditem} );
        
      })

})





app.listen("300", function(req, res){
    console.log("Port 3000 is running");
});

