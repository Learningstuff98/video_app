Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  resources :channels, only: [:new, :create, :show, :edit, :update, :destroy] do
    resources :posts, only: [:new, :create, :show, :edit, :update, :destroy]
  end
  resources :posts do
    resources :comments, only: [:create, :index, :destroy, :update]
  end
end
