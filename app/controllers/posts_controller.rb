class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

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
      redirect_to channel_post_path(channel, post)
    end
  end

  def show
    @channel = Channel.find(params[:channel_id])
    @post = Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :picture, :video)
  end

end
