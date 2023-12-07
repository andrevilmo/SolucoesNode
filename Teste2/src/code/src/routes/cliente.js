var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: "André" }));
});
module.exports = router;
