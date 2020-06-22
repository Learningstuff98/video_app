class Comment extends React.Component {
  render() {
    return <h4 className="col-7">
      <hr className="comment-divider"/>
      {this.props.comment.content}
    </h4>
  }
}
