const express = require('express')

const app = express()

const PORT = process.env.PORT || 1111
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

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
app.post('/', (req, res) => {
  console.log(req.headers)

  res.status(302).send('hej')
})
