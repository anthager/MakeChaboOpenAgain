# frozen_string_literal: true

require 'httparty'

class DoorOpenerService
  def initialize(url)
    @url = url
  end

  def open_door
    cookies = parse_cookies HTTParty.post(@url + '/wp-login.php',
                            body: 'log=nice&pwd=nice&redirect_to=https%3A%2F%2Fwww.chalmersstudentbostader.se%2Fmin-bostad%2F',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded', accept:
                              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', connection: 'Keep-Alive',
                                       'user-agent' =>
                               'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                                       host: 'www.chalmersstudentbostader.se' },
                            follow_redirects: false).headers['set-cookie']
    puts cookies
  end

  private

  def parse_cookies(cookies)
    cookies.split(',')
           .map { |cookie| cookie.split(';')[0] }
           .map(&:strip)
           .reduce { |acc, curr| acc + '; ' + curr }
  end
end

url = 'http://localhost:1111'
# url = 'https://www.chalmersstudentbostader.se'
DoorOpenerService.new(url).open_door
