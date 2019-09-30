'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const fsext = require('fs-extra')
const Base64 = require('js-base64').Base64
const multiparty = require('multiparty')
const utils = require('./utils/general-utils.js')
const map = require('./utils/estimate-mappers.js')
const BACAAccessor = require('./baca/BACAAccessor.js')

// Set the serverPort
const serverPort = 8080

// Development only workaround - set an env variable to not check for self signed certificates.
// NB this is not recommended for Production use, it is for this demo scenario only.
// The proper solution should be to put the self-signed certificate in the server's trusted root store OR to get a 
// proper certificate signed by an existing Certificate Authority (which is already trusted by the server).
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// base API path /denim/baca/v1
app.use('/denim/baca/v1', router)


// set the server to listen on the supplied port number
app.listen(serverPort, () => console.log(`${utils.getTS()} App v0.2.0 Listening on port ${serverPort}`))

// Ping test to verify app is contactable
router.get('/ping', (req, res) => {
  console.log(`${utils.getTS()} /denim/baca/v1/ping invoked ...`)
  res.json({
    'message': 'rhocp-baca-mediator up and ready to serve'
  })
})

// Upload a doc for analysis by BACA
router.post('/analyze', async (req, res) => {
  const operPath = '/denim/baca/v1/analyze/'
  console.log(`${utils.getTS()} ${operPath} invoked ...`)
  const claimNumber = (!!req.header('X-Claim-Number')) ? req.header('X-Claim-Number') : 'unknown'
  const bacaAccessor = new BACAAccessor(req.header('X-BACA-Host'))

  // use multiparty node module to get and process file from multipart/form-data
  const form = new multiparty.Form()
  form.on('part', (part) => {
    const fileName = claimNumber + '-' + part.filename
    const filePath = './' + fileName
    part.pipe(fsext.createWriteStream(filePath))
      .on('close', () => {
        console.log(`${utils.getTS()} temporary file ${filePath} written`)
        sendRequest(filePath, fileName)
      })
  })
  form.parse(req)
  // delegate to BACAAccessor class to perform the analysis
  const sendRequest = (filePath, fileName) => {
    bacaAccessor.analyze(getCreds(req), claimNumber, filePath, fileName, res)
    console.log(`${utils.getTS()} ${operPath} completed`)
  }
})

// Get status of a BACA request
router.get('/status/:analyzerId', async (req, res) => {
  const analyzerId = req.params.analyzerId
  const operPath = '/denim/baca/v1/status/' + analyzerId
  console.log(`${utils.getTS()} ${operPath} invoked ...`)
  const bacaAccessor = new BACAAccessor(req.header('X-BACA-Host'))
  // delegate to BACAAccessor class to retrieve the status
  const statusResponse = await bacaAccessor.status(analyzerId, getCreds(req), res)
  res.json(statusResponse)
  console.log(`${utils.getTS()} ${operPath} completed`)
})

// Retrieve the JSON outputs from BACA analysis
router.get('/retrieve/:analyzerId', (req, res) => {
  const analyzerId = req.params.analyzerId
  const operPath = '/denim/baca/v1/retrieve/' + analyzerId
  console.log(`${utils.getTS()} ${operPath} invoked ...`)
  const kvpKeys = ['claim number', 'repairer code', 'vehicle make', 'vehicle model', 'vehicle vin', 'tax rate', 'total']
  const tableKey = 'sku'
  const bacaAccessor = new BACAAccessor(req.header('X-BACA-Host'))
  // delegate to BACAAccessor class to retrieve the analysis results
  bacaAccessor.retrieve(analyzerId, getCreds(req), kvpKeys, tableKey, processBACARetrieve, res)
  console.log(`${utils.getTS()} ${operPath} completed`)
})

// Cleanup BACA resources used
router.delete('/cleanup/:analyzerId', async (req, res) => {
  const analyzerId = req.params.analyzerId
  const operPath = '/denim/baca/v1/cleanup/' + analyzerId
  console.log(`${utils.getTS()} ${operPath} invoked ...`)
  const bacaAccessor = new BACAAccessor(req.header('X-BACA-Host'))
  // delegate to BACAAccessor class to cleanup BACA resources used
  const cleanupResponse = await bacaAccessor.cleanup(analyzerId, getCreds(req), res)
  res.json(cleanupResponse)
  console.log(`${utils.getTS()} ${operPath} completed`)
})

// helper for getting creds
const getCreds = req => {
  return {
    bacaAPIKey: req.header('X-BACA-APIKey'),
    bacaAuth: req.header('X-BACA-Auth')
  }
}

// Process the JSON returned from BACA retrieve
const processBACARetrieve = (retrieveJson, res) => {
  const estimateDataMapping = [{
    sourceProp: 'claim number',
    targetProp: 'claimNumber',
    type: 'String'
  }, {
    sourceProp: 'repairer code',
    targetProp: 'repairerCode',
    type: 'String'
  }, {
    sourceProp: 'vehicle make',
    targetProp: 'vehicleMake',
    type: 'String'
  }, {
    sourceProp: 'vehicle model',
    targetProp: 'vehicleModel',
    type: 'String'
  }, {
    sourceProp: 'vehicle vin',
    targetProp: 'vehicleVIN',
    type: 'String'
  }, {
    sourceProp: 'tax rate',
    targetProp: 'taxPercentage',
    type: 'Integer'
  }, {
    sourceProp: 'total',
    targetProp: 'estimateTotal',
    type: 'Integer'
  }]
  const estimatePartMapping = [{
    sourceProp: 'sku',
    targetProp: 'sku',
    type: 'String'
  }, {
    sourceProp: 'description',
    targetProp: 'description',
    type: 'String'
  }, {
    sourceProp: 'quantity',
    targetProp: 'qty',
    type: 'Integer'
  }, {
    sourceProp: 'item price',
    targetProp: 'price',
    type: 'Integer'
  }]
  const retrieveResponse = map.mapEstimateData(retrieveJson, estimateDataMapping, estimatePartMapping)
  console.log(JSON.stringify(retrieveResponse))
  res.json(retrieveResponse)
}