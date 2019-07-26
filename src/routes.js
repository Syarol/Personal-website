/**
  * Dependencies
**/

const pug = require('pug');
const path = require('path');
const router = require('express').Router();

/**
 * Precompile pages for faster loading
**/

pug.compileFile(path.join(__dirname + '/views/projects.pug'));

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
  res.render(path.join(__dirname + '/views/projects.pug'));
});

router.get('/contact', function(req, res){
  res.sendFile(path.join(__dirname + '/html/contact.html'));
});

/**
  * Export
**/

module.exports = router;
