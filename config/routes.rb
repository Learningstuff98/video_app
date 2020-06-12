Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  resources :channels, only: [:new, :create, :show, :edit, :update] do
    resources :posts, only: [:new, :create, :show]
  end
end
