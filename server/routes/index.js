var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', controllers.createUser);

router.get('/userId/:id',controllers.getUserById);

router.get('/users', controllers.getAllUsers);

router.get('/userItems/:id',controllers.getItemsByUser);

router.get('/items',controllers.getAllItems);



module.exports = router;
