class Event < ApplicationRecord
  validates :name, :event_date, :place, :description, presence: true
end
