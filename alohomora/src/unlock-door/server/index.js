const express = require('express')

const app = express()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

app.get('/', (req, res) => {
  console.log(req.headers)
  res.set
  res.status(200).send('hej')
})
app.post('/', (req, res) => {
  console.log(req.headers)

  res.set({
    Date: 'Mon, 11 Feb 2019 12:15:34 GMT',
    Server: 'Apache',
    'Cache-Control': 'no-cache, must-revalidate, max-age=0',
    Expires: 'Wed, 11 Jan 1984 05:00:00 GMT',
    Pragma: 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Set-Cookie': 'wordpress_test_cookie=WP+Cookie+check; path=/; secure',
    Location: 'https://www.chalmersstudentbostader.se/min-bostad/',
    'Content-Length': '0',
    'Keep-Alive': 'timeout=5, max=91',
    Connection: 'Keep-Alive',
    'Content-Type': 'text/html; charset=UTF-8',
  })
  res.status(200).send('hej')
})
