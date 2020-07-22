class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy, :update]
  before_action :authenticate_user!, only: [:create, :destroy, :update]

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
      comment.replies.destroy_all
      comment.destroy
    else
      render plain: 'Unauthorized', status: :unauthorized
    end
  end

  def update
    comment = Comment.find(params[:id])
    if current_user == comment.user
      comment.update_attributes(comment_params)
    else
      render plain: 'Unauthorized', status: :unauthorized
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

end
