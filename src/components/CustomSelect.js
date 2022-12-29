import React from 'react'
import "../style/CustomSelect.css"

// *************************
// select box 커스텀 스타일 시도
// *************************
const CustomSelect = (props) => {
    const [currentValue, setCurrentValue] = React.useState("전체");
    const [showOptions, setShowOptions] = React.useState(false);
  
    const {optionList, getData} = props

    const handleOnChangeSelectValueChild = (e) => {
      setCurrentValue(e.target.getAttribute("value"));
      getData(e.target.getAttribute("value"))
    };

    return (
        <div 
            className="select-box-custom" 
            onClick={() => setShowOptions((prev) => !prev)}
        >
          <label className="label">{currentValue}</label>
          <ul className={showOptions ? "select-options-none" : "select-options"}>
            {optionList?.map((data, index) => (
              <li
                  className="option"
                  key={data.key}
                  value={data.value}
                  onClick={handleOnChangeSelectValueChild}
              >
                {data.value}
              </li>
            ))}
          </ul>
        </div>
    )   
}

export default CustomSelect