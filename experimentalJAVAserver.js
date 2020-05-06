//Experimental server to mock the JAVA server 
//for testing of redirecting of requests by app.js server running on port 5000



var cookieSession = require('cookie-session')
var express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyToken = require('./verifyJWTExperimental');
const loginController = require('./loginController');
require('dotenv').config() //to load variables in process.env from a .env file

var path=require("path");

var app = express()

app.use(express.json());


//this code is used for allowing cross origin access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());





app.use(express.static(path.join(__dirname, 'build')));

app.use(verifyToken);
app.post('/services/getAll',(req,res)=>{
  res.send({
    success: true
  });
})

app.post('/login',(req,res)=>{
loginController(req,res);
});



app.get('/ping',(req,res)=>{
  console.log(req.cookies);
  res.send("Hi");
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



const PORT =   50002;

app.listen(PORT, () => console.log(`Java Server started at port ${PORT}`));