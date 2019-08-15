import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UnconnectedCards from './Cards.jsx';

class UnconnectedHome extends Component {
  constructor() {
    super();
    this.state = {
      categorizedCards: undefined,
    };
  }
  handleCategory = (category) => {
    const newCards = this.props.filtered.filter((card) => {
      return card.category === category;
    });
    this.setState({
      categorizedCards: newCards,
    });
  };

  render() {
    return (
      <div className="wrapperPage">
        <div className="categories">
          <div className="stickyContainer">
            <h3 className="categoryTitle">Categories</h3>
            <h4>
              <div
                className="categoryName"
                onClick={() => {
                  this.handleCategory('Vehicles');
                }}
              >
                Vehicles
              </div>
            </h4>
            <i className="fas fa-car-alt" />
            <h4>
              <div
                className="categoryName"
                onClick={() => {
                  this.handleCategory('Home Decor');
                }}
              >
                Home Decor
              </div>
            </h4>
            <i className="fas fa-home" />
            <h4>
              <div
                className="categoryName"
                onClick={() => {
                  this.handleCategory('Electronics');
                }}
              >
                Electronics
              </div>
            </h4>
            <i className="fas fa-tv" />
            <h4>
              <div
                className="categoryName"
                onClick={() => {
                  this.handleCategory('Pet Supplies');
                }}
              >
                Pet Supplies
              </div>
            </h4>
            <i className="fas fa-paw" />
            <h4>
              <div
                className="categoryName"
                onClick={() => {
                  this.handleCategory('Other');
                }}
              >
                Other
              </div>
            </h4>
            <i className="fas fa-random" />
            <div className="sellItemBtn">
              <Link to="/sell-item">+ Sell something</Link>
            </div>
          </div>
        </div>
        <div>
          <div className="cardsFlex">
            {this.state.categorizedCards
              ? this.state.categorizedCards.map((card) => (
                  <UnconnectedCards
                    title={card.title}
                    id={card.id}
                    price={card.price}
                    img={card.image}
                  />
                ))
              : this.props.filtered.map((card) => (
                  <UnconnectedCards
                    title={card.title}
                    id={card.id}
                    price={card.price}
                    img={card.image}
                  />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (st) => {
  console.log('hello', st);
  const filtered = st.cards.filter((card) => {
    const lc = card.title.toLowerCase();
    const filter = st.searchTerm.toLowerCase();

    return lc.includes(filter);
  });
  console.log(filtered);
  return { filtered: filtered };
};

export default connect(mapStateToProps)(UnconnectedHome);
