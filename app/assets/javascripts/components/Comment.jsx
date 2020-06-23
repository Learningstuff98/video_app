class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormIsToBeShown: false
    };
  }

  deleteComment() {
    axios.delete(this.props.root_with_post_instance + '/comments/' + this.props.comment.id)
    .then(() => this.props.getComments())
    .catch((err) => console.log(err.response.data));
  }

  handleUserButtons() {
    if(this.props.current_user && this.props.current_user.id === this.props.comment.user_id) {
      return <div>
        {this.renderDeleteButton()}
        <span className="button-divider">{" | "}</span>
        {this.renderEditButton()}
      </div>
    }
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

  renderEditForm() {
    return <form onSubmit={(e) => this.onSubmitForComment(e)}>
      <div className="comment-input">
        <input type='text' defaultValue={this.props.comment.content} size="50" ref={(input) => this.commentContent = input}/>
        <br/>
      </div>
      <input type="submit" value="Edit comment" className="btn btn-primary make-it-green"/>
    </form>
  }

  renderComment() {
    if(this.state.editFormIsToBeShown) {
      return <div>
        {this.renderEditForm()}
      </div>
    } else {
      return <div>
        <h5>{`By ${this.props.comment.username}`}</h5>
        <h4>{this.props.comment.content}</h4>
      </div>
    }
  }

  render() {
    return <div>
      <div className="col-7">
        <hr className="comment-divider"/>
        {this.renderComment()}
        {this.handleUserButtons()}
      </div>
    </div>
  }
}
