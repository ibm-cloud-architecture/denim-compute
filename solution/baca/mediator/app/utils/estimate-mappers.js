'use strict'
const utils = require('./general-utils.js')

const mapEstimateData = (retrieveJson, estimateDataMapping, estimatePartMapping) => {
  let estimateResponse = retrieveJson.response
  estimateResponse.data.estimateData = {}

  const kvpData = retrieveJson.kvpData
  // get the top level estimate fields
  for (let dataIdx in estimateDataMapping) {
    estimateResponse.data.estimateData[estimateDataMapping[dataIdx].targetProp] = 
                                getSourceValue(estimateDataMapping[dataIdx].sourceProp, estimateDataMapping[dataIdx].type, kvpData)
  }
  // get the special laborCost field
  estimateResponse.data.estimateData['laborCost'] = extractLaborCost(retrieveJson.tableList.itemsList, estimatePartMapping)
  // get the list of estimate part objects
  estimateResponse.data.estimateData.estimateParts = extractEstimateParts(retrieveJson.tableList.itemsList, estimatePartMapping)

  return estimateResponse
}
// get a data value and map it including parsing out any superfluous whitespace
const getSourceValue = (prop, propType, kvpData) => {
  let retVal
  let matchedKVP = kvpData.filter((kvp) => {
    return (kvp.key === prop)
  })
  if (matchedKVP.length === 1) {
    retVal = utils.removeSpaces(matchedKVP[0].value.trim())
    if (prop === 'vehicle vin') { // used for correlation in BAW
      retVal = retVal.toUpperCase()
    }
    if (propType === 'Integer') {
      retVal = new Number(matchedKVP[0].value.replace(/[^\d.-]/g, ''))
      retVal = Math.round(retVal)
    }
  } else {
    if (propType === 'Integer') {
      retVal = 0
    } else {
      retVal = ''
    }
  }
  return retVal
}
// get a potential part object based on converting table entries
const getCandidatePart = (item, estimatePartMapping) => {
  let part = {}
  for (let partIdx in estimatePartMapping) {
    let partVal = (!!item[estimatePartMapping[partIdx].sourceProp]) ? item[estimatePartMapping[partIdx].sourceProp] : ''
    partVal = partVal.trim()
    if (estimatePartMapping[partIdx].targetProp.toUpperCase() !== 'DESCRIPTION') {
      partVal = utils.removeSpaces(partVal)
    }
    if (estimatePartMapping[partIdx].type === 'Integer') {
      partVal = new Number(partVal.replace(/[^\d.-]/g, ''))
      partVal = Math.round(partVal)
    }
    part[estimatePartMapping[partIdx].targetProp] = partVal
  }
  return part
}
// calculate labor cost from identifying special entries in the table of candidate parts
const extractLaborCost = (items, estimatePartMapping) => {
  let laborCost = 0
  const candidateLaborItems = items.map(item => {
    return getCandidatePart(item, estimatePartMapping)
  }).filter(item => {
    return (!item[estimatePartMapping[0].sourceProp] || item[estimatePartMapping[0].sourceProp].length === 0)
  })
  if (!!candidateLaborItems && candidateLaborItems.length === 1) {
    const desc = candidateLaborItems[0][estimatePartMapping[1].targetProp].toUpperCase()

    if (['LABOR', 'LABOUR'].includes(desc)) {
      try {
        const qty = new Number(candidateLaborItems[0][estimatePartMapping[2].targetProp])
        const unitPrice = new Number(candidateLaborItems[0][estimatePartMapping[3].targetProp])
        laborCost = Math.round(qty * unitPrice)
      } catch (err) {
        console.log(`Error trying to access and convert the laborCost to a number: ${err}`)
      }
    }
  }
  return laborCost
}
// get the vehicle parts in the estimate
const extractEstimateParts = (items, estimatePartMapping) => {
  return items.map(item => {
    return getCandidatePart(item, estimatePartMapping)
  }).filter(item => {
    return (!!item[estimatePartMapping[0].sourceProp] && item[estimatePartMapping[0].sourceProp].length > 0)
  })
}

module.exports = {
  mapEstimateData: mapEstimateData
}