/**
  * Dependencies
**/

const path = require('path');
const router = require('express').Router();

/**
  * Routes
**/

/*router for static pages*/
router.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/html/index.html'));
});

router.get('/about', function(req, res){
  res.sendFile(path.join(__dirname + '/html/about.html'));
});

router.get('/projects', function(req, res){
  res.sendFile(path.join(__dirname + '/html/projects.html'));
});

router.get('/contact', function(req, res){
  res.sendFile(path.join(__dirname + '/html/contact.html'));
});

/**
  * Export
**/

module.exports = router;
