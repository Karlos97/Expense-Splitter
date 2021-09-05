import React from 'react'

const CartContext = React.createContext({
  usersList: [],
  itemsDescriptions: [],
  itemsCosts: [],
  itemsParticipants: [],
  itemsPaidBy: [],
  addUser: (item) => {},
  removeUser: (id) => {}
})

export default CartContext
