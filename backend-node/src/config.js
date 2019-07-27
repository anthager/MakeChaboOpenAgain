const dotenv = require('dotenv')
dotenv.config()
const defaultConfig = {
  PASSWORD: 'nice',
  LOG: 'nice',
  CSB_URL: 'http://localhost:1111',
  APTUS_URL: 'http://localhost:1111',
  THRESHOLD: 8000,
  nice: 'test',
}
const configs = {
  test: {},
  development: {},
  staging: {},
  production: {},
}

const config = {}
function load() {
  console.log('run load')
  Object.entries(defaultConfig).map(([key, value]) => {
    config[key] = process.env[key] || configs[process.env.NODE_ENV][key] || value
  })
}

module.exports = { config, load }
