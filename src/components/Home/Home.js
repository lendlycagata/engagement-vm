import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter, Link } from "react-router-dom";
import moment from 'moment'
import "./Home.css"

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            events: [],
            now : moment ()
        }
        
        this.setState = this.setState.bind(this)
        
    }

    componentDidMount(){
        axios.get(API_BASE_URL+'get')
        .then(event => {
            const events = event.data
            this.setState({
                events
            })

    })
        .catch(err => console.log("Error "+ err))
    }


    render(){
    return(
        <div className="col-xs-6 col-sm-8 col-lg-6 hv-center home" style={{backgroundImage: `url(${'../turtles.jpg'})`}}>
		<div className="title">
			Events
		</div>
		<div className="calendar">
            {this.state.events
                .filter(current => this.state.now.isBefore(current.eventDate))
                .sort((a,b) => new Date(a.eventDate.split('/')) - new Date(b.eventDate.split('/')))
                .map(post =>
				<div className="calendar-row">
					<div className="date font-weight-bold">
                    {moment(post.eventDate).startOf('day').fromNow()}
					</div>
					<div className="details font-weight-bold" >
                    <Link to={'/events/' + post.eventID} className='Link'>{post.eventName}</Link>
                    </div>
				</div>
             )} 
		</div>
        <div className="push"></div>
	</div>
    )
}
}

export default withRouter(Home);