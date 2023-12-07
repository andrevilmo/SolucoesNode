var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: any, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void; }, next: any) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: "André" }));
});

module.exports = router;