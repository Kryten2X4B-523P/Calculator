import '../styles/CalculatorGraph.scss'
import React, { memo, ReactElement, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { ResultMoney, setResultMoney } from '../store/calculatorSlice'
import { useAppSelector } from '../app/hooks'
import { numberWithGaps } from '../utils/utils'
import CalculatorResults from './CalculatorResults'

interface CalculatorGraphProps {}

interface ResultsProps {
   text: string
   value: number
}

function Results(props: ResultsProps): ReactElement {
   return (
      <div className="wrapResults">
         <span className="text">{props.text}:</span>
         <span className="value"> &nbsp;{numberWithGaps(props.value)}</span>
         <span className="currency">&nbsp;Kč</span>
      </div>
   )
}

function CalculatorGraph(props: CalculatorGraphProps): ReactElement {
   const { watch } = useFormContext()
   const dispatch = useDispatch()
   const resultMoney = useAppSelector((state) => state.calculator.resultMoney)

   const percentYearn = +watch('inputArr0')
   const entryCash = +watch('inputArr1')
   const monthContinueCash = +watch('inputArr2')
   const years = +watch('inputArr3')

   const investedPrice = entryCash + years * 12 * monthContinueCash
   const yearnInterest = () => {
      if (!resultMoney) {
         return 0
      } else {
         let interest = 0
         resultMoney.map((s: ResultMoney) => (interest += s.interest))
         return interest
      }
   }

   const calculateProfit = (cash: number, percentYearn: number, monthContinueCash: number) =>
      +((cash + 12 * monthContinueCash) * (percentYearn / 100)).toFixed(2)

   const totalCashPerYear = (cash: number, monthContinueCash: number) =>
      cash + 12 * monthContinueCash

   useEffect(() => {
      const resultMoney: ResultMoney[] = []

      for (let i = 0; i < years; i++) {
         if (i === 0) {
            resultMoney.push({
               interest: calculateProfit(entryCash, percentYearn, monthContinueCash),
               invested: totalCashPerYear(entryCash, monthContinueCash)
            })
         } else {
            const cashFromLastYear = resultMoney[i - 1].invested + resultMoney[i - 1].interest

            resultMoney.push({
               interest: calculateProfit(cashFromLastYear, percentYearn, monthContinueCash),
               invested: totalCashPerYear(cashFromLastYear, monthContinueCash)
            })
         }
      }

      dispatch(setResultMoney(resultMoney))
   }, [percentYearn, entryCash, monthContinueCash, years])

   return (
      <div className="calculatorGraph">
         <h3 className="table">Tabulka:</h3>
         <Results text={'Investovaná částka'} value={+investedPrice.toFixed(0)} />
         <Results text={'Obdržený úrok'} value={+yearnInterest().toFixed(0)} />
         <Results text={'Výsledná částka'} value={+(investedPrice + yearnInterest()).toFixed(0)} />

         <CalculatorResults years={years} />
      </div>
   )
}

export default memo(CalculatorGraph)
