import React from 'react'
import { useCardContext } from '../../../context/CardContext'
import findUserName from '../FindUserName'
import classes from './MiniList.module.css'

const MiniList = (props) => {
  const { usersList } = useCardContext()
  let name, paragraphClass
  const participantsList = props.participants.map((el) => {
    name = findUserName(usersList, el)

    if (el === props.paidBy) {
      paragraphClass = `${classes['mini-list-paragraph']} ${classes['paid-by']}`
    } else {
      paragraphClass = classes['mini-list-paragraph']
    }
    return <p key={el.id} className={paragraphClass}>{name}</p>
  })

  return <div className={classes.list}>{participantsList}</div>
}
export default MiniList
