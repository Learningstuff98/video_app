class Comment extends React.Component {

  deleteComment() {
    axios.delete(this.props.root_with_post_instance + '/comments/' + this.props.comment.id)
    .then(() => this.props.getComments())
    .catch((err) => console.log(err.response.data));
  }

  handleDeleteButton() {
    if(this.props.current_user && this.props.current_user.id === this.props.comment.user_id) {
      return <h5 className="comment-delete-button cursor" onClick={() => this.deleteComment()}>
        Delete
      </h5>
    }
  }

  renderComment() {
    return <h4>
      {this.props.comment.content}
    </h4>
  }

  render() {
    return <div>
      <div className="col-7">
        <hr className="comment-divider"/>
        {this.renderComment()}
        {this.handleDeleteButton()}
      </div>
    </div>
  }
}
