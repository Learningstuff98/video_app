require 'rails_helper'

RSpec.describe SubscriptionsController, type: :controller do
  describe "subscriptions#create action" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      post :create, params: { channel_id: channel.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users subscribe to channels" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: { channel_id: channel.id }
      expect(user.subscriptions.count).to eq 1
      expect(user.subscriptions.first.channel_name).to eq "channel name"
    end
  end

  describe "subscriptions#destroy action" do
    it "should authenticate the user" do
      subscription = FactoryBot.create(:subscription)
      delete :destroy, params: { id: subscription.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users unsubscribe from channels" do
      subscription = FactoryBot.create(:subscription)
      user = FactoryBot.create(:user)
      user.subscriptions.push(subscription)
      sign_in subscription.user
      delete :destroy, params: { id: subscription.id }
      expect(user.subscriptions.count).to eq 0
    end

    it "should only let the subscription's user delete it" do
      subscription = FactoryBot.create(:subscription)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: { id: subscription.id }
      expect(Subscription.all.count).to eq 1
    end
  end

  describe "subscriptions#index action" do
    it "should authenticate the user" do
      get :index
      expect(response).to redirect_to new_user_session_path
    end

    it "should successfully load" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      expect(response).to have_http_status(:success)
    end
  end
end
