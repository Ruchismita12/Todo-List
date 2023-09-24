const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items=[];
let workItems=[];
app.set("view engine", "ejs"); //required for using ejs
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function (req, res) {
  let today = new Date();
  let currentDay = today.getDay();
  let day = "";

  let options={  //javascript date format
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  day=today.toLocaleDateString("en-US",options);

  res.render("List", { listTitle: day ,newListItems: items });
});
app.post("/",function(req,res){
  let item=req.body.newItem;
  if(req.body.list==="Work"){
workItems.push(item);
res.redirect("/work");
  }
  else{
    console.log(item)
  items.push(item);
  res.redirect("/");  //when post operation takes place, it gets redirected to home route, i.e the app.get portion


  }
  
  
});

app.get("/work",function(req,res){
  res.render("List" , {listTitle:"Work List",newListItems:workItems})
});
app.post("/work",function(req,res){
  let item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})


app.listen(3000, function (req,res) {
  console.log("Server started on port 3000");
});


//Buy food","cook food","eat food
