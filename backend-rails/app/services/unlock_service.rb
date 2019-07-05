# frozen_string_literal: true

require 'httparty'
require 'json'
require 'awesome_print'

class DoorOpenerService
  def initialize(csb_url, aptus_url, pwd, log)
    @csb_url = csb_url
    @aptus_url = aptus_url
    @pwd = pwd
    @log = log
  end

  def unlock_door
    csb_cookies = get_csb_cookies(@csb_url, @pwd, @log)
    aptus_cookie_url = get_aptus_url(@csb_url, csb_cookies)
    aptus_cookies = get_aptus_cookies(aptus_cookie_url)
    ap unlock(@aptus_url, aptus_cookies, '116402')
  end

  private

  def get_csb_cookies(url, pwd, log)
    parse_cookies HTTParty.post(url + '/wp-login.php',
                                body: "log=#{log}&pwd=#{pwd}&redirect_to=https%3A%2F%2Fwww.chalmersstudentbostader.se%2Fmin-bostad%2F",
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded', accept:
                                  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', connection: 'Keep-Alive',
                                           'user-agent' =>
                                   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                                           host: 'www.chalmersstudentbostader.se' },
                                follow_redirects: false).headers['set-cookie']
  end

  def get_aptus_url(url, cookies)
    url += '/widgets/?callback=jQuery&widgets%5B%5D=aptuslogin%40APTUSPORT'
    parse_aptus_url HTTParty.get(url, headers: {
                                   accept:
                                   'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
                                   'accept-language' => 'sv,sv-SE;q=0.9,en-US;q=0.8,en;q=0.7',
                                   'cache-control' => 'no-cache',
                                   pragma: 'no-cache',
                                   'x-requested-with' => 'XMLHttpRequest',
                                   cookie: cookies,
                                   'User-Agent' =>
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                                 })
  end

  def get_aptus_cookies(url)
    parse_cookies HTTParty.get(url, credentials: 'omit',
                                    headers: {
                                      'upgrade-insecure-requests' => '1',
                                      'User-Agent' =>
                      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                                    },
                                    referrerPolicy: 'no-referrer-when-downgrade',
                                    mode: 'cors',
                                    follow_redirects: false).headers['set-cookie']
  end

  def unlock(url, cookies, door_id)
    url += '/AptusPortal/Lock/UnlockEntryDoor/' + door_id
    body = HTTParty.get(url, credentials: 'include',
                             headers: {
                               accept: '*/*',
                               'accept-language' => 'sv,sv-SE;q=0.9,en-US;q=0.8,en;q=0.7',
                               'cache-control' => 'no-cache',
                               pragma: 'no-cache',
                               'x-requested-with' => 'XMLHttpRequest',
                               referer: 'https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock',
                               'User-Agent' =>
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                               cookie: cookies
                             },
                             referrer: 'https://apt-www.chalmersstudentbostader.se/AptusPortal/Lock',
                             referrerPolicy: 'no-referrer-when-downgrade',
                             mode: 'cors').body
    JSON.parse(body)
  end

  def parse_cookies(cookies)
    cookies.split(',')
           .map { |cookie| cookie.split(';')[0] }
           .map(&:strip)
           .reduce { |acc, curr| acc + '; ' + curr }
  end

  def parse_aptus_url(body)
    # removed the 7 first and the 2 last characters
    JSON.parse(body[7..-3])['data']['aptuslogin@APTUSPORT']['objekt'][0]['aptusUrl']
        .split(' ')
        .join('%20')
  end
end

csb_url = 'http://localhost:1111'
aptus_url = 'http://localhost:1111'
# csb_url = 'https://www.chalmersstudentbostader.se'
# aptus_url = 'https://apt-www.chalmersstudentbostader.se'

log = 'nice'
pwd = 'nice'

# url =
DoorOpenerService.new(csb_url, aptus_url, pwd, log).unlock_door
