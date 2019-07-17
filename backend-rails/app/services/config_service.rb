# frozen_string_literal: true

class ConfigService
  def password
    config_hash = config
    ENV['PASSWORD'] || config_hash ['pwd']
  end

  def p_number
    config_hash = config
    ENV['PNUMBER'] || config_hash ['log']
  end

  def csb_url
    config_hash = config
    config_hash ['csb_url']
  end

  def aptus_url
    config_hash = config
    config_hash ['aptus_url']
  end

  private

  def config
    Rails.application.config_for(:settings)
  end
end
