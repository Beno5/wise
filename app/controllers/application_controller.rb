class ApplicationController < ActionController::Base
  before_action :log_request

  private

  def log_request
    Rails.logger.info "Requested path: #{request.path}"
    if request.path == '/null'
      Rails.logger.error "Invalid request to /null detected"
    end
  end
end
