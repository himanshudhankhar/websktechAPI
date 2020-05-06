const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const verifyToken = async function(req, res, next)  {
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var fullUrl =  req.originalUrl;
console.log(fullUrl);


if(fullUrl=='/login'||fullUrl=='/register'||fullUrl=="/"||fullUrl=="/user/authenticate"||fullUrl.substr(1,6)=="static"||fullUrl=="/reset"||fullUrl=="/forgot"||fullUrl=="/activate"){
    next();
    return;
}



    console.log("verify token was called");
  const token = req.signedCookies.token ;
  console.log(req.headers,token,req.session);
  try {
    if (!token) {
      
        //   res.status(401).json('You need to Login')
      res.redirect('http://localhost:'+process.env.PORT+'/login');
      return;
    } 
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decrypt,'decrypt');
    req.user = {
      id: decrypt.id,
      firstname: decrypt.firstname,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;