/**
 * Reads environment variables from .env
**/

require('dotenv').config(); //if commented then - replaced with '-r dotenv/config' preloading (allows to work without .env file)

/**
 * Export all of gathered environment variables
**/

module.exports = {
	PORT: process.env.PORT,
};