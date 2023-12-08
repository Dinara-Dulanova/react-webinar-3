import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Head from "../head";
import ItemInfo from "../../store/item-info";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../pagination';



const ItemCard = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState({});

  const onDataLoaded = (data) => {
    setItemData(data);
  };

  return (
    <>
      <ItemInfo id={id} onDataLoaded={onDataLoaded} />
      <Head title={itemData.title}></Head>
      <Link to="/main" className="itemCard-onMain">Главная</Link>
      <div className='Item_info'>
        <div>{itemData.description}</div>
        <div>Страна производитель: {itemData.madeIn && itemData.madeIn.title}</div>
        <div>Год выпуска: {itemData.edition}</div>
      </div>
    </>
  );
};

export default ItemCard;