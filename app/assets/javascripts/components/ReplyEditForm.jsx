class ReplyEditForm extends React.Component {

  submitReply(formData) {
    axios.patch(this.props.setRoot() + 'replies/' + this.props.reply.id, formData)
    .then(() => this.handleReplySubmissionResult())
    .catch((err) => console.log(err.response.data));
  }

  handleReplySubmissionResult() {
    this.props.getReplies();
    this.props.InvertEditFormShowStatus();
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
    return <form onSubmit={(e) => this.handleReplySubmission(e)}>
      <div className="reply-input">
        <input type='text' defaultValue={this.props.reply.content} size="50" ref={(input) => this.replyContent = input}/>
        <br/>
      </div>
      <input type="submit" value="Edit reply" className="btn btn-primary make-it-green"/>
    </form>
  }
}
