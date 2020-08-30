const bcrypt = require('bcrypt');

//Encrypt
function encryptPass(Password){
    return bcrypt.hash(Password, 6); 
}

function isPasswordMatch(Password, Password_enc){
    return bcrypt.compare(Password,Password_enc);
}

module.exports = {encryptPass, isPasswordMatch}