Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  resources :channels, only: [:new, :create, :show] do
    resources :posts, only: [:new, :create, :show]
  end
end
