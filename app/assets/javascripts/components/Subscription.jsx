class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSubscriptions: [],
      subscription: null,
      isSubscribed: false
    };
  }

  componentDidMount() {
    this.getSubscriptions();
  }

  setRoot() {
    let numberOfSlashes = 0;
    let root = "";
    for(char of this.props.root_with_channel_instance) {
      root += char;
      if(char === "/") {
        numberOfSlashes++;
      }
      if(numberOfSlashes === 3) {
        return root;
      }
    }
  }

  determinSubscriptionStatus() {
    for(subscription of this.state.userSubscriptions) {
      if(subscription.channel_id === this.props.channel.id) {
        this.setState({
          isSubscribed: true,
          subscription,
        });
        return;
      }
    }
  }

  getSubscriptions() {
    axios.get(this.setRoot() + 'subscriptions')
    .then((res) => this.handleSubscriptionInformation(res))
    .catch((err) => console.log(err.response.data));  
  }

  handleSubscriptionInformation(res) {
    this.setState({ userSubscriptions: res.data });
    this.determinSubscriptionStatus();
  }

  makeSubscription() {
    axios.post(this.props.root_with_channel_instance + '/subscriptions')
    .then(() => this.getSubscriptions())
    .catch((err) => console.log(err.response.data));
  }

  deleteSubscription() {
    axios.delete(this.setRoot() + 'subscriptions/' + this.state.subscription.id)
    .then(() => this.handleSubscriptionDeletion())
    .catch((err) => console.log(err.response.data));
  }

  handleSubscriptionDeletion() {
    this.setState({
      isSubscribed: false,
      subscription: null
    });
    this.getSubscriptions();
  }

  handleSubscriptionAction() {
    if(!this.state.isSubscribed) {
      this.makeSubscription();
    } else {
      this.deleteSubscription();
    }
  }

  handleButtonLabel() {
    if(this.state.isSubscribed) {
      return "Unsubscribe";
    } else {
      return "Subscribe";
    }
  }

  HandleSubscribeButton() {
    if(this.props.current_user) {
      return <div className="btn btn-primary make-it-green" onClick={() => this.handleSubscriptionAction()}>
        {this.handleButtonLabel()}
      </div>
    }
  }

  renderSubscriptionStatus() {
    if(this.state.isSubscribed) {
      return "You're subscribed";
    } else {
      return "You're not subscribed";
    }
  }

  render() {
    return <div>
      {this.HandleSubscribeButton()}
      <br/><br/>
      <h4>{this.renderSubscriptionStatus()}</h4>
    </div>
  }
}
