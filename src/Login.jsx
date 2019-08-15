import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleUsernameChange = (event) => {
    console.log('new username', event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = (event) => {
    console.log('new password', event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log('login form submitted');
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    let responseBody = await response.text();
    console.log('responseBody from login', responseBody);
    let body = JSON.parse(responseBody);
    console.log('parsed body', body);
    if (!body.success) {
      alert('login failed');
      return;
    }
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      username: this.state.username,
    });
  };
  render = () => {
    return (
      <>
        <form className="formInput" onSubmit={this.handleSubmit}>
          <h1 className="formTitle">Login</h1>
          <div className="wrap-inputField">
            <input
              className="inputField"
              type="text"
              placeholder="Username"
              onChange={this.handleUsernameChange}
            />
            <i className="fas fa-user" />
          </div>
          <div className="wrap-inputField">
            <input
              className="inputField"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
            <i className="fas fa-unlock" />
          </div>
          <div className="submitBtnContainer">
            <button className="submitButton">
              <Link to="/">Login</Link>
            </button>
          </div>
          <div className="signupRequest">
            *Don't have an account yet?{' '}
            <Link className="signupLink" to="/signup">
              Sign up!
            </Link>
          </div>
        </form>
      </>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
