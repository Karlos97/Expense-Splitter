import React, {
  useReducer,
  createContext,
  useContext,
  useCallback,
  useMemo
} from 'react'

export const ACTION_ADD_USER = 'ACTION_ADD_USER'
export const ACTION_REMOVE_USER = 'ACTION_REMOVE_USER'
export const ACTION_UPDATE_USER = 'ACTION_UPDATE_USER'
export const ACTION_ADD_EXPENSE = 'ACTION_ADD_EXPENSE'
export const ACTION_REMOVE_EXPENSE = 'ACTION_REMOVE_EXPENSE'
export const MAKE_SUMMARY = 'MAKE_SUMMARY'

function cardReducer (state, action) {
  switch (action.type) {
    case ACTION_ADD_USER: {
      return {
        ...state,
        usersList: [...state.usersList, action.payload]
      }
    }
    case ACTION_REMOVE_USER: {
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload)
      }
    }
    case ACTION_ADD_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      }
    }
    case ACTION_REMOVE_EXPENSE: {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        )
      }
    }
    default:
      return state
  }
}
const CardContext = createContext()
function useCardContext () {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardContextProvider')
  }
  return context
}

function CardContextProvider ({ children, initialState }) {
  const [state, dispatch] = useReducer(cardReducer, {
    usersList: [],
    expenses: [],
    ...initialState
  })

  const addUser = useCallback((newUser) => {
    dispatch({
      type: ACTION_ADD_USER,
      payload: newUser
    })
  }, [])

  const removeUser = useCallback((userId) => {
    dispatch({
      type: ACTION_REMOVE_USER,
      payload: userId
    })
  }, [])

  const addExpense = useCallback((expense) => {
    dispatch({
      type: ACTION_ADD_EXPENSE,
      payload: expense
    })
  }, [])

  const removeExpense = useCallback((id) => {
    dispatch({
      type: ACTION_REMOVE_EXPENSE,
      payload: id
    })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      addUser,
      removeUser,
      addExpense,
      removeExpense
    }),
    [state, addUser, removeUser, addExpense, removeExpense]
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}
export { CardContextProvider, useCardContext }
