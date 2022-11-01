import '../styles/CalculatorInputs.scss'
import { ReactElement } from 'react'
import * as yup from 'yup'
import { FieldValues, useFormContext } from 'react-hook-form'
import { InputsData } from '../store/calculatorSlice'

interface CalculatorInputsProps {
   inputsData: InputsData[]
}

export const CalculatorFormRulesConfirm = () => {
   return {
      inputArr0: yup.number().required(),
      inputArr1: yup.number().required(),
      inputArr2: yup.number().required(),
      inputArr3: yup.number().required()
   }
}

export const initialValueCalculatorFormValue = (inputsData: InputsData[]) => {
   return {
      inputArr0: inputsData[0].inputValue,
      inputArr1: inputsData[1].inputValue,
      inputArr2: inputsData[2].inputValue,
      inputArr3: inputsData[3].inputValue
   }
}

export default function CalculatorInputs(props: CalculatorInputsProps): ReactElement {
   const { register } = useFormContext<FieldValues>()

   return (
      <div className="inputsWrap">
         {props.inputsData.map((inputsData: InputsData, i: number) => (
            <div key={inputsData.text} className="wrap">
               <label>{inputsData.text}</label>
               <div className="wrapSymbol">
                  <input type="number" min={(i === 3 && 1) || 0} {...register(`inputArr${i}`)} />
                  <span className="symbol">{inputsData.symbol}</span>
               </div>
            </div>
         ))}
      </div>
   )
}
