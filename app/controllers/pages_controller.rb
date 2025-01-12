class PagesController < ApplicationController
  def home
  end

  def about_us
  end

  def projects
    @projects = [1, 2]
  end

  def partnership
  end

  def contact
  end
end
