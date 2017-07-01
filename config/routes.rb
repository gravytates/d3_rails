Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'boats#index'
  resources :boats, only: [:index, :create]
  get 'boats/create', :defaults => { :format => 'json' }
end
