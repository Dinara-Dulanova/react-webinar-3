import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import ItemCart from "../itemCart"; // Импортируйте ваш компонент ItemCart
import './style.css';

function List({ onCart, list, onAction }) {
  return (
    <div className='List'>
      {list.map(item => (
        <div key={item.code} className='List-item'>
          {onCart ? (
            <ItemCart item={item} list={list} onAction={onAction} />
          ) : (
            <Item item={item} list={list} onAction={onAction} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func,
  onCart: PropTypes.bool,
};

List.defaultProps = {
  onAction: () => {},
  onCart: false,
};

export default React.memo(List);