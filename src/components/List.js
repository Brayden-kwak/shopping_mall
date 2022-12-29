import React from 'react'
import useFetchApi from '../Hooks/useFetchApi'
import "../style/List.css"
import Pagination from './Pagination'
import Product from './Product'
import { useAppDispatch } from "../reducers/store";
import { useSelector } from "react-redux";
import paginationReducer from '../reducers/paginationReducer';

const List = () => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [limitData, setLimitData] = React.useState(10)

    const data = useFetchApi("https://dummyjson.com/products?limit=100")
    
    const dispatch = useAppDispatch();

    const searchInput = useSelector(state => state.searchFilterReducer)
    const pageData = useSelector(state => state.paginationReducer)

    const totalCount = searchInput.inputText?.length > 0 ? pageData?.totalProducts : data.products?.length

    const currentData = React.useMemo(() => {
        const firstPageIndex = (currentPage - 1) * Number(limitData)
        return data.products?.slice(firstPageIndex, firstPageIndex + Number(limitData))
    }, [currentPage, data.products, limitData])

    const filteredData = currentData?.filter(item => {
        if (searchInput.inputText === undefined || searchInput.inputText === "") {
            return true
        } 

        let output = false

        const searchText = searchInput.inputText.toLowerCase()
        const title = item.title.toLowerCase()
        const brand = item.brand.toLowerCase()
        const description = item.description.toLowerCase()

        if (searchInput.category === "전체") {
            output = 
                title.includes(searchText) ||
                brand.includes(searchText) ||
                description.includes(searchText) 
        } else if (searchInput.category === "상품명") {
            output = title.includes(searchText)
        } else if (searchInput.category === "브랜드") {
            output = brand.includes(searchText)
        } else if (searchInput.category === "상품내용"){
            output = description.includes(searchText)
        } else {
            console.log("결과가 없습니다")
        }
        return output
    })

    React.useEffect(() => {
        dispatch(paginationReducer.actions.totalProducts(filteredData?.length))
    }, [dispatch, filteredData?.length])

    const onChangeSelection = (e) => {
        setLimitData(e.target.value)
        dispatch(paginationReducer.actions.dividePage(e.target.value))
    }

    return (
        <div className="list_container">
            <div className="result_count">검색된 데이터: {searchInput.inputText?.length > 0 ? filteredData?.length : data.products?.length}건</div>
            <div className="list_sub_container">
                <table>
                    <tbody>
                        <tr className="category">
                            <td>상품번호</td>
                            <td>상품명</td>
                            <td>브랜드</td>
                            <td>상품내용</td>
                            <td>가격</td>
                            <td>평점</td>
                            <td>재고</td>
                        </tr>
                        
                        {filteredData?.length > 0 && filteredData?.map((item, index) => {
                            return <Product item={item} index={item.id - 1} key={item.id}/>
                        })}
                        {filteredData?.length === 0 && 
                            <tr>
                                <td colSpan='7' className="result">검색 결과가 없습니다.</td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className="pagination-list-container">
                    <div className="page-filter-list-box-container">
                        페이지당 행:
                        <select 
                            type="number"
                            className="page-list-filter-box" 
                            value={limitData}
                            onChange={(e) => onChangeSelection(e)}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    <Pagination 
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={limitData}
                        onPageChange={item => setCurrentPage(item)}
                    />
                </div>

            </div>
        </div>
    )
}

export default List