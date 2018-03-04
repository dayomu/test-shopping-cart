import React, { Component } from 'react';

class AddItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: ''
    };
  }

  handleMultipleInputChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    this.setState({
      [inputName]: value
    });
  };

  handleAddButtonClick = (e) => {
    e.preventDefault();

    const { addItem } = this.props;
    const {
      name,
      price
    } = this.state;

    addItem({
      name,
      price: parseInt(price, 10)
    });

    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      name: '',
      price: ''
    });
  };

  render() {
    const {
      name,
      price
    } = this.state;

    return (
      <form className="form-inline add-item-form">
        <h3>Добавить продукт</h3>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Продукт"
            className="form-control"
            value={name}
            onChange={this.handleMultipleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            min="1"
            name="price"
            value={price}
            placeholder="Цена"
            className="form-control"
            onChange={this.handleMultipleInputChange}
          />
        </div>
        <button
          onClick={this.handleAddButtonClick}
          className="btn btn-primary"
        >
          Добавить
        </button>
      </form>
    );
  }
}

export default AddItemForm;