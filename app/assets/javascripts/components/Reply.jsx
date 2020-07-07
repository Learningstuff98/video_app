class Reply extends React.Component {

  deleteReply() {
    axios.delete(this.props.root_with_post_instance + '/comments/' + this.props.comment.id + '/replies/' + this.props.reply.id)
    .then(() => this.props.getReplies())
    .catch((err) => console.log(err.response.data));
  }

  handleDeleteButton() {
    if(this.props.current_user && this.props.current_user.id === this.props.reply.user_id) {
      return <h5 className="cursor reply-button" onClick={() => this.deleteReply()}>
        Delete
      </h5>
    }
  }

  buildReply() {
    return <div>
      <h5>{`By ${this.props.reply.username}`}</h5>
      <h5>{this.props.reply.content}</h5>
    </div>
  }

  render() {
    return <div className="page-content">
      <br/>
      {this.buildReply()}
      {this.handleDeleteButton()}
    </div>
  }
}
