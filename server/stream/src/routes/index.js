var express = require('express');
var router = express.Router();

const Stream = require('../stream');

router.get('/', function(req, res, next) {
  console.log('Hello');
  res.end('Hello')
});



module.exports = router;
