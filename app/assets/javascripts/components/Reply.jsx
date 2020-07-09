class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormIsToBeShown: false
    };
    this.InvertEditFormShowStatus = this.InvertEditFormShowStatus.bind(this);
  }

  deleteReply() {
    axios.delete(this.props.setRoot() + 'replies/' + this.props.reply.id)
    .then(() => this.props.getReplies())
    .catch((err) => console.log(err.response.data));
  }

  handleUserButtons() {
    if(this.props.current_user && this.props.current_user.id === this.props.reply.user_id) {
      return <div>
        {this.buildDeleteButton()}
        {this.props.setButtonDivider()}
        {this.buildEditButton()}
      </div>
    }
  }

  InvertEditFormShowStatus() {
    this.setState({
      editFormIsToBeShown: !this.state.editFormIsToBeShown
    });
  }

  handleEditButtonVerb() {
    if(this.state.editFormIsToBeShown) {
      return "Close";
    } else {
      return "Edit";
    }
  }

  buildEditButton() {
    return <span className="cursor reply-button" onClick={() => this.InvertEditFormShowStatus()}>
      {this.handleEditButtonVerb()}
    </span>
  }

  buildDeleteButton() {
    return <span className="cursor reply-button" onClick={() => this.deleteReply()}>
      Delete
    </span>
  }

  buildReply() {
    return <div>
      <h5>{`By ${this.props.reply.username}`}</h5>
      <h5>{this.props.reply.content}</h5>
    </div>
  }

  buildReplyEditForm() {
    return <div>
      <ReplyEditForm
        reply={this.props.reply}
        getReplies={this.props.getReplies}
        InvertEditFormShowStatus={this.InvertEditFormShowStatus}
        setRoot={this.props.setRoot}
      />
    </div>
  }

  handleReply() {
    if(this.state.editFormIsToBeShown) {
      return <div>{this.buildReplyEditForm()}</div>
    } else {
      return <div>{this.buildReply()}</div>
    }
  }

  render() {
    return <div className="page-content">
      <br/>
      {this.handleReply()}
      {this.handleUserButtons()}
    </div>
  }
}
