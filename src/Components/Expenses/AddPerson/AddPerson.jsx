import React, { useState } from 'react'
import Button from '../../UI/Button'

import Modal from '../../UI/Modal'
import classes from './AddPerson.module.scss'
import buttonClasses from '../../UI/Button.module.scss'
import { useCardContext } from '../../../context/CardContext'
import { uuid } from 'uuidv4'

const AddPerson = (props) => {
  //   const btnClassName = `${buttonClasses.button} ${buttonClasses["button-small"]}`
  const [name, setName] = useState('')

  const { addUser } = useCardContext()

  const handleAddUser = (e) => {
    addUser({
      name,
      id: uuid()
    })

    // props.onClick(e)
  }

  return (
    <Modal onClose={props.onClose}>
      <div className={classes['add-person']}>
        <h2>Add Person to users list</h2>
        <div className={classes.input}>
          <input
            type='input'
            className={classes.form__field}
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            id='name'
            required
          />
          <label for='name' className={classes.form__label}>
            Name
          </label>
        </div>
        <Button
          type='button'
          class={`${classes.button} ${buttonClasses.button} ${buttonClasses['button-small']}`}
          onClick={handleAddUser}
        >
          Add Person
        </Button>
      </div>
    </Modal>
  )
}

export default AddPerson
