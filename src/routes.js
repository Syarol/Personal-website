/**
  * Dependencies
**/

const {url, dbName} = require('./config.js'); //getting access to environment variables
const pug = require('pug');
const path = require('path');
const router = require('express').Router();

/**
 * DB connection establishing 
**/

const MongoClient = require('mongodb').MongoClient;

var projects;

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, function(err, database) {
	projects = database.db(dbName).collection('projects'); //gets collection from db
});

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
	//gets all elements of collection and render them 
	projects.find({}).toArray(function(err, docs) {
		res.render(path.join(__dirname + '/views/projects.pug'), {
	  	projects: docs
		});
  });
});

router.get('/contact', function(req, res){
  res.sendFile(path.join(__dirname + '/html/contact.html'));
});

/**
  * Export
**/

module.exports = router;
