class Post < ApplicationRecord
  belongs_to :channel
  mount_uploader :picture, PictureUploader
  mount_uploader :video, VideoUploader
end
