import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  render() {
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
          </li>
        </div>
        <div className="checkout">
          <Link to="/checkout">
            <button className="waves-effect waves-light btn">Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    total: state.total,
  };
};

export default connect(mapStateToProps)(Checkout);
