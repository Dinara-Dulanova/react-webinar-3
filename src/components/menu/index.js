import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';

function Menu({title}) {
  return (
    <>
      <nav>
        <ul className='Menu'>
          <li className='Menu-item'>
            <Link to="/main">Главная</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

Menu.propTypes = {
  title: PropTypes.node,
};

export default memo(Menu);
