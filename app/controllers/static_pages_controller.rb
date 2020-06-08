class StaticPagesController < ApplicationController

  def index
    @channels = Channel.all
  end

end
