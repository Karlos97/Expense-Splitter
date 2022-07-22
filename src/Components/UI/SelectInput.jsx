import classes from './SelectInput.module.scss'

const SelectInput = (props) => {
  const paidByInput = props.usersList.map((el, i) => {
    return (
      <option value={el.id} key={el.id}>
        {el.name}
      </option>
    )
  })
  return (
    <>
      <select
        className={classes.select}
        name='Paid by'
        id='Paid by select'
        onChange={props.onChange}
      >
        {paidByInput}
      </select>
    </>
  )
}
export default SelectInput
