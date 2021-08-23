const router = require("express").Router();

const LoginModel = require("./LoginModel.js");

const crypto = require("../utils/crypto");

const jwtUtils = require("../utils/jwt.js");

// Need to send the JWT token.
router.post("/login", (req, res) => {
  const { UserName, Password } = req.body;

  // Validate User
  LoginModel.checkUser(UserName)
    .then((queryRes) => {
      if (queryRes.recordset.length <= 0) {
        res.status(401).end("Invalid UserName or Password!");
      }
      const hashedPass = queryRes.recordset[0].pwd;
      const userId = queryRes.recordset[0].id;
      // Decrypt the Password => And compare
      crypto.isPasswordMatch(Password, hashedPass).then((isSame) => {
        if (!isSame) {
          res.status(401).end("Invalid UserName or Password!");
        }

        // Create a JWT token
        const newToken = jwtUtils.getToken(UserName);

        // Save the token to db
        LoginModel.saveToken(newToken, userId)
          .then((result) => {
            // Save success ful!
            // Send token to the user

            res.status(200).send({ token: newToken, userId });
          })
          .catch((err) => {
            throw err;
          });
      });
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
