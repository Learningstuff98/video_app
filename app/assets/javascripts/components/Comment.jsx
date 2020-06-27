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

  handleEditResults() {
    this.props.getComments();
    this.invertEditFormStatus();
  }

  submitComment(formData) {
    axios.patch(this.props.root_with_post_instance + '/comments/' + this.props.comment.id, formData)
    .then(() => this.handleEditResults())
    .catch((err) => console.log(err.response.data));
  }

  onSubmitForComment(e) {
    e.preventDefault();
    this.submitComment({
      content: this.commentContent.value
    });
  }

  renderCommentEditForm() {
    return <form onSubmit={(e) => this.onSubmitForComment(e)}>
      <div className="comment-input">
        <input type='text' defaultValue={this.props.comment.content} size="50" ref={(input) => this.commentContent = input}/>
        <br/>
      </div>
      <input type="submit" value="Edit comment" className="btn btn-primary make-it-green"/>
    </form>
  }

  renderComment() {
    return <div>
      <h5>{`By ${this.props.comment.username}`}</h5>
      <h4>{this.props.comment.content}</h4>
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

  HandleShowRepliesButton() {
    if(this.state.repliesAreToBeShown) {
      return `Hide repl${this.handleSpelling()}`;
    } else if(this.state.replies.length > 0) {
      return `Show ${this.state.replies.length} repl${this.handleSpelling()}`;
    }
  }

  renderShowRepliesButton() {
    return <span className="comment-button cursor" onClick={() => this.invertShowRepliesStatus()}>
      {this.HandleShowRepliesButton()}
    </span>
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
