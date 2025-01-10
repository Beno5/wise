Rails.application.routes.draw do
  # Define your routes for static pages
  get 'about_us', to: 'pages#about_us', as: 'about_us'
  get 'projects', to: 'pages#projects', as: 'projects'
  get 'partnership', to: 'pages#partnership', as: 'partnership'
  get 'contact', to: 'pages#contact', as: 'contact'

  # Root route for the home page
  root "pages#home"
end
