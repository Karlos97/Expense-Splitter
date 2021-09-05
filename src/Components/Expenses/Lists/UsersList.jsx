import React, {useState} from 'react'
import ListItem from './ListItem'
// import CartContext from "../../../store/cart-context";
import { useCardContext } from '../../../context/CardContext'

const UsersList = (props) => {
  // const users = CartContext.usersList;

  const { usersList, removeUser } = useCardContext()

  const onUserRemove = (id) => {
    removeUser(id)
  }

  const usersListLayout = usersList?.map((el, i) => {
    return (
      <ListItem
        label={el.name}
        key={el.id}
        id={el.id}
        onButtonClick={onUserRemove}
        onShowUserSummary={props.onShowUserSummary}
      />
    )
  })

  // console.log(usersList);
  return (

    <div className={props.class}>
      <h2> Users list</h2>
      <ul>{usersListLayout}</ul>
    </div>



  )
}
export default UsersList
