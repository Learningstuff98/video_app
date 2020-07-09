class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.getComments = this.getComments.bind(this);
    this.setRoot = this.setRoot.bind(this);
  }

  componentWillMount() {
    this.getComments();
  }

  setRoot() {
    let numberOfSlashes = 0;
    let root = "";
    for(char of this.props.root_with_post_instance) {
      root += char;
      if(char === "/") {
        numberOfSlashes++;
      }
      if(numberOfSlashes === 3) {
        return root;
      }
    }
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
        current_user={this.props.current_user}
      />
    </div>
  }

  renderComments(comments) {
    return <div>
      {comments.map((comment) => {
        return <div key={comment.id}>
          <Comment
            comment={comment}
            current_user={this.props.current_user}
            setRoot={this.setRoot}
            getComments={this.getComments}
          />
        </div>
      })}
    </div>
  }

  render() {
    return <div>
      {this.renderCommentForm()}
      <br/>
      {this.renderComments(this.state.comments)}
    </div>
  }
}
