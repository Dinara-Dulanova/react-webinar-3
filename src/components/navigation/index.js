import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import BasketTool from "../../components/basket-tool";
import Menu from "../../components/menu";

function Navigation({openModalBasket, amount, sum}) {
  return (
    <div className="navigation" style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Menu />
        <BasketTool onOpen={openModalBasket} amount={amount}
                    sum={sum}/>
      </div>
  )
}

Navigation.propTypes = {
  title: PropTypes.node,
};

export default memo(Navigation);
