import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { CardContextProvider } from './context/CardContext'

ReactDOM.render(
  <React.StrictMode>
    <CardContextProvider>
      <App />
    </CardContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
