# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UnlockController, type: :controller do
  context 'GET #unlock' do
    it 'returns a success response' do
      get :unlock
      expect(response).to be_successful
    end
    it 'returns a success response' do
      get :unlock
      get :unlock
      expect(response).to be_successful
    end
  end
end
