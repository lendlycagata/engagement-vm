import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import './stars.css'
import { authenticationService } from '../LoginForm/LoginForm';

class Stars extends Component {
    constructor(props){
        super(props)
        this.state={
            user: ''
        }
        this.setState = this.setState.bind(this)
    }

    componentDidMount(){
        const user = authenticationService.currentUserValue
        this.setState({user})
    }

    render(){
    return(
    <div className="stars col-xs-6 col-sm-8 col-lg-6 mt-2 hv-center" style={{backgroundImage: `url(${'../tang.jpg'})`}}>
        <div className="title">
            Stars 
        </div>
            <div className="testUser">
                <h4>
               {this.state.user}
                </h4>
            </div>
        <hr className="hr"/>
        <h3>
        Total Stars: 0
        </h3>
	</div>
    )
}
}

export default withRouter(Stars);