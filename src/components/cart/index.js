import React from "react";
import './style.css';
import List from '../list'
import Head from '../head'

function Cart({orders, isOpen, onClose,buttonText, onAction, orderSumm}) {
  return (
    <>
    <div className={`Cart ${isOpen ? 'Cart_opened' : ''}`}>
      <div className="Cart__container">
        <Head blockName = 'cart' title='Корзина' onClose={onClose}/>
        {orderSumm ?
          <>
            <List list={orders}
                  buttonText={buttonText}
                  countRow = {true}
                  onAction={onAction}/>
            <div className="Cart__summ">
              <div className="Cart__summ_title">Итого</div>
              <div className="Cart__summ_count">{orderSumm} ₽</div>
            </div>
          </> 
          : <div className="Cart__empty_title">Пусто</div>
      }
    </div>
  </div>
  </>
  )
}

export default React.memo(Cart);
