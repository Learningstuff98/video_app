class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user: current_user))
    comment.update_attribute(:username, comment.user.username)
  end

  def index
    post = Post.find(params[:post_id])
    render json: post.comments
  end

  def destroy
    comment = Comment.find(params[:id])
    if current_user == comment.user
      comment.destroy
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

end
