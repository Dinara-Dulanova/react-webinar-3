import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from "./components/cart";
import PageLayout from "./components/page-layout";
import cart from './components/cart';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  //const [orders, setOrders] = useState([]);
  const cartList = store.getState().cartList;
  console.log("cartList", cartList);
  const [orderSumm, setOrderSumm] = useState(0);
  //const fullSum = 

  //open Cart popup
  const [isCartPopupOpen, setCartPopupOpen] = useState(false);
  const handleCartClick = () => {
    setCartPopupOpen(true);
  }

  const closeCartPopup = () => {
    setCartPopupOpen(false);
  }


  const callbacks = {
    onAddToOrder: useCallback(
      (code, count, price) => {
        setOrderSumm(prevOrderSumm =>  prevOrderSumm + price);
        store.addItemToCart(code, count);
      },
      [store, setOrderSumm]
    ),
    onDeleteFromCart: useCallback(
      (code, count, price) => {
        console.log("count "+count + " price = " + price);
        setOrderSumm(prevOrderSumm =>  prevOrderSumm - price*count);
        store.removeItemFromCart(code);
      },
      [store, setOrderSumm]
    ),
  }

  return (
    <PageLayout>
      <Head blockName = 'main' title='Магазин'/>
      <Controls onCartPopup={handleCartClick}
                cartSumm = {orderSumm}
                uniqItemCount = {cartList.length}/>
      <List onCart={false}
            list={list}
            onAction = {callbacks.onAddToOrder}/>
      <Cart cartList = {cartList}
            isOpen = {isCartPopupOpen}
            onClose = {closeCartPopup}
            onAction = {callbacks.onDeleteFromCart}
            orderSumm = {orderSumm}/>
    </PageLayout>
  );
}

export default App;