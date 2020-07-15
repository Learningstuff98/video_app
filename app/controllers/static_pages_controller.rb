class StaticPagesController < ApplicationController

  def index
    @channels = Channel.all
    @posts = Post.order("created_at DESC").page(params[:page]).per_page(2)
  end

end
