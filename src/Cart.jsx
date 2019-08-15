import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from './Checkout.jsx';

class Cart extends Component {
  handleRemove = (id) => {
    this.props.removeItem(id);
  };

  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.image} alt={item.image} className="" />
            </div>

            <div className="item-desc">
              <span className="cart-title">{item.title}</span>
              <p>{item.description}</p>
              <p>
                <b>Price: {item.price}$</b>
              </p>

              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.handleRemove(item.id);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Checkout />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch({ type: 'REMOVE_ITEM', id: id });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
