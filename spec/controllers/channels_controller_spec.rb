require 'rails_helper'

RSpec.describe ChannelsController, type: :controller do
  describe "channels#new action" do
    it "should sucessfully load the page" do
      user = FactoryBot.create(:user)
      sign_in user
      get :new
      expect(response).to have_http_status(:success)
    end

    it "should require that users be logged in" do
      get :new
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "channels#create action" do
    it "should let users create channels" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        channel: {
          name: "channel name",
          description: "channel description"
        }
      }
      expect(response).to have_http_status(:found)
      channel = Channel.last
      expect(channel.name).to eq("channel name")
      expect(channel.description).to eq("channel description")
      expect(channel.user).to eq(user)
    end

    it "should require that users be logged in" do
      post :create, params: {
        channel: {
          name: "channel name",
          description: "channel description"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should require the presence of the name and description" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        channel: {
          name: "",
          description: ""
        }
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "channels#show action" do
    it "should successfully load the page" do
      channel = FactoryBot.create(:channel)
      get :show, params: { id: channel.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "channels#edit action" do
    it "should successfully load the page" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      get :edit, params: { id: channel.id }
      expect(response).to have_http_status(:success)
    end

    it "should not allow anyone except the channel's owner on the edit page" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in user
      get :edit, params: { id: channel.id }
      expect(response).to have_http_status(:unauthorized)
    end

    it "should require that users be logged in" do
      channel = FactoryBot.create(:channel)
      get :edit, params: { id: channel.id }
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "channels#update action" do
    it "should require that users be logged in" do
      channel = FactoryBot.create(:channel)
      post :update, params: {
        id: channel.id,
        channel: {
          name: "updated name",
          description: "updated description"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the channel owner update the channel" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in user
      post :update, params: {
        id: channel.id,
        channel: {
          name: "updated name",
          description: "updated description"
        }
      }
      channel.reload
      expect(channel.name).to eq "channel name"
      expect(channel.description).to eq "channel description"
    end

    it "should let channel owners update their channels" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      post :update, params: {
        id: channel.id,
        channel: {
          name: "updated name",
          description: "updated description"
        }
      }
      channel.reload
      expect(channel.name).to eq "updated name"
      expect(channel.description).to eq "updated description"
    end

    it "should require the presence of the name and description" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      post :update, params: {
        id: channel.id,
        channel: {
          name: "",
          description: ""
        }
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "channels#destroy action" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      delete :destroy, params: { id: channel.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the channels owner delete it" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: { id: channel.id }
      channel.reload
      expect(channel.name).to eq "channel name"
      expect(channel.description).to eq "channel description" 
    end

    it "should let the channels owner delete it" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      subscription = FactoryBot.create(:subscription)
      channel.subscriptions.push(subscription)
      delete :destroy, params: { id: channel.id }
      expect(response).to have_http_status(:found)
      channel = Channel.find_by_id(channel.id)
      expect(channel).to eq nil
      expect(Subscription.all.count).to eq 0
    end
  end
end
