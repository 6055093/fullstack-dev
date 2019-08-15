import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.jsx';

class SellItem extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      title: '',
      description: '',
      category: '',
      price: '',
      image: '',
    };
  }

  handleUpdateTitle = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value,
    });
  };

  handleUpdateDescription = (e) => {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  };

  handleUpdateCategory = (e) => {
    this.setState({
      ...this.state,
      category: e.target.value,
    });
  };

  handleUpdatePrice = (e) => {
    this.setState({
      ...this.state,
      price: e.target.value,
    });
  };

  handleUpdateImage = (e) => {
    this.setState({
      ...this.state,
      image: this.fileInput.current.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form has been submitted to the back-end');
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('category', this.state.category);
    formData.append('price', this.state.price);
    formData.append('image', this.state.image);
    console.log(formData);
    fetch('/sell-item', { method: 'POST', body: formData })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <div className="box">
        <div className="formContainer">
          <div className="title">Create an ad</div>
          <form
            id="createCardForm"
            className="cardForm"
            onSubmit={this.handleSubmit}
          >
            <div className="formItemTitle">
              <h3 className="formSubTitle">Ad Title</h3> <br />
              <input
                type="text"
                onChange={this.handleUpdateTitle}
                className="inputAdTitle"
                placeholder="What are you selling...?"
                required
              />
            </div>
            <div className="itemDescription">
              <h3 className="formSubTitle">Description</h3> <br />
              <textarea
                type="text"
                onChange={this.handleUpdateDescription}
                className="inputDescription"
                placeholder="Describe your item..."
                required
              />
            </div>
            <div className="itemCategory">
              <h3 className="formSubTitle">Category</h3> <br />
              <select
                className="inputCategory"
                onChange={this.handleUpdateCategory}
                required
              >
                <option value="vehicles">Vehicles</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Electronics">Electronics</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="itemPrice">
              <h3 className="formSubTitle">Price</h3> <br />
              <input
                type="text"
                onChange={this.handleUpdatePrice}
                className="inputPrice"
                placeholder="$..."
                required
              />
            </div>
            <div className="itemImage">
              <h3 className="formSubTitle">Upload Image</h3> <br />
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={this.fileInput}
                onChange={this.handleUpdateImage}
                required
              />
            </div>

            <input type="submit" className="formSubmit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null)(SellItem);
