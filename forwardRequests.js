/*
Component to forward the requests to spring backened


any request which doesnot match the requests which were placed above it will be be sent to the spring backened

*/
var http = require('http');
const  axios = require('axios');
const { AxiosInstance } =require('axios');
const dotenv = require('dotenv');
const tunnel = require('tunnel');
dotenv.config();

const forwardRequests = async function(client_req, client_res, next)  {



var token =client_req.signedCookies.token;

var head= client_req.headers;
head['cookie']='token='+token;
var options = {
    hostname: process.env.JAVA_BASE_URL,
    port: process.env.JAVA_PORT,
    path: client_req.url,
    method: client_req.method,
    headers: head
  };

  var proxy = http.request(options, function (responsed) {
    client_res.writeHead(responsed.statusCode, responsed.headers)
    responsed.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });



}

module.exports = forwardRequests;