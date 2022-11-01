import Calculator from '../components/Calculator'
import React, { ReactElement } from 'react'
import '../styles/Header.scss'

interface HomeProps {}

export default function Home(props: HomeProps): ReactElement {
   return (
      <>
         <div className="header">
            <h1>Investiční kalkulačka</h1>
         </div>
         <div className="shadow"></div>
         <Calculator />
      </>
   )
}
