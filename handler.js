'use strict'
// eslint-disable-next-line no-unused-vars
const { unlockDoor } = require('./src')
const aws = require('aws-sdk')
// const { v4 } = require('uuid')

// eslint-disable-next-line no-unused-vars
const unlock = async (event, context) => {
  // const res = await unlockDoor()
  const dynamoDb = new aws.DynamoDB.DocumentClient()
  // const dynamoDb = process.env.IS_OFFLINE
  //   ? new aws.DynamoDB.DocumentClient({
  //       region: 'localhost',
  //       endpoint: 'http://localhost:8000',
  //     })
  //   : new aws.DynamoDB.DocumentClient()

  const res = await dynamoDb
    .get({
      TableName: 'lastOpened',
      Key: {
        id: 'latest',
      },
    })
    .promise()
  const timestamp = res && res.Item && res.Item.timestamp

  if (!timestamp || +new Date() - timestamp > 20000) {
    console.log('updating with', +new Date())
    await dynamoDb
      .put({ TableName: 'lastOpened', Item: { timestamp: +new Date(), id: 'latest' } })
      .promise()
    return {
      statusCode: 200,
      body: JSON.stringify('nice'),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: false,
      reason: 'recently opened',
      wait: 20000 - (+new Date() - timestamp),
    }),
  }
}

module.exports = { unlock }
