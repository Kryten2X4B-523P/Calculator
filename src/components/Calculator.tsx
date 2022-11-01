import '../styles/Calculator.scss'
import { ReactElement, useMemo } from 'react'
import CalculatorInputs, {
   CalculatorFormRulesConfirm,
   initialValueCalculatorFormValue
} from './CalculatorInputs'
import { useAppSelector } from '../app/hooks'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CalculatorGraph from '../components/CalculatorGraph'

interface CalculatorProps {}

export default function Calculator(props: CalculatorProps): ReactElement {
   const inputsData = useAppSelector((state) => state.calculator.inputsData)

   const schema = useMemo(() => {
      const schema = yup.object().shape(CalculatorFormRulesConfirm())

      return schema
   }, [])

   const methods = useForm({
      resolver: yupResolver(schema),
      criteriaMode: 'all',
      defaultValues: {
         ...initialValueCalculatorFormValue(inputsData)
      }
   })

   return (
      <div className="calculator">
         <FormProvider {...methods}>
            <div className="w ">
               <h1>Spočítejte si kolik peněz můžete investováním získat</h1>
               <hr></hr>
               <CalculatorInputs inputsData={inputsData} />
               <h2>Výsledek</h2>
               <hr></hr>

               <CalculatorGraph />
            </div>
         </FormProvider>
      </div>
   )
}
