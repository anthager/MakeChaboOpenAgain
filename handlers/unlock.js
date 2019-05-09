'use strict'
// eslint-disable-next-line no-unused-vars
const { unlockDoor } = process.env.NODE_ENV === 'prod' ? require('../src') : require('../src/mocks')
const aws = require('aws-sdk')
// const { token } = require('./secrets/token')

// const unlockDoor = async () => 'door unlocked, note that it just unlocks and dont open'
// eslint-disable-next-line no-unused-vars
const exec = async (event, context) => {
  const dynamoDb = new aws.DynamoDB.DocumentClient()
  const TableName = process.env.TABLE_NAME
  const waitMS = 8000
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
  console.log(query)
  console.log(query.Items[0])
  const timestamp = query && query.Items[0] && query.Items[0].timestamp
  const success = !timestamp || +new Date() - timestamp > waitMS
  const response = success
    ? await unlockDoor()
    : { success: false, wait: `wait for ${waitMS - (+new Date() - timestamp)} ms` }
  console.log('at dynamo')
  await dynamoDb
    .put({ TableName, Item: { timestamp: +new Date(), success: success + '' } })
    .promise()

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
