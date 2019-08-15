import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  handleSearch = (e) => {
    this.props.dispatch({ type: 'searchQuery', searchTerm: e.target.value });
  };

  handleLogout = () => {
    fetch('/logout', { method: 'POST', credentials: 'same-origin' });
    this.props.dispatch({ type: 'LOGOUT' });
  };

  render() {
    return (
      <div className="navbar">
        <Link to={'/'}>
          <div className="logoTitle">ALIBAY</div>
        </Link>
        <input
          type="text"
          className="searchBar"
          onChange={this.handleSearch}
          placeholder="Search Alibay..."
        />
        {/* <div className="navLink">
        <Link to={'/'}>Home</Link>
      </div> */}
        <div className="navLink">
          <Link to={'/sell-item'}>Sell item</Link>
        </div>
        <div className="navLink">
          <Link to={'/cart'}>My cart</Link>
        </div>
        <div className="navLink">
          <Link onClick={this.handleLogout} to="/">
            Log out
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null)(Navbar);
