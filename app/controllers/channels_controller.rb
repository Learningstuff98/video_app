class ChannelsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

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

  def edit
    @channel = Channel.find(params[:id])
    if current_user != @channel.user
      render plain: 'Unauthorized', status: :unauthorized
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if current_user == @channel.user
      @channel.update_attributes(channel_params)
      if @channel.valid?
        redirect_to channel_path(@channel)
      else
        render :edit, status: :unprocessable_entity
      end
    end
  end

  def destroy
    channel = Channel.find(params[:id])
    if current_user == channel.user
      channel.subscriptions.destroy_all
      channel.destroy
      redirect_to root_path
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description)
  end

end
