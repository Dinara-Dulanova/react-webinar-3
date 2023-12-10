import {React,  useState, useCallback, memo, useEffect} from "react";
import {useParams} from "react-router-dom";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemCardInfo from "../../components/item-card";
import PageLayout from "../../components/page-layout";
import Navigation from '../../components/navigation';

function ItemCard() {

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.itemCard.loadItemCardInfo(id);
  }, [id]);

  const select = useSelector(state => ({
    itemCard: state.itemCard.itemCard,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  console.log("app/itemCard "+ select.itemCard);

  return (
    <>
    <PageLayout>
      <Head title={ select.itemCard?.title}></Head>
      <Navigation openModalBasket= {callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}></Navigation>
      <ItemCardInfo itemCard={select.itemCard} onAdd={callbacks.addToBasket}></ItemCardInfo>
    </PageLayout>
    </>
  );
}

export default memo(ItemCard);
