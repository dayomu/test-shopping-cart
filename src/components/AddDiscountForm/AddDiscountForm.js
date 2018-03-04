import React, { Component } from 'react';

class AddDiscountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discount: ''
    };
  }

  handleDiscountChange = (e) => {
    this.setState({
      discount: e.target.value
    });
  };

  handleApplyButtonClick = (e) => {
    e.preventDefault();

    const { applyDiscount } = this.props;
    const { discount } = this.state;

    applyDiscount(parseInt(discount, 10));

    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      discount: ''
    });
  };

  render() {
    const { discount } = this.state;

    return (
      <form className="form-inline add-discount-form">
        Применить скидку <input type="number" min="0" value={discount} className="form-control" onChange={this.handleDiscountChange} /> руб. <button className="btn btn-default" onClick={this.handleApplyButtonClick}>Применить</button>
      </form>
    );
  }
}

export default AddDiscountForm;