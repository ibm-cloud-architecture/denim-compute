'use strict'
const request = require('request')
const r2 = require('r2')
const fsext = require('fs-extra')
const utils = require('../utils/general-utils.js')
const mapper = require('../utils/mapping-utils.js')
const tblList = require('../utils/tablelist-utils.js')

module.exports = class BACAAccessor {
  constructor(bacaHost) {
    this.bacaBaseURL = 'https://' + bacaHost + '/ca/rest/content/v1/contentAnalyzer/'
    this.bacaDocClass = 'Auto Repair Estimate'
  }

  // upload a PDF document for BACA to analyze
  // NB this has to be synchronous as R2 does not support formData
  analyze(bacaCreds, claimNumber, filePath, fileName, res) {
    // construct the HTTP Headers
    const headers = {
      'content-type': 'multipart/form-data',
      'apiKey': bacaCreds.bacaAPIKey,
      'authorization': bacaCreds.bacaAuth
    }
    // construct the HTTP formData
    const formData = {
      file: {
        value: fsext.createReadStream(filePath),
        options: {
          filename: fileName
        }
      },
      docClass: this.bacaDocClass,
      uniqueId: claimNumber,
      responseType: '\"json\"',
      jsonOptions: '\"ocr\",\"dc\",\"kvp\",\"mt\",\"hr\",\"sn\",\"th\",\"ai\",\"ds\",\"char\"'
    }
    // Set the options to pass to the HTTPRequest
    const options = {
      method: 'POST',
      url: this.bacaBaseURL,
      headers: headers,
      formData: formData
    }
    console.log(`${utils.getTS()} going to invoke ${this.bacaBaseURL}`)
    // invoke the BACA endpoint using request node module
    request(options, (error, response, body) => {
      if (error) {
        this.handleError(error)
      }
      const bodyObj = JSON.parse(body)
      // initialise the response object
      let analyzeResponse = {
        status: {
          code: bodyObj.status.code,
          message: bodyObj.status.message
        },
        data: {},
        errors: []
      }
      // map data or errors depending on the returned status
      if (!!bodyObj.data && bodyObj.status.code === 202) {
        analyzeResponse.responseType = 'Normal'
        analyzeResponse.data = mapper.mapObject(bodyObj.data, ['analyzerId', 'message'])
      } else {
        analyzeResponse.responseType = 'Error'
        analyzeResponse.errors = mapper.mapList(bodyObj.errors, ['errorId', 'explanation', 'action'])
      }
      // remove the temporary file
      fsext.remove(filePath, (err) => {
        if (err) return console.error(err);
        console.log(`${utils.getTS()} temporary file ${filePath} removed`)
      });
      // set the HTTP response
      res.json(analyzeResponse)
    })

  }

  // Get the status of a BACA analyze request
  async status(analyzerId, bacaCreds, res) {
    const bacaURL = this.bacaBaseURL + analyzerId
    // construct the HTTP Headers
    const headers = {
      'apiKey': bacaCreds.bacaAPIKey,
      'authorization': bacaCreds.bacaAuth
    }

    console.log(`${utils.getTS()} going to invoke ${bacaURL}`)
    // invoke the BACA endpoint aynchronously using r2 node module
    try {
      let bodyObj = await r2(bacaURL, {
        headers
      }).json

      let statusResponse = {
        status: {
          code: bodyObj.status.code,
          message: bodyObj.status.message
        },
        data: {},
        errors: []
      }
      // map data or errors depending on the returned status
      if (!!bodyObj.data && bodyObj.status.code === 200) {
        statusResponse.responseType = 'Normal'
        statusResponse.data = mapper.mapObject(bodyObj.data, ['analyzerId', 'message'])
        statusResponse.data.statusDetails = mapper.mapList(bodyObj.data.statusDetails, ['type', 'status', 'description'])
      } else {
        statusResponse.responseType = 'Error'
        statusResponse.errors = mapper.mapList(bodyObj.errors, ['errorId', 'explanation', 'action'])
      }
      // return the response object to the awaiting caller
      return statusResponse
    } catch (err) {
      this.handleError(err)
    }

  }

  // Retrieve the formatted object results of retrieving and parsing the JSON
  retrieve(analyzerId, bacaCreds, kvpKeys, tableKey, cbFnc, res) {
    const bacaURL = this.bacaBaseURL + analyzerId + '/json?attributes=KVPTable,TableList'
    // Set the options to pass to the HTTPRequest
    const options = {
      method: 'GET',
      url: bacaURL,
      headers: {
        'apiKey': bacaCreds.bacaAPIKey,
        'authorization': bacaCreds.bacaAuth
      }
    }
    console.log(`${utils.getTS()} going to invoke ${bacaURL}`)
    // invoke the BACA endpoint using request node module
    request(options, (error, response, body) => {
      if (error) {
        this.handleError(error)
      }
      const bodyObj = JSON.parse(body)
      // initialise the response object
      let retrieveResponse = {
        response: {
          status: {
            code: bodyObj.status.code,
            message: bodyObj.status.message
          },
          data: {},
          errors: []
        }
      }
      // map data or errors depending on the returned status
      if (!!bodyObj.data && bodyObj.status.code === 200) {
        retrieveResponse.response.responseType = 'Normal'
        retrieveResponse.response.data = mapper.mapObject(bodyObj.data, ['analyzerId'])
        retrieveResponse.kvpData = this.mapKVPData(bodyObj, kvpKeys)
        retrieveResponse.tableList = tblList.parseTableList(bodyObj.data.pageList, tableKey)

      } else {
        retrieveResponse.response.responseType = 'Error'
        retrieveResponse.response.errors = mapper.mapList(bodyObj.errors, ['errorId', 'explanation', 'action'])
      }
      // invoke the callback function with the response object
      cbFnc(retrieveResponse, res)
    })
  }

  // cleanup request resources in BACA
  async cleanup(analyzerId, bacaCreds, res) {
    const bacaURL = this.bacaBaseURL + analyzerId
    // construct the HTTP Headers
    const headers = {
      'apiKey': bacaCreds.bacaAPIKey,
      'authorization': bacaCreds.bacaAuth
    }

    console.log(`${utils.getTS()} going to invoke ${bacaURL}`)
    // invoke the BACA endpoint aynchronously using r2 node module
    try {
      let bodyObj = await r2.delete(bacaURL, {
        headers
      }).json
      let cleanupResponse = {
        status: {
          code: bodyObj.status.code,
          message: bodyObj.status.message
        },
        errors: []
      }
      // map data or errors depending on the returned status
      if (!!bodyObj.status && bodyObj.status.code === 200) {
        cleanupResponse.responseType = 'Normal'
      } else {
        cleanupResponse.responseType = 'Error'
        cleanupResponse.errors = mapper.mapList(bodyObj.errors, ['errorId', 'explanation', 'action'])
      }
      // return the response object to the awaiting caller
      return cleanupResponse
    } catch (err) {
      this.handleError(err)
    }

  }

  handleError(err) {
    const explanation = err.code + ' - ' + err.message
    const errorResponse = {
      status: {
        code: 501,
        message: 'An unexpected internal error has occurred'
      },
      data: {},
      errors: [{
        errorId: 'N/A',
        explanation: explanation,
        action: 'N/A'
      }]
    }
    return errorResponse
  }
  
  mapKVPData(bodyObj, kvpKeys) {
    let kvpData = []
    for (let i = 0; i < bodyObj.data.pageList.length; i++) {
      for (let j = 0; j < bodyObj.data.pageList[i].KVPTable.length; j++) {
        let key = bodyObj.data.pageList[i].KVPTable[j].Key
        let keyClass = bodyObj.data.pageList[i].KVPTable[j].KeyClass
        let value = bodyObj.data.pageList[i].KVPTable[j].Value
        console.log(`key: ${key} keyClass: ${keyClass} value: ${value}`)
        if (kvpKeys.includes(keyClass)) {
          let kvpEntry = {
            key: keyClass,
            value: value
          }
          kvpData.push(kvpEntry)
        }
      }
    }
    return kvpData
  }
}