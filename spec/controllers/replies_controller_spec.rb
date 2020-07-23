require 'rails_helper'

RSpec.describe RepliesController, type: :controller do
  describe "replies#index action" do
    it "should successfully load" do
      comment = FactoryBot.create(:comment)
      get :index, params: { comment_id: comment.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "replies#create action" do
    it "should authenticate the user" do
      comment = FactoryBot.create(:comment)
      post :create, params: {
        comment_id: comment.id,
        reply: {
          content: "reply content"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users make replies" do
      comment = FactoryBot.create(:comment)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        comment_id: comment.id,
        reply: {
          content: "reply content"
        }
      }
      reply = comment.replies.first
      expect(comment.replies.count).to eq 1
      expect(reply.content).to eq "reply content"
      expect(reply.username).to eq user.username
    end
  end

  describe "replies#destroy action" do
    it "should authenticate the user" do
      reply = FactoryBot.create(:reply)
      delete :destroy, params: { id: reply.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the reply's user delete it" do
      reply = FactoryBot.create(:reply)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: { id: reply.id }
      expect(response).to have_http_status(:unauthorized)
      expect(Reply.all.count).to eq 1
    end

    it "should let users delete their replies" do
      reply = FactoryBot.create(:reply)
      user = FactoryBot.create(:user)
      sign_in reply.user
      delete :destroy, params: { id: reply.id }
      expect(Reply.all.count).to eq 0
    end
  end

  describe "replies#update action" do
    it "should authenticate the user" do
      reply = FactoryBot.create(:reply)
      post :update, params: {
        id: reply.id,
        reply: {
          content: "updated content"
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the reply's user update it" do
      reply = FactoryBot.create(:reply)
      user = FactoryBot.create(:user)
      sign_in user
      post :update, params: {
        id: reply.id,
        reply: {
          content: "updated content"
        }
      }
      expect(response).to have_http_status(:unauthorized)
      reply.reload
      expect(reply.content).to eq "reply content"
    end

    it "should let users update their replies" do
      reply = FactoryBot.create(:reply)
      user = FactoryBot.create(:user)
      sign_in reply.user
      post :update, params: {
        id: reply.id,
        reply: {
          content: "updated content"
        }
      }
      reply.reload
      expect(reply.content).to eq "updated content"
    end
  end
end
