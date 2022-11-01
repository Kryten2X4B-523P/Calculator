import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InputsData {
   text: string
   inputValue: number
   symbol: string
}

export interface ResultMoney {
   invested: number
   interest: number
}

interface IState {
   inputsData: InputsData[]
   resultMoney: ResultMoney[] | null
}

const initialState: IState = {
   inputsData: [
      { text: 'Předpokládaná roční úroková sazba', inputValue: 3, symbol: '%' },
      { text: 'Počáteční jednorázová investice', inputValue: 10000, symbol: 'Kč' },
      { text: 'Pravidelná měsíční investice', inputValue: 100, symbol: 'Kč' },
      { text: 'Na kolik let', inputValue: 10, symbol: 'roky' }
   ],
   resultMoney: null
}

const calculatorSlice = createSlice({
   name: 'calculator',
   initialState,
   reducers: {
      setResultMoney(state, action: PayloadAction<ResultMoney[]>) {
         state.resultMoney = action.payload
      }
   }
})

export const { setResultMoney } = calculatorSlice.actions

export default calculatorSlice.reducer
