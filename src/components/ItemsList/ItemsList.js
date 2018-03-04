import React from 'react';

const ItemsList = (props) => {
  const {
    items,
    itemsWithDiscount,
    discount
  } = props;

  return (
    <table className="table table-hover items-list">
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Цена</th>
          <th>{`Цена со скидкой (Текущая примененная скидка: ${discount} руб.)`}</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{itemsWithDiscount[index].price}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default ItemsList;