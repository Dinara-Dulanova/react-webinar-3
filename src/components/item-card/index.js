import {React,  useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ModalLayout from "../modal-layout";
import './style.css';



function ItemCardInfo (props) {

 console.log(props.itemCard?._id)
  const callbacks = {
    onAdd: (e) => props.onAdd(props.itemCard?._id)
  }

  return (
    <>
    <div className='ItemInfo'>
      <div className='ItemInfo_container'>
        <div className='ItemInfo_description'>{props.itemCard?.description}</div>
        <div className="ItemInfo_label">Страна производитель: <span className="ItemInfo_value"> {props.itemCard?.madeIn && props.itemCard?.madeIn.title} </span></div>
        <div className="ItemInfo_label">Категория: <span className="ItemInfo_value">{props.itemCard?.category.title}</span></div>
        <div className="ItemInfo_label">Год выпуска: <span className="ItemInfo_value">{props.itemCard?.edition}</span></div>
        <div className="ItemInfo_label">Цена: <span className="ItemInfo_value">{props.itemCard?.price}</span></div>
        <button className="ItemInfo_addButton" onClick={callbacks.onAdd}>Добавить</button>
      </div>
      </div>
    </>
  );
};

export default ItemCardInfo;