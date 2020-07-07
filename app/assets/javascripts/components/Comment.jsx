class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormIsToBeShown: false,
      replyFormIsToBeShown: false,
      replies: [],
      repliesAreToBeShown: false
    };
    this.getReplies = this.getReplies.bind(this);
    this.invertReplyFormShowStatus = this.invertReplyFormShowStatus.bind(this);
    this.setToShowReplies = this.setToShowReplies.bind(this);
    this.invertEditFormStatus = this.invertEditFormStatus.bind(this);
  }

  componentDidMount() {
    this.getReplies();
  }

  getReplies() {
    axios.get(this.props.root_with_post_instance + '/comments/' + this.props.comment.id + '/replies')
    .then((res) => this.setState({ replies: res.data }))
    .catch((err) => console.log(err.response.data));
  }

  deleteComment() {
    axios.delete(this.props.root_with_post_instance + '/comments/' + this.props.comment.id)
    .then(() => this.props.getComments())
    .catch((err) => console.log(err.response.data));
  }

  handleUserButtons() {
    if(this.props.current_user && this.props.current_user.id === this.props.comment.user_id) {
      return <span>
        {this.renderDeleteButton()}
        {this.setButtonDivider()}
        {this.renderEditButton()}
        {this.setButtonDivider()}
      </span>
    }
  }

  setButtonDivider() {
    return <span className="button-divider">{" | "}</span>
  }

  invertEditFormStatus() {
    this.setState({
      editFormIsToBeShown: !this.state.editFormIsToBeShown
    });
  }

  renderDeleteButton() {
    return <span className="comment-button cursor" onClick={() => this.deleteComment()}>
      Delete
    </span>
  }

  handleEditButtonVerb() {
    if(this.state.editFormIsToBeShown) {
      return "Close";
    } else {
      return "Edit";
    }
  }

  renderEditButton() {
    return <span className="comment-button cursor" onClick={() => this.invertEditFormStatus()}>
      {this.handleEditButtonVerb()}
    </span>
  }

  renderComment() {
    return <div>
      <h5>{`By ${this.props.comment.username}`}</h5>
      <h4>{this.props.comment.content}</h4>
    </div>
  }

  renderCommentEditForm() {
    return <div>
      <CommentEditForm
        getComments={this.props.getComments}
        invertEditFormStatus={this.invertEditFormStatus}
        root_with_post_instance={this.props.root_with_post_instance}
        comment={this.props.comment}
      />
    </div>
  }

  handleComment() {
    if(this.state.editFormIsToBeShown) {
      return <div>{this.renderCommentEditForm()}</div>
    } else {
      return <div>{this.renderComment()}</div>
    }
  }

  handleReplyForm() {
    if(this.state.replyFormIsToBeShown) {
      return <div>
        <ReplyForm
          root_with_post_instance={this.props.root_with_post_instance}
          comment={this.props.comment}
          current_user={this.props.current_user}
          getReplies={this.getReplies}
          invertReplyFormShowStatus={this.invertReplyFormShowStatus}
          setToShowReplies={this.setToShowReplies}
        />
      </div>
    }
  }

  invertReplyFormShowStatus() {
    this.setState({
      replyFormIsToBeShown: !this.state.replyFormIsToBeShown
    });
  }

  handleReplyButtonLabel() {
    if(this.state.replyFormIsToBeShown) {
      return "Hide Reply Form";
    } else {
      return "Reply";
    }
  }

  handleButtonDivider() {
    if(!this.state.replyFormIsToBeShown && this.state.replies.length > 0) {
      return this.setButtonDivider();
    }
  }

  handleReplyButton() {
    if(this.props.current_user) {
      return <span className="comment-button cursor" onClick={() => this.invertReplyFormShowStatus()}>
        {this.handleReplyButtonLabel()}
        {this.handleButtonDivider()}
      </span>
    }
  }

  renderReplies() {
    return <div>
      {this.state.replies.map((reply) => {
        return <div key={reply.id}>
          <Reply
            reply={reply}
            comment={this.props.comment}
            current_user={this.props.current_user}
            root_with_post_instance={this.props.root_with_post_instance}
            getReplies={this.getReplies}
          />
        </div>
      })}
    </div>
  }

  setToShowReplies() {
    this.setState({
      repliesAreToBeShown: true
    });
  }

  handleReplies() {
    if(this.state.repliesAreToBeShown) {
      return this.renderReplies();
    }
  }

  invertShowRepliesStatus() {
    this.setState({
      repliesAreToBeShown: !this.state.repliesAreToBeShown
    });
  }

  handleSpelling() {
    if(this.state.replies.length === 1) {
      return "y";
    } else {
      return "ies";
    }
  }

  HandleShowRepliesButtonLabel() {
    if(this.state.repliesAreToBeShown) {
      return `Hide repl${this.handleSpelling()}`;
    } else if(this.state.replies.length > 0) {
      return `Show ${this.state.replies.length} repl${this.handleSpelling()}`;
    }
  }

  renderShowRepliesButton() {
    if(this.state.replies.length > 0) {
      return <span className="comment-button cursor" onClick={() => this.invertShowRepliesStatus()}>
        {this.HandleShowRepliesButtonLabel()}
      </span>
    }
  }

  render() {
    return <div>
      <div className="col-7">
        <hr className="comment-divider"/>
        {this.handleComment()}
        {this.handleUserButtons()}
        {this.handleReplyButton()}
        {this.handleReplyForm()}
        {this.renderShowRepliesButton()}
        {this.handleReplies()}
      </div>
    </div>
  }
}
