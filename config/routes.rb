Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy]
    resources :channels, only: [:index, :show, :update, :create, :destroy]

    resources :channel_messages, only: [:index, :create, :update, :destroy]
    resources :private_messages, only: [:index, :create, :update, :destroy]

    post 'servers/join', to: 'servers#join'
    delete 'servers', to: 'servers#leave'

    post 'users/add', to: 'users#add_friend'
    patch 'users/accept', to: 'users#accept_friend'
    delete 'users', to: 'users#remove_friend'
  end

  mount ActionCable.server => '/cable'
end
