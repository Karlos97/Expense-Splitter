import ListItem from './ListItem'
import MiniList from './MiniList'
import { useCardContext } from '../../../context/CardContext'
import React from 'react'

const ExpensesList = (props) => {
  const { expenses, removeExpense } = useCardContext()
  const handleRemoveExpense = (id) => {
    removeExpense(id)
  }
  const expensesListLayout = expenses?.map((el, i) => {
    return (
      <React.Fragment >
        <ListItem
          itemCost={el.cost}
          label={el.description}
          id={el.id}
          currency='[$]'
          onButtonClick={handleRemoveExpense}

        />
        <MiniList participants={el.participants} paidBy={el.paidBy}  />
      </React.Fragment>
    )
  })

  return (
    <div className={props.class}>
      <h2> expenses list</h2>
      <ul>{expensesListLayout}</ul>
    </div>
  )
}
export default ExpensesList
