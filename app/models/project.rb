class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  
  has_one_attached :image

  validates :title, presence: true
  validates :content, presence: true

  before_save :apply_cloudinary_transformation


  def plain_content
      ActionView::Base.full_sanitizer.sanitize(content)
  end


  def apply_cloudinary_transformation
    return unless image.attached?

    image.variant(
      resize_to_fill: [950, 520, { crop: :pad, background: "white" }],
      quality: "auto"
    )
  end

end
