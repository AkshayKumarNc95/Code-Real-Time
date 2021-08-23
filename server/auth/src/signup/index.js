const express = require("express");
const validateUserDetails = require("../utils/validator.js");
const router = express.Router();
const crypto = require('../utils/crypto.js');
const { validateUserName, saveUser } = require("./SignUpModel");

// Sign up! 
router.post("/signup", function (req, res) {
  const userDetails = req.body;

  const isVal = validateUserDetails(userDetails);


  if (isVal !== true) {
    return res.status(4).send(isVal);
  }

  validateUserName(userDetails.UserName)
    .then((result) => {
      const count = result.recordset[0].cnt;
      if (count > 0) {
        return res
          .status(405)
          .send(
            `UserName ${userDetails.UserName} is taken! Please choose another name!`
          );
      }

      // Hashed Password
      const hashedPass = crypto.encryptPass(userDetails.Password);

      hashedPass
        .then((hashedPass) => {
          userDetails.Password = hashedPass;

          saveUser(userDetails)
            .then((val) => {
              console.log(`User ${userDetails.UserName} saved!`);
              return res.status(200).end("Save successful!");
            })
            .catch((err) => {
              throw err; 
            });
        })
        .catch((err) => {
            throw err; 
        });
    })
    .catch((e) => {
      throw e;
    });
});


module.exports = router;
