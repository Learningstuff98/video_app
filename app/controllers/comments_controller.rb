class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :authenticate_user!, only: [:create]

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user: current_user))
  end

  def index
    post = Post.find(params[:post_id])
    render json: post.comments
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

end
