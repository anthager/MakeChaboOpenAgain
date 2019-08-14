/* eslint-disable no-console */
const logger = (msg, type = 'log') => {
  if (process.env.NODE_ENV !== 'test') {
    switch (type) {
      case 'error': {
        return console.error(msg)
      }
      default:
        return console.log(msg)
    }
  }
}

module.exports = { logger }
