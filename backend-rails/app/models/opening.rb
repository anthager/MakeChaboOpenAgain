# frozen_string_literal: true

class Opening < ApplicationRecord
  validates :success, inclusion: { in: [true, false] }
end
