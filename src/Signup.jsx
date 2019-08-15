import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';

class Signup extends Component {
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
    console.log('signup form submitted');
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    const response = await fetch('/signup', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      username: this.state.username,
    });
    this.props.history.push('/');
  };
  render = () => {
    return (
      <>
        <form className="formInput" onSubmit={this.handleSubmit}>
          <h1 className="formTitle">Signup</h1>
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
            <button className="submitButton">Signup</button>
          </div>
          <div className="signupRequest">
            <Link className="signupLink" to="/">
              Login
            </Link>
          </div>
        </form>
      </>
    );
  };
}

export default connect()(Signup);
