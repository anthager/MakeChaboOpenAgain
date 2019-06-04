const { logger } = require('../shared/utils')
const mockUrlPayload = `jQuery({"html":{"alert":""},"data":{"aptuslogin@APTUSPORT":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":"https://apt-www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin?module=Lock&customerName=KV7A1122&timestamp=2019-02-11 23:57:03&hash=WtIN3soStBBxPdEwt_2PRv8NZ34*"}]},"aptuslogin":{"objekt":[{"objektNr":"KV7A1122 Kemivägen 7A","aptusUrl":"https://apt-www.chalmersstudentbostader.se/aptusportal/Account/RemoteLogin?module=Booking&customerName=KV7A1122&timestamp=2019-02-11 23:57:03&hash=WtIN3soStBBxPdEwt_2PRv8NZ34*"}]}},"javascripts":[],"messages":[],"events":[],"openWindow":null,"redirectUrl":null,"replaceUrl":null,"CSRFtoken":"3c81320f-9d2d-463d-b950-69369b345807","fileResult":null});`

const mockCookies =
  'Fast2User_language=sv; path=/; secure; httponly, PHPSESSID=57898kdipe7031k8etc8hb95d0; path=/, wordpress_test_cookie=WP+Cookie+check; path=/; secure, Fast2User_ssoId=V2-S2VJS2k3TnR3UTJtWG9Cd2ErUGczdz09; path=/; secure; httponly, Fast2User_ssoIdHash=Nv0em1xe_4G63bMRPaI2dSD_DHuQsaVPD7Ka2GEbwv8; path=/; secure; httponly, Fast2User_timestamp=20190211233221; path=/; secure; httponly, Fast2User_timestampHash=gXvNrvDzDMdV34ka-psJ4tH2XdCTp67Px4orhKDhtfc; path=/; secure; httponly, f2in=f2-gXvNrvDzDMdV34ka-psJ4tH2XdCTp67Px4orhKDhtfc-f2; path=/; secure, wordpress_sec_8af54e892ed77e6d1bb89eb523c33785=9606156157%7C1550097141%7CSfdJw1ThL5JQU4IAaYuEIV5piLDM3w3e9Xkytdqwdj7%7C721eae4993f785106bb572e9a41491ef64accbd4a49fb49b21955a0de9510b32; path=/wp-content/plugins; secure; httponly, wordpress_sec_8af54e892ed77e6d1bb89eb523c33785=9606156157%7C1550097141%7CSfdJw1ThL5JQU4IAaYuEIV5piLDM3w3e9Xkytdqwdj7%7C721eae4993f785106bb572e9a41491ef64accbd4a49fb49b21955a0de9510b32; path=/; secure; httponly, wordpress_logged_in_8af54e892ed77e6d1bb89eb523c33785=9606156157%7C1550097141%7CSfdJw1ThL5JQU4IAaYuEIV5piLDM3w3e9Xkytdqwdj7%7C72d4603bf8c26bd8fe7d04929c86436b482405ed658c1fcd30d9319ea5d184a3; path=/; secure; httponly'

const mockAptusCookies =
  'ASP.NET_SessionId=1dxuv3ne3epk4b04ee4hi5bq; path=/; HttpOnly, .ASPXAUTH=2D3EE8712E8B377395AF7FE09DA34EEF2F89A1D0ED1EC039CCA27FD749CE3A48047665D209838CA499D535D1138F25FDB9A6FF92CA40F3A28614C706B87EF5D1AC9F03EA1CA1A0BDDCB2B969370528219A8A8C5250DEEA2762886F4451A0F531; path=/; HttpOnly'

const unlockDoor = (doorID, delay = 2500) =>
  new Promise(res => {
    setTimeout(() => {
      logger('mock unlock call')
      res({ success: true })
      return
    }, delay)
  })
module.exports = { mockUrlPayload, mockCookies, mockAptusCookies, unlockDoor }
