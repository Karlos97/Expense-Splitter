import React, { useState } from 'react'

import ExpensesList from './Lists/ExpensesList'
import ButtonList from './ButtonList'
import UsersList from './Lists/UsersList'

import classes from './Expenses.module.scss'
import CreateSummary from './Summary/CreateSummary'
import AddPerson from './AddPerson/AddPerson'
import AddExpense from './AddExpense/AddExpense'
import CreateUserSummary from './Summary/CreateUserSummary'

const Expenses = (props) => {
  const [addUserIsShown, setAddUserIsShown] = useState(false)
  const [addExpenseIsShown, setAddExpenseIsShown] = useState(false)
  const [createSummaryIsShown, setCreateSummaryIsShown] = useState(false)
  const [createUserSummaryIsShown, setCreateUserSummaryIsShown] = useState(false)
  const [userSummaryId, setUserSummaryId] = useState('')
  const showAddUserHandler = () => {
    setAddUserIsShown(true)
  }
  const hideAddUserHandler = () => {
    setAddUserIsShown(false)
  }
  const showAddExpenseHandler = () => {
    setAddExpenseIsShown(true)
  }
  const hideAddExpenseHandler = () => {
    setAddExpenseIsShown(false)
  }
  const showCreateSummaryHandler = () => {
    setCreateSummaryIsShown(true)
  }
  const hideCreateSummaryHandler = () => {
    setCreateSummaryIsShown(false)
  }
  const showCreateUserSummaryHandler = (id) => {
    setUserSummaryId(id)
    setCreateUserSummaryIsShown(true)
  }
  const hideCreateUserSummaryHandler = () => {
    setCreateUserSummaryIsShown(false)
  }

  return (
    <>
      <ButtonList
        handleShowAddUserCart={showAddUserHandler}
        handleShowAddExpenseCart={showAddExpenseHandler}
        handleShowCreateSummaryCart={showCreateSummaryHandler}
      />
      <div className={classes.grid}>
        <UsersList class={classes['users-list']} onShowUserSummary={showCreateUserSummaryHandler} />
        <ExpensesList class={classes['expenses-list']} />
      </div>
      {addUserIsShown && <AddPerson onClose={hideAddUserHandler} />}
      {addExpenseIsShown && <AddExpense onClose={hideAddExpenseHandler} />}
      {createSummaryIsShown && <CreateSummary onClose={hideCreateSummaryHandler} />}
      {createUserSummaryIsShown && <CreateUserSummary userSummaryId={userSummaryId} onHideUserSummary={hideCreateUserSummaryHandler} />}
    </>
  )
}
export default Expenses
