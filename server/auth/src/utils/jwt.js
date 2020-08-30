const jwt = require('jsonwebtoken');

const secret_key = 'Its A Secret!';

function getToken(UserName){
    return jwt.sign({UserName}, secret_key);
}

function parseToken(token){
    return jwt.verify(token, secret_key);
}

module.exports = {getToken, parseToken}