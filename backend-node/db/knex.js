module.exports = require('knex')(require('./knexfile')[process.env.NODE_ENV])
