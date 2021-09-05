import { Fragment, useState } from 'react'
import classes from './Checkbox.module.scss'
const Checkbox = props => {
  // const [participants, setParticipants] = useState("");
  // const [paidBy, setPaidBy] = useState("");

  return (
    <>

      <div className={classes.box}>
        <input id={props.id} type='checkbox' value={props.participants} onChange={(event) => props.onChange(props.id, event.currentTarget.checked)} />
        <span className={classes.check} />
        <label className={classes.xxx} for={props.id}>{props.name}</label>
      </div>

    </>
  )
}
export default Checkbox
