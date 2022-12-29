import React from 'react'
import '../style/Search.css'
import { useAppDispatch } from "../reducers/store"
import searchFilterReducer from '../reducers/searchFilterReducer'
import Divider from './Divider'
import CustomSelect from './CustomSelect';

// select box 커스텀 스타일 시도
// const optionList = [
//     {value: "전체", key: 0},
//     {value: "상품명", key: 1},
//     {value: "브랜드", key: 2},
//     {value: "상품내용", key: 3},
// ]

const Search = () => {

    const [inputMessage, setInputMessage] = React.useState("")
    const [inputCategory, setInputCategory] = React.useState("전체")

    const dispatch = useAppDispatch();

    const selectedRef = React.useRef(null);
    const inputMessageRef = React.useRef(null);

    const onChange = (e) => {
        setInputMessage(e.target.value)
    }

    // select box 커스텀 스타일 시도
    // const getData = (data) => {
    //     setInputCategory(data);
    // };

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
                        value={inputCategory || ''}
                        onChange={(e) => setInputCategory(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        <option value="상품명">상품명</option>
                        <option value="브랜드">브랜드</option>
                        <option value="상품내용">상품내용</option>
                    </select>

                    {/* select box 커스텀 스타일 시도 */}
                    {/* <CustomSelect
                        optionList={optionList}
                        getData={getData}
                    /> */}

                    <input 
                        type="text" 
                        className="input-box" 
                        name="inputMessage" 
                        value={inputMessage || ''} 
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