import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onCartPopup, cartSumm, uniqItemCount}) {
  return (
    <div className='Controls'>
      <div className='Controls-cartInfo'>В корзине:
        <div className="summAndCount">
          {cartSumm === 0 ? 'Пусто' : `${uniqItemCount} товара / ${cartSumm} ₽`}
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
