import React from 'react';
import './footer.css'
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import StarsIcon from '@material-ui/icons/Stars';
import AdbIcon from '@material-ui/icons/Adb';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { authenticationService } from '../LoginForm/LoginForm';

function Footer(props) {
    const currentUser = authenticationService.currentUserValue
    const isAdmin = currentUser === 'admin'
    return(
        <footer className="parent ">
        {isAdmin ? 
        <div className="row">
                <div className="column-home">
                <i className="home-icon">
                    <ListIcon />
                </i>
                <Link to="/myevents" className="home-text" >
                Tasks
                </Link>
            </div>
            <div className="column-home">
                <i className="home-icon">
                    <AddCircleOutlineIcon />
                </i>
                <Link to="/tasks" className="home-text" >
                Add Tasks
                </Link>
            </div>
            <div className="column-home">
                <i className="home-icon">
                    <HomeIcon />
                </i>
                <Link to="/home" className="home-text" >
                Events
                </Link>
            </div>
            <div className="column-home">
                <i className="home-icon">
                <AdbIcon />
                </i>
                <Link to="/admin" className="home-text" >
                Post Event
                </Link>
            </div>
        
        </div>
        :
        <div className="row">
            <div className="column-home">
                <i className="home-icon">
                    <ListIcon />
                </i>
                <Link to="/myevents" className="home-text" >
                Tasks
                </Link>
            </div>
            <div className="column-home">
                <i className="home-icon">
                    <HomeIcon />
                </i>
                <Link to="/home" className="home-text" >
                Events
                </Link>
            </div>
            <div className="column-home">
                <i className="home-icon">
                    <StarsIcon />
                </i>
                <Link to="/stars" className="home-text" >
                Stars
                </Link>
            </div>
        </div>
    }
        </footer>
        )
}
export default Footer