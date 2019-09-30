'use strict'
const _ = require('lodash')

const mapObject = (sourceObj, propsList) => {
	return _.pick(sourceObj, propsList)
}

const mapList = (sourceList, propsList) => {
	return sourceList.map(item => {
		return mapObject(item, propsList)
	})
}

module.exports = {
	mapObject: mapObject,
	mapList: mapList
}