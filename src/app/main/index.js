import {memo, useCallback, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../pagination';
import Navigation from '../../components/navigation';

function Main() {

  const store = useStore();
  const navigate = useNavigate();
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
    navigateToItemCard: useCallback((_id) => (navigate(`/itemCard/${_id}`), [store])
    )
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} navigateToItemCard={callbacks.navigateToItemCard}/>
    }, [callbacks.addToBasket]),
  };

  
  const paginate = pageNumber => setCurrentPage(pageNumber)

  //console.log("listPage " + select.count);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Navigation openModalBasket= {callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}></Navigation>
      <List list={select.listPage} 
            renderItem={renders.item}/>
      <Pagination itemsPerPage={itemsPerPage} 
                  totalItems ={select.count}
                  paginate={paginate}
                  currentPage={currentPage}></Pagination>
    </PageLayout>

  );
}

export default memo(Main);
