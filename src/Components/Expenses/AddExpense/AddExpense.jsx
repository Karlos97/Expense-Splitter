import React, { useState } from 'react'
import Button from '../../UI/Button'

import Modal from '../../UI/Modal'
import classes from './AddExpense.module.scss'
import buttonClasses from '../../UI/Button.module.scss'
import Checkbox from '../../UI/Checkbox'
import SelectInput from '../../UI/SelectInput'
import { useCardContext } from '../../../context/CardContext'
import { uuid } from 'uuidv4'

const AddExpense = (props) => {
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [participants, setParticipants] = useState('')
  const { usersList, addExpense } = useCardContext()
  const [paidBy, setPaidBy] = useState(usersList[0]?.id)
  const [uncheckedList, setUncheckedList] = useState('')

  const id = uuid()
  const handleAddExpense = (e) => {
    addExpense({
      description,
      cost,
      participants,
      paidBy,
      id
    })
  }

  const onHandleSetParticipants = (id, checked) => {
    if (checked) {
      if (!participants.includes(id)) {
        setParticipants([...participants, id])
      }
    } else {
      setUncheckedList([...uncheckedList, id])
      if (id !== paidBy && participants.includes(id)) {
        setParticipants(
          participants.filter((participantId) => participantId !== id)
        )
      }
    }
  }

  const checkBoxes = usersList.map((el) => {
    return (
      <Checkbox
        name={el.name}
        id={el.id}
        key={el.id}
        participants={participants}
        onChange={onHandleSetParticipants}
      />
    )
  })

  return (
    <Modal onClose={props.onClose}>
      <h2>Add expense to expenses list</h2>
      <div className={classes['expense-input']}>
        <input
          type='input'
          className={classes.form__field}
          placeholder='expense'
          name='expense'
          id='expense'
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
        />
        <label for='expense' className={classes.form__label}>
          Expense
        </label>
      </div>
      <div className={classes['cost-input']}>
        <input
          type='input'
          className={classes.form__field}
          placeholder='cost'
          name='cost'
          id='cost'
          value={cost}
          onChange={(e) => setCost(e.currentTarget.value)}
          required
        />
        <label for='cost' className={classes.form__label}>
          Cost
        </label>
      </div>

      <div className={classes.checkboxes}>
        <p className={classes.addExpenseParagraph}>
          Choose expense participants:
        </p>
        {checkBoxes}
      </div>
      <p className={classes.addExpenseParagraph}>
        Choose who paid for this expense:
      </p>

      <SelectInput
        usersList={usersList}
        onChange={(e) => {
          setPaidBy(e.currentTarget.value)
          if (!participants.includes(e.currentTarget.value)) {
            setParticipants([...participants, e.currentTarget.value])
          }
          if (
            uncheckedList.includes(paidBy) &&
            e.currentTarget.value !== paidBy
          ) {
            setParticipants(
              participants.filter((participantId) => participantId !== paidBy)
            )
          }
        }}
      />

      <Button
        type='button'
        class={`${classes.button} ${buttonClasses.button} ${buttonClasses['button-small']}`}
        onClick={handleAddExpense}
      >
        Add Expense
      </Button>
    </Modal>
  )
}

export default AddExpense
