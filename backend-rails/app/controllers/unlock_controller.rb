# frozen_string_literal: true

class UnlockController < ApplicationController
  def unlock
    config = ConfigService.new
    UnlockService.new(config.csb_url, config.aptus_url, config.password, config.p_number).unlock_door
    success, wait_time = enough_time_has_passed_since_last_opening?
    Opening.create(success: success)
    render json: { success: success, wait_time: wait_time }, status: :ok
    response.headers['Access-Control-Allow-Credentials'] = true
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  def enough_time_has_passed_since_last_opening?
    threshold = ENV['THRESHOLD'].to_f
    latest = Opening.where(success: true).maximum('created_at')
    time_since_latest = Time.now - latest
    return false, threshold - time_since_latest if time_since_latest < threshold

    true
  end
end
