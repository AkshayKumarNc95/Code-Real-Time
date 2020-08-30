const router = require('express').Router();

const {parseToken}  = require('../utils/jwt.js');
const { TokenExpiredError } = require('jsonwebtoken');

const {checkUserToken} = require('../auth/AuthModel');

router.get('/Auth', (req, res)=>{
    console.log('Hello there!');
    // The reverse proxy will call request for auth => 
    const auth = req.headers.authorization; 
    const token = auth.replace('Bearer ', '');
    const content = parseToken(token);

    // Check if the token is still valid for the user! 
   
    checkUserToken(content.UserName, token)
    .then(results =>{
        const count = results.recordset[0].cnt; 

        if(count == 0){
            res.status(401).send('Token Invalid! Please re-l0gin..');
        }; 

        res.status(200).end('Authorized!');
    });;
});



module.exports = router;