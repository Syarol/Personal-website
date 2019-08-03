/**
  * Dependencies
**/

const {port} = require('./config.js'); //getting access to environment variables
const path = require('path');
const express = require('express');
const app = express();
const router = require('./routes.js');

app.use(express.static(__dirname));
app.use(router);

app.listen(process.env.PORT || port); //started server listening
