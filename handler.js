'use strict'
// eslint-disable-next-line no-unused-vars
const { unlockDoor } = require('./src')
const aws = require('aws-sdk')

// eslint-disable-next-line no-unused-vars
const unlock = async (event, context) => {
  // const res = await unlockDoor()
  const dynamoDb = new aws.DynamoDB.DocumentClient()
  const TableName = process.env.TABLE_NAME
  const waitMS = 10000
  const res = await dynamoDb
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
  const { timestamp } = res && res.Items[0]
  const body =
    !timestamp || +new Date() - timestamp > waitMS
      ? {
          success: 'true',
        }
      : {
          success: 'false',
          reason: 'recently opened',
          wait: waitMS - (+new Date() - timestamp),
        }

  await dynamoDb
    .put({ TableName, Item: { timestamp: +new Date(), success: body.success } })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  }
}

module.exports = { unlock }
