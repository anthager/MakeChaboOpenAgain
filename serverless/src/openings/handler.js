const { getDates } = require('./timeHandling')
const { logger } = require('../shared/utils')
const { initQuery, aggregate } = require('./queryHandling')

;('use strict')
// eslint-disable-next-line no-unused-vars
const exec = async (event, context) => {
  try {
    const { startDate, endDate } = getDates(event.queryStringParameters)
    const query = initQuery()
    const successful = aggregate(await query(true, startDate, endDate))
    const failed = aggregate(await query(false, startDate, endDate))
    return successfulRequest(successful, failed)
  } catch (err) {
    logger(err, 'error')
    switch (err) {
      case 'invalid dates': {
        return unsuccessfulRequest('invalid dates')
      }
      case 'query failed': {
        return unsuccessfulRequest('query failed', 500)
      }
      default: {
        return unsuccessfulRequest('unknown error', 500)
      }
    }
  }
}

const successfulRequest = (successful, failed) => ({
  statusCode: 200,
  body: JSON.stringify({ successful, failed, total: successful + failed, error: false }),
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
})

const unsuccessfulRequest = (msg, statusCode = 400) => ({
  body: JSON.stringify({ error: true, msg }),
  statusCode,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
})

module.exports = { exec }
