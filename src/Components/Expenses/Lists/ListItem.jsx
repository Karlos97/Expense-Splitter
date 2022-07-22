import React from 'react'

import Button from '../../UI/Button'

import buttonClasses from '../../UI/Button.module.scss'
import classes from './ListItem.module.css'

const ListItem = props => {
  return (

    <div className={classes.item}>
      <div>

        <li onClick={() => props.onShowUserSummary(props.id)}>{props.label} {props.itemCost}{props.currency}</li>

      </div>
      <Button
        type='button'
        class={`${classes.button} ${buttonClasses.button} 
        ${buttonClasses['button-small']}`}
        onClick={() => props.onButtonClick(props.id)}
      >X
      </Button>
    </div>

  )
}
export default ListItem
