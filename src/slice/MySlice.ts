import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "../types/Planet.types";
import { ResponseType } from "../types/Planet.types";
const initialState: initialStateType = ({
    AllPlanets: null,
    currPlanet: null,
    DialogOpen: false,
    currIndex: 1,
    totalLength: 0,
})
export const MySlice = createSlice({
    name: 'universe',
    initialState,
    reducers: {
        SET_ALL_PLANETS: (state, action: PayloadAction<ResponseType>) => {
            state.AllPlanets = action.payload
        },
        SET_CURR_PLANET: (state, action) => {
            state.currPlanet = action.payload
        },
        SET_DIALOG: (state, action) => {
            state.DialogOpen = action.payload
        },
        SET_TOTAL_LENGTH: (state, action) => {
            state.totalLength = action.payload
        },
        SET_CURR_INDEX: (state, action) => {
            state.currIndex = action.payload
        }
    }
})
export const {
    SET_ALL_PLANETS,
    SET_CURR_PLANET,
    SET_DIALOG,
    SET_TOTAL_LENGTH,
    SET_CURR_INDEX
} = MySlice.actions;
export default MySlice.reducer
