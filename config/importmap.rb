# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "custom/headhesive", to: "custom/headhesive.js" 
pin "custom/swiper-bundle", to: "custom/swiper-bundle.js" 
pin "custom/plugins", to: "custom/plugins.js"
pin "custom/theme", to: "custom/theme.js"
