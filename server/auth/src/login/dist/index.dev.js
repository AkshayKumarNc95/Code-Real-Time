"use strict";

var router = require("express").Router();

var LoginModel = require("./LoginModel.js");

var crypto = require("../utils/crypto");

var jwtUtils = require('../utils/jwt.js'); // Need to send the JWT token.


router.post("/login", function (req, res) {
  var _req$body = req.body,
      UserName = _req$body.UserName,
      Password = _req$body.Password;
  console.log(req); // Validate User

  LoginModel.checkUser(UserName).then(function (queryRes) {
    if (queryRes.recordset.length <= 0) {
      res.status(401).end("Invalid UserName or Password!");
    }

    var hashedPass = queryRes.recordset[0].pwd;
    var userId = queryRes.recordset[0].id; // Decrypt the Password => And compare

    crypto.isPasswordMatch(Password, hashedPass).then(function (isSame) {
      if (!isSame) {
        res.status(401).end("Invalid UserName or Password!");
      } // Create a JWT token


      var newToken = jwtUtils.getToken(UserName); // Save the token to db

      LoginModel.saveToken(newToken, userId).then(function (result) {
        // Save success ful! 
        // Send token to the user
        res.status(200).send({
          token: newToken,
          userId: userId
        });
      })["catch"](function (err) {
        throw err;
      });
    });
  })["catch"](function (err) {
    throw err;
  });
});
module.exports = router;