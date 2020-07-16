class StaticPagesController < ApplicationController

  def index
    @channels = Channel.all
    @posts = Post.order("created_at DESC").page(params[:page]).per_page(2)
    @search = params["search"]
    if @search.present?
      @title = @search["title"]
      @posts = Post.where("title ILIKE ?", "%#{@title}%")
      @posts = @posts.order("created_at DESC").page(params[:page]).per_page(2)
    end
  end

end
