class Channel < ApplicationRecord
  belongs_to :user
  has_many :posts
  has_many :subscriptions
  validates :name, presence: true, length: { minimum: 1 }
  validates :description, presence: true, length: { minimum: 1 }
end
 