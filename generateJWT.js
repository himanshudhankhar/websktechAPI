const jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken'; 

const generateToken = (req,res, id, firstname) => {
  const expiration = process.env.DB_ENV === 'testing' ? 100 : 30*60*1000;
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? 100 : 30*60*1000,
  });
//cookie and token both expires in same time
console.log(token);
let options = {
    maxAge: expiration, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
}
  res.cookie('token',token,options);
  



};
module.exports = generateToken
