import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../store/reduxFetchApi'
import globalReducer from '../store/globalSlice'
import calculatorReducer from '../store/calculatorSlice'

export const store = configureStore({
   reducer: {
      global: globalReducer,
      calculator: calculatorReducer,
      [apiSlice.reducerPath]: apiSlice.reducer
   },
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware)
   }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
