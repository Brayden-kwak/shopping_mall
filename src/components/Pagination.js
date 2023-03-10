import React from 'react'
import "../style/Pagination.css"
import { usePagination, DOTS } from "../Hooks/usePagination"

const Pagination = (props) => {

    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })
    const lastPage = paginationRange && paginationRange[paginationRange?.length - 1]

    if (currentPage === 0 || paginationRange?.length < 1) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

  return (
    <ul className="pagination-container">
        <li className={currentPage === 1 ? "pagination-item disabled" : "pagination-item"} onClick={onPrevious}>
            <div className="arrow-left"/>
        </li>
        {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
                return <li className="pagination-item dots" key={index}>&#8230;</li>
            } 

            return (
                <li className={pageNumber === currentPage ? "pagination-item selected" : "pagination-item"} onClick={() => onPageChange(pageNumber)} key={index}>
                    {pageNumber}
                </li>
            )
        })}
        <li className={currentPage === lastPage ? "pagination-item disabled" : "pagination-item"} onClick={onNext}>
            <div className="arrow-right"/>
        </li>
    </ul>
  )
}

export default Pagination