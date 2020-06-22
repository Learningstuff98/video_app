class CommentForm extends React.Component {

  submitComment(formData) {
    axios.post(this.props.root_with_post_instance + '/comments', formData)
    .then((res) => this.props.getComments())
    .catch((err) => console.log(err.response.data));
  }

  onSubmitForComment(e) {
    e.preventDefault();
    this.submitComment({
      content: this.commentContent.value
    });
    this.clearCommentInputElement();
  }

  clearCommentInputElement() {
    this.commentContent.value = '';
  }

  render() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.onSubmitForComment(e)}>
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
