class Project < ApplicationRecord
  has_one_attached :image

  validates :title, presence: true
  validates :content, presence: true

  def plain_content
    ActionView::Base.full_sanitizer.sanitize(content)
  end
end
