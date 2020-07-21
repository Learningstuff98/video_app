require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  describe "posts#new" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      get :new, params: { channel_id: channel.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the channel owner get to the new post page" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in user
      get :new, params: { channel_id: channel.id }
      expect(response).to have_http_status(:unauthorized)
    end

    it "should let the channel owner get to the new post page" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      get :new, params: { channel_id: channel.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "posts#create action" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      post :create, params: {
        channel_id: channel.id,
        post: {
          title: "post title",
          description: "post description"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the channel owner upload posts" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        channel_id: channel.id,
        post: {
          title: "post title",
          description: "post description"
        }
      }
      expect(Post.all.count).to eq 0
    end

    it "should require the presence of the title and description" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      post :create, params: {
        channel_id: channel.id,
        post: {
          title: "",
          description: ""
        }
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should let channel owners upload posts" do
      channel = FactoryBot.create(:channel)
      user = FactoryBot.create(:user)
      sign_in channel.user
      post :create, params: {
        channel_id: channel.id,
        post: {
          title: "post title",
          description: "post description"
        }
      }
      expect(response).to have_http_status(:found)
      expect(Post.all.count).to eq 1
      expect(Post.all.first.title).to eq "post title"
      expect(Post.all.first.description).to eq "post description"
    end
  end

  describe "posts#show action" do
    it "should successfully load the page" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      get :show, params: {
        channel_id: channel.id,
        id: post.id
      }
      expect(response).to have_http_status(:success)
    end
  end

  describe "posts#edit action" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      get :edit, params: {
        channel_id: channel.id,
        id: post.id 
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should not allow anyone except the channel's owner on the edit page for posts" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in user
      get :edit, params: {
        channel_id: channel.id,
        id: post.id 
      }
      expect(response).to have_http_status(:unauthorized)
    end

    it "should let the channel's owner get to the edit page for posts" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in channel.user
      get :edit, params: {
        channel_id: channel.id,
        id: post.id 
      }
      expect(response).to have_http_status(:success)
    end
  end

  describe "posts#update action" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      content_post = FactoryBot.create(:post)
      post :update, params: {
        channel_id: channel.id,
        id: content_post.id,
        channel: {
          name: "updated name",
          description: "updated description"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the channel owner update posts" do
      channel = FactoryBot.create(:channel)
      content_post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in user
      post :update, params: {
        channel_id: channel.id,
        id: content_post.id,
        channel: {
          name: "updated name",
          description: "updated description"
        }
      }
      expect(response).to have_http_status(:unauthorized)
    end

    it "should require the presence of the title and description" do
      channel = FactoryBot.create(:channel)
      content_post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in channel.user
      post :update, params: {
        channel_id: channel.id,
        id: content_post.id,
        post: {
          title: "",
          description: ""
        }
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should let channel owners update posts" do
      channel = FactoryBot.create(:channel)
      content_post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in channel.user
      post :update, params: {
        channel_id: channel.id,
        id: content_post.id,
        post: {
          title: "updated title",
          description: "updated description"
        }
      }
      content_post.reload
      expect(content_post.title).to eq "updated title"
      expect(content_post.description).to eq "updated description"
    end
  end

  describe "posts#destroy action" do
    it "should authenticate the user" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      delete :destroy, params: {
        channel_id: channel.id,
        id: post.id
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the channel owner delete posts" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: {
        channel_id: channel.id,
        id: post.id
      }
      expect(response).to have_http_status(:unauthorized)
    end

    it "should let the channel owner delete posts" do
      channel = FactoryBot.create(:channel)
      post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in channel.user
      delete :destroy, params: {
        channel_id: channel.id,
        id: post.id
      }
      expect(response).to have_http_status(:found)
      post = Post.find_by_id(post.id)
      expect(post).to eq nil
    end
  end
end
