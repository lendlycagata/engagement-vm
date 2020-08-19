import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL } from '../../constants/apiConstants';
import { withRouter } from 'react-router-dom';
// import { BehaviorSubject } from 'rxjs';

// const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  currentUser: localStorage.getItem('currentUser'),
  get currentUserValue() {
    return localStorage.getItem('currentUser');
  },
};

function LoginForm(props) {
  if (authenticationService.currentUserValue) {
    props.history.push('/home');
    window.location.reload(true);
  }

  if (authenticationService.currentUser === 'admin') {
    props.history.push('/admin');
    window.location.reload(true);
  }

  const [state, setState] = useState({
    email: '',
    password: '',
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    // redirectToHome();
    e.preventDefault();
    const payload = {
      headers: { 'Content-Type': 'application/json' },
      email: state.email,
      password: state.password,
    };

    axios
      .post(API_BASE_URL + 'login', payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: 'Login successful. Redirecting to home page..',
          }));

          let token = response.data.token;
          let email = payload.email;
          let header = payload.headers;
          const user = {
            email,
            token,
            header,
          };
          props.showError(null);
          window.location.reload(true);
          localStorage.setItem('currentUser', email);
          // currentUserSubject.next(response.data.token);
          // redirectToHome();
        } else if (payload.email === 'admin' && payload.password === 'admin') {
          props.showError(null);
          window.location.reload(true);
          localStorage.setItem('currentUser', payload.email);
        } else if (response.status === 204) {
          console.log(response);
          props.showError('Username and password do not match');
        } else {
          console.log(response.status);
          props.showError('Username does not exist');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const redirectToAdminPage = () => {
  //     props.history.push('/admin')
  // }
  const redirectToHome = () => {
    props.updateTitle('Home');
    props.history.push('/home');
  };
  const redirectToRegister = () => {
    props.history.push('/register');
    props.updateTitle('Register');
  };

  return (
    <div
      className='col-xs-6 col-sm-8 col-lg-6 login-card mt-2 hv-center login'
      style={{ backgroundImage: `url(${'../meerkat.jpg'})` }}
    >
      <form>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={state.email}
            onChange={handleChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-check'></div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={handleSubmitClick}
        >
          LOG IN
        </button>
      </form>

      <div
        className='alert alert-success mt-2'
        style={{ display: state.successMessage ? 'flex' : 'none' }}
        role='alert'
      >
        {state.successMessage}
      </div>
      <div className='registerMessage'>
        <span>Don't have an account? </span>
        <span className='loginText' onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
    </div>
  );
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}

export default withRouter(LoginForm);
