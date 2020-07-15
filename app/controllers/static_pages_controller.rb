class StaticPagesController < ApplicationController

  def index
    @channels = Channel.all
    @posts = Post.all.reverse
  end

end
