class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null
    };
    this.getComments = this.getComments.bind(this);
  }

  componentWillMount() {
    this.getComments();
  }

  getComments() {
    axios.get(this.props.root_with_post_instance + '/comments')
    .then((res) => this.setState({ comments: res.data }))
    .catch((err) => console.log(err.response.data));
  }

  renderCommentForm() {
    return <div>
      <CommentForm
        root_with_post_instance={this.props.root_with_post_instance}
        getComments={this.getComments}
      />
    </div>
  }

  renderComments(comments) {
    if(comments) {
      return <div>
        {comments.map((comment) => {
          return <h4 key={comment.id}>
            {comment.content}
            <br/>
          </h4>
        })}
      </div>
    }
  }

  render() {
    return <div>
      {this.renderCommentForm()}
      <br/>
      {this.renderComments(this.state.comments)}
    </div>
  }
}
