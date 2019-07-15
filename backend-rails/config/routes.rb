# frozen_string_literal: true

Rails.application.routes.draw do
  get '/', to: 'unlock#unlock'
end
