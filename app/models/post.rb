class Post < ApplicationRecord
  belongs_to :channel
  has_many :comments
  mount_uploader :picture, PictureUploader
  mount_uploader :video, VideoUploader
  validates :title, presence: true, length: { minimum: 1 }
end
