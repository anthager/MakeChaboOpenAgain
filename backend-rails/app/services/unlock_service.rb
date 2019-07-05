# frozen_string_literal: true

require 'httparty'
require 'json'
require 'awesome_print'

class DoorOpenerService
  def initialize(url)
    @url = url
  end

  def open_door
    cookies = get_csb_cookies(@url)
    aptus_url = get_aptus_url(@url, cookies)
    

  end

  private

  def get_csb_cookies(url)
    parse_cookies HTTParty.post(url + '/wp-login.php',
                                body: 'log=nice&pwd=nice&redirect_to=https%3A%2F%2Fwww.chalmersstudentbostader.se%2Fmin-bostad%2F',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded', accept:
                                  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', connection: 'Keep-Alive',
                                           'user-agent' =>
                                   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                                           host: 'www.chalmersstudentbostader.se' },
                                follow_redirects: false).headers['set-cookie']
  end

  def get_aptus_url(url, cookies)
    parse_aptus_url HTTParty.get(url + '/widgets/?callback=jQuery&widgets%5B%5D=aptuslogin%40APTUSPORT', headers: {
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

url = 'http://localhost:1111'
# url = 'https://www.chalmersstudentbostader.se'
DoorOpenerService.new(url).open_door
