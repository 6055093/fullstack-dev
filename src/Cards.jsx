import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedCards extends Component {
  constructor(props) {
    super(props);
  }

  handleCard = () => {
    this.props.dispatch({ type: 'CURRENT_CARD', cardId: this.props.id });
    return;
  };
  render() {
    return (
      <>
        <Link to={`/card/${this.props.id}`}>
          <div className="cardContainer" onClick={this.handleCard}>
            <div className="imageContainer">
              <img className="cardImage" src={this.props.img} />
            </div>
            <div className="cardInfo">
              <h3 className="cardTitle">{this.props.title}</h3>
              <span className="cardPrice">Price: {this.props.price + '$'}</span>
            </div>
          </div>
        </Link>
      </>
    );
  }
}

export default connect(null)(UnconnectedCards);
