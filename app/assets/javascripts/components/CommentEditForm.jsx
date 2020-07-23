class CommentEditForm extends React.Component {

  handleEditResults() {
    this.props.getComments();
    this.props.invertEditFormStatus();
  }

  submitComment(formData) {
    axios.patch(this.props.setRoot() + 'comments/' + this.props.comment.id, formData)
    .then(() => this.handleEditResults())
    .catch((err) => console.log(err.response.data));
  }

  handleCommentSubmission(e) {
    e.preventDefault();
    if(this.commentContent.value.length === 0) {
      alert("Comments can't be blank");
    } else {
      this.submitComment({ content: this.commentContent.value });
    }
  }

  renderCommentEditForm() {
    return <form onSubmit={(e) => this.handleCommentSubmission(e)}>
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
