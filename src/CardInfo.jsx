import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CardInfo extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  render() {
    console.log('heyyyy!');
    return (
      <div className="cardInfo-wrapper">
        <div className="image-wrapper">
          <img className="cardImage" src={this.props.card.image} />
        </div>
        <div className="info-wrapper">
          <h1 className="itemTitle">{this.props.card.title}</h1>
          <h2 style={{ color: 'green' }}>{this.props.card.price + '$'}</h2>
          <div>
            <h2>Description</h2>
            <p>{this.props.card.description}</p>
          </div>
          <div
            className="formSubmit"
            onClick={() => {
              this.handleClick(this.props.card.id);
            }}
          >
            Add to Cart
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch({ type: 'ADD_TO_CART', id: id });
    },
  };
};

const mapStateToProps = (st) => {
  return {
    currentCard: st.currentCard,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardInfo);
