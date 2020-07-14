Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  resources :channels, only: [:new, :create, :show, :edit, :update, :destroy] do
    resources :posts, only: [:new, :create, :show, :edit, :update, :destroy]
  end
  resources :channels, only: [:show] do
    resources :subscriptions, only: [:create]
  end
  resources :subscriptions, only: [:destroy, :index]
  resources :comments, only: [:destroy, :update] do
    resources :replies, only: [:create, :index]
  end
  resources :replies, only: [:destroy, :update]
  resources :posts do
    resources :comments, only: [:create, :index]
  end
end
