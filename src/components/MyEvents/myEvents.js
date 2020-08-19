import React, {Component} from 'react';
import axios from 'axios';
import {TASK_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import moment from 'moment'
import "./myEvents.css"
import { authenticationService } from '../LoginForm/LoginForm';

const currentUser = authenticationService.currentUserValue
const isAdmin = currentUser === 'admin'
class MyEvents extends Component {
    constructor(props){
        super(props)
        this.state={
            tasks: [],
            now: moment(),
        }
        this.setState = this.setState.bind(this)
    }

    componentDidMount(){
        axios.get(TASK_BASE_URL+'getTasks')
        .then(task => {
            const tasks = task.data
            this.setState({tasks})
        })
        .catch(err => console.log("Error "+ err))
    }

    render(){
    return(
    <div className="col-xs-6 col-sm-8 col-lg-6 hv-center myevents" style={{backgroundImage: `url(${'../monkey.jpg'})`}}>
		<div className="title">
			Tasks
            </div>
            <div className="calendar">
            {isAdmin? 
            this.state.tasks.map(post =>               
            <div className="calendar-row">
            <div className="date font-weight-bold tasks" >
            {moment(post.taskDate).startOf('day').fromNow()}
            </div>
            <div className="details font-weight-bold">
            {post.taskName}
            </div>
            </div>
            )
            :
            this.state.tasks
               .filter(current => this.state.now.isBefore(current.taskDate))
               .filter(current => current.userID === localStorage.getItem('currentUser'))
               .sort((a,b) => new Date(a.taskDate.split('/')) - new Date(b.taskDate.split('/')))
               .map(post =>
                    <div className="calendar-row">
                        <div className="date font-weight-bold tasks" >
                        {moment(post.taskDate).startOf('day').fromNow()}
                        </div>
                        <div className="details font-weight-bold">
                        {post.taskName}
                        </div>
                    </div>
            )}
		</div>
        <div className="push"></div>
	</div>
    )
}
}

export default withRouter(MyEvents);
