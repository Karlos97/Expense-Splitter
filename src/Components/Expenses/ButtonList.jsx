import React from 'react'

import Button from '../UI/Button'

import classes from './ButtonList.module.css'
import buttonClasses from '../UI/Button.module.scss'

const ButtonList = props => {
  const btnClassName = [buttonClasses.button, buttonClasses['button-big']].join(' ')
  return (
    <div className={classes.list}>
      <Button type='button' class={btnClassName} onClick={props.handleShowAddUserCart}>Add person</Button>
      <Button type='button' class={btnClassName} onClick={props.handleShowAddExpenseCart}>Add expense</Button>
      <Button type='button' class={btnClassName} onClick={props.handleShowCreateSummaryCart}>Summary</Button>
    </div>
  )
}
export default ButtonList
