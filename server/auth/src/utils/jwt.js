const jwt = require('jsonwebtoken');

const secret_key = 'Its A Secret!';

function getToken(user_name){
    return jwt.sign({user_name}, secret_key);
}

function parseToken(token){
    return jwt.verify(token, secret_key);
}

module.exports = {getToken, parseToken}