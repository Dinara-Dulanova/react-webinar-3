import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, buttonText, countRow, onAction}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} list={list} buttonText={buttonText} countRow={countRow} onAction = {onAction}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func,
};

List.defaultProps = {
  onAction: () => {
  },
}

export default React.memo(List);
