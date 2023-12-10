import {memo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Передаем в ItemBasket вместо Link
    navigateToItemCard: useCallback((_id)=>{
      store.actions.modals.close(),
      (navigate(`/itemCard/${_id}`), [store])
      
    })
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} navigateToItemCard={callbacks.navigateToItemCard}/>
    }, [callbacks.removeFromBasket], [callbacks.closeModal]),
  };

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
