import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import CardInfo from './CardInfo.jsx';
import SellItem from './SellItem.jsx';
import Cart from './Cart.jsx';

class App extends Component {
  async componentDidMount() {
    const response = await fetch('/session');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'LOGIN_SUCCESS', username: body.username });
    }

    this.fetchItems();
  }
  fetchItems = async () => {
    const response = await fetch('/items');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'SET_ITEMS', items: body.items });
    }
  };
  renderHome = () => {
    return <Home cards={this.props.cards} />;
  };
  renderLogin = () => {
    return <Login />;
  };
  renderSignup = (routerData) => {
    return <Signup history={routerData.history} />;
  };
  renderLogout = () => {
    return <Logout />;
  };
  renderCard = (routerData) => {
    console.log('rendering card...');
    const cardId = Number(routerData.match.params.cardId);
    const card = this.props.cards.find((card) => card.id === cardId);
    return <CardInfo card={card} />;
  };
  renderSellItem = () => {
    console.log('rendering sell item page');
    return <SellItem />;
  };

  renderCart = () => {
    console.log('rendering Cart');
    return <Cart />;
  };
  renderCheckout = () => {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="checkoutForm-wrapper">
          <h1>Complete checkout</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  };

  render() {
    return (
      <BrowserRouter>
        {this.props.lgin ? (
          <>
            <Navbar />
            <Route path="/" exact render={this.renderHome} />
            <Route path="/card/:cardId" render={this.renderCard} />
            <Route path="/sell-item" render={this.renderSellItem} />
            <Route path="/cart" render={this.renderCart} />
            <Route path="/checkout" render={this.renderCheckout} />
          </>
        ) : (
          <div className="formPage">
            <div className="fillerPage">
              ALIBAY
              <p className="slogan">Find what you want, where you want.</p>
            </div>
            <div className="form">
              <Route path="/" exact render={this.renderLogin} />
              <Route path="/login" exact render={this.renderLogin} />
              <Route path="/signup" exact render={this.renderSignup} />
              <Route path="/logout" exact render={this.renderLogin} />
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return { lgin: state.loggedIn, cards: state.cards };
};
export default connect(mapStateToProps)(App);
