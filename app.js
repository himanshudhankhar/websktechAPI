var cookieSession = require('cookie-session')
var express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
var path=require("path");
var bodyParser = require('body-parser');
var app = express()
const jwt = require('jsonwebtoken');

var verifyToken =require('./verifyJWT');

require('dotenv').config({path:path.join(__dirname, '.env')}); //to load variables in process.env from a .env file

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({
  origin: process.env.FRONT_URL,
  optionsSuccessStatus: 200 ,
  credentials:true

}))
 
app.use(cookieParser());

app.use("*",function(req,res,next){

console.log('cookies',req.cookies);

next();

})



app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.post('/user/authenticate',(req,res)=>{
  // console.log('data',req.body);

//after validation of data from req.body this can be used 

var id="1234";
var firstname="Himanshu";
var creationTime = new Date().getTime();
const expiration = process.env.DB_ENV === 'testing' ?  100 : 30*60*1000;
  const token = jwt.sign({ id, firstname,creationTime }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? 100 :  30*60,
  });

 console.log(token);

res.cookie('token', token, { maxAge: 30*60*1000, httpOnly: false,signed:false });

res.send({
  id: '43321',
  firstname: 'himanshu',
  actionSuccess:true,
  authenticated:true
});


 

});



app.get('/ping',(req,res)=>{
  console.log(req.cookies);
  res.send("Hi");
});



//All requests except the above ones will have to verify the token 
app.use(verifyToken);


//all requests except the above ones should be forwarded to the java spring server
//so that there can be some communication between the two
app.all('*',(req,res)=>{
  res.redirect(process.env.JAVA_SERVER_ADDR);
});
  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));