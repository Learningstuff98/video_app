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

  setButtonLabel() {
    if(this.state.descriptionIsToBeShown) {
      return "Hide Description";
    } else {
      return "Show Description";
    }
  }

  buildDescriptionButton() {
    return <h4 onClick={() => this.invertDescriptionShowStatus()}>
      <div className='cursor description-button'>
        {this.setButtonLabel()}
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
