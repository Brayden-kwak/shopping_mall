import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    totalPage: 0,
    totalProducts: 0,
    divide: 10,
}

const paginationReducer = createSlice({
    name: "paginationReducer",
    initialState,
    reducers: {
        totalProducts: (state, action) => {
            state.totalProducts = action.payload;
            state.totalPage = Math.ceil(action.payload / state.setPage);
        },
        dividePage: (state, action) => {
            state.divide = action.payload;
        }
    }
})

export default paginationReducer
