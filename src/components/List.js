import React from 'react'
import useFetchApi from '../Hooks/useFetchApi'
import "../style/List.css"
import Product from './Product'

const List = () => {

    const data = useFetchApi("https://dummyjson.com/products?limit=100")
    
    return (
        <div className="list_container">
            <div className="result_count">검색된 데이터: {data.products.length}건</div>
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
                        
                        {data.products && data.products.map((item, index) => {
                        return <Product item={item} index={index} key={item.id}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List