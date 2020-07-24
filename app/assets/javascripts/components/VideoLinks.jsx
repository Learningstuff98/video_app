class VideoLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linksAreToBeShown: false
    };
  }

  buildLinkURL(post) {
    return `${this.props.root_with_channel_id}/posts/${post.id}`;
  }

  handleLinks() {
    if(this.state.linksAreToBeShown) {
      return this.props.posts.map((post) => {
        return <h5 key={post.id}>
          <a href={this.buildLinkURL(post)} className="make-it-green">{post.title}</a>
        </h5>
      });
    }
  }

  invertLinksShowStatus() {
    this.setState({
      linksAreToBeShown: !this.state.linksAreToBeShown
    });
  }

  handleIconDirection() {
    if(this.state.linksAreToBeShown) {
      return "up";
    } else {
      return "down";
    }
  }

  buildLinksShowButton() {
    return <span onClick={() => this.invertLinksShowStatus()} className="make-it-green cursor">
      <span className={`fa fa-angle-${this.handleIconDirection()}`}></span>
    </span>
  }

  buildChannelLink() {
    return <h3>
      <a href={this.props.root_with_channel_id} className="make-it-green">
        {this.props.channel.name}{" "}
      </a>
      {this.buildLinksShowButton()}
    </h3>
  }

  render() {
    return <div>
      {this.buildChannelLink()}
      {this.handleLinks()}
    </div>
  }
}
