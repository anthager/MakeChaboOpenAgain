const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { logger } = require('../../backend-node/src/shared/utils')
const { PORT } = require('./variables')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(':method :url :status'))
app.use(cookieParser())

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

/**
 * login
 */
app.post('/wp-login.php', (req, res) => {
  if (!req.body || req.body.pwd !== 'nice' || req.body.log !== 'nice') {
    logger(
      `bad body: "${req.body ? 'pwd: ' + req.body.pwd + ', log: ' + req.body.log : 'nonexistent'}"`,
    )
    return res.status(403).send('login was not provided')
  }
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
  logger('login success!!')
  res.status(302).send('hej')
})

/**
 * get aptus url
 */
app.get('/widgets', (req, res) => {
  logger('-------')
  const correctCookies = {
    Fast2User_language: 'sv',
    PHPSESSID: 'ut5h573hif2mneh2scl38radn7',
    wordpress_test_cookie: 'WP+Cookie+check',
    Fast2User_ssoId: 'V2-S2VJS2k3TnR3UTJtWG9Cd2ErUGczdz09',
    Fast2User_ssoIdHash: 'qlprakGJfOCze6LS2O4K3REKqnydOCgCODod8Me1hgo',
    Fast2User_timestamp: '20190211235702',
    Fast2User_timestampHash: 'QVOV0GMiOtgLd2Bn-nAxmDB5OjGYYzp95Ft9Wy7hPBs',
    f2in: 'f2-QVOV0GMiOtgLd2Bn-nAxmDB5OjGYYzp95Ft9Wy7hPBs-f2',
    wordpress_sec_8af54e892ed77e6d1bb89eb523c33785:
      '9606156157%7C1550098622%7C1tzzhstqCT8cyHxVzxMyqv7Rxu9Ehwcd030YnbmkXOU%7Ccc9b88ed08bbc280af56d2b8d6e7a2a10f2733d2c2f7e09fa402cb5d45e27b28',
    wordpress_logged_in_8af54e892ed77e6d1bb89eb523c33785:
      '9606156157%7C1550098622%7C1tzzhstqCT8cyHxVzxMyqv7Rxu9Ehwcd030YnbmkXOU%7Caf17d64ea7b6551bf317dab206a1ca074c562dc25ce7910fc4914f1bef4dafd0',
  }
  const correctQuery = { callback: 'jQuery', widgets: ['aptuslogin@APTUSPORT'] }
  const badCookie = Object.entries(req.cookies).find(([key, val]) => correctCookies[key] !== val)
  const invalidQuery = JSON.stringify(req.query) !== JSON.stringify(correctQuery)
  if (badCookie) {
    logger('bad cookies')
    return res.status(400).json({
      msg: 'bad cookie',
      expected: `${badCookie[0]}: ${correctCookies[badCookie[0]]}`,
      got: `${badCookie[0]}: ${badCookie[1]}`,
    })
  } else if (invalidQuery) {
    logger('bad cookies')
    return res.status(400).json({
      msg: 'bad query',
      expected: JSON.stringify(correctQuery),
      got: JSON.stringify(req.query),
    })
  } else {
    return res.status(302).send(
      `jQuery({"html":{"alert":""},"data":{"aptuslogin@APTUSPORT":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":
        "http://localhost:${PORT}/aptusportal/Account/RemoteLogin?module=Lock&customerName=KV7A1122&timestamp=2019-06-02 18:20:08&hash=5BygwAGsFxW7Nz6kxgCcQn4xStI*"}]},
        "aptuslogin":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":
        "http://localhost:${PORT}/aptusportal/Account/RemoteLogin?module=Booking&customerName=KV7A1122&timestamp=2019-06-02 18:20:08&hash=5BygwAGsFxW7Nz6kxgCcQn4xStI*"}]}},"javascripts":[],
        "messages":[],"events":[],"openWindow":null,"redirectUrl":null,"replaceUrl":null,"CSRFtoken":"d1edf10d-71d9-44d2-8917-99cc652fbfbc","fileResult":null});`,
    )
  }
})

/**
 * get aptus cookies
 */
app.get('/aptusportal/Account/RemoteLogin', (req, res) => {
  const correctQuery = {
    module: 'Lock',
    customerName: 'KV7A1122',
    timestamp: '2019-06-02 18:20:08',
    hash: '5BygwAGsFxW7Nz6kxgCcQn4xStI*',
  }
  const invalidQuery = JSON.stringify(req.query) !== JSON.stringify(correctQuery)
  if (invalidQuery) {
    return res.status(400).json({
      msg: 'bad query',
      expected: JSON.stringify(correctQuery),
      got: JSON.stringify(req.query),
    })
  } else {
    res.cookie('ASP.NET_SessionId', '1dxuv3ne3epk4b04ee4hi5bq', { httpOnly: true })
    res.cookie(
      '.ASPXAUTH',
      `2D3EE8712E8B377395AF7FE09DA34EEF2F89A1D0ED1EC039CCA27FD749CE3A48047665D209838CA499D535D1138F25FDB9A6FF92CA40F3A28614C706B87EF5D1AC9F03EA1CA1A0BDDCB2B969370528219A8A8C5250DEEA2762886F4451A0F531`,
      { httpOnly: true },
    )
    return res.status(302).send('hej')
  }
})

/**
 * unlock the door
 */
app.get('/AptusPortal/Lock/UnlockEntryDoor/116402', (req, res) => {
  const correctCookies = {
    '.ASPXAUTH': `2D3EE8712E8B377395AF7FE09DA34EEF2F89A1D0ED1EC039CCA27FD749CE3A48047665D209838CA499D535D1138F25FDB9A6FF92CA40F3A28614C706B87EF5D1AC9F03EA1CA1A0BDDCB2B969370528219A8A8C5250DEEA2762886F4451A0F531`,
    'ASP.NET_SessionId': '1dxuv3ne3epk4b04ee4hi5bq',
  }
  console.log(req.cookies)
  const badCookie = Object.entries(req.cookies).find(([key, val]) => correctCookies[key] !== val)
  if (badCookie) {
    logger('bad cookie')
    return res.status(400).json({
      msg: 'bad cookie',
      expected: `${badCookie[0]}: ${correctCookies[badCookie[0]]}`,
      got: `${badCookie[0]}: ${badCookie[1]}`,
    })
  } else {
    logger('Success!')
    return res.status(200).json({ StatusText: 'Dörren är upplåst', HeaderStatusText: 'Status' })
  }
})
