const router = require("express").Router();

const { parseToken } = require("../utils/jwt.js");
const { checkUserToken } = require("../auth/AuthModel");

const { removeUserToken } = require("./logoutModel");

router.get("/logout", (req, res) => {
  // Check for auth
  // Get the token
  const token = req.headers.authorization.replace("Bearer ", "");
  const content = parseToken(token);

  checkUserToken(content.UserName, token).then((results) => {
    const count = results.recordset[0].cnt;

    if (count == 0) {
      res.status(401).send("Token Invalid! Please re-l0gin..");
    }

    // Log out now!
    removeUserToken(content.UserName, token)
      .then((results) => {
        // Delete success!
        console.log(`User token - ${token} removed from the DB. `);

        res.status(200).send("Log Out successful...");
      })
      .catch((err) => {
        // TBD- Add custom message...
        throw err;
      });
  });
});

module.exports = router ;
