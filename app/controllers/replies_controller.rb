class RepliesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :authenticate_user!, only: [:create, :destroy]

  def index
    comment = Comment.find(params[:comment_id])
    render json: comment.replies
  end

  def create
    comment = Comment.find(params[:comment_id])
    reply = comment.replies.create(reply_params.merge(user: current_user))
    reply.update_attribute(:username, current_user.username)
  end

  def destroy
    reply = Reply.find(params[:id])
    if current_user == reply.user
      reply.destroy
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:content)
  end
end
