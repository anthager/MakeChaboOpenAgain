'use strict'
// eslint-disable-next-line no-unused-vars
const { unlockDoor } = require('./src')
const aws = require('aws-sdk')
// const { token } = require('./secrets/token')

// const unlockDoor = async () => 'door unlocked, note that it just unlocks and dont open'
// eslint-disable-next-line no-unused-vars
const unlock = async (event, context) => {
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
  const { timestamp } = query && query.Items[0]
  const success = !timestamp || +new Date() - timestamp > waitMS
  const response = success
    ? await unlockDoor()
    : `wait for ${waitMS - (+new Date() - timestamp)} ms`
  await dynamoDb
    .put({ TableName, Item: { timestamp: +new Date(), success: success + '' } })
    .promise()

  return {
    statusCode: 200,
    body: response,
  }
}

module.exports = { unlock }
