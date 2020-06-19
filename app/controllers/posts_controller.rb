class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]

  def new
    @channel = Channel.find(params[:channel_id])
    if current_user == @channel.user
      @post = Post.new
    else
      render plain: 'Unauthorized', status: :unauthorized
    end
  end

  def create
    channel = Channel.find(params[:channel_id])
    if current_user == channel.user
      post = channel.posts.create(post_params)
      if post.valid?
        redirect_to channel_post_path(channel, post)
      else
        redirect_to new_channel_post_path(channel)
      end
    end
  end

  def show
    @channel = Channel.find(params[:channel_id])
    @post = Post.find(params[:id])
  end

  def edit
    @channel = Channel.find(params[:channel_id])
    @post = Post.find(params[:id])
    if current_user != @channel.user
      render plain: 'Unauthorized', status: :unauthorized
    end
  end

  def update
    channel = Channel.find(params[:channel_id])
    @post = Post.find(params[:id])
    if current_user == channel.user
      @post.update_attributes(post_params)
      redirect_to channel_post_path(channel, @post)
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :picture, :video)
  end

end
