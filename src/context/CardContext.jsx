import React, {
  useReducer,
  createContext,
  useContext,
  useCallback,
  useMemo
} from 'react'

// Dobrze jest definiować akcje jako consty
export const ACTION_ADD_USER = 'ACTION_ADD_USER'
export const ACTION_REMOVE_USER = 'ACTION_REMOVE_USER'
export const ACTION_UPDATE_USER = 'ACTION_UPDATE_USER'
export const ACTION_ADD_EXPENSE = 'ACTION_ADD_EXPENSE'
export const ACTION_REMOVE_EXPENSE = 'ACTION_REMOVE_EXPENSE'
export const MAKE_SUMMARY = 'MAKE_SUMMARY'

// Analogicznie jak w reduxie :) Jak załapiesz o co chodzi w tym pliku to reduxa już praktycznie znasz
// Reducer to "Odpowiedź" na wywołanie akcji, bierze Ci aktualny stan, oraz akcję która została wywołana
// I na podstawie action.type ktory jest jednym z constów rozrządza co zrobić ze stanem jak niżej:
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
    // case ACTION_UPDATE_USER: {
    //   return {
    //     ...state,
    //     usersList: state.usersList.map((user) => {
    //       if (user.id === action.payload.id) {
    //         return { ...user, ...action.payload };
    //       }

    //       return user;
    //     }),
    //   };
    // }
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
    // case ACTION_REMOVE_EXPENSE: {
    //     return {
    //       ...state,
    //       itemsDescriptions: state.itemsDescriptions.filter((descr) => descr.id !== action.payload),
    //       itemsCosts: state.itemsCosts.filter((itemCost) => itemCost.id !== action.payload),
    //       itemsParticipants: state.itemsParticipants.filter((itemParticipants) => itemParticipants.id !== action.payload),
    //       itemsPaidBy: state.itemsPaidBy.filter((padiBy) => padiBy.id !== action.payload),
    //     };
    //   }
    // case MAKE_SUMMARY
    // Do uzupełnienia reducery dla dalszych części stanu czyli itemsDescriptions etc
    default:
      return state
  }
}
const CardContext = createContext()
/// ///////////////          DODATKOWY TASK
/// /w userach dodac dwa pola, isparticipantof, ispaidFor(czy placil czy nie),
// isparticipantof to tablicza za ktore particpant nie placil(bral udzial),
// ispaidFor(te, za ktore placil)
/// / wziac tablice userow i tablice paidBy,
/// jezeli w obydwu tablicach indeksy id sa takie same, to w tablicy userow utworzyc
// userPaidFor oraz dodac id tego konkretnego expensa, za ktrego user zaplacil

// let test = usersList.filter((el) => el.id === paidBy)

// console.log(test);
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

  // To jest coś w deseń action creatora - do doczytania jak jesteś ciekawy :)
  const addUser = useCallback((newUser) => {
    dispatch({
      type: ACTION_ADD_USER,
      payload: newUser
    })
  }, [])

  // Do usunięcia potrzebny jest tylko ID usera
  const removeUser = useCallback((userId) => {
    dispatch({
      type: ACTION_REMOVE_USER,
      payload: userId
    })
  }, [])

  // update musi mieć CO NAJMNIEJ id usera
  //   const updateUser = useCallback((partialUserData) => {
  //     dispatch({
  //       type: ACTION_UPDATE_USER,
  //       payload: partialUserData,
  //     });
  //   }, []);

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


  // A to jest to co jest jako initial brane, czyli nasz to co możemy z kontekstu wyciągnąć
  const value = useMemo(
    () => ({
      ...state,
      addUser,
      removeUser,
      //   updateUser,
      addExpense,
      removeExpense
    }),
    [state, addUser, removeUser, addExpense, removeExpense]
    // [state, addUser, removeUser, updateUser, addItem]
  )

  // Standardowy provider, do użycia w górze aplikacji
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}
export { CardContextProvider, useCardContext }
