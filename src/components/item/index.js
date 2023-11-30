import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {
  const itemCountInOrderList = props.list.find((elem) => elem.code === props.item.code); //ищем сколько раз добавли товар

  return (
    <div className='Item'>
      <div className='Item-codeAndTitle'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>{props.item.title}</div>
      </div>
      <div className='Item-priceAndActions'>
        <div className='Item-price'>{props.item.price} ₽</div>
        {props.countRow && (
          <div className='Item-count'> {itemCountInOrderList.count} шт.</div>
        )}
        <div className='Item-actions'>
          <button onClick= {() => props.onAction(props.item)}>
            {props.buttonText}
         </button>
      </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onAddToCart: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
  onAddToCart: () => {
  },
}

export default React.memo(Item);