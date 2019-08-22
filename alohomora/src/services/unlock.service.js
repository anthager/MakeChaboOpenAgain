const fetch = require('node-fetch')

const CSB_URL = process.env.CSB_URL || 'http://localhost:1111'
const APTUS_URL = process.env.APTUS_URL || 'http://localhost:1111'
const LOG = process.env.LOG || 'nice'
const PASSWORD = process.env.PASSWORD || 'nice'

async function getCsbCookies() {
  let cookies
  const res = await fetch(`${CSB_URL}/wp-login.php`, {
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
    body: `log=${LOG}&pwd=${PASSWORD}&redirect_to=https%3A%2F%2Fwww.chalmersstudentbostader.se%2Fmin-bostad%2F`,
    method: 'POST',
  })
  res.headers.forEach((a, b) => {
    if (b === 'set-cookie') {
      cookies = a
    }
  })
  if (!/Fast2User_ssoIdHash.*wordpress_logged_in/.test(cookies)) {
    throw new Error('login failed for some reason')
  }
  const parsed = parseCookies(cookies)
  console.log(`fetched csbCookies successfully: ${parsed}`)
  return parsed
}

async function getUrlToAptus(cookies) {
  const body = await (await fetch(
    `${CSB_URL}/widgets/?callback=jQuery&widgets%5B%5D=aptuslogin%40APTUSPORT`,
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
  const aptusURL = getAptusUrlFromPayload(body)
  console.log(`fetched aptusUrl successfully: ${aptusURL}`)
  return aptusURL
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
  const parsed = parseCookies(cookies)
  console.log(`fetched aptusCookies successfully: ${parsed}`)
  return parsed
}

async function _unlockDoor(cookie, doorID) {
  return (await fetch(`${APTUS_URL}/AptusPortal/Lock/UnlockEntryDoor/${doorID}`, {
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
  })).text()
}

function parseCookies(cookies) {
  return cookies
    .split(',')
    .map(cookie => cookie.split(';')[0])
    .map(cookie => (cookie[0] === ' ' ? cookie.substring(1) : cookie))
    .reduce((acc, val) => `${acc}; ${val}`)
}

function getAptusUrlFromPayload(payload) {
  const urlParts = JSON.parse(payload.substring(7, payload.length - 2)).data[
    'aptuslogin@APTUSPORT'
  ].objekt[0].aptusUrl.split(' ')
  return `${urlParts[0]}%20${urlParts[1]}`
}

async function unlockDoor(doorID = 116402) {
  try {
    const csbCookies = await getCsbCookies()
    console.log('--------------------------')
    const aptusUrl = await getUrlToAptus(csbCookies)
    console.log('--------------------------')
    const aptusCookie = await getAptusCookies(aptusUrl)
    console.log('--------------------------')
    const unlockMsg = await _unlockDoor(aptusCookie, doorID)
    if (unlockMsg !== '{"StatusText":"Dörren är upplåst","HeaderStatusText":"Status"}') {
      console.log(
        `Bad return body,\nexpect: "{"StatusText":"Dörren är upplåst","HeaderStatusText":"Status"}"\ngot: ${unlockMsg}`,
      )
      return { success: false }
    }
    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false }
  }
}
module.exports = { parseCookies, unlockDoor, getAptusUrlFromPayload }
