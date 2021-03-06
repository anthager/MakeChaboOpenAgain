const fetch = require('node-fetch')
const { pwd, log } = require('./secrets')
const { logger } = require('../shared/utils')

async function getCsbCookies() {
  let cookies
  const res = await fetch('https://www.chalmersstudentbostader.se/wp-login.php', {
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      Connection: 'Keep-Alive',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      Host: 'www.chalmersstudentbostader.se',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual',
    body: `log=${log}&pwd=${pwd}&redirect_to=https%3A%2F%2Fwww.chalmersstudentbostader.se%2Fmin-bostad%2F`,
    method: 'POST',
  })
  res.headers.forEach((a, b) => {
    if (b === 'set-cookie') {
      cookies = a
    }
  })
  logger('fetched csbCookies successfully...')
  const parsed = parseCookies(cookies)
  return parsed
}

async function getUrlToAptus(cookies) {
  const body = await (await fetch(
    'https://www.chalmersstudentbostader.se/widgets/?callback=jQuery&widgets%5B%5D=aptuslogin%40APTUSPORT',
    {
      credentials: 'include',
      headers: {
        accept:
          'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'accept-language': 'sv,sv-SE;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'x-requested-with': 'XMLHttpRequest',
        cookie: cookies,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      },
      referrer: 'https://www.chalmersstudentbostader.se/min-bostad/',
      referrerPolicy: 'no-referrer-when-downgrade',
      method: 'GET',
    },
  )).text()
  logger('fetched aptusUrl successfully...')
  return formatUrl(getUrlFromPayload(body))
}

async function getAptusCookies(url) {
  let cookies
  ;(await fetch(url, {
    credentials: 'omit',
    headers: {
      'upgrade-insecure-requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    },
    referrerPolicy: 'no-referrer-when-downgrade',
    method: 'GET',
    redirect: 'manual',
    mode: 'cors',
  })).headers.forEach((value, key) => {
    if (key === 'set-cookie') {
      cookies = value
    }
  })
  logger('fetched aptusCookies successfully...')
  return parseCookies(cookies)
}

async function _unlockDoor(cookie, doorID) {
  return (await fetch(
    `https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock/UnlockEntryDoor/${doorID}`,
    {
      credentials: 'include',
      headers: {
        accept: '*/*',
        'accept-language': 'sv,sv-SE;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'x-requested-with': 'XMLHttpRequest',
        referer: 'https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        cookie,
      },
      referrer: 'https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock',
      referrerPolicy: 'no-referrer-when-downgrade',
      method: 'GET',
      mode: 'cors',
    },
  )).text()
}

function parseCookies(cookies) {
  return cookies
    .split(',')
    .map(cookie => cookie.split(';')[0])
    .map(cookie => (cookie[0] === ' ' ? cookie.substring(1) : cookie))
    .reduce((acc, val) => `${acc}; ${val}`)
}

function getUrlFromPayload(payload) {
  const reg = new RegExp(
    // eslint-disable-next-line prettier/prettier
    'www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin\\?module=Lock&.+?(?="}]},)',
  )
  return reg.exec(payload).toString()
}

function formatUrl(url) {
  const arr = url.split(' ')
  return `https://apt-${arr[0]}%20${arr[1]}`
}

async function unlockDoor(doorID) {
  try {
    const csbCookies = await getCsbCookies()
    logger('--------------------------')
    const aptusUrl = await getUrlToAptus(csbCookies)
    logger('--------------------------')
    const aptusCookie = await getAptusCookies(aptusUrl)
    logger('--------------------------')
    const unlockMsg = await _unlockDoor(aptusCookie, doorID)
    logger(unlockMsg)
    return { success: true }
  } catch (err) {
    logger(err)
    return { success: false }
  }
}
module.exports = { parseCookies, unlockDoor }
