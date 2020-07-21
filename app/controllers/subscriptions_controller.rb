class SubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :authenticate_user!, only: [:create, :destroy, :index]

  def index
    current_user.subscriptions.each do |subscription|
      subscription.update_attribute(:channel_name, subscription.channel.name)
    end
    render json: current_user.subscriptions 
  end

  def create
    channel = Channel.find(params[:channel_id])
    subscription = current_user.subscriptions.create(
      channel: channel,
      channel_name: channel.name
    )
  end

  def destroy
    subscription = Subscription.find(params[:id])
    if current_user == subscription.user
      subscription.destroy
    end
  end

end
