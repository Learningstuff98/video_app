class CommentEditForm extends React.Component {

  handleEditResults() {
    this.props.getComments();
    this.props.invertEditFormStatus();
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

  render() {
    return <div>
      {this.renderCommentEditForm()}
    </div>
  }
}
