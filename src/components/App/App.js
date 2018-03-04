import React, { Component } from 'react';

import AddItemForm from '../AddItemForm/AddItemForm';
import ItemsList from '../ItemsList/ItemsList';
import AddDiscountForm from '../AddDiscountForm/AddDiscountForm';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      discount: 0
    };

    this.currentProductId = 1;
  }

  addItem = (item) => {
    const { items } = this.state;

    const updatedItems = [
      ...items,
      {
        ...item,
        id: this.currentProductId
      }
    ];

    this.currentProductId += 1;

    this.setState({
      items: updatedItems
    });
  };

  applyDiscount = (discount) => {
    this.setState({
      discount
    });
  };

  calcItemsDiscounts = () => {
    const {
      items,
      discount
    } = this.state;

    if (discount <= 0) {
      return items;
    }

    let totalSum = 0;
    items.forEach((item) => {
      totalSum += item.price;
    });

    const itemsWithDiscounts = [];
    items.forEach((item) => {
      // по пропорции считаем размер скидки для каждого товара (округляем в меньшую сторону)
      // и затем отнимаем эту скидку от исходной цены
      const priceWithDiscount = item.price - Math.floor((discount * item.price) / totalSum);
      itemsWithDiscounts.push({
        id: item.id,
        name: item.name,
        price: priceWithDiscount
      });
    });

    // считаем сумму скидок всех товаров
    let totalDiscountsSum = 0;
    itemsWithDiscounts.forEach((item, index) => {
      totalDiscountsSum += items[index].price - item.price;
    });

    // проверяем, равна ли сумма скидок всех товаров общей скидке
    // и если она меньше, то отнимаем от самого дорогого товара недостающую часть скидки
    if (totalDiscountsSum < discount) {

      // ищем самый дорогой товар
      let theMostExpensiveItem = items[0];
      items.forEach((item) => {
        if (item.price > theMostExpensiveItem.price) {
          theMostExpensiveItem = item;
        }
      });

      // ищем его индекс в массивах
      const theMostExpensiveItemIndex = items.findIndex((item) => item.id === theMostExpensiveItem.id);

      // отнимаем от цены со скидкой самого дорогого товара недостающую скидку
      itemsWithDiscounts[theMostExpensiveItemIndex].price = itemsWithDiscounts[theMostExpensiveItemIndex].price - (discount - totalDiscountsSum);
    }

    return itemsWithDiscounts;
  };

  render() {
    const {
      items,
      discount
    } = this.state;
    const itemsWithDiscount = this.calcItemsDiscounts();

    return (
      <div className="container">
        <AddItemForm addItem={this.addItem} />
        <h2>Корзина</h2>
        {
          (items.length > 0) ?
            <ItemsList items={items} itemsWithDiscount={itemsWithDiscount} discount={discount} /> :
            null
        }
        {
          (items.length > 0) ?
            <AddDiscountForm applyDiscount={this.applyDiscount} /> :
            null
        }
      </div>
    );
  }
}

export default App;
