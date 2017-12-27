const express = require('express');
const hbs = require( 'hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var log = new Date().toString()+`: ${req.method} ${req.url}`;
  fs.appendFileSync("server.log", log + '\n');
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs',{
//     pageTitle : 'Maintenance Page',
//     pageBody : 'This site is currently under maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:"Home Page"
  });
});

/*
app.get('/',(req,res)=>{
  res.send({
    name : "Varun",
    likes : [
      "sport",
      "games",
      "riding"
    ]
  });
});

app.get('/bad',(req,res)=>{
  res.send({responseMessage:"Bad Request"});
});
*/
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"About Page"
  });
});
app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:"Project Page",
    pageBody:"This is project page"
  });
});

app.listen(port, ()=>{
  console.log(`Server Connected to port ${port}`);
});
