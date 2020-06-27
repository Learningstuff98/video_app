class Reply extends React.Component {
  render() {
    return <div className="page-content">
      <br/>
      <h6>{`By ${this.props.reply.username}`}</h6>
      <h5>{this.props.reply.content}</h5>
      <br/>
    </div>
  }
}
