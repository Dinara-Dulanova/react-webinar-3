import {memo} from "react";
import './style.css';

const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
  let pageNumbers = [];
  const totalPages = Math.ceil(totalItems/itemsPerPage);
  
  if (totalPages <= 4) {
    for (let i = 1; i <=totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 2){
    pageNumbers = [1, 2, 3, '...', totalPages];
  } else if (currentPage === 3) {
    pageNumbers =[1, 2, 3, 4, '...', totalPages];
  } else if (currentPage < totalPages - 2) {
    pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  } else if (currentPage === totalPages - 2) {
    pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1,totalPages];
  } else {
    console.log("curr page = " + currentPage)
    pageNumbers = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  
  return (
    <>
    <ul className="pagination">
      {
        pageNumbers.map(number =>(
          (number != "...") ? 
            <li className={`page-item ${number === currentPage ? 'currentPage' : ''}`} key={number}>
              <a href="!#" className="page-link" onClick={() => paginate(number)}> {number}</a>
            </li>
          : <p className="page-item">...</p>
        ))
      }
    </ul>
    </>
  )
}


export default memo(Pagination);