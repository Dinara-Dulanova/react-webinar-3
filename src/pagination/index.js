import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

const Pagination = ({itemsPerPage, totalItems, paginate}) => {
  const pageNumbers = []

  for (let i=1; i <= Math.ceil(totalItems/itemsPerPage); i++)
  {
    pageNumbers.push(i);
  }
  return (
    <>
    <ul className="pagination">
      {
        pageNumbers.map(number =>(
          <li className="page-item" key={number}>
            <a href="!#" className="page-link" onClick={() => paginate(number)}> {number}</a>

          </li>
        ))
      }
    </ul>
    </>
  )
}


export default memo(Pagination);
