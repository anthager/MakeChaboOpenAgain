'use strict'
// eslint-disable-next-line no-unused-vars
const { unlockDoor } = require('../src')
const aws = require('aws-sdk')
// const { token } = require('./secrets/token')

// const unlockDoor = async () => 'door unlocked, note that it just unlocks and dont open'
// eslint-disable-next-line no-unused-vars
const today = async (event, context) => {
  const query = initQuery()
  const successful = aggregate(await query(true, getTimeStampForStartOfToday()))
  const failed = aggregate(await query(false, getTimeStampForStartOfToday()))
  console.log(successful)
  console.log(failed)

  return {
    statusCode: 200,
    body: JSON.stringify({ successful, failed, total: successful + failed }),
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    },
  }
}

const initQuery = () => {
  const dynamoDb = new aws.DynamoDB.DocumentClient()
  const TableName = process.env.TABLE_NAME
  return (val, timestamp) =>
    dynamoDb
      .query({
        TableName,
        KeyConditionExpression: 'success = :success AND #t > :timestamp',
        ScanIndexForward: false,
        ExpressionAttributeNames: {
          '#t': 'timestamp',
        },
        ExpressionAttributeValues: {
          ':success': val + '',
          ':timestamp': timestamp,
        },
      })
      .promise()
}

const getTimeStampForStartOfToday = () => new Date().setUTCHours(22, 0, 0, 0) - 86400000
const aggregate = res => (res && res.Items && res.Items.length) || 0
new Date().toUTCString()

module.exports = { today }
