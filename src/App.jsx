import { Fragment } from 'react'
import './App.scss'
import Header from './Components/Layout/Header/Header'
import Expenses from './Components/Expenses/Expenses'

function App () {
  return (
    <>
      <Header title='Money splitter' />

      <main>
        <Expenses />

      </main>
    </>
  )
}

export default App
