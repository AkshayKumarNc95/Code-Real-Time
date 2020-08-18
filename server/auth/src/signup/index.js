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
    res.status(401).send(isVal);
  }

  validateUserName(userDetails.user_name)
    .then((result) => {
      const count = result.recordset[0].cnt;
      if (count > 0) {
        res
          .status(405)
          .send(
            `UserName ${userDetails.user_name} is taken! Please choose another name!`
          );
      }

      // Hashed password
      const hashedPass = crypto.encryptPass(userDetails.password);

      hashedPass
        .then((hashedPass) => {
          userDetails.password = hashedPass;

          saveUser(userDetails)
            .then((val) => {
              console.log(`User ${userDetails.user_name} saved!`);
              res.status(200).end("Save successful!");
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
