import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../pagination';

function Main() {

  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    store.actions.catalog.load();
    //store.actions.catalog.pang(0, 0);
  }, []);

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    store.actions.catalog.pang(10, firstItemIndex);
  }, [currentPage, itemsPerPage]);



  const select = useSelector(state => ({
    list: state.catalog.list,
    listPage: state.catalog.listPage,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  
  const paginate = pageNumber => setCurrentPage(pageNumber)

  //console.log("listPage " + select.count);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.listPage} 
            renderItem={renders.item}/>
      <Pagination itemsPerPage={itemsPerPage} 
                  totalItems ={select.count}
                  paginate={paginate}></Pagination>
    </PageLayout>

  );
}

export default memo(Main);
