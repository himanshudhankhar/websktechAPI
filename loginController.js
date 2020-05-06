const generateToken = require('./generateJWT');




//this module will be used as a when some one makes a request for login using email id and password

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;
console.log('body',req.body);
console.log('req cookies',req.cookies);
    try {
        // get user details based on the login parameters

       emailExists(email, password,async (result)=>{
        const {
            id,
            firstname,actionSuccess,authenticated
        } = result;

        // await generateToken(res, id, firstname);
console.log(req.session.cookies);
console.log(req.sessionOptions);
        res.status("ok").send({
            id,firstname,actionSuccess,authenticated
        })
       });

        
        // carry out other actions after generating token like sending a response);
    } catch (err) {
        return res.status(500).json(err.toString());
    }
};
// loginController.js file

async function emailExists(email, password,callback) {
    //this function can be changed to access DB
    setTimeout(() => {
        callback( {
            id: '43321',
            firstname: 'himanshu',
            actionSuccess:true,
            authenticated:true
        })
    }, 1000);

}
module.exports = login