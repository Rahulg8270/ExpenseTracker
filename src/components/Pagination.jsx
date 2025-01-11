import React from 'react';
import '../../src/App.css';
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  if(totalPages === 0) return null;
  return (
    <div className='pagination'>
        <button id='leftArrow' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <BsArrowLeft />
        </button>
        {Array.from({length: totalPages},(_,index) => {
            const page = index+1
            return currentPage === page && (<button id='indexBtn'
                     key={page}
                     onClick={() => onPageChange(page)}
                   >
                        {page}
                   </button>)
        })}
        <button id='rightArrow' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <BsArrowRight />
        </button>
    </div>
  )
}

export default Pagination