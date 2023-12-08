import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {BrowserRouter, Routes,Route, Redirect} from "react-router-dom";
import ItemCard from '../components/item-card';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<Main />} />
        <Route path="/itemCard/:id" element={<ItemCard />} />
        </Routes>
        {activeModal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default App;
