import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from "./components/cart";
import PageLayout from "./components/page-layout";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const [orders, setOrders] = useState([]);
  const [orderSumm, setOrderSumm] = useState(0);

  //open Cart popup
  const [isCartPopupOpen, setCartPopupOpen] = useState(false);
  const handleCartClick = () => {
    setCartPopupOpen(true);
  }

  const closeCartPopup = () => {
    setCartPopupOpen(false);
  }

  const callbacks = {
    onDeleteFromCart: useCallback((item) => {
      setOrders(orders.filter((order) => order.code !== item.code));
      setOrderSumm(orderSumm - item.price*item.count);
    }, [orders, setOrders]),

    onAddToOrder: useCallback((item) => {
      setOrderSumm(orderSumm + item.price);

      const existingOrder = orders.find((order) => order.code === item.code); // Поиск элемента в массиве orders по коду
      if (existingOrder) {
        const updatedOrders = orders.map((order) =>
        order.code === item.code ? { ...order, count: order.count + 1 } : order
        );
        setOrders(updatedOrders);
      } else {
        // Если элемент не существует, добавляем его в массив
        setOrders([...orders, { ...item, count: 1 }]);
      }
    }, [orders, setOrders]),
  }

  return (
    <PageLayout>
      <Head blockName = 'main' title='Магазин'/>
      <Controls onCartPopup={handleCartClick}
                cartSumm = {orderSumm}
                uniqItemCount = {orders.length}/>
      <List list={list}
            onAction = {callbacks.onAddToOrder}
            buttonText={"Добавить"}
            countRow = {false}/>
      <Cart orders = {orders}
            isOpen = {isCartPopupOpen}
            onClose = {closeCartPopup}
            onAction = {callbacks.onDeleteFromCart}
            buttonText={"Удалить"}
            countRow = {true}
            orderSumm = {orderSumm}/>
    </PageLayout>
  );
}

export default App;