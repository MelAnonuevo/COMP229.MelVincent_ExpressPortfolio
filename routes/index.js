// Author: Julio Vinicius
// Date: 2022-01-27

var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET Landing page. */
router.get('/', indexController.home );

/* GET home page. */
router.get('/home', indexController.home);

/* GET Project page. */
router.get('/projects', indexController.projects);

/* GET Services page. */
router.get('/services', indexController.services);

/* GET About page. */
router.get('/about', indexController.about);

/* GET Contact page. */
router.get('/contact', indexController.contact);


module.exports = router;
