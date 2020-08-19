import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL, TASK_BASE_URL } from '../../constants/apiConstants';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { authenticationService } from '../LoginForm/LoginForm';
const currentUser = authenticationService.currentUserValue;

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loggedUser: [],
    };
    this.setState = this.setState.bind(this);
    this.goBack = this.goBack.bind(this);

    const previousStars = '';
    const currentStars = '';
  }

  componentDidMount() {
    let event = { eventID: this.props.match.params.eventID };
    axios
      .post(API_BASE_URL + 'events/' + event.eventID, event)
      .then((event) => {
        const events = event.data;
        this.setState({ events });
      })
      .catch((err) => console.log('Error ' + err));
    axios.post(TASK_BASE_URL + 'getUser', currentUser).then((user) => {
      console.log(currentUser);
      const loggedUser = user.data;
      console.log(user);
      this.setState(loggedUser);

      // this.state.events.
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  authenticateCode = (e) => {
    console.log('currentUser', this.state);
    // const {value} = e.target
    // if(value === this.state.eventCode){
    //     this.state.
    // }
  };

  render() {
    return (
      <div className='col-12 col-lg-4 mt-2 hv-center myevents'>
        {this.state.events.map((post) => (
          <div>
            <img
              alt='Event Venue'
              src={'../' + post.eventPhoto}
              width='100%'
              height='100%'
            />
            <p>Event Name: </p>
            <h4>{post.eventName}</h4>
            <br />
            <p>
              Event Date: &nbsp;
              {moment(post.eventDate).format('MMM Do YYYY')}
            </p>
            <p>
              Event Venue: &nbsp;
              {post.eventVenue}
            </p>
            <p>
              Details: &nbsp;
              {post.eventDetail}
            </p>
            <p>
              Stars: &nbsp;
              {post.eventStars}
            </p>
            <p>
              Start time: &nbsp;
              {post.eventStart}
              <br />
              End time: &nbsp;
              {post.eventEnd}
              <br />
            </p>
            <div className='form-group row'>
              <div className='col-xs-2'>
                <p>
                  <br />
                  Attended the event?
                  <br />
                  <label>Verify your attendance: </label>
                  <input
                    type='text'
                    className='form-control'
                    id='eventCode'
                    placeholder='Enter event code'
                    value={this.state.eventCode}
                    onChange={this.handleChange}
                    required
                  />
                  <button
                    className='button icon-left'
                    onClick={this.authenticateCode}
                  >
                    Verify
                  </button>
                </p>
              </div>
            </div>
            <button className='button icon-left' onClick={this.goBack}>
              Go back
            </button>
          </div>
        ))}
        <div className='push'></div>
      </div>
    );
  }
}

export default withRouter(Events);
