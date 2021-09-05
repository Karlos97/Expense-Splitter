import React from 'react'
import { useCardContext } from '../../../context/CardContext'
import findUserName from '../FindUserName'
import classes from './MiniList.module.css'

const MiniList = (props) => {
  const { usersList } = useCardContext()
  let name, paragraphClass
  const participantsList = props.participants.map((el) => {

    name = findUserName(usersList, el)
    // usersList.forEach((user) => {
    //   if (user.id === el) {
    //     name = user.name
    //   }
    //   // return name
    // })

    if (el === props.paidBy) {
      // return (
      //   <p
      //     className={`${classes["mini-list-paragraph"]} ${classes["paid-by"]}`}
      //   >
      //     {name}
      //   </p>
      // );
      paragraphClass = `${classes['mini-list-paragraph']} ${classes['paid-by']}`
    } else {
      paragraphClass = classes['mini-list-paragraph']
    }
    return <p className={paragraphClass}>{name}</p>
  })

  return <div className={classes.list}>{participantsList}</div>
}
export default MiniList
