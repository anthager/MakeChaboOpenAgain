const { parseCookies } = require('./index')
const { mockCookies } = require('./mocks')

describe('index.js', () => {
  it('should parse mockCsbCookies', () => {
    expect(parseCookies(mockCookies)).toEqual(
      'Fast2User_language=sv; PHPSESSID=57898kdipe7031k8etc8hb95d0; wordpress_test_cookie=WP+Cookie+check; Fast2User_ssoId=V2-S2VJS2k3TnR3UTJtWG9Cd2ErUGczdz09; Fast2User_ssoIdHash=Nv0em1xe_4G63bMRPaI2dSD_DHuQsaVPD7Ka2GEbwv8; Fast2User_timestamp=20190211233221; Fast2User_timestampHash=gXvNrvDzDMdV34ka-psJ4tH2XdCTp67Px4orhKDhtfc; f2in=f2-gXvNrvDzDMdV34ka-psJ4tH2XdCTp67Px4orhKDhtfc-f2; wordpress_sec_8af54e892ed77e6d1bb89eb523c33785=9606156157%7C1550097141%7CSfdJw1ThL5JQU4IAaYuEIV5piLDM3w3e9Xkytdqwdj7%7C721eae4993f785106bb572e9a41491ef64accbd4a49fb49b21955a0de9510b32; wordpress_sec_8af54e892ed77e6d1bb89eb523c33785=9606156157%7C1550097141%7CSfdJw1ThL5JQU4IAaYuEIV5piLDM3w3e9Xkytdqwdj7%7C721eae4993f785106bb572e9a41491ef64accbd4a49fb49b21955a0de9510b32; wordpress_logged_in_8af54e892ed77e6d1bb89eb523c33785=9606156157%7C1550097141%7CSfdJw1ThL5JQU4IAaYuEIV5piLDM3w3e9Xkytdqwdj7%7C72d4603bf8c26bd8fe7d04929c86436b482405ed658c1fcd30d9319ea5d184a3',
    )
  })
})
