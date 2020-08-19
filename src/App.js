import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import Admin from './components/Admin/admin';
//import MyEvents from './components/MyEvents/myevents';
import Stars from './components/Stars/stars';
import Footer from './components/Footer/Footer';
import Events from './components/Events/events';
import Tasks from './components/Tasks/tasks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AlertComponent from './components/AlertComponent/AlertComponent';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { AdminRoute } from './components/routes/adminRoute';
import { authenticationService } from '../src/components/LoginForm/LoginForm';
import { userService } from '../src/components/Helpers/user-service';
//import app from '../app';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const currentUser = localStorage.getItem('currentUser');
  // const [currentUser, setUser] = useState(null)
  const isLoggedIn = currentUser;

  // useEffect(() => {
  //   userService.getAll().then(users => this.setUser({ users }));
  // })

  return (
    <Router>
      <div className='App'>
        <Header title={title} />
        <div className='container d-flex justify-content-center'>
          <Switch>
            <Route path='/' exact>
              <LoginForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path='/register'>
              <RegistrationForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path='/login'>
              <LoginForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <PrivateRoute path='/home' refresh='true' component={Home} />
            <AdminRoute path='/admin' component={Admin} />
            <AdminRoute path='/tasks' component={Tasks} />
            <PrivateRoute path='/stars' component={Stars} />
            {/* <PrivateRoute path='/myevents' component={MyEvents} /> */}
            <PrivateRoute path='/events/:eventID' exact component={Events} />
            {/* <Route path="/events" exact component={Events} /> */}
          </Switch>
          <AlertComponent
            errorMessage={errorMessage}
            hideError={updateErrorMessage}
          />
        </div>
        {isLoggedIn ? <Footer /> : null}
      </div>
    </Router>
  );
}

export default App;
