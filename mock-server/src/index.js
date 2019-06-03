const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { PORT } = require('./variables')

const app = express()
app.use(morgan(':method :url :status'))
app.use(cookieParser())

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

/**
 * login
 */
app.post('/wp-login.php', (req, res) => {
  res.cookie('Fast2User_language', 'sv', { secure: true, httpOnly: true })
  res.cookie('PHPSESSID', 'ut5h573hif2mneh2scl38radn7')
  res.cookie('wordpress_test_cookie', 'WP+Cookie+check', { secure: true })
  res.cookie('Fast2User_ssoId', 'V2-S2VJS2k3TnR3UTJtWG9Cd2ErUGczdz09', {
    secure: true,
    httpOnly: true,
  })
  res.cookie('Fast2User_ssoIdHash', 'qlprakGJfOCze6LS2O4K3REKqnydOCgCODod8Me1hgo', {
    secure: true,
    httpOnly: true,
  })
  res.cookie('Fast2User_timestamp', '20190211235702', { secure: true, httpOnly: true })
  res.cookie('Fast2User_timestampHash', 'QVOV0GMiOtgLd2Bn-nAxmDB5OjGYYzp95Ft9Wy7hPBs', {
    secure: true,
    httpOnly: true,
  })
  res.cookie('f2in', 'f2-QVOV0GMiOtgLd2Bn-nAxmDB5OjGYYzp95Ft9Wy7hPBs-f2', { secure: true })
  res.cookie(
    'wordpress_sec_8af54e892ed77e6d1bb89eb523c33785',
    '9606156157%7C1550098622%7C1tzzhstqCT8cyHxVzxMyqv7Rxu9Ehwcd030YnbmkXOU%7Ccc9b88ed08bbc280af56d2b8d6e7a2a10f2733d2c2f7e09fa402cb5d45e27b28',
    { secure: true, httpOnly: true, path: '/wp-content/plugins' },
  )
  res.cookie(
    'wordpress_sec_8af54e892ed77e6d1bb89eb523c33785',
    '9606156157%7C1550098622%7C1tzzhstqCT8cyHxVzxMyqv7Rxu9Ehwcd030YnbmkXOU%7Ccc9b88ed08bbc280af56d2b8d6e7a2a10f2733d2c2f7e09fa402cb5d45e27b28',
    { secure: true, httpOnly: true },
  )
  res.cookie(
    'wordpress_logged_in_8af54e892ed77e6d1bb89eb523c33785',
    '9606156157%7C1550098622%7C1tzzhstqCT8cyHxVzxMyqv7Rxu9Ehwcd030YnbmkXOU%7Caf17d64ea7b6551bf317dab206a1ca074c562dc25ce7910fc4914f1bef4dafd0',
    { secure: true, httpOnly: true },
  )
  res.status(302).send('hej')
})

/**
 * get aptus url
 */
app.get('/widgets', (req, res) => {
  const correct = {
    PHPSESSID: 'mahodvd5ct6ccb8s1foghfjkd6',
    __utmc: '77924038',
    wordpress_test_cookie: 'WP+Cookie+check',
    __utmz: '77924038.1556802487.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
    PLAY_SESSION:
      '2331d5852285a7e60d1892b7c8b6951eb5853951-Fast2User_session=V2-S2VJS2k3TnR3UTJtWG9Cd2ErUGczdz09&uuid=c1f1de3f-d708-4380-8953-ef611528a9a1',
    __utma: '77924038.1281765984.1556802487.1559196793.1559489289.16',
    __utmt: '1',
    f2in: 'f2-SM3GUaZSYNJlsnZvNpEeV1ltPxPNTM4fJCAi7dEB8X4-f2',
    Fast2User_language: 'sv',
    __utmb: '77924038.4.10.1559489289',
  }
  const badCookie = Object.entries(req.cookies).find(([key, val]) => correct[key] !== val)
  const invalidQuery =
    JSON.stringify(req.query) !==
    JSON.stringify({ callback: 'jQuery', widgets: ['aptuslogin@APTUSPORT'] })
  if (badCookie) {
    return res.status(400).json({
      msg: 'bad cookie',
      expected: `${badCookie[0]}: ${correct[badCookie[0]]}`,
      got: `${badCookie[0]}: ${badCookie[1]}`,
    })
  } else if (invalidQuery) {
    return res.status(400).json({
      msg: 'bad query',
      expected: JSON.stringify({ callback: 'jQuery', widgets: ['aptuslogin@APTUSPORT'] }),
      got: JSON.stringify(req.query),
    })
  } else {
    return res
      .status(302)
      .send(
        `jQuery({"html":{"alert":""},"data":{"aptuslogin@APTUSPORT":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":"http://localhost:${PORT}?module=Lock&customerName=KV7A1122&timestamp=2019-06-02 18:20:08&hash=5BygwAGsFxW7Nz6kxgCcQn4xStI*"}]},"aptuslogin":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":"https://apt-www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin?module=Booking&customerName=KV7A1122&timestamp=2019-06-02 18:20:08&hash=5BygwAGsFxW7Nz6kxgCcQn4xStI*"}]}},"javascripts":[],"messages":[],"events":[],"openWindow":null,"redirectUrl":null,"replaceUrl":null,"CSRFtoken":"d1edf10d-71d9-44d2-8917-99cc652fbfbc","fileResult":null});`,
      )
  }
})
