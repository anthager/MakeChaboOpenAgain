const { getAptusUrlFromPayload } = require('../src/unlock-door/unlock')

describe('payload formating', () => {
  it('should get the correct url from payload', () => {
    const url = getAptusUrlFromPayload(
      `jQuery({"html":{"alert":""},"data":{"aptuslogin@APTUSPORT":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":"https://apt-www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin?module=Lock&customerName=KV7A1122&timestamp=2019-02-11 23:57:03&hash=WtIN3soStBBxPdEwt_2PRv8NZ34*"}]},"aptuslogin":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":"https://apt-www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin?module=Booking&customerName=KV7A1122&timestamp=2019-02-11 23:57:03&hash=WtIN3soStBBxPdEwt_2PRv8NZ34*"}]}},"javascripts":[],"messages":[],"events":[],"openWindow":null,"redirectUrl":null,"replaceUrl":null,"CSRFtoken":"3c81320f-9d2d-463d-b950-69369b345807","fileResult":null});`,
    )
    expect(url).toEqual(
      'https://apt-www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin?module=Lock&customerName=KV7A1122&timestamp=2019-02-11%2023:57:03&hash=WtIN3soStBBxPdEwt_2PRv8NZ34*',
    )
  })
})
