import React from 'react';
import './Header.css'
import FaceIcon from '@material-ui/icons/Face';
import { Link } from "react-router-dom";
import {logout} from '../LoginForm/LoginForm'
import Dropdown from 'react-bootstrap/Dropdown'
import { authenticationService } from '../LoginForm/LoginForm';

function Header() {
    const currentUser = authenticationService.currentUserValue
    const isLoggedIn = currentUser
    
    return(
        <div className="container">
        <nav className="navbar">
            <div className="telus-header text-light" >
                        <div className="telus-image text-light">
                        <Link to='/home'>
                        <img
                                alt=""
                                src="../TIDS.png"
                                width="205px"
                                height="45px"
                            />
                        </Link>
                        </div>
            </div>
            
            {isLoggedIn ? 
            <div className="telus-user text-light">
            
            <div className="telus-user-icon">
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant="secondary">
            <FaceIcon /> 
            &nbsp;
            {currentUser}
            &nbsp;
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={logout} href="/login">Log out</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </div>
            
            
{/*            
        <div className="telus-user text-light">
            <div className="telus-user-icon">
                <FaceIcon />
                </div>
                <div className="telus-logout">
                    {currentUser} &nbsp; 
                    <a className="logout-button" onClick={logout} href="/login">Logout</a>
                </div> */}
                </div>
            : null
            }
        </nav>
        </div>



    )
    

    
}
export default Header;