class Channel < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: { minimum: 1 }
  validates :description, presence: true, length: { minimum: 1 }
end
