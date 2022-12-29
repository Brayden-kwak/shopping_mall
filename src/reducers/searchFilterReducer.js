import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    category: "전체",
    inputText: ""
}

const searchFilterReducer = createSlice({
    name: "searchFilterReducer",
    initialState,
    reducers: {
        searchFilter: (state, action) => {
            state.category = action.payload.category;
            state.inputText = action.payload.inputText;
        }
    }
})

export default searchFilterReducer
