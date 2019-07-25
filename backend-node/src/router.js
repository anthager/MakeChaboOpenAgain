const router = require('express').Router()
const { unlock } = require('./controllers/openings.controller')

router.use('/unlock', unlock)

module.exports = router
