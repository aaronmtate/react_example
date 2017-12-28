class Event < ApplicationRecord
  validates :name, :event_date, :place, :description, presence: true

  class << self
    def per_page
      10
    end

    def pages(per_page = self.per_page)
      pages = count / per_page.to_f
      pages += 1 if pages % 1 > 0
      pages.to_i
    end

    def paginate(page: 1, per_page: self.per_page)
      offset = (page.to_i - 1) * per_page.to_i
      limit(per_page.to_i).offset(offset)
    end
  end
end
