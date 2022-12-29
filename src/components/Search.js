import React from 'react'
import '../style/Search.css'
import { useAppDispatch } from "../reducers/store"
import searchFilterReducer from '../reducers/searchFilterReducer'
import Divider from './Divider'

const Search = () => {

    const [inputMessage, setInputMessage] = React.useState("")
    const [inputCategory, setInputCategory] = React.useState("")

    const dispatch = useAppDispatch();

    const selectedRef = React.useRef("");
    const inputMessageRef = React.useRef("");

    const onChange = (e) => {
        setInputMessage(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const category = selectedRef.current?.value;
        const inputText = inputMessageRef.current?.value;

        if ((category !== null || category !== undefined) && (inputText !== null || inputText !== undefined)) {
            sessionStorage.setItem("category", category)
            sessionStorage.setItem("inputText", inputText)
        }

        dispatch(searchFilterReducer.actions.searchFilter({category, inputText}))
    }

    const sessionCategory = sessionStorage.getItem("category")
    const sessionInputText = sessionStorage.getItem("inputText")

    React.useEffect(() => {
        if ((sessionCategory !== null || sessionCategory !== undefined) && (sessionInputText !== null || sessionInputText !== undefined)) {
            const storeValues = {category: sessionCategory, inputText: sessionInputText}
            dispatch(searchFilterReducer.actions.searchFilter(storeValues))
            setInputMessage(sessionInputText)
            setInputCategory(sessionCategory)
        }
    }, [dispatch, sessionCategory, sessionInputText])
    
  return (
    <div className="container">
        <div className="title">상품검색</div>
        <Divider/>
        <div className="sub-container">
            <div className="sub-container-title">검색</div>
            <div className="search-box-container">
                <form onSubmit={onSubmit}>
                    <select 
                        className="select-box"
                        ref={selectedRef}
                        value={inputCategory}
                        onChange={(e) => setInputCategory(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        <option value="상품명">상품명</option>
                        <option value="브랜드">브랜드</option>
                        <option value="상품내용">상품내용</option>
                    </select>
                    <input 
                        type="text" 
                        className="input-box" 
                        name="inputMessage" 
                        value={inputMessage} 
                        ref={inputMessageRef}
                        placeholder="상품검색" 
                        onChange={onChange}
                    />
                    <button className="search-button">조회</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Search