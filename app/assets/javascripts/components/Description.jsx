class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionIsToBeShown: false
    };
  }

  invertDescriptionShowStatus() {
    this.setState({
      descriptionIsToBeShown: !this.state.descriptionIsToBeShown
    });
  }

  setButtonVerb() {
    if(this.state.descriptionIsToBeShown) {
      return "Hide";
    } else {
      return "Show";
    }
  }

  buildDescriptionButton() {
    return <h4 onClick={() => this.invertDescriptionShowStatus()}>
      <div className='cursor description-button'>
        {`${this.setButtonVerb()} description`}
      </div>
    </h4>
  }

  renderDescription() {
    if(this.state.descriptionIsToBeShown) {
      return <h5 className="col-8 move-left">
        {this.props.description}
      </h5>
    }
  }

  render() {
    if(this.props.description) {
      return <div>
        {this.buildDescriptionButton()}
        <br/>
        {this.renderDescription()}
      </div>
    } else {
      return <div></div>
    }
  }
}
