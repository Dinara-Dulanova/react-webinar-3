import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({onCartPopup, cartSumm, uniqItemCount}) {
  return (
    <div className='Controls'>
      <div className='Controls-cartInfo'>В корзине:
        <div className="summAndCount">
          {uniqItemCount === 0 ? 'Пусто' : `${uniqItemCount} ${plural(uniqItemCount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${cartSumm.toLocaleString()} ₽`}
        </div>
      </div>
      <button className='Controls-button' onClick={() => onCartPopup()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
