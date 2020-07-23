require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  describe "comments#create action" do
    it "should authenticate the user" do
      content_post = FactoryBot.create(:post)
      post :create, params: {
        post_id: content_post.id,
        post: {
          content: "comment content",
        }
      }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users make comments" do
      content_post = FactoryBot.create(:post)
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        post_id: content_post.id,
        comment: {
          content: "comment content",
        }
      }
      comment = content_post.comments.first
      expect(comment.content).to eq "comment content"
      expect(comment.username).to eq user.username
    end
  end

  describe "comments#index action" do
    it "should successfully load" do
      post = FactoryBot.create(:post)
      get :index, params: { post_id: post.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "comments#destroy action" do
    it "should authenticate the user" do
      comment = FactoryBot.create(:comment)
      delete :destroy, params: { id: comment.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the comment's user delete it" do
      comment = FactoryBot.create(:comment)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: { id: comment.id }
      expect(response).to have_http_status(:unauthorized)
    end

    it "should let users delete their comments" do
      comment = FactoryBot.create(:comment)
      user = FactoryBot.create(:user)
      sign_in comment.user
      delete :destroy, params: { id: comment.id }
      expect(Comment.all.count).to eq 0 
    end
  end

  describe "comments#update action" do
    it "should authenticate the user" do
      comment = FactoryBot.create(:comment)
      post :update, params: { id: comment.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should only let the comment's user update it" do
      comment = FactoryBot.create(:comment)
      user = FactoryBot.create(:user)
      sign_in user
      post :update, params: {
        id: comment.id,
        comment: {
          content: "updated content"
        }
      }
      expect(response).to have_http_status(:unauthorized)
      comment.reload
      expect(comment.content).to eq "comment content"
    end

    it "should let the comment's user update it" do
      comment = FactoryBot.create(:comment)
      user = FactoryBot.create(:user)
      sign_in comment.user
      post :update, params: {
        id: comment.id,
        comment: {
          content: "updated content"
        }
      }
      comment.reload
      expect(comment.content).to eq "updated content"
    end
  end
end
