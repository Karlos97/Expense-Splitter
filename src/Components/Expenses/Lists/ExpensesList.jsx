import { Fragment, useState } from 'react'
import ListItem from './ListItem'
import MiniList from './MiniList'
import { useCardContext } from '../../../context/CardContext'
// const items = [
//   {
//     participants: ["Marcin", "Tomek", "Ania"],
//     cost: 123,
//     label: "Paliwo",
//     whoPaid:"Marcin",
//   },
//   {
//     participants: ["Marcin", "Ania"],
//     cost: 111,
//     label: "Jedzenie",
//     whoPaid:"Ania",
//   },
//   {
//     participants: ["Marcin", "Tomek"],
//     cost: 333,
//     label: "Alkohol",
//     whoPaid:"Tomek",
//   },
// ];
// const testArr = [
//   { descr: "test1", id: 123 },
//   { descr: "test2", id: 1234 },
// ];

const ExpensesList = (props) => {
  const { expenses, usersList, removeExpense } = useCardContext()
  const handleRemoveExpense = (id) => {
    // console.log("usuwam")
    // console.log(props.id)
    removeExpense(id)
  }
  // let participantsList = [];
  // // let paidBy = ""
  const expensesListLayout = expenses?.map((el, i) => {
    //   console.log(el.paidBy)
    //    usersList.map((users) => {
    //     el.participants.map((participantId) => {
    //       if(users.id === participantId){
    //         // if(users.id === el.paidBy){
    //         //   paidBy = users.name
    //         // }
    //        return participantsList = [ ...participantsList, users.name]

    //       };
    //     });

    //     return participantsList;
    //   });
    // console.log(el.id);

    return (
      <>
        <ListItem
          itemCost={el.cost}
          label={el.description}
          id={el.id}
          currency='[$]'
          // onClick={props.onClick}
          onButtonClick={handleRemoveExpense}
        />
        <MiniList participants={el.participants} paidBy={el.paidBy} />
      </>
    )
  })

  return (
    <div className={props.class}>
      <h2> expenses list</h2>
      <ul>{expensesListLayout}</ul>
    </div>
  )
}
export default ExpensesList
