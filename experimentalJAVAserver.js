//Experimental server to mock the JAVA server 
//for testing of redirecting of requests by app.js server running on port 5000



var cookieSession = require('cookie-session')
var express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyToken = require('./verifyJWT');
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

// below code can be used for restrict access for cross origin
// app.use(
//   cors({
//     origin: [
//       `${process.env.FRONT_URL}`,
//       'http://localhost:3000',
//       'https://mypage.com',
//     ],
//     credentials: true
//   })
// );
app.use(cookieParser());




//this is used to create a session of every request so that session details 
//can be made available in each and every api 
//by accessing req.session or req.sessionOptions
app.use(cookieSession({
  name: 'session',
  keys: ["seckretkey"],

  // Cookie Options
  maxAge:  process.env.NODE_ENV=="development"? 1000 : 30*60*1000, // 30 minutes
  httpOnly:false   
}));




app.use(express.static(path.join(__dirname, 'build')));



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

app.use(verifyToken);


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Java Server started at port ${PORT}`));