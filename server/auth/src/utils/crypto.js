const bcrypt = require('bcrypt');


function encryptPass(password){
    return bcrypt.hash(password, 6); 
}

function isPasswordMatch(password, password_enc){
    return bcrypt.compare(password,password_enc);
}

module.exports = {encryptPass, isPasswordMatch}