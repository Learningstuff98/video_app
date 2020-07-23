FactoryBot.define do

  factory :user do
    sequence :email do |n|
      "dummyEmail#{n}@gmail.com"
    end
    sequence :username do |n|
      "dummy_user_name#{n}"
    end
    password { "secretPassword" }
    password_confirmation { "secretPassword" }
  end

  factory :channel do
    name {'channel name'}
    description {'channel description'}
    association :user
  end

  factory :post do
    title {'post title'}
    description {'post description'}
    association :channel
  end

  factory :subscription do
    association :channel
    association :user
  end

  factory :comment do
    content {'comment content'}
    association :user
    association :post
  end

  factory :reply do
    content {'reply content'}
    association :user
    association :comment
  end
  
end
