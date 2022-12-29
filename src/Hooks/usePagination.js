import React from 'react'
import { useSelector } from "react-redux";

export const DOTS = "..."

const range = (start, end) => {
    const length = end - start + 1
    return Array.from({length}, (_, index) => index + start)
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}) => {

    const pageData = useSelector(state => state.paginationReducer)

const paginationRange = React.useMemo(() => {
    
        const totalPageCount = Math.ceil(totalCount / pageData.divide)
        const totalPageNumbers = siblingCount + 5

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const showLeftDots = leftSiblingIndex > 2
        const showRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        if (!showLeftDots && showRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        if (showLeftDots && !showRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

            return [firstPageIndex, DOTS, ...rightRange]
        }

        if (showLeftDots && showRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)

            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }
    }, [currentPage, pageData.divide, siblingCount, totalCount])

    return paginationRange
}

