class ChannelsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def new
    @channel = Channel.new
  end

  def create
    @channel = current_user.channels.create(channel_params)
    if @channel.valid?
      redirect_to channel_path(@channel)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @channel = Channel.find(params[:id])
    @posts = @channel.posts.order("created_at DESC").page(params[:page]).per_page(2)
    @search = params["search"]
    if @search.present?
      @title = @search["title"]
      @posts = Post.where("title ILIKE ?", "%#{@title}%")
      @posts = @posts.order("created_at DESC").page(params[:page]).per_page(2)
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description)
  end

end
