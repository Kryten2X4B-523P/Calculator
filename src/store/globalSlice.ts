// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {}

const initialState: IState = {}

const globalSlice = createSlice({
   name: 'global',
   initialState,
   reducers: {}
})

export const {} = globalSlice.actions

export default globalSlice.reducer
