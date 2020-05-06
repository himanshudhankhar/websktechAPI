//import {EditorApi} from '../utils/editorApi.js';

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/register', function(req, res, next) {
	//server register page
	//res.send('respond with a resource');
});

router.get('/addUser', function(req, res, next) {
	/*var registerApi = new EditorApi('registerUser');
	registerApi.data = {'zu': req.userName, 'zp': req.passText, 'zname': req.name};
	registerApi.trigger(function(resp){
		console.log(resp);
	});*/
});

module.exports = router;
