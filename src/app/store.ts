import { configureStore } from "@reduxjs/toolkit";
import MyReducer from '../slice/MySlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
    reducer: MyReducer
})
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;