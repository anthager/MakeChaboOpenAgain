/* eslint-disable no-console */
const logger = (msg, type = 'log') => {
  if (process.env.NODE_ENV !== 'test') {
    switch (type) {
      case 'debug': {
        return console.log(msg)
      }
      case 'error': {
        return console.error(msg)
      }
    }
  }
}

module.exports = { logger }
