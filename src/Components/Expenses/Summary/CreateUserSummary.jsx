import React from "react";
import Modal from "../../UI/Modal";
import findUserName from "../FindUserName";
import { useCardContext } from "../../../context/CardContext";
const CreateUserSummary = (props) => {
  const { expenses, usersList } = useCardContext();
  // const name = usersList.filter(el =>{
  //   if(el.id ===props.userSummaryId){
  //     return el.name
  //   }
  //   else {
  //   break
  // }
  // }
  // )
  // console.log(props.userSummaryId);
  /// //// TABLICA OBIEKTW W KTORYCH UYTKOWNIK BRA UDZIAL
  // const userAsParticipant = []
  // usersList.forEach((user, i) => {
  //   userAsParticipant[i] = expenses.filter((exp) => {
  //     return exp.participants.some((id) => {
  //       return user.id === id
  //     })
  //   })
  // })
  // const searchName = (id) => {
  //   usersList.filter((el) => {
  //     console.log(`id: ${id} el.id: ${el.id}`)
  //     console.log(el.name)
  //     if (el.id === id) {
  //       return el.name;
  //     }else return
  //   });
  // };

  const userPaidFor = expenses.filter(
    (exp) => exp.paidBy === props.userSummaryId
  );
  // console.log(userAsParticipant)

  //       //  TABLICA OBIEKTOW ZA KTORE ZAPLACIL DANY USER
  // const userAsParticipant = []
  // usersList.forEach((user, i) => {
  //   userAsParticipant[i] = expenses.filter(exp => user.id === exp.paidBy)
  // })
  const userAsParticipant = expenses.filter((exp) => exp.participants.some(id => props.userSummaryId === id));
  // })

  // console.log(userAsParticipant);

  const userPaidForSummaryLayout = userPaidFor?.map((el, i) => {
    return (
      <p>
        {el.description}: {el.cost}[$]
      </p>
    );
  });
  const userSummaryName = findUserName(usersList, props.userSummaryId)
  const userAsParticipantSummaryLayout = userAsParticipant?.map((el, i) => {
    // const name = usersList.filter((user) => user.id === el.paidBy)[0].name;

    const name = findUserName(usersList, el.paidBy)
    return (
      <div>
        <p>{el.description}:{el.cost}[$]</p>
        <p> Paid by : {name}</p>
      </div>
    );
  });
  const valOfTransactions = userAsParticipantSummaryLayout.length
  return (
    <Modal onClose={props.onHideUserSummary}>
      <h2> {userSummaryName} paid for:</h2>
      <div>{userPaidForSummaryLayout}</div>
      <h2> {userSummaryName} took a part in {valOfTransactions} transactions:</h2>
      <div>{userAsParticipantSummaryLayout}</div>
    </Modal>
  );
};
export default CreateUserSummary;
