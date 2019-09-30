'use strict'
const moment = require('moment')

const getTS = () => {
	return '[' + moment().format('Y-M-D H:m:s') + ']'
}

const removeSpaces = aStr => {
	return aStr.replace(/\s+/g, '');
}

module.exports = {
	getTS: getTS,
	removeSpaces: removeSpaces
}