class CommentForm extends React.Component {

  submitComment(formData) {
    axios.post(this.props.root_with_post_instance + '/comments', formData)
    .then(() => this.props.getComments())
    .catch((err) => console.log(err.response.data));
  }

  handleCommentSubmission(e) {
    e.preventDefault();
    if(this.commentContent.value.length === 0) {
      alert("Comments can't be blank");
    } else {
      this.submitComment({ content: this.commentContent.value });
      this.clearCommentInputElement();
    }
  }

  clearCommentInputElement() {
    this.commentContent.value = '';
  }

  render() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.handleCommentSubmission(e)}>
        <div className="comment-input">
          <input type='text' placeholder='Comment...' size="50" ref={(input) => this.commentContent = input}/>
          <br/>
        </div>
        <input type="submit" value="Add comment" className="btn btn-primary make-it-green"/>
      </form>
    } else {
      return <div></div>
    }
  }
}
