var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/cliente', function(req, res, next) {
  res.send('Retornando um conteúdo de usuários');
});

module.exports = router;
