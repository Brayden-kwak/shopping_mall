import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import searchFilterReducer from './searchFilterReducer'
import paginationReducer from './paginationReducer'

const store = configureStore({
    reducer: {
        searchFilterReducer: searchFilterReducer.reducer,
        paginationReducer: paginationReducer.reducer
    }
})

export default store;
export const useAppDispatch = () => useDispatch()