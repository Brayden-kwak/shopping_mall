import React from 'react'
import '../style/Search.css'
import Divider from './Divider'

const Search = () => {

    const [filter, setFilter] = React.useState(["전체"])
    const [inputMessage, setInputMessage] = React.useState("")

    const selectForm = (e) => {
        setFilter(e.target.value)
    }

    const onChange = (e) => {
        setInputMessage(e.target.value)
        console.log(e.target.value)
    }

    const onClick = () => {
        console.log("button clicked -> ", inputMessage)
    }

    // 리덕스로 상태 공유
    console.log("filter -> ",filter)

  return (
    <div className="container">
        <div className="title">상품검색</div>
        <Divider/>
        <div className="sub-container">
            <div className="sub-container-title">검색</div>
            <div className="search-box-container">
                <select className="select-box" onChange={selectForm}>
                    <option value="전체">전체</option>
                    <option value="상품명">상품명</option>
                    <option value="브랜드">브랜드</option>
                    <option value="상품내용">상품내용</option>
                </select>
                <input type="text" className="input-box" name="inputMessage" value={inputMessage} placeholder="상품검색" onChange={onChange}/>
                <button onClick={onClick}>조회</button>
            </div>
        </div>
    </div>
  )
}

export default Search