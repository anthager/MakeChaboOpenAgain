const { logger } = require('../shared/utils')
const aws = require('aws-sdk')

const initQuery = () => {
  try {
    const dynamoDb = new aws.DynamoDB.DocumentClient()
    const TableName = process.env.TABLE_NAME
    return (val, start, end) =>
      dynamoDb
        .query({
          TableName,
          KeyConditionExpression: 'success = :success AND #t BETWEEN :start AND :end',
          ScanIndexForward: false,
          ExpressionAttributeNames: {
            '#t': 'timestamp',
          },
          ExpressionAttributeValues: {
            ':success': val + '',
            ':start': start,
            ':end': end,
          },
        })
        .promise()
  } catch (err) {
    logger(err, 'error')
    throw new Error('query failed')
  }
}

const aggregate = res => (res && res.Items && res.Items.length) || 0

module.exports = { initQuery, aggregate }
