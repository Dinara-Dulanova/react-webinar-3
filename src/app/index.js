import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import ItemCard from '../app/item-card';

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
