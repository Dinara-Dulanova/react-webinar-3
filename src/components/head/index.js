import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({blockName, title, onClose}) {
  return (
    <div className={`Head Head-${blockName}`}>
      <h1>{title}</h1>
      {onClose && (
        <button className="Head__button" type="button" onClick={onClose}>
          Закрыть
        </button>
      )}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};


export default React.memo(Head);
