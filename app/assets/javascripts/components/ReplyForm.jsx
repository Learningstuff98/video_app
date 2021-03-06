class ReplyForm extends React.Component {

  submitReply(formData) {
    axios.post(this.props.setRoot() + 'comments/' + this.props.comment.id + '/replies', formData)
    .then(() => this.handleReplySubmissionResult())
    .catch((err) => console.log(err.response.data));
  }

  handleReplySubmissionResult() {
    this.props.getReplies();
    this.props.invertReplyFormShowStatus();
    this.props.setToShowReplies();
  }

  handleReplySubmission(e) {
    e.preventDefault();
    if(this.replyContent.value.length === 0) {
      alert("Replies can't be blank");
    } else {
      this.submitReply({ content: this.replyContent.value });
    }
  }

  render() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.handleReplySubmission(e)}>
        <div className="reply-input">
          <input type='text' placeholder='Reply...' size="50" ref={(input) => this.replyContent = input}/>
          <br/>
        </div>
        <input type="submit" value="Add reply" className="btn btn-primary make-it-green"/>
      </form>
    } else {
      return <div></div>
    }
  }
}
