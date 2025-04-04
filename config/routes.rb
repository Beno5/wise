Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }
  
  resources :projects, param: :slug


  # Define your routes for static pages
  get 'about_us', to: 'pages#about_us', as: 'about_us'
  get 'partnership', to: 'pages#partnership', as: 'partnership'
  get 'learning', to: 'pages#learning', as: 'learning'
  get 'contact', to: 'pages#contact', as: 'contact'

  post 'contact_form/send_email'

  # Root route for the home page
  root "pages#home"
end
