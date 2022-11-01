import '../styles/CalculatorResults.scss'
import React, { ReactElement, useEffect, useMemo } from 'react'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useAppSelector } from '../app/hooks'
import { ResultMoney } from '../store/calculatorSlice'
import { numberWithGaps } from '../utils/utils'

interface CalculatorResultsProps {
   years: number
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function CalculatorResults(props: CalculatorResultsProps): ReactElement {
   const resultMoney = useAppSelector((state) => state.calculator.resultMoney)

   const label0 = useMemo(() => {
      const label: number[] = []

      resultMoney?.map((resultMoney: ResultMoney) => {
         label.push(resultMoney.interest + resultMoney.invested)
      })
      return label
   }, [resultMoney])

   const labels = (): string[] => {
      const label = []
      for (let i = 0; i < props.years; i++) {
         label.push((i + 1).toString())
      }
      return label
   }

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top' as const
         },
         title: {}
      },
      scales: {
         y: {
            ticks: {
               callback: function (value: any, index: any, ticks: any) {
                  return numberWithGaps(value.toFixed(0)) + ' Kč'
               }
            }
         },
         x: {
            title: {
               display: true,
               text: 'Počet let'
            }
         }
      }
   }

   const data = {
      labels: labels(),
      datasets: [
         {
            label: 'Obdržený úrok s částkou',
            data: label0,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
         }
      ]
   }

   return (
      <div className="wrapCalculatorResults">
         <div className="charJs">
            <Line options={options} data={data} />
         </div>
      </div>
   )
}
