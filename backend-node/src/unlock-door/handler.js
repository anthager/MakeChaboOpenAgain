'use strict'
// eslint-disable-next-line no-unused-vars
const { unlockDoor } = process.env.NODE_ENV === 'prod' ? require('./unlock') : require('./mocks')
const { logger } = require('../shared/utils')
const aws = require('aws-sdk')
// const { token } = require('./secrets/token')

// const unlockDoor = async () => 'door unlocked, note that it just unlocks and dont open'
// eslint-disable-next-line no-unused-vars
const exec = async (event, context) => {
  const dynamoDb = new aws.DynamoDB.DocumentClient()
  const TableName = process.env.TABLE_NAME
  const doorID = (event.queryStringParameters && event.queryStringParameters.doorID) || '116402'

  if (doorID !== '116402' && doorID !== '116400') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, msg: 'badID' }),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
  const waitMS = 10000
  const query = await dynamoDb
    .query({
      TableName,
      Limit: 1,
      KeyConditionExpression: '#success = :success',
      ScanIndexForward: false,
      ExpressionAttributeNames: {
        '#success': 'success',
      },
      ExpressionAttributeValues: {
        ':success': 'true',
      },
    })
    .promise()
  const timestamp = query && query.Items[0] && query.Items[0].timestamp
  const success = !timestamp || +new Date() - timestamp > waitMS
  const response = success
    ? await unlockDoor(doorID)
    : { success: false, wait: waitMS - (+new Date() - timestamp) }
  await dynamoDb
    .put({ TableName, Item: { timestamp: +new Date(), success: success + '' } })
    .promise()
  logger(`opening the door with id ${doorID}`)

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    },
  }
}

module.exports = { exec }
